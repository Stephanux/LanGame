/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
        var wsserver = cordova.plugins.wsserver;
        var port = "8080";
        // initialisation plugin HotSpot Wifi plugin :
        var param = {
            ssid: "wifiApp",
            password: "azertyuiop"
        };
        if (parseFloat(cordova.version) >= 6.0) {
            cordova.plugins.hotSpotManager.enableAccessPoint(param, function(res) {
                console.log('hotSpot Wifi : "wifiApp" activated with passwd : "azertyuiop" ');
                //alert("hotSpotEnabled: " + res);
                /** todo : ici on lancer le serveur WebSocket qui permettra les connexions des joueurs */
                wsserver.start(port, {
                    // WebSocket Server handlers
                    'onFailure' :  function(addr, port, reason) {
                        console.log('Stopped listening on %s:%d. Reason: %s', addr, port, reason);
                    },
                    // WebSocket Connection handlers
                    'onOpen' : function(conn) {
                        /* conn: {
                         'uuid' : '2f40741c-83c9-11e8-add3-0fa08e63bb8e',
                         'remoteAddr' : '192.168.1.10',
                         'httpFields' : {...},
                         'resource' : '/?param1=value1&param2=value2'
                         } */
                        console.log('A user connected from %s', conn.remoteAddr);
                    },
                    'onMessage' : function(conn, msg) {
                        console.log(conn, msg);
                    },
                    'onClose' : function(conn, code, reason, wasClean) {
                        console.log('A user disconnected from %s', conn.remoteAddr);
                    },
                    // Other options
                    'origins' : [ 'file://' ], // validates the 'Origin' HTTP Header.
                    'protocols' : [ 'my-protocol-v1', 'my-protocol-v2' ], // validates the 'Sec-WebSocket-Protocol' HTTP Header.
                    'tcpNoDelay' : true // disables Nagle's algorithm.
                }, function onStart(addr, port) {
                    console.log('Listening on %s:%d', addr, port);
                }, function onDidNotStart(reason) {
                    console.log('Did not start. Reason: %s', reason);
                });

            }, function(err) {
                alert("ERROR: " + err);
            });
        } else { // android version < 6.0
            // initialisation  du HotSpot Wifi plugin https://github.com/hypery2k/cordova-hotspot-plugin
            var hotSpot = cordova.plugins.hotspot;
            alert("hotSpot = " + hotSpot);
            hotSpot.config = {
                mode: 'WPA2PSK'
            };
            hotSpot.isHotspotEnabled(
                function() {
                    hotSpot.isHotSpotActive = true;
                },
                function() {
                    hotSpot.isHotSpotActive = false;
                }
            );
            hotSpot.createHotspot("wifiApp", hotSpot.config.mode, "azertyuiop", function() {
                alert("HotSpot démarré");
            }, function(error) {
                alert('Erreur Céation HotSpot "wifiApp" : ' + error);
            });
        }
    }
};

app.initialize();
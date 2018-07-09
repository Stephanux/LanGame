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

        // initialisation plugin HotSpot Wifi plugin :
        var param = {
            ssid: "wifiApp",
            password: "azertyuiop"
        };
        if (parseFloat(cordova.version) >= 6.0) {
            cordova.plugins.hotSpotManager.enableAccessPoint(param, function(res) {
                console.log('hotSpot Wifi : "wifiApp" activated with passwd : "azertyuiop" ');
                //alert("hotSpotEnabled: " + res);
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
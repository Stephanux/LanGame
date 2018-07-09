cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
  {
    "id": "cordova-plugin-websocket-server.WebSocketServer",
    "file": "plugins/cordova-plugin-websocket-server/www/wsserver.js",
    "pluginId": "cordova-plugin-websocket-server",
    "clobbers": [
      "cordova.plugins.wsserver"
    ]
  },
  {
    "id": "cordova-plugin-android-hotspotmanager.hotSpotManager",
    "file": "plugins/cordova-plugin-android-hotspotmanager/www/hotSpotManager.js",
    "pluginId": "cordova-plugin-android-hotspotmanager",
    "clobbers": [
      "cordova.plugins.hotSpotManager"
    ]
  }
];
module.exports.metadata = 
// TOP OF METADATA
{
  "cordova-plugin-whitelist": "1.3.3",
  "cordova-plugin-add-swift-support": "1.7.2",
  "cordova-plugin-websocket-server": "1.4.10",
  "cordova-plugin-android-hotspotmanager": "1.0.0"
};
// BOTTOM OF METADATA
});
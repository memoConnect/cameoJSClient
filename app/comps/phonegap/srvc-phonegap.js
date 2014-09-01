'use strict';

angular.module('cmPhonegap').service('cmPhonegap', [
    function () {
        return {
            isAvailable: function () {
                return typeof device != 'undefined'
            },
            isAndroid: function(){
                return this.isAvailable() && device.platform.toLowerCase() === 'android'
            },
            closeApp: function(){
                document.addEventListener('backbutton', function(e) {
                    navigator.app.exitApp();
                });
            }
        }
    }]
);
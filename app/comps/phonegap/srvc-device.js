'use strict';

// https://github.com/apache/cordova-plugin-device/blob/master/doc/index.md

angular.module('cmPhonegap').service('cmDevice', [
    'cmPhonegap', 'cmLogger', 'cmUtil',
    '$window',
    function (cmPhonegap, cmLogger, cmUtil,
              $window) {

        var unknown = 'unknown';

        var self = {
            plugin: null,

            existsPlugin: function() {
                if(typeof device == 'undefined'){
                    //cmLogger.info('DEVICE PLUGIN IS MISSING');
                    return false;
                }

                this.plugin = device;

                return true;
            },

            getPlatform: function(){
                return this.plugin.platform.toLowerCase();
            },

            isApp: function(){
                return this.existsPlugin();
            },
            isAndroid: function(){
                return this.existsPlugin()
                    && this.getPlatform().indexOf('android') >= 0;
            },
            isiOS: function(){
                return this.existsPlugin()
                   && (this.getPlatform().indexOf('iphone') >= 0
                    || this.getPlatform().indexOf('ipad') >= 0
                    || this.getPlatform().indexOf('ios') >= 0);
            },
            isWinPhone: function(){
                return this.existsPlugin()
                    && this.getPlatform().indexOf('win') >= 0;
            },
            isWinPhone8: function(){
                return this.existsPlugin()
                    && this.getPlatform().indexOf('Win32NT') >= 0;
            },
            isBlackBerry: function(){
                return this.existsPlugin()
                    && this.getPlatform().indexOf('blackberry') >= 0;
            },
            isAmazonFireOS: function(){
                return this.existsPlugin()
                    && this.getPlatform().indexOf('amazon-fireos') >= 0;
            },

            getCurrentOS: function(){
                var os = 'unknown';

                if(!this.existsPlugin())
                    return os;

                if (this.isAndroid()) {
                    os = 'and';
                } else if (this.isWinPhone()) {
                    os = 'win';
                } else if (this.isiOS()) {
                    os = 'ios';
                } else if (this.isBlackBerry()){
                    os = 'bby';
                }

                return os;
            },

            getId: function(){
                if(!this.existsPlugin())
                    return unknown;

                return this.plugin.uuid;
            },

            getName: function(){
                if(!this.existsPlugin())
                    return unknown;

                return this.plugin.name;
            },

            getVersion: function(){
                if(!this.existsPlugin())
                    return unknown;

                return this.plugin.version;
            },

            detectOSAndBrowser: function() {
                var nVer = $window.navigator.appVersion,
                    nAgt = $window.navigator.userAgent,
                    browserName = $window.navigator.appName,
                    nameOffset, verOffset;

                // In Opera, the true version is after 'Opera' or after 'Version'
                if ((verOffset = nAgt.indexOf('Opera')) != -1 || (verOffset = nAgt.indexOf('OPR')) != -1) {
                    browserName = 'Opera';
                }
                // In MSIE, the true version is after 'MSIE' in userAgent
                else if ((verOffset = nAgt.indexOf('MSIE')) != -1) {
                    browserName = 'Internet Explorer';
                }
                // Native Android
                else if ((verOffset = nAgt.indexOf('Linux; U; Android')) != -1) {
                    browserName = 'Native Browser';
                }
                // In Chrome, the true version is after 'Chrome'
                else if ((verOffset = nAgt.indexOf('Chrome')) != -1) {
                    browserName = 'Google Chrome';
                }
                // In Safari, the true version is after 'Safari' or after 'Version'
                else if ((verOffset = nAgt.indexOf('Safari')) != -1) {
                    browserName = 'Safari';
                }
                // In Firefox, the true version is after 'Firefox'
                else if ((verOffset = nAgt.indexOf('Firefox')) != -1) {
                    browserName = 'Mozilla Firefox';
                }
                // In most other browsers, 'name/version' is at the end of userAgent
                else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) < (verOffset = nAgt.lastIndexOf('/'))) {
                    browserName = nAgt.substring(nameOffset, verOffset);

                    if (browserName.toLowerCase() == browserName.toUpperCase()) {
                        browserName = navigator.appName;
                    }
                }

                // TODO: detect Netscape
                // app check
                if(this.isApp()){
                    browserName = 'App';
                }

                var OSName = 'unknown OS';

                if (nVer.indexOf('Win') != -1)
                    OSName = 'Windows';

                if (nVer.indexOf('like Mac OS X') != -1)
                    OSName = 'iOS';
                else if (nVer.indexOf('Mac') != -1)
                    OSName = 'Mac OS X';

                if(nVer.indexOf('Android') != -1)
                    OSName = 'Android';
                else if (nVer.indexOf('X11') != -1)
                    OSName = 'UNIX';
                else if (nVer.indexOf('Linux') != -1)
                    OSName = 'Linux';

                return {
                    os: OSName,
                    browser: browserName
                };
            }
        };

        return self;
    }
]);
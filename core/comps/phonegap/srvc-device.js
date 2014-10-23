'use strict';

// https://github.com/apache/cordova-plugin-device/blob/master/doc/index.md

angular.module('cmPhonegap')
.service('cmDevice', [
    'cmPhonegap', 'cmLogger', 'cmUtil',
    '$window', '$device', '$phonegapCameoConfig',
    function (cmPhonegap, cmLogger, cmUtil,
              $window, $device, $phonegapCameoConfig) {

        var unknown = 'unknown';

        var self = {
            plugin: null,
            debug: false,
            debugDevice: 'android',

            init: function(){
                if(typeof $phonegapCameoConfig == 'undefined') {
                    return false;
                }

                cmPhonegap.isReady(function(){
                    if(typeof $device.get() == 'undefined'){
                        //cmLogger.info('DEVICE PLUGIN IS MISSING');
                        return false;
                    }

                    self.plugin = $device.get()
                });
            },

            existsPlugin: function(){
                return this.plugin != null;
            },

            isApp: function(){
                if(this.debug) {
                    cmLogger.warn('cmPhonegap.cmDevice.debug == true!!!');
                    this.plugin = {};
                }

                return this.debug || !this.debug && this.existsPlugin();
            },

            getPlatform: function(){
                return this.isApp()
                    && 'platform' in this.plugin
                     ? this.plugin.platform.toLowerCase()
                     : unknown;
            },

            isAndroid: function(){
                if(this.debug && this.debugDevice.indexOf('android') >= 0){
                    return true;
                }
                return this.isApp()
                    && this.getPlatform().indexOf('android') >= 0;
            },
            isiOS: function(){
                return this.isApp()
                   && (this.getPlatform().indexOf('iphone') >= 0
                    || this.getPlatform().indexOf('ipad') >= 0
                    || this.getPlatform().indexOf('ios') >= 0);
            },
            isWinPhone: function(){
                return this.isApp()
                    && this.getPlatform().indexOf('win') >= 0;
            },
            isWinPhone8: function(){
                return this.isApp()
                    && this.getPlatform().indexOf('win32nt') >= 0;
            },
            isBlackBerry: function(){
                return this.isApp()
                    && this.getPlatform().indexOf('blackberry') >= 0;
            },
            isAmazonFireOS: function(){
                return this.isApp()
                    && this.getPlatform().indexOf('amazon-fireos') >= 0;
            },

            getCurrentOS: function(){
                var os = 'unknown';

                if(!this.isApp())
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
                if(!this.isApp())
                    return unknown;

                return this.plugin.uuid;
            },

            getName: function(){
                if(!this.isApp())
                    return unknown;

                return this.plugin.name;
            },

            getVersion: function(){
                if(!this.isApp())
                    return unknown;

                return this.plugin.version;
            },

            detectOSAndBrowser: function() {
                var nAgt = $window.navigator.userAgent.toLowerCase(),
                    OSName = 'unknown OS',
                    browserName = 'unknown Browser',
                    nameOffset,
                    verOffset;

                function has(needle){
                    return nAgt.indexOf(needle) != -1
                }

                var detecable = {
                    os: {
                        win: 'Windows',
                        sym: 'Symbian',
                        ios: 'iOS',
                        mac: 'Mac OS X',
                        and: 'Android',
                        uni: 'Unix',
                        lin: 'Linux'
                    },
                    browser: {
                        opr: 'Opera',
                        iex: 'Internet Explorer',
                        iem: 'IEMobile',
                        nab: 'Native Browser',
                        chr: 'Google Chrome',
                        saf: 'Safari',
                        mff: 'Mozilla Firefox',
                        app: 'App'
                    }
                };

                // os detection
                if (has('win'))
                    OSName = detecable.os.win;
                else if(has('symbianos'))
                    OSName = detecable.os.sym;
                else if(has('like mac os x'))
                    OSName = detecable.os.ios;
                else if(has('mac'))
                    OSName = detecable.os.mac;
                else if(has('android'))
                    OSName = detecable.os.and;
                else if(has('x11'))
                    OSName = detecable.os.uni;
                else if(has('linux'))
                    OSName = detecable.os.lin;

                // browser detection
                if ((verOffset = has('opera')) || (verOffset = has('opr')))
                    browserName = detecable.browser.opr;
                else if ((verOffset = has('iemobile')))
                    browserName = detecable.browser.iem;
                else if ((verOffset = has('msie')) || (verOffset = has('rv:11.0')))
                    browserName = detecable.browser.iex;
                else if ((verOffset = has('linux; u; android')))
                    browserName = detecable.browser.nab;
                else if ((verOffset = has('chrome')))
                    browserName = detecable.browser.chr;
                else if ((verOffset = has('safari')))
                    browserName = detecable.browser.saf;
                else if ((verOffset = has('firefox')))
                    browserName = detecable.browser.mff;
                // In most other browsers, 'name/version' is at the end of userAgent
                else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) < (verOffset = nAgt.lastIndexOf('/'))) {
                    browserName = nAgt.substring(nameOffset, verOffset);
                    if (browserName.toLowerCase() == browserName.toUpperCase()) {
                        browserName = 'unknown Browser';
                    }
                }

                // app check overrides all
                if(this.isApp())
                    browserName = detecable.browser.app;

                return {
                    givenBrowserUserAgent: nAgt,
                    os: OSName,
                    browser: browserName
                };
            }
        };

        self.init();

        return self;
    }
]);
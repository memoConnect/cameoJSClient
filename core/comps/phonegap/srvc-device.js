'use strict';

// https://github.com/apache/cordova-plugin-device/blob/master/doc/index.md

angular.module('cmPhonegap')
.service('cmDevice',[
    'cmPhonegap', 'cmLogger', 'cmUtil',
    '$window', '$device', '$phonegapCameoConfig',
    function (cmPhonegap, cmLogger, cmUtil,
              $window, $device, $phonegapCameoConfig) {

        var unknown = 'unknown';

        var self = {
            plugin: null,
            emulateDevice: false,
            emulateDeviceType: 'android', // android | ios | winphone
            flags: {},

            init: function(){
                cmPhonegap.isReady('cmDevice',function(){
                    if($device.get() == 'undefined'){
                        //cmLogger.info('DEVICE PLUGIN IS MISSING');
                        return false;
                    }

                    self.plugin = $device.get()
                });
            },

            existsPlugin: function(){
                return this.plugin != null;
            },

            getUserAgent: function(){
                var nAgt = '';

                // TODO: iOS8 Bug: Deprecated attempt to access property 'userAgent' on a non-Navigator object.
                try {
                    nAgt = ($window.navigator.userAgent||$window.navigator.vendor||$window.opera).toLowerCase();
                } catch(e){
                    console.log('fail',e)
                    nAgt = 'Mozilla/5.0 (iPhone; CPU iPhone OS 8_0 like Mac OS X) AppleWebKit';
                }

                return nAgt;
            },

            setFlag: function(name, boolean){
                if(typeof name == 'string' && typeof boolean == 'boolean')
                    this.flags[name] = boolean;
            },

            getPlatform: function(){
                return this.isApp()
                && 'platform' in this.plugin
                    ? this.plugin.platform.toLowerCase()
                    : unknown;
            },

            isApp: function(withoutPlugin){
                if(this.emulateDevice) {
                    cmLogger.warn('cmPhonegap.cmDevice.debug == true!!!');
                    this.plugin = {};
                }

                return this.emulateDevice || !this.emulateDevice && !withoutPlugin && this.existsPlugin() || !this.emulateDevice && withoutPlugin && $phonegapCameoConfig != 'undefined';
            },

            isDesktop: function(where){
                // emulate device
                if(this.emulateDevice)
                    return false;

                // setted by backend
                if('isDesktop' in this.flags)
                    return this.flags.isDesktop;

                // self detection
                var userAgent = this.getUserAgent(),
                    checkOne = userAgent.match(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od|ad)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/g),
                    checkTwo = userAgent.substr(0,4).match(/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/g);

                if(checkOne != null || checkTwo != null)
                    return false;
                return true;
            },

            isMobile: function(where){
                return !this.isDesktop(where+' isMobile');
            },

            is: function(deviceType){
                var acceptedTypes = {
                    'android': 'isAndroid',
                    'ios': 'isiOS',
                    'winphone': 'isWinPhone'
                };
                if(Object.keys(acceptedTypes).indexOf(deviceType) >= 0
                && acceptedTypes[deviceType] in self){
                    if(self[acceptedTypes[deviceType]]()){
                        return true;
                    }
                }
                return false;
            },

            isAndroid: function(){
                if(this.emulateDevice && this.emulateDeviceType.indexOf('android') >= 0){
                    return true;
                }
                return (this.isApp()
                    && this.getPlatform().indexOf('android') >= 0 )
                    || this.getUserAgent().indexOf('android') >= 0;
            },
            isiOS: function(){
                if(this.emulateDevice && this.emulateDeviceType.indexOf('ios') >= 0){
                    return true;
                }
                return (this.isApp()
                   && this.getPlatform().match(/ip(ad|hone|od)/g) )
                   || this.getUserAgent().match(/ip(ad|hone|od)/g);
            },
            isWinPhone: function(){
                if(this.emulateDevice && this.emulateDeviceType.indexOf('winphone') >= 0){
                    return true;
                }
                return (this.isApp()
                    && this.getPlatform().indexOf('iemobile') >= 0)
                    || this.getUserAgent().indexOf('iemobile') >= 0;
            },

            isIE: function(_version_){
                var msie = 'msie '
                //var version = parseInt(this.getUserAgent().substring(msieIndex + 5, this.getUserAgent().indexOf(".", msieIndex)));

                return (
                    this.isApp() && this.getPlatform().indexOf(msie) >= 0
                 || this.isApp() && !!this.getPlatform().match(/trident.*rv\:11\./)
                 || this.getUserAgent().indexOf(msie) >= 0
                 || !!this.getUserAgent().match(/trident.*rv\:11\./)
                );
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
                var nAgt = this.getUserAgent(),
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
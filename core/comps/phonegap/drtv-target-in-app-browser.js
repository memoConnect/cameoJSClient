'use strict';

//https://github.com/apache/cordova-plugin-inappbrowser/blob/8ce6b497fa803936784629187e9c66ebaddfbe1b/doc/index.md

angular.module('cmPhonegap')
.directive('target',[
    'cmDevice',
    '$window',
    function (cmDevice,
              $window){
        return {
            restrict: 'A',
            link: function(scope, element, attrs){
                if(!cmDevice.isApp()){
                    return false;
                }

                /*
                 target
                 _self: Opens in the Cordova WebView if the URL is in the white list, otherwise it opens in the InAppBrowser.
                 _blank: Opens in the InAppBrowser.
                 _system: Opens in the system's web browser.
                 */

                //

                if(attrs.target != ''){
                    element.on('click',function(event){
                        event.stopPropagation();
                        event.preventDefault();

                        //navigator.app.loadUrl(attrs.href, { openExternal:true });

                        var ref = $window.open(attrs.href, '_system', 'location=yes');

                        // loadstart loadstop loaderror exit
                        // ref.addEventListener(eventname, callback);
                        // ref.removeEventListener(eventname, callback);
                        // ref.close();
                        // ref.show();
                        // ref.executeScript(details, callback);
                        // ref.insertCSS(details, callback);
                    });
                }
            }
        }
    }
]);
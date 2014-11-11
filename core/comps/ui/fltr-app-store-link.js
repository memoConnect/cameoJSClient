'use strict';

angular.module('cmUi')
.filter('appStoreLink',
    function(cmDevice){
        return function(objectStoreLinks) {
            var filteredArray = [];

            if(typeof objectStoreLinks == 'object'){
                Object.keys(objectStoreLinks).forEach(function(store){
                    if(cmDevice.is(store) && objectStoreLinks[store].href != ''){
                        var storeData = objectStoreLinks[store];
                        // compile default to app link
                        if(cmDevice.isMobile('appStoreLink') && cmDevice.isAndroid()){
                            storeData.href.replace(/^https:\/\/market\.android\.com\//,"market://");
                        }
                        filteredArray.push(storeData);
                    }
                });
            }

            return filteredArray;
        }
    }
);
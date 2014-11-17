'use strict';

/**
 * @ngdoc object
 * @name cmSystemCheck
 * @description
 */
angular.module('cmCore').service('cmSystemCheck', [
    'cmUserModel',
    'cmObject',
    'cmApi',
    'cmVersion',
    'cmLanguage',
    'LocalStorageAdapter',
    'cmLogger',
    'cmDevice',
    '$rootScope',
    '$q',
    function(cmUserModel, cmObject, cmApi, cmVersion, cmLanguage,
             LocalStorageAdapter, cmLogger, cmDevice,
             $rootScope, $q){
        var self = this;

        cmObject.addEventHandlingTo(this);

        this.getBrowserInfo = function(){
            //cmLogger.debug('cmSystemCheck.getBrowserInfo');

            var deferred = $q.defer();

            cmApi.post({
                path: '/services/getBrowserInfo',
                data: {
                    version: cmVersion.version
                }
            }).then(
                function(data){
                    // without token
                    if(!cmUserModel.isAuth()){
                        var language = data.languageCode.substr(0,2),
                            lc       = language == 'de' ? 'de_DE' : 'en_US';
                        cmLanguage.switchLanguage(lc);
                    }
                    // flag handling
                    if('isDesktop' in data){
                        cmDevice.setFlag('isDesktop',data.isDesktop);
                    }
                    // version check
                    if('versionIsSupported' in data && data.versionIsSupported == false){
                        $rootScope.clientVersionCheck = false;
                    } else {
                        $rootScope.clientVersionCheck = true;
                    }

                    deferred.resolve();
                },
                function(){
                    deferred.reject();
                }
            );

            return deferred.promise;
        };

        /**
         * @param forceRedirect
         * @returns {boolean}
         */
        this.checkClientVersion = function(forceRedirect){
            //cmLogger.debug('cmSystemCheck.checkClientVersion');
            var deferred = $q.defer();
            if('clientVersionCheck' in $rootScope){
                if($rootScope.clientVersionCheck == false){
                    this.trigger('check:failed', {forceRedirect:forceRedirect});
                    deferred.reject();
                } else {
                    deferred.resolve();
                }
            } else {
                this.getBrowserInfo().then(
                    function(){
                        self.checkClientVersion(forceRedirect);
                    },
                    function(){
                        deferred.resolve();
                    }
                )
            }

            console.log()

            return deferred.promise;
        };

        this.checkLocalStorage = function(forceRedirect){
            var test = {key: 'cameoNet', value: 'cameoNet'};

            if (!LocalStorageAdapter.check()) {
                this.trigger('check:failed', {forceRedirect:forceRedirect});
                return false;
            } else {
                if (LocalStorageAdapter.save(test.key, test.value)) {
                    LocalStorageAdapter.remove(test.key);

                    return true;
                }

                this.trigger('check:failed', {forceRedirect:forceRedirect});
                return false;
            }
        };

        this.run = function(forceRedirect){
            this.checkClientVersion(forceRedirect);
            this.checkLocalStorage(forceRedirect);
        };

        this.on('check:failed', function(event, data){
            if(typeof data == 'object'){
                if('forceRedirect' in data && data.forceRedirect == true){
                    cmUserModel.doLogout(false);
                    $rootScope.goto('/systemcheck');
                }
            }
        });
    }
]);
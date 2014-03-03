define([
    'app',
    'cmAuth',
    'cmLogger'
], function (app) {
    'use strict';

    app.register.service('ModelUser',['cmAuth', '$q', '$rootScope', '$location',
    function(cmAuth, $q, $rootScope, $location){
        var self = this;

        var dataModel = {
            isActive: false,
            id: '',
            userKey: '',
            displayName: '',
            cameoId: 'loading...',
            email: {},
            phoneNumber: {},
            preferredMessageType: 'default',
            created: '',
            lastUpdated: '',
            userType: 'external'
        }

        /**
         * Init Object
         */
        function init(){
            if(self.isAuth() !== false){
//                loadIdentity();
            }
        }

        this.data = angular.extend({}, dataModel);

        this.isAuth = function(){
            if(cmAuth.getToken() != undefined && cmAuth.getToken() != 'undefined'){
                return true;
            }
            return false;
        };

        this.doLogin = function(user, pass){
            var deferred = $q.defer();

            cmAuth.requestToken(user, pass).then(
                function(token){
                    cmAuth.storeToken(token);
                    loadIdentity();
                    deferred.resolve();
                },
                function(state, response){
                    deferred.reject(state, response);
                }
            );

            return deferred.promise;
        };

        this.doLogout = function(){
            cmAuth.removeToken();
            $rootScope.$broadcast('logout');
            $location.path("/login");
        };

        function resetUser(){
            self.data = angular.extend({}, dataModel);
        }

        function loadIdentity(){
            cmAuth.getIdentity().then(
                function(data){
                    angular.extend(self.data, data);
                    self.data.isActive = true;
                }
            )
        }

        $rootScope.$on('logout', function(){
            resetUser();
        });

        init();
    }]);
});

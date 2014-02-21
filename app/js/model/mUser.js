define([
    'app',
    'cmApi',
    'cmLogger',
], function () {
    'use strict';

    var mUser = angular.module('mUser',[]);

    mUser.service('ModelUser', function(cmAuth, $q, $rootScope){
        var self = this;

        var dataModel = {
            isActive: false,
            id: '',
            userKey: '',
            displayName: '',
            cameoId: '',
            email: {},
            phoneNumber: {},
            preferredMessageType: 'default',
            created: '',
            lastUpdated: '',
            userType: 'external'
        }

        this.data = dataModel;

        this.isAuth = function(){
            if(this.data.isActive !== false && this.data.id !== ''){
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
                function(){
                    deferred.reject();
                }
            )

            return deferred.promise;
        };

        this.doLogout = function(){
            cmAuth.removeToken();
            $rootScope.$broadcast('logout');
        };

        function resetUser(){
            self.data = dataModel;
        };

        function loadIdentity(){
            cmAuth.getIdentity().then(
                function(data){
                    angular.extend(self.data, data);
                    self.data.isActive = true;
                }
            )
        };

        $rootScope.$on('logout', function(){
            resetUser();
        });
    });
});

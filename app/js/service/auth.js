'use strict';
define(['bootstrap/app', 'angular-resource'], function (app) {
    app.register.factory('Auth',
    function($http){
        return {
            getToken: function(auth){
                return $http({
                    method: 'GET'
                    ,url: cameo.restApi+'/token'
                    ,headers: {
                        'Authorization': 'Basic '+auth
                    }
                })
            }
        }
    })
});
'use strict';
app.factory('AuthService',
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
       ,createUser: function(data){
            return $http({
                method: 'POST'
               ,url: cameo.restApi+'/account'
               ,data: data
            })
        }
       ,checkAccountName: function(data){
            return $http({
                method: 'POST'
                ,url: cameo.restApi+'/account/check'
                ,data: data
            })
        }
    }
});
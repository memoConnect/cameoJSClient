'use strict';
app.factory('Auth',
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
            })
        }
    }
});
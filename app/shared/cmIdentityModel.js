/**
 * Created by Empujador on 17.03.14.
 */
'use strict';

angular.module('cmIdentity', ['cmAuth'])
.factory('cmIdentityModel',['cmAuth',function(cmAuth){
    var Identity = function(id){
        this.id = '';
        this.displayName = '';
        this.cameoId = '';
        this.userKey = '';
        this.email = [];
        this.phoneNumber = [];
        this.publicKeys = [];
        this.userType = 'external';
        this.created = '';
        this.lastUpdated = '';

        this.init = function(id){
            console.log(id);
        }

        this.init(id);
    }

    return Identity;
}])
.factory('cmIdentity',['$rootScope','cmIdentityModel', function($rootScope, cmIdentityModel){
    var instances = [];

    $rootScope.$on('logout', function(){
        instances = [];
    });

    return {
        /**
         * returns instances of cmIdentityModel
         * @param id
         * @returns {*}
         */
        create: function(id){
            var identity = null;
            if(typeof id !== 'undefined' && id != ''){

                if(instances.length > 0){
                    var i = 0;
                    while(i < instances.length){
                        if(typeof instances[i] === 'object' && instances[i].id == id){
                            identity = instances[i];
                            break;
                        }
                    }
                }

                if(identity === null){
                    identity = new cmIdentityModel(id);
                    instances.push(identity);
                }
            }

            return identity;
        },
        getQty: function(){
            return instances.length();
        }
    }
}]);
/**
 * Created by Empujador on 17.03.14.
 */
'use strict';

angular.module('cmIdentity', ['cmAuth'])
.factory('cmIdentityModel',['cmAuth', '$q',function(cmAuth, $q){
    var Identity = function(identity_data){
        var self = this;

        this.hasPubKey = function(){
            //
        }

        this.getDisplayName = function(){
            return this.cameoId || this.displayName || this.id;
        }

        /**
         * @param identity_data
         */
        this.init = function(identity_data){
            var deferred = $q.defer();

            if(typeof identity_data === 'object'){
                angular.extend(this, identity_data);
                deferred.resolve();
            } else if(typeof identity_data === 'string'){
                cmAuth.getIdentity(identity_data).then(
                    function(data){
                        angular.extend(self, data);
                        deferred.resolve();
                    }
                )
            } else {
                deferred.reject();
            }

            return deferred.promise;
        }

        this.init(identity_data);
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
         * returns instance of cmIdentityModel
         * @param data id or object
         * @returns {*}
         */
        create: function(data){
            var identity = null,
                i = 0;

            if(typeof data !== 'undefined'){
                if(this.getQty() > 0){
                    if(typeof data === 'string'){
                        while(i < instances.length){
                            if(typeof instances[i] === 'object' && instances[i].id == data){
                                identity = instances[i];
                                break;
                            }
                            i++;
                        }
                    } else if(typeof data === 'object'){
                        while(i < instances.length){
                            if(typeof instances[i] === 'object' && instances[i].id == data.id){
                                identity = instances[i];
                                break;
                            }
                            i++;
                        }
                    }
                }

                if(identity === null){
                    identity = new cmIdentityModel(data);
                    instances.push(identity);
                }
            }

            return identity;
        },
        getQty: function(){
            return instances.length;
        }
    }
}]);
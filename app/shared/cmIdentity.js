/**
 * Created by Empujador on 17.03.14.
 */
'use strict';

angular.module('cmIdentity', ['cmAuth'])
.factory('cmIdentityModel',['cmAuth',function(cmAuth){
    var Identity = function(identity_data){
        var self = this;

        /**
         * TODO future einbauen und promise returnen
         * @param identity_data
         */
        this.init = function(identity_data){
            if(typeof identity_data === 'object'){
                angular.extend(this, identity_data);
            } else if(typeof identity_data === 'string'){

            }

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
         * returns instances of cmIdentityModel
         * @param data id or object
         * @returns {*}
         */
        create: function(data){
            var identity = null,
                i = 0;

            if(typeof data !== 'undefined'){

                if(typeof data === 'String'){
                    if(instances.length > 0){
                        while(i < instances.length){
                            if(typeof instances[i] === 'object' && instances[i].id == id){
                                identity = instances[i];
                                break;
                            }
                            i++;
                        }
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

                if(identity === null){
                    identity = new cmIdentityModel(data);
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
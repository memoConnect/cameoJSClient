'use strict';

angular.module('cmCore').service('cmRootService', [
    '$rootScope',
    '$window',
    '$location',
    'cmLogger',
    'cmJob',

    function($rootScope, $window, $location, cmLogger, cmJob){

        $rootScope.goBack = function(){
            $window.history.back();
        };

        /**
         * @param path {string}
         * @param replace {boolean}
         */
        $rootScope.goTo = function(path, replace){
            cmLogger.debug('cmRootService.goTo ' + path);

            path = path[0] == '/' ? path : '/'+path;
            if(cmJob.isActive() !== false){
                cmJob.setPendingUrl(path, replace);
            } else {
                $location.path(path);

                //Todo: find foifferent solution:
                if(replace){
                    $location.replace();
                }
            }
        };

        /**
         * alias
         * @type {Function|$rootScope.goTo}
         */
        $rootScope.goto = $rootScope.goTo;

        $rootScope.gotoRegistration = function(){
            this.goTo('/registration')
        };

        $rootScope.createNewConversation = function(){
            delete $rootScope.pendingConversation;
            $rootScope.goTo('/conversation/new');
        };

        $rootScope.createNewIdentity = function(){
            $rootScope.goTo('/settings/identity/create');
        }

        $rootScope.gotoContactList = function(){
            $rootScope.goTo('/contact/list')
        }

        $rootScope.gotoPurl = function(purlId, subpath){
            $rootScope.goTo('/purl/'+purlId+'/'+subpath)
        }

        $rootScope.gotoConversation = function(conversationId, subpath){
            $rootScope.goTo('/conversation/'+(conversationId || 'new')+'/'+subpath)

        }
    }
]);
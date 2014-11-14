'use strict';

angular.module('cmCore').service('cmRootService', [
    '$rootScope', '$window', '$location',
    'cmLogger', 'cmJob', 'cmModal', 'cmConfig',
    function($rootScope, $window, $location,
             cmLogger, cmJob, cmModal, cmConfig){

        $rootScope.goBack = function(){
            $window.history.back();
        };

        /**
         * @param path {string}
         * @param replace {boolean}
         */
        $rootScope.goTo = function(path, replace){
            //cmLogger.debug('cmRootService.goTo ' + path);

            path = path[0] == '/' ? path : '/'+path;
            if(cmJob.isActive() !== false){
                cmJob.setPendingUrl(path, replace);
            } else {
                $location.path(path);

                //Todo: find different solution:
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
        };

        $rootScope.gotoContactList = function(){
            $rootScope.goTo('/contact/list')
        };

        $rootScope.gotoPurl = function(purlId, subpath){
            $rootScope.goTo('/purl/'+purlId+'/'+subpath)
        };

        $rootScope.gotoConversation = function(conversationId, subpath){
            $rootScope.goTo('/conversation/'+(conversationId || 'new')+ (subpath ? '/'+subpath : ''))
        };

        $rootScope.goToApp = function(params){
            window.location = cmConfig.appProtocol + '://?'+params;
        };

        /**
         * modal for login
         */
        $rootScope.showLogin = function (scopeVar) {
            cmModal.create({
                id: 'login',
                'class': 'with-title no-padding theme-b',
                'cm-close-btn': false,
                'cm-close-on-backdrop': false
            },'<div cm-login-modal></div>');
            cmModal.open('login');

            if(scopeVar)
                scopeVar = true;

            $rootScope.$on('cmLogin:success', function(){
                // TODO: schould that happen?
                location.reload();
            });
        };

        /**
         * modal for fast registration
         */
        $rootScope.openFastRegister = function(){
            cmModal.create({
                    id: 'fast-registration',
                    'class': 'webreader',
                    type: 'alert',
                    //nose: 'bottom-left',
                    'cm-close-btn': false,
                    'cm-footer-label': 'MODAL.WEBREADER.LATER',
                    'cm-footer-icon': 'cm-close'
                },
                '<div class="attention">' +
                '<i class="fa cm-attention"></i> {{\'MODAL.WEBREADER.NOTICE\'|cmTranslate}}' +
                '</div>'+
                '<a href="#/registration" class="classic-link" data-qa="btn-register-modal">' +
                '<i class="fa cm-key"></i> {{\'MODAL.WEBREADER.REGISTRATION\'|cmTranslate}}' +
                '</a>'
            );
            cmModal.open('fast-registration')
        };
    }
]);
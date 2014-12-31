'use strict';

var cmUtil;

describe('cmRootService ', function() {
    var cmRootService, $rootScope

    beforeEach(function(){
        module("cmCore")
        module(function($provide){
            $provide.constant('$route',{reload:function(){}});
        })
        module("cmConfig")
        inject(function (_cmRootService_, _$rootScope_) {
            cmRootService = _cmRootService_
            $rootScope = _$rootScope_
        })
    })

    describe('check service and $rootScope methods', function(){
        it('service should exists', function(){
            expect(cmRootService).toBeDefined()
        })

        it('should have "goTo" method', function(){
            expect($rootScope.goTo).toBeDefined()
        })

        it('should have "goto" method', function(){
            expect($rootScope.goto).toBeDefined()
        })

        it('should have "gotoRegistration" method', function(){
            expect($rootScope.gotoRegistration).toBeDefined()
        })

        it('should have "createNewConversation" method', function(){
            expect($rootScope.createNewConversation).toBeDefined()
        })

        it('should have "startConversationWithContact" method', function(){
            expect($rootScope.startConversationWithContact).toBeDefined()
        })

        it('should have "createNewIdentity" method', function(){
            expect($rootScope.createNewIdentity).toBeDefined()
        })

        it('should have "gotoContactList" method', function(){
            expect($rootScope.gotoContactList).toBeDefined()
        })

        it('should have "gotoContact" method', function(){
            expect($rootScope.gotoContact).toBeDefined()
        })

        it('should have "gotoPurl" method', function(){
            expect($rootScope.gotoPurl).toBeDefined()
        })

        it('should have "gotoConversation" method', function(){
            expect($rootScope.gotoConversation).toBeDefined()
        })

        it('should have "goToApp" method', function(){
            expect($rootScope.goToApp).toBeDefined()
        })

        it('should have "openExternalLink" method', function(){
            expect($rootScope.openExternalLink).toBeDefined()
        })

        it('should have "showLogin" method', function(){
            expect($rootScope.showLogin).toBeDefined()
        })

        it('should have "openFastRegister" method', function(){
            expect($rootScope.openFastRegister).toBeDefined()
        })

        it('should have "checkConversationRoute" method', function(){
            expect($rootScope.checkConversationRoute).toBeDefined()
        })

        it('should have "checkPurlRoute" method', function(){
            expect($rootScope.checkPurlRoute).toBeDefined()
        })
    })
})
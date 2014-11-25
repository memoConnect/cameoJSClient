'use strict';

describe('cmBrowserNotifications', function(){
    var cmBrowserNotifications, cmDevice, cmSettings, window, $rootScope

    function emulateEvent(target,eventName){
        var event = document.createEvent('HTMLEvents')
        event.initEvent(eventName, true, true)
        target.dispatchEvent(event)
    }

    beforeEach(function(){
        module('cmCore')
        module('cmConfig')
        inject(function (_cmBrowserNotifications_) {
            cmBrowserNotifications = _cmBrowserNotifications_
        })
    })

    describe('check service api', function(){
        it('should exists a "checkBrowser" method', function(){
            expect(typeof cmBrowserNotifications.checkBrowser).toBe('function')
        })

        it('should exists a "checkPermission" method', function(){
            expect(typeof cmBrowserNotifications.checkPermission).toBe('function')
        })

        it('should exists a "askPermission" method', function(){
            expect(typeof cmBrowserNotifications.askPermission).toBe('function')
        })

        it('should exists a "show" method', function(){
            expect(typeof cmBrowserNotifications.show).toBe('function')
        })

        it('should exists a "showFriendRequest" method', function(){
            expect(typeof cmBrowserNotifications.showFriendRequest).toBe('function')
        })

        it('should exists a "showNewMessage" method', function(){
            expect(typeof cmBrowserNotifications.showNewMessage).toBe('function')
        })
    })

    describe('check "checkBrowser" method', function(){

        beforeEach(function(){
            inject(function(_$window_, _cmDevice_){
               window = _$window_
               cmDevice = _cmDevice_
            })
        })

        it('should be return true, if device is not an App and Notification is in $window object', function(){
            // set Default
            if(!window.Notification){
                window.Notification = {};
            }

            spyOn(cmDevice, 'isApp').andReturn(false)

            expect(cmBrowserNotifications.checkBrowser()).toBe(true);
        })

        it('should be return false, if device is not an App and Notification is not in $window object', function(){
            // set Default
            if(window.Notification){
                delete window.Notification;
            }

            spyOn(cmDevice, 'isApp').andReturn(false)

            expect(cmBrowserNotifications.checkBrowser()).toBe(false);
        })

        it('should be return false, if device is an App and Notification is in $window object', function(){
            // set Default
            if(!window.Notification){
                window.Notification = {};
            }

            spyOn(cmDevice, 'isApp').andReturn(true)

            expect(cmBrowserNotifications.checkBrowser()).toBe(false);
        })
    })

    describe('check "checkPermission" method', function(){

        beforeEach(function(){
            inject(function(_$window_){
                window = _$window_
            })
        })

        describe('check positiv', function(){

            beforeEach(function(){
                if(!window.Notification){
                    window.Notification = {};
                }

                window.Notification.permission = "granted";
            })

            it('should be return true, if Notification.permission is "granted"', function(){
                expect(cmBrowserNotifications.checkPermission()).toBe(true);
            })
        })

        describe('check negativ', function(){

            beforeEach(function(){
                if(!window.Notification){
                    window.Notification = {};
                }

                window.Notification.permission = "moep";
            })

            it('should be return false, if Notification.permission is not "granted"', function () {
                expect(cmBrowserNotifications.checkPermission()).toBe(false);
            })
        })
    })

    /**
     * @TODO check mit Andreas
     */
    xdescribe('check "askPermission" method', function(){
        beforeEach(function(){
            inject(function(_cmSettings_, _$window_){
                cmSettings = _cmSettings_
                window = _$window_

                window.Notification.requestPermission = function(callback){
                    if(typeof callback == 'function'){
                        callback("granted")
                    }
                };
            })
        })

        it('should be set "browserNotifications" in cmSettings, if "Notification.requestPermission" gaves permission response', function(){
            spyOn(cmBrowserNotifications,'checkBrowser').andReturn(true)
            spyOn(cmBrowserNotifications,'checkPermission').andReturn(false)

            spyOn(cmSettings,'set')

            cmBrowserNotifications.askPermission() // wird nicht ausgeführt

            expect(cmSettings.set).toHaveBeenCalledWith('browserNotifications', true)
        })
    })

    describe('check "showFriendRequest" method', function() {

        var identity, cmUserModel, cmIdentityFactory

        beforeEach(function(){
            inject(function(_cmIdentityFactory_, _cmUserModel_, _$window_){
                cmIdentityFactory = _cmIdentityFactory_
                cmUserModel = _cmUserModel_
                window = _$window_

                identity = cmIdentityFactory.create({id:'moep'})
                cmUserModel.data.identity = cmIdentityFactory.create({id:'miep'})
            })
        })

        describe('should be call "show" method, if identities are different and tab/browser is inactive', function(){
            beforeEach(function(){
                emulateEvent(window,'blur')
            })

            it('should be call "show" method, if everything is right', function(){
                spyOn(cmBrowserNotifications,'show')

                cmBrowserNotifications.showFriendRequest(identity);

                expect(cmBrowserNotifications.show).toHaveBeenCalled()
            })
        })

        describe('should be not call "show" method, if identities are different and tab/browser is active', function(){
            beforeEach(function(){
                emulateEvent(window,'focus')
            })

            it('should be call "show" method, if everything is right', function(){
                spyOn(cmBrowserNotifications,'show')

                cmBrowserNotifications.showFriendRequest(identity);

                expect(cmBrowserNotifications.show).not.toHaveBeenCalled()
            })
        })

        describe('should be not call "show" method, if identities are the same and tab/browser is inactive', function(){
            beforeEach(function(){
                emulateEvent(window,'focus')

                identity = cmIdentityFactory.create({id:'moep'})
                cmUserModel.data.identity = cmIdentityFactory.create({id:'moep'})
            })

            it('should be call "show" method, if everything is right', function(){
                spyOn(cmBrowserNotifications,'show')

                cmBrowserNotifications.showFriendRequest(identity);

                expect(cmBrowserNotifications.show).not.toHaveBeenCalled()
            })
        })
    })

    describe('check "showNewMessage" method', function() {

        var identity, cmUserModel, cmIdentityFactory

        beforeEach(function(){
            inject(function(_cmIdentityFactory_, _cmUserModel_, _$window_, _$rootScope_){
                cmIdentityFactory = _cmIdentityFactory_
                cmUserModel = _cmUserModel_
                window = _$window_
                $rootScope = _$rootScope_

                identity = cmIdentityFactory.create({id:'moep'})
                cmUserModel.data.identity = cmIdentityFactory.create({id:'miep'})
            })
        })

        describe('check if identities are different and tab/browser is inactive', function(){
            beforeEach(function(){
                emulateEvent(window,'blur')

                $rootScope.checkConversationRoute = function(){
                    return true;
                }
            })

            it('should be call "show" method, if checkConversationRoute is true', function(){
                spyOn(cmBrowserNotifications,'show')

                cmBrowserNotifications.showNewMessage(identity,'moep');

                expect(cmBrowserNotifications.show).toHaveBeenCalled()
            })
        })

        describe('check if identities are different and tab/browser is inactive', function(){
            beforeEach(function(){
                emulateEvent(window,'blur')

                $rootScope.checkConversationRoute = function(){
                    return false;
                }
            })

            it('should be call "show" method, if checkConversationRoute is false', function(){
                spyOn(cmBrowserNotifications,'show')

                cmBrowserNotifications.showNewMessage(identity,'moep');

                expect(cmBrowserNotifications.show).toHaveBeenCalled()
            })
        })

        describe('check if identities are different and tab/browser is active', function(){
            beforeEach(function(){
                emulateEvent(window,'focus')

                $rootScope.checkConversationRoute = function(){
                    return true;
                }
            })

            it('should not be call "show" method, if checkConversationRoute is true', function(){
                spyOn(cmBrowserNotifications,'show')

                cmBrowserNotifications.showNewMessage(identity,'moep');

                expect(cmBrowserNotifications.show).not.toHaveBeenCalled()
            })
        })

        describe('check if identities are different and tab/browser is active', function(){
            beforeEach(function(){
                emulateEvent(window,'focus')

                $rootScope.checkConversationRoute = function(){
                    return false;
                }
            })

            it('should not be call "show" method, if checkConversationRoute is false', function(){
                spyOn(cmBrowserNotifications,'show')

                cmBrowserNotifications.showNewMessage(identity,'moep');

                expect(cmBrowserNotifications.show).toHaveBeenCalled()
            })
        })

        describe('check if identities are the same and tab/browser is inactive and checkConversationRoute is false', function(){
            beforeEach(function(){
                emulateEvent(window,'blur')

                $rootScope.checkConversationRoute = function(){
                    return false;
                }

                identity = cmIdentityFactory.create({id:'moep'})
                cmUserModel.data.identity = cmIdentityFactory.create({id:'moep'})
            })

            it('should be call "show" method, if checkConversationRoute is true', function(){
                spyOn(cmBrowserNotifications,'show')

                cmBrowserNotifications.showNewMessage(identity,'moep');

                expect(cmBrowserNotifications.show).not.toHaveBeenCalled()
            })
        })

        describe('check if identities are different and tab/browser is inactive and checkConversationRoute is false and conversationId is not a String', function(){
            beforeEach(function(){
                emulateEvent(window,'blur')

                $rootScope.checkConversationRoute = function(){
                    return false;
                }
            })

            it('should be not call "show" method, if conversationId is undefined', function(){
                spyOn(cmBrowserNotifications,'show')

                cmBrowserNotifications.showNewMessage(identity);

                expect(cmBrowserNotifications.show).not.toHaveBeenCalled()
            })

            it('should be not call "show" method, if conversationId is an Object', function(){
                spyOn(cmBrowserNotifications,'show')

                cmBrowserNotifications.showNewMessage(identity,{});

                expect(cmBrowserNotifications.show).not.toHaveBeenCalled()
            })

            it('should be not call "show" method, if conversationId is a Boolean', function(){
                spyOn(cmBrowserNotifications,'show')

                cmBrowserNotifications.showNewMessage(identity,true);

                expect(cmBrowserNotifications.show).not.toHaveBeenCalled()
            })
        })

    })
})
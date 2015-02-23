'use strict';

describe('cmHTML5Notifications', function(){
    var cmHTML5Notifications, cmDevice, cmSettings, window, $rootScope

    function emulateEvent(target,eventName){
        var event = document.createEvent('HTMLEvents')
        event.initEvent(eventName, true, true)
        target.dispatchEvent(event)
    }

    beforeEach(function(){
        module('cmCore')
        module('cmConfig')
        inject(function (_cmHTML5Notifications_) {
            cmHTML5Notifications = new _cmHTML5Notifications_()
        })
    })

    describe('check service api', function(){
        it('should exists a "checkBrowser" method', function(){
            expect(typeof cmHTML5Notifications.checkBrowser).toBe('function')
        })

        it('should exists a "checkPermission" method', function(){
            expect(typeof cmHTML5Notifications.checkPermission).toBe('function')
        })

        it('should exists a "askPermission" method', function(){
            expect(typeof cmHTML5Notifications.askPermission).toBe('function')
        })

        it('should exists a "show" method', function(){
            expect(typeof cmHTML5Notifications.show).toBe('function')
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

            expect(cmHTML5Notifications.checkBrowser()).toBe(true);
        })

        it('should be return false, if device is not an App and Notification is not in $window object', function(){
            // set Default
            if(window.Notification){
                delete window.Notification;
            }

            spyOn(cmDevice, 'isApp').andReturn(false)

            expect(cmHTML5Notifications.checkBrowser()).toBe(false);
        })

        it('should be return false, if device is an App and Notification is in $window object', function(){
            // set Default
            if(!window.Notification){
                window.Notification = {};
            }

            spyOn(cmDevice, 'isApp').andReturn(true)

            expect(cmHTML5Notifications.checkBrowser()).toBe(false);
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
                expect(cmHTML5Notifications.checkPermission()).toBe(true);
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
                expect(cmHTML5Notifications.checkPermission()).toBe(false);
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
            spyOn(cmHTML5Notifications,'checkBrowser').andReturn(true)
            spyOn(cmHTML5Notifications,'checkPermission').andReturn(false)

            spyOn(cmSettings,'set')

            cmHTML5Notifications.askPermission() // wird nicht ausgeführt

            expect(cmSettings.set).toHaveBeenCalledWith('browserNotifications', true)
        })
    })

    xdescribe('check "showFriendRequest" method', function() {

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
                spyOn(cmHTML5Notifications,'show')

                cmHTML5Notifications.showFriendRequest(identity);

                expect(cmHTML5Notifications.show).toHaveBeenCalled()
            })
        })

        describe('should be not call "show" method, if identities are different and tab/browser is active', function(){
            beforeEach(function(){
                emulateEvent(window,'focus')
            })

            it('should be call "show" method, if everything is right', function(){
                spyOn(cmHTML5Notifications,'show')

                cmHTML5Notifications.showFriendRequest(identity);

                expect(cmHTML5Notifications.show).not.toHaveBeenCalled()
            })
        })

        describe('should be not call "show" method, if identities are the same and tab/browser is inactive', function(){
            beforeEach(function(){
                emulateEvent(window,'focus')

                identity = cmIdentityFactory.create({id:'moep'})
                cmUserModel.data.identity = cmIdentityFactory.create({id:'moep'})
            })

            it('should be call "show" method, if everything is right', function(){
                spyOn(cmHTML5Notifications,'show')

                cmHTML5Notifications.showFriendRequest(identity);

                expect(cmHTML5Notifications.show).not.toHaveBeenCalled()
            })
        })
    })

    xdescribe('check "showNewMessage" method', function() {

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
                spyOn(cmHTML5Notifications,'show')

                cmHTML5Notifications.showNewMessage(identity,'moep');

                expect(cmHTML5Notifications.show).toHaveBeenCalled()
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
                spyOn(cmHTML5Notifications,'show')

                cmHTML5Notifications.showNewMessage(identity,'moep');

                expect(cmHTML5Notifications.show).toHaveBeenCalled()
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
                spyOn(cmHTML5Notifications,'show')

                cmHTML5Notifications.showNewMessage(identity,'moep');

                expect(cmHTML5Notifications.show).not.toHaveBeenCalled()
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
                spyOn(cmHTML5Notifications,'show')

                cmHTML5Notifications.showNewMessage(identity,'moep');

                expect(cmHTML5Notifications.show).toHaveBeenCalled()
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
                spyOn(cmHTML5Notifications,'show')

                cmHTML5Notifications.showNewMessage(identity,'moep');

                expect(cmHTML5Notifications.show).not.toHaveBeenCalled()
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
                spyOn(cmHTML5Notifications,'show')

                cmHTML5Notifications.showNewMessage(identity);

                expect(cmHTML5Notifications.show).not.toHaveBeenCalled()
            })

            it('should be not call "show" method, if conversationId is an Object', function(){
                spyOn(cmHTML5Notifications,'show')

                cmHTML5Notifications.showNewMessage(identity,{});

                expect(cmHTML5Notifications.show).not.toHaveBeenCalled()
            })

            it('should be not call "show" method, if conversationId is a Boolean', function(){
                spyOn(cmHTML5Notifications,'show')

                cmHTML5Notifications.showNewMessage(identity,true);

                expect(cmHTML5Notifications.show).not.toHaveBeenCalled()
            })
        })

    })
})
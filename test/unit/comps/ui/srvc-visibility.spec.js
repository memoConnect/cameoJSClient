describe('cmVisibility', function(){

    var cmVisibility, $rootScope, $window, $document = angular.element(document)

    function emulateEvent(target,eventName){
        var event = document.createEvent('HTMLEvents')
        event.initEvent(eventName, true, true)
        target.dispatchEvent(event)
        $rootScope.$apply()
    }

    describe('check service and document/browser didn\'t support api', function(){
        beforeEach(function(){
            module('cmUi')
            module(function($provide) {
                delete $document[0]['hidden']
                $provide.value('$document', $document)
            })
            inject(function(_cmVisibility_, _$rootScope_, _$window_){
                cmVisibility = _cmVisibility_
                $rootScope = _$rootScope_
                $window = _$window_
            })
        })

        it('callbacks array should empty', function(){
            expect(typeof cmVisibility.callbacks).toBe('object')
            expect(cmVisibility.callbacks.length).toEqual(0)
        })

        it('should provide a function "isTabEventAvailable" and should be false', function(){
            expect(typeof cmVisibility.isTabEventAvailable).toBe('function')
            expect(cmVisibility.isTabEventAvailable()).toBeFalsy()
        })

        it('should provide a function "add" to add a callback.', function(){
            expect(typeof cmVisibility.add).toBe('function')

            cmVisibility.add()
            cmVisibility.add(undefined)
            cmVisibility.add(null)
            cmVisibility.add('')

            expect(cmVisibility.callbacks.length).toEqual(0)

            cmVisibility.add('moep')
            cmVisibility.add('moep1')
            cmVisibility.add('moep2')

            expect(cmVisibility.callbacks.length).toEqual(3)
        })

        it('should provide a function "remove" to remove a callback.', function(){
            expect(typeof cmVisibility.remove).toBe('function')

            cmVisibility.add('moep')
            cmVisibility.add('moep1')
            cmVisibility.add('moep2')

            expect(cmVisibility.callbacks.length).toEqual(3)

            cmVisibility.remove('moep')
            cmVisibility.remove('moep1')
            cmVisibility.remove('moep2')

            expect(cmVisibility.callbacks.length).toEqual(0)
        })

        it('test tab event', function(){
            var callbackCalled = false;
            cmVisibility.add('moep',function(isHidden){
                callbackCalled = true;
            })

            emulateEvent($document[0],'visibilitychange')

            expect(callbackCalled).toBeFalsy()
        })

        it('test window event', function(){
            var isHidden = false;
            cmVisibility.add('moep',function(_isHidden_){
                isHidden = _isHidden_;
            })

            emulateEvent($window,'blur')

            expect(isHidden).toBeTruthy()

            emulateEvent($window,'focus')

            expect(isHidden).toBeFalsy()
        })
    })

    describe('check service and document/browser support api', function() {
        beforeEach(function(){
            module('cmUi')
            module(function($provide) {
                $document[0]['hidden'] = true
                $provide.value('$document', $document)
            })
            inject(function(_cmVisibility_, _$rootScope_){
                cmVisibility = _cmVisibility_
                $rootScope = _$rootScope_
            })
        })

        it('isTabEventAvailable should be true', function(){
            expect(cmVisibility.isTabEventAvailable()).toBeTruthy()
        })

        it('test tab event when browser supported', function(){
            var callbackCalled = false;
            cmVisibility.add('moep',function(isHidden){
                callbackCalled = true;
            })

            emulateEvent($document[0],'visibilitychange')

            expect(callbackCalled).toBeTruthy()
        })
    })
})
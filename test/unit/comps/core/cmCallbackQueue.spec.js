'use strict';

describe('cmCallbackQueue', function(){

    var cmCallbackQueue,
        $q,
        $rootScope,
        $timeout

    beforeEach(module('cmCore',[

        'cmCallbackQueueProvider',
        
        function(cmCallbackQueueProvider){
            cmCallbackQueueProvider
                .setQueueTime(10)
        }
    ]))

    beforeEach(inject(function(_cmCallbackQueue_, _$q_, _$rootScope_, _$timeout_){
        cmCallbackQueue     = _cmCallbackQueue_
        $q                  = _$q_
        $rootScope          = _$rootScope_
        $timeout            = _$timeout_
    }))

    it('should cue functions.', function(){
        var x, y, z,
            fnX = function(){ x = 1 },
            fnY = function(){ y = 2 },
            fnZ = function(){ z = 3 },
            all_resolved

            expect(cmCallbackQueue.state.is('working')).toBe(false)

            cmCallbackQueue.push([fnX, fnY, fnZ])
            .then(function(){
                all_resolved = true
            })

            expect(cmCallbackQueue.state.is('working')).toBe(true)

            $timeout.flush(5)
            expect(all_resolved).not.toBeDefined()
            expect(x).toBeUndefined()
            expect(y).toBeUndefined()
            expect(z).toBeUndefined()

            expect(cmCallbackQueue.state.is('working')).toBe(true)

            $timeout.flush(10)
            expect(all_resolved).not.toBeDefined()
            expect(x).toBe(1)
            expect(y).toBeUndefined()
            expect(z).toBeUndefined()

            expect(cmCallbackQueue.state.is('working')).toBe(true)

            $timeout.flush(10)
            expect(all_resolved).not.toBeDefined()
            expect(x).toBe(1)
            expect(y).toBe(2)
            expect(z).toBeUndefined()

            expect(cmCallbackQueue.state.is('working')).toBe(true)


            $timeout.flush(10)
            expect(all_resolved).toBeDefined()
            expect(x).toBe(1)
            expect(y).toBe(2)
            expect(z).toBe(3)

            expect(cmCallbackQueue.state.is('working')).toBe(false)

    })

})

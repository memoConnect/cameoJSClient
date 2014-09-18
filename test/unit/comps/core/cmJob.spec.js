'use strict';

describe('cmJob', function () {
    var cmJob, $location, $window, handlers

    beforeEach(function(){
        module(function($provide){
            $provide.constant('cmEnv',{});
        })
    })

    beforeEach(module('cmCore'))

    beforeEach(inject(function (_cmJob_, _$location_, _$window_) {
        cmJob = _cmJob_
        $location = _$location_
        $window = _$window_

        handlers = {
            'confirm': confirm,
            'locationReload': location.reload
        }

        spyOn(handlers, 'confirm').andReturn(true)
        spyOn(handlers, 'locationReload')
    }));

    it('should have these methods', function() {
        expect(cmJob.isActive).toBeDefined()
        expect(cmJob.start).toBeDefined()
        expect(cmJob.stop).toBeDefined()
    })

    it('start a job', function() {
        expect(cmJob.isActive()).toBeFalsy()

        cmJob.start('moep job start')

        expect(cmJob.isActive()).toBeTruthy()

        // TODO: find out for confirm and onbeforeunload dialog
//        $location.path('/moep')
//        expect(handlers.confirm).toHaveBeenCalled()

//        $location.reload()
//        expect(handlers.locationReload).toHaveBeenCalled()

        cmJob.stop()

        expect(cmJob.isActive()).toBeFalsy()
    })
})
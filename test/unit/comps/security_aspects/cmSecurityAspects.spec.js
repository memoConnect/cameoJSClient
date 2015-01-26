'use strict';

describe('cmSecurityAspects', function(){

    var security_aspects,
        $rootScope

    beforeEach(module('cmCore'))
    beforeEach(module('cmSecurityAspects'))
    beforeEach(inject(function(_cmSecurityAspects_, _$rootScope_){
        security_aspects    = new _cmSecurityAspects_()
        $rootScope          = _$rootScope_
    }))

    it('should provide a factory to handle security aspects', function(){
        var test_object = {
                my_attribute: 15,
                my_method: function(){ return 'hello world' }
            }

        // add aspects
        security_aspects
        .setTarget(test_object)
        .addAspect({
            id:             'SA1',
            value:          1,
            check:          function(target){
                                return target.my_attribute == 15
                            }
        })
        .addAspect({
            id:             'SA2',
            value:          -1,
            check:          function(target){
                               return target.my_attribute > 3
                            }
        })
        .addAspect({
            id:             'SA3',
            value:          1,
            dependencies:   ['SA1'],
            check:          function(target){
                                return target.my_method() == 'ping'
                            }
        })
        .addAspect({
            id:             'SA4',
            value:          2,
            dependencies:   ['SA1', 'SA3'],
            check:          function(target){
                                return true
                            }
        })
        .addAspect({
            id:             'SA5',
            value:           -2,
            dependencies:   ['SA2'],
            check:          function(target){
                                return target.my_method().length > 0
                            }
        })
        .addAspect({
            id:             'SA6',
            value:          0,
            dependencies:   ['SA5'],
            check:          function(target){
                                return target.my_attribute == 4
                            }
        })

        var applying    = undefined,
            positives   = undefined,
            negatives   = undefined,
            neutrals    = undefined,
            nonapplying = undefined

        security_aspects.refresh()
        .then(function(){
            applying    = security_aspects.applyingAspects,
            positives   = security_aspects.getPositiveAspects(),
            negatives   = security_aspects.getNegativeAspects(),
            neutrals    = security_aspects.getNeutralAspects(),
            nonapplying = security_aspects.getNonApplyingAspects()
        })

        $rootScope.$apply()

        expect(applying.length).toBe(3)     //SA1, SA2, SA5
        expect(positives.length).toBe(1)    //SA1
        expect(negatives.length).toBe(2)    //SA2, SA5
        expect(neutrals.length).toBe(0)     //
        expect(nonapplying.length).toBe(3)  //SA3, SA4, SA6

        // change method
        test_object.my_method = function() { return 'ping' }

        security_aspects.refresh()
        .then(function(){
            applying    = security_aspects.getApplyingAspects(),
            positives   = security_aspects.getPositiveAspects(),
            negatives   = security_aspects.getNegativeAspects(),
            neutrals    = security_aspects.getNeutralAspects(),
            nonapplying = security_aspects.getNonApplyingAspects()
        })

        $rootScope.$apply()

        expect(applying.length).toBe(5)     //SA1, SA2, SA3, SA4, SA5
        expect(positives.length).toBe(3)    //SA1, SA3, SA4
        expect(negatives.length).toBe(2)    //SA2, SA5
        expect(neutrals.length).toBe(0)     //
        expect(nonapplying.length).toBe(1)  //SA6

        // change value
        test_object.my_attribute = 4

        security_aspects.refresh()
        .then(function(){
            applying    = security_aspects.getApplyingAspects(),
            positives   = security_aspects.getPositiveAspects(),
            negatives   = security_aspects.getNegativeAspects(),
            neutrals    = security_aspects.getNeutralAspects(),
            nonapplying = security_aspects.getNonApplyingAspects()
        })

        $rootScope.$apply()

        expect(applying.length).toBe(3)     //SA2, SA5, SA6
        expect(positives.length).toBe(0)    //
        expect(negatives.length).toBe(2)    //SA2, SA5
        expect(neutrals.length).toBe(1)     //SA6
        expect(nonapplying.length).toBe(3)  //SA1, SA2, SA3
    })
})
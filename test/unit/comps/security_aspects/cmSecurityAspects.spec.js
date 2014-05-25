'use strict';

describe('cmSecurityAspects', function(){

    var security_aspects

    beforeEach(module('cmSecurityAspects'))
    beforeEach(inject(function(_cmSecurityAspects_){
        security_aspects = new _cmSecurityAspects_()
    }))

    it('should provide a factory to handle security aspects', function(){
        var test_object = {
            my_attribute: 15,
            my_method: function(){ return 'hello world' }
        }

        console.log(security_aspects)

        security_aspects
        .setTarget(test_object)
        .addAspect({
            id:             'SA1',
            value:          1,
            check:          function(target){
                                console.log(target)
                                return target.my_attribute == 15
                            }
        })
        .addAspect({
            id:             'SA2',
            value:          -1,
            check:          function(target){
                               return target.my_attribute == 4
                            }
        })
        .addAspect({
            id:             'SA3',
            value:          1,
            dependencies:   ['SA1'],
            check:          function(target){
                                return typeof target.my_method == 'function'
                            }
        })
        .addAspect({
            id:             'SA4',
            value:          2,
            dependencies:   ['SA1', 'SA2'],
            check:          function(target){
                                return true
                            }
        })
        .addAspect({
            id:             'SA5',
            value:           4,
            dependencies:   ['SA1'],
            check:          function(target){
                                return target.my_method > 3
                            }
        })
        .addAspect({
            id:             'SA6',
            value:          -2,
            check:          function(target){
                                return target.my_method.length > 0
                            }
        })

        var applying  = security_aspects.getApplyingAspects(),
            positives = security_aspects.getPositiveAspects(),
            negatives = security_aspects.getNegativeAspects(),
            neutrals  = security_aspects.getNeutralAspects()

        expect(applying.length).toBe(4) //SA1, SA3, SA5, SA6
    })    
})
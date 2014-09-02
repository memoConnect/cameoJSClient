'use strict';

describe('cmFactory', function(){

    var factory


    function TestModel(data){
        this.data = data
        this.id = data.id
    }

    beforeEach(module('cmPhonegap'))
    beforeEach(module('cmCore'))
    beforeEach(inject(function(_cmFactory_){
        factory = new _cmFactory_(TestModel)
    }))

    it('should provide a function to create new instances of assigned model or retrieve an existing one.', function(){

        var instance_count  = 0

        factory.on('register', function(instance){ instance_count++ })

        var instance        = factory.create({id: 'my_id'})           
        
        expect(instance instanceof TestModel).toBe(true)
        expect(instance.id).toBe('my_id')
        expect(factory.length).toBe(1)
        expect(instance_count).toBe(1)

        var instance2       = factory.create({id: 'my_id'})

        expect(instance).toBe(instance2)
        expect(instance2.id).toBe('my_id')
        expect(factory.length).toBe(1)
        expect(instance_count).toBe(1)

    })

})

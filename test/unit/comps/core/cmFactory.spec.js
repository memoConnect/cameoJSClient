'use strict';

describe('cmFactory', function(){

    var factory


    function TestModel(data){
        this.data = data
        this.id = data.id
    }

    beforeEach(module('cmCore'))
    beforeEach(inject(function(_cmFactory_){
        factory = new _cmFactory_(TestModel)
    }))

    it('should handle creation and retrieval of model instances', function(){

        var instance_count  = 0

        factory.on('register', function(instance){ instance_count++ })

        var instance        = factory.create({id: 'my_id'})           
        
        expect(instance instanceof TestModel).toBe(true)
        expect(instance.id).toBe('my_id')
        expect(factory.length).toBe(1)
        expect(instance_count).toBe(1)

        var instance2       = factory.create({id: 'my_id'}),
            instance3       = factory.create('my_id')

        expect(instance).toBe(instance2)
        expect(instance).toBe(instance3)
        expect(instance2.id).toBe('my_id')
        expect(factory.length).toBe(1)
        expect(instance_count).toBe(1)

        factory.reset()

        expect(factory.length).toBe(0)
    })

})

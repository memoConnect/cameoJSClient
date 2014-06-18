'use strict';

describe('cmFactory', function(){

    var factory, instance_count


    function TestModel(data){
        this.data = data
        this.id = data.id
    }

    beforeEach(module('cmCore'))
    beforeEach(inject(function(_cmFactory_){
        factory = new _cmFactory_(TestModel)
        instance_count  = 0
    }))

    describe('.new()', function(){
         it('should create and add new instances and trigger register event even if doublicates exist.', function(){

            factory.on('register', function(instance){ instance_count++ })

            var instance        = factory.new({id: 'my_id'})           
            
            expect(instance instanceof TestModel).toBe(true)
            expect(instance.id).toBe('my_id')
            expect(factory.length).toBe(1)
            expect(instance_count).toBe(1)

            var instance2       = factory.new({id: 'my_id'})  

            expect(instance2 instanceof TestModel).toBe(true)
            expect(instance2.id).toBe('my_id')
            expect(factory.length).toBe(2)
            expect(instance_count).toBe(2) 

        })

        it('should be return an instance but not add to factory, that count will be 0', function(){
            var instance        = factory.new({id: 'my_id'}, true)

            expect(instance instanceof TestModel).toBe(true)
            expect(factory.length).toBe(0)
        })
    })

    describe('.create()', function(){

        it('should create and add new instances only if no dublicates are present.', function(){

            var instance_count  = 0

            factory.on('register', function(instance){ instance_count++ })

            var instance        = factory.create({id: 'my_id'})           
            
            expect(instance instanceof TestModel).toBe(true)
            expect(instance.id).toBe('my_id')
            expect(factory.length).toBe(1)
            expect(instance_count).toBe(1)

            var instance2       = factory.create({id: 'my_second_id'})  

            expect(instance2 instanceof TestModel).toBe(true)
            expect(instance2.id).toBe('my_second_id')
            expect(factory.length).toBe(2)
            expect(instance_count).toBe(2) 

        })

        it('should create and add new instances or retrieve an instance if dublicate exists.', function(){

            var instance_count  = 0

            factory.on('register', function(instance){ instance_count++ })

            var instance        = factory.create({id: 'my_id'}),
                instance2       = factory.create({id: 'my_id'}),
                instance3       = factory.create('my_id')

            expect(instance2).toBe(instance)
            expect(instance3).toBe(instance)
            expect(instance2.id).toBe('my_id')
            expect(factory.length).toBe(1)
            expect(instance_count).toBe(1)
        })

    })

    describe('.find()', function(){

        it('should find instances by id and return null if unsuccessfull.', function(){
            var instance        = factory.create({id: 'my_id'}),
                instance2       = factory.create({id: 'my_second id'})

            expect(factory.find('my_id')).toBe(instance)
            expect(factory.find('xxx')).toBe(null)
        })

    })

    describe('.register()', function(){

        it('should add an instance if not yet present and trigger a register event.', function(){

            var instance_count  = 0

            factory.on('register', function(instance){ instance_count++ })

            var instance = new TestModel({id: 'my_id'})

            factory.register( instance ) 
            expect(instance_count).toBe(1)
            expect(factory.length).toBe(1)

            factory.register( instance ) 
            expect(instance_count).toBe(1)
            expect(factory.length).toBe(1)
        })

        it('should not add alien instances.', function(){

            var instance_count  = 0

            factory.on('register', function(instance){ instance_count++ })

            var instance = '123'

            factory.register( instance ) 

            expect(instance_count).toBe(0)
            expect(factory.length).toBe(0)
        })

    })

    describe('.deregister()', function(){
        it('should remove a given instance from factory', function(){

            var instance_count  = 0

            factory.on('register', function(instance){ instance_count++ })
            factory.on('unregistered', function(instance){ instance_count-- })

            var instance = new TestModel({id: 'my_id'})

            factory.register( instance )
            expect(instance_count).toBe(1)
            expect(factory.length).toBe(1)

            factory.deregister( instance )
            expect(instance_count).toBe(0)
            expect(factory.length).toBe(0)

        });
    })

    describe('.reset()', function(){

        it('should remove all instances.', function(){

            var instance_count  = 0

            factory.on('register', function(instance){ instance_count++ })

            var instance        = factory.create({id: 'my_id'}),
                instance2       = factory.create({id: 'my_second_id'})  

            expect(factory.length).toBe(2)
            expect(instance_count).toBe(2)

            factory.reset()

            expect(factory.length).toBe(0)
            expect(instance_count).toBe(2)
        })

    })



})

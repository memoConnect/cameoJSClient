define([
    'angular-mocks',
    'cmLocalStorage'
], function (){
    'use strict';

    describe('LocalStorageAdapter', function(){
        var LocalStorageAdapter;

        beforeEach(module('cmLocalStorage'))

        beforeEach(inject(function(_LocalStorageAdapter_){
            LocalStorageAdapter = _LocalStorageAdapter_
        }))

        it('should exists', function(){
            expect(LocalStorageAdapter).toBeDefined()
        })

        it('should have check function', function(){
            expect(LocalStorageAdapter.check).toBeDefined()
        })

        it('should have get function', function(){
            expect(LocalStorageAdapter.get).toBeDefined()
        })

        it('should have getAllKeys function', function(){
            expect(LocalStorageAdapter.getAllKeys).toBeDefined()
        })

        it('should have save function', function(){
            expect(LocalStorageAdapter.save).toBeDefined()
        })

        it('should have remove function', function(){
            expect(LocalStorageAdapter.remove).toBeDefined()
        })

        it('should have clearAll function', function(){
            expect(LocalStorageAdapter.clearAll).toBeDefined()
        })
    });

    describe('LocalStorageService', function(){
        var LocalStorageService;

        function createService(){
            return new LocalStorageService;
        }

        beforeEach(module('cmLocalStorage'))

        beforeEach(inject(function(_LocalStorageService_){
            LocalStorageService = _LocalStorageService_
        }))

        it('should exists', function(){
            expect(LocalStorageService).toBeDefined()
        })

        it('should have setInstanceId function', function(){
            var srvc = createService();
            expect(srvc.setInstanceId).toBeDefined()
        })

        it('should have check function', function(){
            var srvc = createService();
            expect(srvc.check).toBeDefined()
        })

        it('should have get function', function(){
            var srvc = createService();
            expect(srvc.get).toBeDefined()
        })

        it('should have getAllKeys function', function(){
            var srvc = createService();
            expect(srvc.getAllKeys).toBeDefined()
        })

        it('should have save function', function(){
            var srvc = createService();
            expect(srvc.save).toBeDefined()
        })

        it('should have remove function', function(){
            var srvc = createService();
            expect(srvc.remove).toBeDefined()
        })

        it('should have clearAll function', function(){
            var srvc = createService();
            expect(srvc.clearAll).toBeDefined()
        })
    });

    describe('cmLocalStorage', function(){
        var cmLocalStorage, LocalStorageService;

        beforeEach(module('cmLocalStorage'))

        beforeEach(inject(function(_cmLocalStorage_, _LocalStorageService_){
            cmLocalStorage = _cmLocalStorage_
            LocalStorageService = _LocalStorageService_;
        }))

        it('should exists', function(){
            expect(cmLocalStorage).toBeDefined()
        })

        it('should have get function', function(){
            expect(cmLocalStorage.create).toBeDefined()
        })

        describe('Instance of LocalStorageService', function(){
            it('should be one instance after create/get one', function(){
                var tmpInstanceId = 'moep';
                var instance = cmLocalStorage.create(tmpInstanceId);
                expect(typeof instance).toBe('object');
                expect(instance.instanceId).toBe(tmpInstanceId);
            })
        })
    });
})
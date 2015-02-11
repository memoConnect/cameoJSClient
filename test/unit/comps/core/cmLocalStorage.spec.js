'use strict';

describe('cmLocalStorageAdapter', function(){
    var cmLocalStorageAdapter;

    beforeEach(module('cmCore'))

    beforeEach(inject(function(_cmLocalStorageAdapter_){
        cmLocalStorageAdapter = _cmLocalStorageAdapter_
    }))

    it('should exists', function(){
        expect(cmLocalStorageAdapter).toBeDefined()
    })

    it('should have check function', function(){
        expect(cmLocalStorageAdapter.check).toBeDefined()
    })

    it('should have get function', function(){
        expect(cmLocalStorageAdapter.get).toBeDefined()
    })

    it('should have getAllKeys function', function(){
        expect(cmLocalStorageAdapter.getAllKeys).toBeDefined()
    })

    it('should have save function', function(){
        expect(cmLocalStorageAdapter.save).toBeDefined()
    })

    it('should have remove function', function(){
        expect(cmLocalStorageAdapter.remove).toBeDefined()
    })

    it('should have clearAll function', function(){
        expect(cmLocalStorageAdapter.clearAll).toBeDefined()
    })
});

describe('cmLocalStorageService', function(){
    var cmLocalStorageService;

    function createService(){
        return new cmLocalStorageService;
    }

    beforeEach(module('cmCore'))

    beforeEach(inject(function(_cmLocalStorageService_){
        cmLocalStorageService = _cmLocalStorageService_
    }))

    it('should exists', function(){
        expect(cmLocalStorageService).toBeDefined()
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
    var cmLocalStorage, cmLocalStorageService;

    beforeEach(module('cmCore'))

    beforeEach(inject(function(_cmLocalStorage_, _cmLocalStorageService_){
        cmLocalStorage = _cmLocalStorage_
        cmLocalStorageService = _cmLocalStorageService_;
    }))

    it('should exists', function(){
        expect(cmLocalStorage).toBeDefined()
    })

    it('should have create function', function(){
        expect(cmLocalStorage.create).toBeDefined()
    })

    it('should have getQty function', function(){
        expect(cmLocalStorage.getQty).toBeDefined()
    })


    describe('create Instance(s) of cmLocalStorageService', function(){
        var tmpInstanceId_1 = 'moep';
        var tmpInstanceKey_1 = 'moep123';
        var tmpInstanceId_2 = 'blub';
        var tmpInstanceKey_2 = 'moep456';

        it('should be null, if create an instance without id and key', function(){
            var instance = cmLocalStorage.create();
            expect(instance).toBe(null);
        })

        it('should be null, if create an instance with id and without key', function(){
            var instance = cmLocalStorage.create('moep');
            expect(instance).toBe(null);
        })

        it('there should be one instance after create one', function(){
            var instance = cmLocalStorage.create(tmpInstanceId_1,tmpInstanceKey_1);
            expect(cmLocalStorage.getQty()).toBe(1);
        })

        it('there should be two instances after create two', function(){
            var instance1 = cmLocalStorage.create(tmpInstanceId_1,tmpInstanceKey_1);
            var instance2 = cmLocalStorage.create(tmpInstanceId_2,tmpInstanceKey_2);
            expect(cmLocalStorage.getQty()).toBe(2);
        })

        it('there should be two instances after create two and create one of them twice', function(){
            var instance1 = cmLocalStorage.create(tmpInstanceId_1,tmpInstanceKey_1);
            var instance2 = cmLocalStorage.create(tmpInstanceId_2,tmpInstanceKey_2);
            expect(cmLocalStorage.getQty()).toBe(2);

            var instance3 = cmLocalStorage.create(tmpInstanceId_1,tmpInstanceKey_1);
            expect(cmLocalStorage.getQty()).toBe(2);
        })
    })
});

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
        expect(srvc.setInstanceVars).toBeDefined()
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

    describe('create Instance(s) of LocalStorageService', function(){
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
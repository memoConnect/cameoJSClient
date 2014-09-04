'use strict';

describe('cmFileModel', function() {
    var cmFileModel

    beforeEach(function(){
        module(function($provide){
            $provide.constant('cmEnv',{})
        })
    })
    beforeEach(module('cmPhonegap'))
    beforeEach(module('cmCore'))
    beforeEach(inject(function (_cmFileModel_) {
        cmFileModel = new _cmFileModel_()
    }))

    it('should exists', function () {
        expect(cmFileModel).toBeDefined()
    })

    describe('public api', function(){
        it('should have methods', function () {
            expect(cmFileModel.setPassphrase).toBeDefined()
            expect(cmFileModel.setState).toBeDefined()
            expect(cmFileModel.importBlob).toBeDefined()
            expect(cmFileModel.importFile).toBeDefined()
            expect(cmFileModel.chopIntoChunks).toBeDefined()

            expect(cmFileModel.encryptName).toBeDefined()
            expect(cmFileModel.decryptName).toBeDefined()

            expect(cmFileModel._encryptChunk).toBeDefined()
            expect(cmFileModel.encryptChunks).toBeDefined()

            expect(cmFileModel._decryptChunk).toBeDefined()
            expect(cmFileModel.decryptChunks).toBeDefined()
            expect(cmFileModel.decryptStart).toBeDefined()

            expect(cmFileModel.reassembleChunks).toBeDefined()

            expect(cmFileModel.prepareForUpload).toBeDefined()
            expect(cmFileModel._uploadChunk).toBeDefined()
            expect(cmFileModel.uploadChunks).toBeDefined()

            expect(cmFileModel._downloadChunk).toBeDefined()
            expect(cmFileModel.downloadChunks).toBeDefined()
            expect(cmFileModel.downloadStart).toBeDefined()

            expect(cmFileModel.promptSaveAs).toBeDefined()
            expect(cmFileModel.hasBlob).toBeDefined()
            expect(cmFileModel.clearBuffer).toBeDefined()

            expect(cmFileModel.init).toBeDefined()
        })
    })

    describe('passphrase', function(){
        it('should be undefined - because it is private', function(){
            expect(cmFileModel.passphrase).not.toBeDefined()
        })
    })

    describe('state', function(){
        it('should be defined and empty string', function(){
            expect(cmFileModel.state).toBeDefined()
            expect(cmFileModel.state).toBe('')
        })

        it('should be "new"', function(){
            cmFileModel.setState('new')
            expect(cmFileModel.state).toBe('new')
        })
    })

})
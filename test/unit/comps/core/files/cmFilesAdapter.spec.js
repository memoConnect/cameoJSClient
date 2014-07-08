'use strict';

describe('cmFilesAdapter', function(){
    var cmFilesAdapter, $httpBackend,
        apiUrl = 'my_rest_api'

    beforeEach(module('cmCore',[
        'cmApiProvider',
            function(cmApiProvider){
                cmApiProvider.restApiUrl(apiUrl)
            }
        ]));
    beforeEach(inject(function(_cmFilesAdapter_, _$httpBackend_){
        cmFilesAdapter = _cmFilesAdapter_
        $httpBackend = _$httpBackend_
    }))

    it('should exists', function(){
        expect(cmFilesAdapter).toBeDefined()
    })

    it('should have methods',function(){
        expect(cmFilesAdapter.prepareFile).toBeDefined()
        expect(cmFilesAdapter.addChunk).toBeDefined()
        expect(cmFilesAdapter.complete).toBeDefined()
        expect(cmFilesAdapter.getFile).toBeDefined()
        expect(cmFilesAdapter.getChunk).toBeDefined()
        expect(cmFilesAdapter.blobWrap).toBeDefined()
        expect(cmFilesAdapter.blobBuilderWrap).toBeDefined()
        expect(cmFilesAdapter.binaryToBlob).toBeDefined()
        expect(cmFilesAdapter.binaryToBlob).toBeDefined()
        expect(cmFilesAdapter.clearBase64).toBeDefined()
        expect(cmFilesAdapter.base64ToBinary).toBeDefined()
        expect(cmFilesAdapter.getBlobUrl).toBeDefined()
    })

    it('test method prepareFile',function(){
        $httpBackend.expect('POST', apiUrl+'/file').respond(200, {res:'OK',data:{'id':1}} )

        cmFilesAdapter.prepareFile({
            name:'',
            size:'',
            type:'',
            chunks:''
        }).then(
            function(fileId){
                expect(fileId).toBe(1)
            }
        )

        $httpBackend.flush()
    })

    it('test method addChunk',function(){
        $httpBackend.expect('POST', apiUrl+'/file/1').respond(200, {res:'OK'} )

        cmFilesAdapter.addChunk(1, 0, 'data:image/png,base64;123456789')

        $httpBackend.flush()
    })

    it('test method getFileInfo',function(){
        $httpBackend.expect('GET', apiUrl+'/file/1').respond(200, {res:'OK'} )

        cmFilesAdapter.getFileInfo(1)

        $httpBackend.flush()
    })

    it('test method getFile',function(){
        $httpBackend.expect('GET', apiUrl+'/file/1').respond(200, {res:'OK'} )

        cmFilesAdapter.getFile(1)

        $httpBackend.flush()
    })

    it('test method getFile',function(){
        $httpBackend.expect('GET', apiUrl+'/file/1/0').respond(200, {
            res:'OK',
            data: {
                chunk:'data:image/png,base64;123456789'
            }
        })

        cmFilesAdapter.getChunk(1, 0)

        $httpBackend.flush()
    })
})
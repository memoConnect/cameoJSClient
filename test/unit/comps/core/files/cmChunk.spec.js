'use strict';

//PhontomJS scheint File umd Blob nicht zu unterstützen :(

describe('A Chunk', function(){

    var chunk = undefined

    beforeEach(module('cmCore'))
    beforeEach(inject(function(_cmChunk_){
        chunk = new _cmChunk_()
    }))

    it('should have a method "importFileSlice" to import from Files.', function(){                
        //PhontomJS seems not to support File or Blob, so no more testing here =/        
        expect(typeof chunk.importFileSlice).toBe('function')
    })

    it('should have methods to convert blob to binaryString and vice versa.', function(){        

        //PhontomJS seems not to support File or Blob, so no more testing here =/

        expect(typeof chunk.binaryStringToBlob).toBe('function')
        expect(typeof chunk.blobToBinaryString).toBe('function')
    })

    it('should have methods to encrypt and decrypt binaryDataStrings.', function(){
        chunk.raw = 'abc'

        chunk.encrypt('123')

        expect(chunk.encryptedRaw).toBeDefined()
        expect(chunk.encryptedRaw).not.toEqual('abc')

        chunk.raw = undefined
        chunk.decrypt('123')

        expect(chunk.raw).toBeDefined()
        expect(chunk.raw).toEqual('abc')
    })

    it('should have method for up- and download.', function(){
        //actual up- and download capabilities are tested for filesAdapter elsewhere
        expect(typeof chunk.upload).toBe('function')
        expect(typeof chunk.download).toBe('function')
    })


})

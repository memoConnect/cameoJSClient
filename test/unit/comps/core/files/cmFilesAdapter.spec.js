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

    it('should exists',function(){
        expect(cmFilesAdapter).toBeDefined()
    })

    describe('test methods', function(){

        it('prepareFile',function(){
            expect(cmFilesAdapter.prepareFile).toBeDefined()

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

        it('addChunk',function(){
            expect(cmFilesAdapter.addChunk).toBeDefined()
            
            $httpBackend.expect('POST', apiUrl+'/file/1').respond(200, {res:'OK'} )

            cmFilesAdapter.addChunk(1, 0, 'data:image/png,base64;123456789')

            $httpBackend.flush()
        })

        describe('setFileComplete without messageID',function(){
            it('should be defined',function(){
                expect(cmFilesAdapter.setFileComplete).toBeDefined()
            })

            it('post without messageId',function(){
                $httpBackend.expect('POST', apiUrl+'/file/1/completed').respond(200, {res:'OK'} )

                cmFilesAdapter.setFileComplete(1)

                $httpBackend.flush()
            })

            it('post with messageId', function(){
                $httpBackend.expect('POST', apiUrl+'/file/1/completed').respond(200, {res:'OK'} )

                cmFilesAdapter.setFileComplete(1, 1337)

                $httpBackend.flush()
            })
        })

        it('getFile',function(){
            expect(cmFilesAdapter.getFile).toBeDefined()

            $httpBackend.expect('GET', apiUrl+'/file/1').respond(200, {res:'OK'} )

            cmFilesAdapter.getFile(1)

            $httpBackend.flush()
        })

        it('getChunk',function(){
            expect(cmFilesAdapter.getChunk).toBeDefined()

            $httpBackend.expect('GET', apiUrl+'/file/1/0').respond(200, {
                res:'OK',
                data: {
                    chunk:'data:image/png,base64;123456789'
                }
            })

            cmFilesAdapter.getChunk(1, 0)

            $httpBackend.flush()
        })

        it('blobWrap',function(){
            expect(cmFilesAdapter.blobWrap).toBeDefined()

        })

        it('blobBuilderWrap',function(){
            expect(cmFilesAdapter.blobBuilderWrap).toBeDefined()

        })

        it('binaryToBlob',function(){
            expect(cmFilesAdapter.binaryToBlob).toBeDefined()

        })

        it('clearBase64',function(){
            expect(cmFilesAdapter.clearBase64).toBeDefined()

            expect(cmFilesAdapter.clearBase64(undefined)).toBe('')
            expect(cmFilesAdapter.clearBase64(null)).toBe('')
            expect(cmFilesAdapter.clearBase64({})).toBe('')
            expect(cmFilesAdapter.clearBase64([])).toBe('')
            expect(cmFilesAdapter.clearBase64('')).toBe('')

            expect(cmFilesAdapter.clearBase64('data:;base64,1234')).toBe('1234')
            expect(cmFilesAdapter.clearBase64('data:image/png;base64,1234')).toBe('1234')
            expect(cmFilesAdapter.clearBase64('data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,1234')).toBe('1234')
        })

        it('base64ToBinary',function(){
            expect(cmFilesAdapter.base64ToBinary).toBeDefined()

            expect(cmFilesAdapter.base64ToBinary(undefined)).toBe('')
            expect(cmFilesAdapter.base64ToBinary(null)).toBe('')
            expect(cmFilesAdapter.base64ToBinary({})).toBe('')
            expect(cmFilesAdapter.base64ToBinary([])).toBe('')
            expect(cmFilesAdapter.base64ToBinary('')).toBe('')

            var base64 = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAoACgDASIAAhEBAxEB/8QAGQAAAwEBAQAAAAAAAAAAAAAAAAUHBggD/8QANRAAAAUCAgYHBwUAAAAAAAAAAAEDBAUCBhEUBxMjMTJRFSFBQ1JTYRckJTNCYnFygZLS8v/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwDqkLJebj4Voa8o7Qb08zMTu8NLUcyLL24RPnPYt3Jf2EtulCRX+ITr3XyGy2Pl6zg+2n9ACxr6XLYQ4jkf2bDSWzd8NcdOEa8pNbtSPiIcxyMXIsWTFw6ZajOfJBDLuEJpj0ZsJDX7EB18AILQmOm4ehy4pJJwRmi4S8KtPGABNtNFnNUWrOWjGlKVWv1TjDlX9YqreNbo11L5VtmFsMwrhx4AuCLpmoZ2wccKxYDIQF8kg+6Ju8ijJhLt7pcvGQD0uezIW77ioWcvjNdmREu3SPH/ACM3a2jSkr0eSztoTOKSWxaM/wAbjFX93R254butUT6/7gQkGZRFtPM5Lu91LNcupPnWAa6OFqXDy51kD2ByiuH8aABzZ0C2tu3Wkc2LAqCxM+dQAD4Jrgt6KuJqaEq0pXo9d4AAMj7JYDHDNyWo8rM9Q1du2xEW61JCKZ0o0em8AADwAAAP/9k='
            expect(cmFilesAdapter.base64ToBinary(base64)).toContain('ÿØÿà')
        })

        it('getBlobUrl',function(){
            expect(cmFilesAdapter.getBlobUrl).toBeDefined()

        })
    })
})
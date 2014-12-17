'use strict';

describe('cmFilesAdapter', function(){
    var cmFilesAdapter, $httpBackend, $rootScope,
        base64Mock = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAoACgDASIAAhEBAxEB/8QAGQAAAwEBAQAAAAAAAAAAAAAAAAUHBggD/8QANRAAAAUCAgYHBwUAAAAAAAAAAAEDBAUCBhEUBxMjMTJRFSFBQ1JTYRckJTNCYnFygZLS8v/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwDqkLJebj4Voa8o7Qb08zMTu8NLUcyLL24RPnPYt3Jf2EtulCRX+ITr3XyGy2Pl6zg+2n9ACxr6XLYQ4jkf2bDSWzd8NcdOEa8pNbtSPiIcxyMXIsWTFw6ZajOfJBDLuEJpj0ZsJDX7EB18AILQmOm4ehy4pJJwRmi4S8KtPGABNtNFnNUWrOWjGlKVWv1TjDlX9YqreNbo11L5VtmFsMwrhx4AuCLpmoZ2wccKxYDIQF8kg+6Ju8ijJhLt7pcvGQD0uezIW77ioWcvjNdmREu3SPH/ACM3a2jSkr0eSztoTOKSWxaM/wAbjFX93R254butUT6/7gQkGZRFtPM5Lu91LNcupPnWAa6OFqXDy51kD2ByiuH8aABzZ0C2tu3Wkc2LAqCxM+dQAD4Jrgt6KuJqaEq0pXo9d4AAMj7JYDHDNyWo8rM9Q1du2xEW61JCKZ0o0em8AADwAAAP/9k='

    beforeEach(module('cmConfig'))
    beforeEach(module('cmPhonegap'))
    beforeEach(module('cmCore',[
        'cmApiProvider',
            function(cmApiProvider){
                cmApiProvider.setWithoutApiUrl()
            }
        ]))
    beforeEach(inject(function(_cmFilesAdapter_, _$httpBackend_, _$rootScope_){
        cmFilesAdapter = _cmFilesAdapter_
        $httpBackend = _$httpBackend_
        $rootScope = _$rootScope_
    }))

    it('should exists',function(){
        expect(cmFilesAdapter).toBeDefined()
    })

    describe('test methods', function(){

        it('prepareFile',function(){
            expect(cmFilesAdapter.prepareFile).toBeDefined()

            $httpBackend.expect('POST', '/file').respond(200, {res:'OK',data:{'id':1}} )

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
            
            $httpBackend.expect('POST', '/file/1').respond(200, {res:'OK'} )

            cmFilesAdapter.addChunk(1, 0, 'data:image/png,base64;123456789')

            $httpBackend.flush()
        })

        describe('setFileComplete without messageID',function(){
            it('should be defined',function(){
                expect(cmFilesAdapter.setFileComplete).toBeDefined()
            })

            it('post without messageId',function(){
                $httpBackend.expect('POST', '/file/1/completed').respond(200, {res:'OK'} )

                cmFilesAdapter.setFileComplete(1)

                $httpBackend.flush()
            })

            it('post with messageId', function(){
                $httpBackend.expect('POST', '/file/1/completed').respond(200, {res:'OK'} )

                cmFilesAdapter.setFileComplete(1, 1337)

                $httpBackend.flush()
            })
        })

        it('getFile',function(){
            expect(cmFilesAdapter.getFile).toBeDefined()

            $httpBackend.expect('GET', '/file/1').respond(200, {res:'OK'} )

            cmFilesAdapter.getFile(1)

            $httpBackend.flush()
        })

        it('getChunk',function(){
            expect(cmFilesAdapter.getChunk).toBeDefined()

            $httpBackend.expect('GET', '/file/1/0').respond(200, {
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
            var binary = cmFilesAdapter.base64ToBinary(base64Mock)

            // negative tests
            expect(cmFilesAdapter.blobWrap()).toBeFalsy()
            expect(cmFilesAdapter.blobWrap(undefined)).toBeFalsy()
            expect(cmFilesAdapter.blobWrap(null)).toBeFalsy()
            expect(cmFilesAdapter.blobWrap(binary).size).toEqual(9)

            // positive tests
            // positive test with binaryToBlob
        })

        it('blobBuilderWrap',function(){
            expect(cmFilesAdapter.blobBuilderWrap).toBeDefined()

            expect(cmFilesAdapter.blobBuilderWrap()).toBeFalsy()
            // only true in old browser
            //expect(cmFilesAdapter.blobBuilderWrap() instanceof BlobBuilder).toBeTruthy()
        })

        it('binaryToBlob',function(){
            expect(cmFilesAdapter.binaryToBlob).toBeDefined()

            // negative tests
            expect(cmFilesAdapter.binaryToBlob()).toBeFalsy()
            expect(cmFilesAdapter.binaryToBlob(undefined)).toBeFalsy()
            expect(cmFilesAdapter.binaryToBlob(null)).toBeFalsy()
            expect(cmFilesAdapter.binaryToBlob({})).toBeFalsy()
            expect(cmFilesAdapter.binaryToBlob([])).toBeFalsy()
            expect(cmFilesAdapter.binaryToBlob('')).toBeFalsy()

            // positive tests
            var binary = cmFilesAdapter.base64ToBinary(base64Mock)
            expect(cmFilesAdapter.binaryToBlob(binary).size).toEqual(665)//instanceof Blob
            expect(cmFilesAdapter.binaryToBlob(binary, 'image/jpg').type).toBe('image/jpg')
        })

        it('base64ToBlob', function(){
            expect(cmFilesAdapter.base64ToBlob).toBeDefined()

            // negative tests
            expect(cmFilesAdapter.base64ToBlob()).toBeFalsy()
            expect(cmFilesAdapter.base64ToBlob(undefined)).toBeFalsy()
            expect(cmFilesAdapter.base64ToBlob(null)).toBeFalsy()
            expect(cmFilesAdapter.base64ToBlob({})).toBeFalsy()
            expect(cmFilesAdapter.base64ToBlob([])).toBeFalsy()
            expect(cmFilesAdapter.base64ToBlob('')).toBeFalsy()

            // positive tests
            var blob = cmFilesAdapter.base64ToBlob('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAIAAAACUFjqAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NDkxMSwgMjAxMy8xMC8yOS0xMTo0NzoxNiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpCRDhDNkFEOTM0NUExMUU0QUVEOUY4MkQwNUYzODE1OCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpCRDhDNkFEQTM0NUExMUU0QUVEOUY4MkQwNUYzODE1OCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkJEOEM2QUQ3MzQ1QTExRTRBRUQ5RjgyRDA1RjM4MTU4IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkJEOEM2QUQ4MzQ1QTExRTRBRUQ5RjgyRDA1RjM4MTU4Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+3cQoZgAAASBJREFUeNpEj81Kw0AUhWduZprYio21lISiFRFduHMhvoFb94JPoJv6COIb+CiuBAtdRHCjQqgVhEpVUOoPaWzSJvNzHSritzjcc87mHrocdD+FspBQoJT8IxEr3GL9iUCNc9yKc0GkJgUGpqRUSxULCRUL1ov2Zsk22Ua5aAPoXKJSvlNYmTq9780fNWrh9trJqp/FaX3WwShtLlb3PJe457fXcYpTUqVb7/Fx723r8t7Y5sMrWWh38I+rKDH6Ms6NjqTy2x1QWX769PH77ZLDBWLd4ebeuXlMkwlQxg7D/sHd81Aoz+bcrENyNhgGg4jM2BRaoVaKJFnVLe3Wymb6xdeo9z0mQIEz2gi6kVAUAHNJzHTTM0aYZWqXwY8AAwDiqZInt/8tsAAAAABJRU5ErkJggg==','image/png')
            expect(blob.size).toBe(1195)
            expect(blob.type).toBe('image/png')
        })

        it('check regexp', function(){
            expect(cmFilesAdapter.base64Regexp).toBeDefined()
//            expect(cmFilesAdapter.base64Regexp).toBe('^(data:(.{0,100});base64,|data:(.{0,100})base64,)(.*)$')
            expect(cmFilesAdapter.base64Regexp).toBe('^(data:(.*?);?base64,)(.*)$')
        })

        it('clearBase64',function(){
            expect(cmFilesAdapter.clearBase64).toBeDefined()

            // negative tests
            expect(cmFilesAdapter.clearBase64()).toBe('')
            expect(cmFilesAdapter.clearBase64(undefined)).toBe('')
            expect(cmFilesAdapter.clearBase64(null)).toBe('')
            expect(cmFilesAdapter.clearBase64({})).toBe('')
            expect(cmFilesAdapter.clearBase64([])).toBe('')
            expect(cmFilesAdapter.clearBase64('')).toBe('')

            // positive tests
            expect(cmFilesAdapter.clearBase64('data:base64,1234base64,')).toBe('1234base64,')
            expect(cmFilesAdapter.clearBase64('data:base64,1234;base64,')).toBe('1234;base64,')
            expect(cmFilesAdapter.clearBase64('data:;base64,1234base64,')).toBe('1234base64,')
            expect(cmFilesAdapter.clearBase64('data:;base64,1234;base64,')).toBe('1234;base64,')
            expect(cmFilesAdapter.clearBase64('data:base64,1234')).toBe('1234')
            expect(cmFilesAdapter.clearBase64('data:;base64,1234')).toBe('1234')
            expect(cmFilesAdapter.clearBase64('data:image/png;base64,1234')).toBe('1234')
            expect(cmFilesAdapter.clearBase64('data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,1234')).toBe('1234')
        })

        it('getMimeTypeOfBase64', function(){
            expect(cmFilesAdapter.getMimeTypeOfBase64).toBeDefined()

            // negative tests
            expect(cmFilesAdapter.getMimeTypeOfBase64()).toBe('')
            expect(cmFilesAdapter.getMimeTypeOfBase64(undefined)).toBe('')
            expect(cmFilesAdapter.getMimeTypeOfBase64(null)).toBe('')
            expect(cmFilesAdapter.getMimeTypeOfBase64({})).toBe('')
            expect(cmFilesAdapter.getMimeTypeOfBase64([])).toBe('')
            expect(cmFilesAdapter.getMimeTypeOfBase64('')).toBe('')

            // positive tests
            expect(cmFilesAdapter.getMimeTypeOfBase64('data:base64,1234base64,')).toBe('')
            expect(cmFilesAdapter.getMimeTypeOfBase64('data:base64,1234')).toBe('')
            expect(cmFilesAdapter.getMimeTypeOfBase64('data:;base64,1234')).toBe('')
            expect(cmFilesAdapter.getMimeTypeOfBase64('data:image/png;base64,1234')).toBe('image/png')
            expect(cmFilesAdapter.getMimeTypeOfBase64('data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,1234')).toBe('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
        })

        it('base64ToBinary',function(){
            expect(cmFilesAdapter.base64ToBinary).toBeDefined()

            // negative tests
            expect(cmFilesAdapter.base64ToBinary()).toBe('')
            expect(cmFilesAdapter.base64ToBinary(undefined)).toBe('')
            expect(cmFilesAdapter.base64ToBinary(null)).toBe('')
            expect(cmFilesAdapter.base64ToBinary({})).toBe('')
            expect(cmFilesAdapter.base64ToBinary([])).toBe('')
            expect(cmFilesAdapter.base64ToBinary('')).toBe('')

            // positive tests
            expect(cmFilesAdapter.base64ToBinary(base64Mock)).toContain('ÿØÿà')
        })

        it('getBlobUrl',function(){
            expect(cmFilesAdapter.getBlobUrl).toBeDefined()

            // negative tests

            // positive tests
            var loaded1 = false,
                loaded2 = false,
                binary = cmFilesAdapter.base64ToBinary(base64Mock),
                blob = cmFilesAdapter.binaryToBlob(binary, 'image/jpeg'),
                promise1 = cmFilesAdapter.getBlobUrl(blob),
                promise2 = cmFilesAdapter.getBlobUrl(blob, true)

            promise1.then(function(objUrl){
                loaded1 = true
                expect(objUrl.src).toBe(base64Mock)
                expect(objUrl.revoke()).toBeTruthy()
                expect(objUrl.src).toBe('')
            })

            promise2.then(function(objUrl){
                loaded2 = true
                expect(objUrl.src).toMatch('blob:.{0,30}.{8}-.{4}-.{4}-.{4}-.{12}')
                expect(objUrl.revoke()).toBeTruthy()
                expect(objUrl.src).toBe('')
            })

            waitsFor(function(){
                $rootScope.$apply()
                return loaded1 && loaded2
            })
        })
    })
})
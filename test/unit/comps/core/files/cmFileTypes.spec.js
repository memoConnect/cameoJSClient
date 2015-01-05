'use strict';

describe('cmFileTypes', function() {
    var cmFileTypes,
        blobExample = {
            webkitRelativePath: 'maybe path to file system',
            lastModifiedDate: 'browser date',
            name: 'filename.extension',
            type: 'mimeType',
            size: 'bytes'
        },
        unknown = 'unknown',
        files = [
            // beautiful jpg
            {
                blob: {
                    webkitRelativePath: '',
                    lastModifiedDate: '',
                    name: 'sexy-image.jpg',
                    type: 'image/jpeg',
                    size: 12
                },
                toBe: 'jpg'
            },
            // bad images
            {
                isBadMimeType: true,
                blob: {
                    name: 'image-with_bad-mimetype.jpg',
                    type: 'application/force-download',
                    size: 12
                },
                toBe: 'jpg',
                toBeMimeType: 'image/jpeg'
            },
            {
                blob: {
                    name: 'CAPSLOCK_IMAGE.JPG',
                    type: 'image/jpeg',
                    size: 12
                },
                toBe: 'jpg'
            },
            // bad names in images
            {
                blob: {
                    name: 'content',
                    size: 10983,
                    type: 'image/jpeg'
                },
                toBe: 'jpg'
            },
            {
                blob: {
                    name: 'content',
                    size: 285783,
                    type: 'image/png'
                },
                toBe: 'png'
            },
            // pdf
            {
                blob: {
                    name: 'beautiful-document.pdf',
                    type: 'application/pdf',
                    size: 12
                },
                toBe: 'pdf'
            },
            // bad pdf
            {
                isBadMimeType: true,
                blob: {
                    name: 'bad-document.pdf',
                    type: 'application/octet-stream',
                    size: 12
                },
                toBe: 'pdf',
                toBeMimeType: 'application/pdf'
            },
            // good
            {
                blob: {
                    name: 'good-prasi.pptx',
                    type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
                },
                toBe: 'pptx'
            },
            // bad pptx
            {
                isBadMimeType: true,
                blob: {
                    name: 'bad-prasentation.pptx',
                    type: ''
                },
                toBeMimeType: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
                toBe: 'pptx'
            }
        ]

    beforeEach(function(){
        module('cmCore')
        module('cmPhonegap')
        inject(function (_cmFileTypes_) {
            cmFileTypes = _cmFileTypes_
        })
    })

    it('should exists', function () {
        expect(cmFileTypes).toBeDefined()
    })

    describe('method find',function() {
        it('should exists', function () {
            expect(cmFileTypes.find).toBeDefined()
        })

        it('default (bad params) return unknown', function () {
            expect(cmFileTypes.find()).toBe(unknown)
            expect(cmFileTypes.find('')).toBe(unknown)
            expect(cmFileTypes.find([])).toBe(unknown)
            expect(cmFileTypes.find({})).toBe(unknown)
            expect(cmFileTypes.find('moep/moep')).toBe(unknown)
        })

        it('with given mime should find extension', function () {
            expect(cmFileTypes.find('image/png')).toBe('png')
            expect(cmFileTypes.find('image/gif')).toBe('gif')
            expect(cmFileTypes.find('audio/mp3')).toBe('mp3')
        })
    })

    describe('method findMimeType',function(){
        it('should exists', function () {
            expect(cmFileTypes.findMimeType).toBeDefined()
        })

        it('default (bad params) return unknown',function(){
            expect(cmFileTypes.findMimeType()).toBe(unknown)
            expect(cmFileTypes.findMimeType('')).toBe(unknown)
            expect(cmFileTypes.findMimeType([])).toBe(unknown)
            expect(cmFileTypes.findMimeType({})).toBe(unknown)
            expect(cmFileTypes.findMimeType('moep')).toBe(unknown)
        })

        it('with given extension find correct mime type', function(){
            expect(cmFileTypes.findMimeType('jpg')).toBe('image/jpeg')
            expect(cmFileTypes.findMimeType('jpe')).toBe('image/jpeg')
            expect(cmFileTypes.findMimeType('txt')).toBe('text/plain')
            expect(cmFileTypes.findMimeType('mp4')).toBe('video/mp4')
            expect(cmFileTypes.findMimeType('mov')).toBe('video/quicktime')
            expect(cmFileTypes.findMimeType('pdf')).toBe('application/pdf')
            expect(cmFileTypes.findMimeType('dmg')).toBe('application/x-apple-diskimage')
            expect(cmFileTypes.findMimeType('apk')).toBe('application/vnd.android.package-archive')
        })
    })

    describe('method getMimeTypeViaFilename',function() {
        it('should exists', function () {
            expect(cmFileTypes.getMimeTypeViaFilename).toBeDefined()
        })

        it('default return unknown', function(){
            var returnUnknown = { detectedExtension : unknown, mimeType : unknown }
            expect(cmFileTypes.getMimeTypeViaFilename()).toEqual(returnUnknown)
            expect(cmFileTypes.getMimeTypeViaFilename('')).toEqual(returnUnknown)
            expect(cmFileTypes.getMimeTypeViaFilename([])).toEqual(returnUnknown)
            expect(cmFileTypes.getMimeTypeViaFilename({})).toEqual(returnUnknown)
            expect(cmFileTypes.getMimeTypeViaFilename('moep')).toEqual(returnUnknown)
            // unexists file extension
            returnUnknown.detectedExtension = 'moep'
            expect(cmFileTypes.getMimeTypeViaFilename('moep.moep')).toEqual(returnUnknown)
        })

        it('return the correct extension', function(){
            expect(cmFileTypes.getMimeTypeViaFilename('image.jpg')).toEqual({ detectedExtension : 'jpg', mimeType : 'image/jpeg' })
            expect(cmFileTypes.getMimeTypeViaFilename('video.mp4')).toEqual({ detectedExtension : 'mp4', mimeType : 'video/mp4' })
            expect(cmFileTypes.getMimeTypeViaFilename('audio.mp3')).toEqual({ detectedExtension : 'mp3', mimeType : 'audio/mp3' })
            expect(cmFileTypes.getMimeTypeViaFilename('doc.pdf')).toEqual({ detectedExtension : 'pdf', mimeType : 'application/pdf' })
            expect(cmFileTypes.getMimeTypeViaFilename('app.apk')).toEqual({ detectedExtension : 'apk', mimeType : 'application/vnd.android.package-archive' })
        })
    })

    describe('method getExtension',function() {
        it('should exists', function () {
            expect(cmFileTypes.getExtension).toBeDefined()
        })

        it('without extensions return unknown', function () {
            expect(cmFileTypes.getExtension()).toBe(unknown)
            expect(cmFileTypes.getExtension('')).toBe(unknown)
            expect(cmFileTypes.getExtension([])).toBe(unknown)
            expect(cmFileTypes.getExtension({})).toBe(unknown)
        })

        it('with extensions return it', function () {
            expect(cmFileTypes.getExtension('jpg')).toBe('jpg')
            expect(cmFileTypes.getExtension('moep,moeper')).toBe('moep')
            expect(cmFileTypes.getExtension('moep,moeper', 'huhu.moeper')).toBe('moeper')
        })
    })

    describe('test files', function(){
    files.forEach(function(file){
        it(file.blob.name+' should get mimetype', function(){
            if('isBadMimeType' in file || 'isBadFileName' in file)
                expect(cmFileTypes.find(file.blob.type, file.blob.name)).toBe(unknown)
            else
                expect(cmFileTypes.find(file.blob.type, file.blob.name)).toBe(file.toBe)
        })
    })

    files.forEach(function(file){
        if('isBadMimeType' in file){
            it(file.blob.name+' detect over filename because of bad mimetype', function(){
                var obj = cmFileTypes.getMimeTypeViaFilename(file.blob.name)
                expect(obj.detectedExtension).toBe(file.toBe)
                expect(obj.mimeType).toBe(file.toBeMimeType)
            })
        }
    })
    })
})
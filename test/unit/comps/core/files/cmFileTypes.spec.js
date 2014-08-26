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
            // bad jpg's
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

    beforeEach(module('cmCore'))

    beforeEach(inject(function (_cmFileTypes_) {
        cmFileTypes = _cmFileTypes_
    }))

    it('should exists', function () {
        expect(cmFileTypes).toBeDefined()
    })

    it('should have method find', function () {
        expect(cmFileTypes.find).toBeDefined()
    })

    it('should have method findMimeType', function () {
        expect(cmFileTypes.findMimeType).toBeDefined()
    })

    it('should have method getMimeTypeViaFilename', function () {
        expect(cmFileTypes.getMimeTypeViaFilename).toBeDefined()
    })

    it('should have method getExtension', function () {
        expect(cmFileTypes.getExtension).toBeDefined()
    })

    describe('test files', function(){
    files.forEach(function(file){
        it(file.blob.name+' should get mimetype', function(){
            if('isBadMimeType' in file)
                expect(cmFileTypes.find(file.blob.type, file.blob.name)).toBe('unknown')
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
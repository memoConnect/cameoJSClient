describe('cmFileTypes', function(){
    var cmFileTypes
    beforeEach(module('cmUi'))
    beforeEach(inject(function (_cmFileTypes_) {
        cmFileTypes = _cmFileTypes_
    }))

    it('should provide a function "find"', function(){
        expect(typeof cmFileTypes.find).toBe('function')
    })

    it('without and wrong mime return unknown', function(){
        expect(cmFileTypes.find('')).toBe('unknown')
        expect(cmFileTypes.find()).toBe('unknown')
        expect(cmFileTypes.find('moep/moep')).toBe('unknown')
    })

    it('with given mime should find extension', function(){
        expect(cmFileTypes.find('image/png')).toBe('png')
        expect(cmFileTypes.find('image/gif')).toBe('gif')
        expect(cmFileTypes.find('audio/mp3')).toBe('mp3')
    })

    it('microsoft mimetypes would be detected', function(){
        expect(cmFileTypes.find('application/vnd.openxmlformats-officedocument.wordprocessingml.document')).toBe('docx')
        expect(cmFileTypes.find('application/vnd.openxmlformats-officedocument.wordprocessingml.document','moep.doc')).toBe('doc')
    })

    it('mime with more then one extension should orientate on filename', function(){
        expect(cmFileTypes.find('image/jpeg')).toBe('jpg')
        expect(cmFileTypes.find('image/jpeg','moep.jpeg')).toBe('jpeg')
        expect(cmFileTypes.find('image/jpeg','moep.jpe')).toBe('jpe')
    })

    it('should provide a function "getExtension"', function(){
        expect(typeof cmFileTypes.getExtension).toBe('function')
    })

    it('without extensions return unknown', function(){
        expect(cmFileTypes.getExtension()).toBe('unknown')
        expect(cmFileTypes.getExtension('')).toBe('unknown')
    })

    it('with extensions return it', function(){
        expect(cmFileTypes.getExtension('jpg')).toBe('jpg')
        expect(cmFileTypes.getExtension(['moep','moeper'])).toBe('moep')
        expect(cmFileTypes.getExtension(['moep','moeper'],'huhu.moeper')).toBe('moeper')
    })

})
'use strict';

describe('cmFileDownload', function(){
    var cmFileDownload,
        mockFile = {
            state: 'exists',
            callback: null,
            downloadChunks: function(){},
            trigger: function(){
                this.callback()
                this.callback = null
            },
            on: function(event, callback){
                this.callback = callback
            }
        }

    beforeEach(module('cmCore'));
    beforeEach(inject(function(_cmFileDownload_){
        cmFileDownload = _cmFileDownload_
    }))

    it('should exists', function(){
        expect(cmFileDownload).toBeDefined()
    })

    it('should have methods', function(){
        expect(cmFileDownload.add).toBeDefined()
        expect(cmFileDownload.run).toBeDefined()
        expect(cmFileDownload.stop).toBeDefined()
        expect(cmFileDownload.getQty).toBeDefined()
    })

    it('test add with run method',function(){
        cmFileDownload.add(mockFile);

        expect(cmFileDownload.atWork).toBeTruthy()

        mockFile.trigger()

        expect(cmFileDownload.atWork).toBeFalsy()
        expect(cmFileDownload.getQty()).toEqual(0)
    })

    // TODO: above test already tested run...
    xit('test run',function(){

    })

    xit('test stop',function(){

    })
})
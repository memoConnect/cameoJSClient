var config = require("./config-e2e-tests.js")
var util = require("../lib/e2e/cmTestUtil.js")
var path = require('path')

var ptor = util.getPtorInstance(),
    subjectUnsafe = 'subjectUnsafe FileUpload',
    messageUnsafe = 'messageUnsafe FileUpload',
    subjectSafe = 'subjectSafe FileUpload',
    smallImageJPG = path.resolve(__dirname,'./data/file-upload-image-24KB.jpg'),
    largeImageJPG = path.resolve(__dirname,'./data/file-upload-image-1.4MB.jpg'),
    smallFileMP3 =path.resolve(__dirname,'./data/file-upload-audio-23KB.mp3');

function toDo(index, file, extension, selector, message){
    it(file+' choose and check preview',function(){
        $("[data-qa='btn-file-choose']").sendKeys(file)

        // preview should be show image
        $$('cm-files-preview '+selector).then(function(elements) {
            expect(elements.length).toEqual(1)
        })
    })

    it('fill message and send check preview',function(){
        if(message) {
            $("[data-qa='input-answer']").sendKeys(message)
        }
        $("[data-qa='btn-send-answer']").click()

        // preview should be empty
        $$('cm-files-preview '+selector).then(function(elements) {
            expect(elements.length).toEqual(0)
        })
    })

    it(file+' upload to conversation and present',function(){
        // wait for upload
        util.waitForElements('cm-message', index)

        var elements = $$('cm-message')

        if(message)
            expect(elements.last().$('.text span').getText()).toBe(message)
        else {
            expect(elements.last().$('.text').getText()).toBe('')
        }
    })

    it(file+' in message displayed', function(){
        util.waitForProgressbar()

        var elements = $$('cm-message cm-message-file')

        if(extension == 'jpg') {
            expect(elements.last().$(selector).isDisplayed()).toBeTruthy()
        } else {
            expect(elements.last().$(selector).getAttribute('class')).toBe('file ' + extension)
        }
    })
}

describe('FileUpload unsafe', function () {
    it('login create new conversation',function(){
        util.login()
        util.waitForPageLoad('/talks')

        util.get('/conversation/')
        util.waitForPageLoad('/conversation/')

        $("[data-qa='input-subject']").sendKeys(subjectUnsafe)
        $("[data-qa='btn-save-options']").click()
    })

    toDo(1, smallFileMP3, 'mp3', '.file', messageUnsafe)

    toDo(2, smallImageJPG, 'jpg', '.file-image img')

    toDo(3, largeImageJPG, 'jpg', '.file-image img', messageUnsafe)
})
var config = require("./config-e2e-tests.js")
var util = require("../lib/e2e/cmTestUtil.js")
var path = require('path');

describe('FileUpload', function () {


    var baseUrl = config.wwwUrl.replace(/app(\/.*){0,}/g,'')

    var ptor = util.getPtorInstance(),
        subjectUnsafe = 'subjectUnsafe FileUpload',
        subjectSafe = 'subjectSafe FileUpload',
        smallImage = baseUrl+'test/data/file-upload-image-24KB.jpg',
        largeImage = baseUrl+'test/data/file-upload-image-1.4MB.jpg',
        smallFile = baseUrl+'test/data/file-upload-audio-23KB.jpg';

    it('unsafe', function() {
        describe('fileupload', function () {
            util.login(config.loginUser1, config.passwordUser1)
            util.waitForPageLoad('/talks')

            it('create new conversation', function() {
                util.get('/conversation/')
                util.waitForPageLoad('/conversation/')

                $("[data-qa='input-subject']").sendKeys(subjectUnsafe)
                $("[data-qa='btn-save-options']").click()

                $("[data-qa='btn-file-choose']").sendKeys(smallImage)

                $$('cm-files-preview .file-image').then(function(elements) {
                    expect(elements.length).toEqual(1)
                })

            })
        })
    })
})
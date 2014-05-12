var config = require("./config-e2e-tests.js")
var util = require("../lib/e2e/cmTestUtil.js")
var path = require('path')

var ptor = util.getPtorInstance(),
    subjectUnsafe = 'subjectUnsafe FileUpload',
    subjectSafe = 'subjectSafe FileUpload',
    smallImageJPG = path.resolve(__dirname,'./data/file-upload-image-24KB.jpg'),
    largeImageJPG = path.resolve(__dirname,'./data/file-upload-image-1.4MB.jpg'),
    smallFileMP3 = path.resolve(__dirname,'./data/file-upload-audio-23KB.mp3');

// expect functions
function testFile(file, extension, index){
    var selector = '.file'

    chooseFileAndUpload(file, selector);

    it(file+' in message displayed', function(){
        util.waitForProgressbar()

        var elements = $$('cm-message cm-message-file')

        expect(elements.last().$(selector).getAttribute('class')).toBe('file ' + extension)
    })
}

function testImage(file, extension, index){
    var selector = '.file-image img'

    chooseFileAndUpload(file, selector);

    it(file+' in message displayed', function(){
        util.waitForProgressbar()

        var elements = $$('cm-message cm-message-file')

        expect(elements.last().$(selector).isDisplayed()).toBeTruthy()
    })
}

function chooseFileAndUpload(file, selector){
    it(file+' choose and check preview',function(){
        $("[data-qa='btn-file-choose']").sendKeys(file)

        // preview should be show image
        $$('cm-files-preview '+selector).then(function(elements) {
            expect(elements.length).toEqual(1)
        })
    })

    it('fill message and send check preview',function(){
        $("[data-qa='btn-send-answer']").click()

        // preview should be empty
        $$('cm-files-preview '+selector).then(function(elements) {
            expect(elements.length).toEqual(0)
        })
    })
}

// start init tests
describe('FileUpload unsafe', function () {
    it('login create & new conversation',function(){
        util.login()
        util.waitForPageLoad('/talks')

        util.get('/conversation/')
        util.waitForPageLoad('/conversation/')

        $("[data-qa='input-subject']").sendKeys(subjectUnsafe)
        $("[data-qa='btn-save-options']").click()
    })
    // test files
    var files = [
        {file: smallFileMP3},
        {image: smallImageJPG},
        {image: largeImageJPG}
    ]
    // testFile or testImage called for every entry
    for(index in files){
        // prepare file
        var file = files[index],
            pathToFile = file[(file['image'] != undefined ? 'image' : 'file')],
            extension = util.getFileExtension(pathToFile),
            testIndex = parseInt(index+1)
        // create expects
        if(file['image'] != undefined)
            testImage(pathToFile, extension, testIndex)
        else
            testFile(pathToFile, extension, testIndex)

    }
})
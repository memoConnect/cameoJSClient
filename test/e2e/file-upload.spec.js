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

    chooseFileAndUpload(file, selector, index);

    it(getFilename(file)+' in message displayed', function(){
        util.waitForProgressbar(10000)

        var elements = $$('cm-message cm-message-file')

        expect(elements.last().$(selector).getAttribute('class')).toBe('file ' + extension)
    })
}

function testImage(file, extension, index){
    var selector = '.file-image img'

    chooseFileAndUpload(file, selector, index);

    it(getFilename(file)+' in message displayed', function(){
        util.waitForProgressbar(10000)

        var elements = $$('cm-message cm-message-file')

        expect(elements.last().$(selector).isDisplayed()).toBeTruthy()
    })
}

function testHTML5(file, extension, index){
    var selector = '.file'

    chooseFileAndUpload(file, selector, index);

    it(getFilename(file)+' in message displayed', function(){
        util.waitForProgressbar(10000)

        var elements = $$('cm-message cm-message-file')

        expect(elements.last().$(selector+'-html5').isDisplayed()).toBeTruthy()
    })
}

function chooseFileAndUpload(file, selector, index){
    it(getFilename(file)+' choose and check preview',function(){
        $("[data-qa='btn-file-choose']").sendKeys(file)

        // preview should be show image
        $$('cm-files-preview '+selector).then(function(elements) {
            expect(elements.length).toEqual(1)
        })
    })

    it('fill message and send check preview',function(){
        $("[data-qa='btn-send-answer']").click()

        util.waitAndCloseNotify('checkbox-dont-ask-me-again')

        $("[data-qa='btn-send-answer']").click()

        util.waitForElements('cm-message',index)

        // preview should be empty
        $$('cm-files-preview '+selector).then(function(elements) {
            expect(elements.length).toEqual(0)
        })
    })
}

function getFilename(file){
    return file.replace(/^.*(\\|\/|\:)/, '');
}

// start init tests
describe('FileUpload unsafe', function () {
    it('login create & new conversation',function(){
        util.login()
        util.waitForPageLoad('/talks')

        util.get('/conversation/new')
        util.waitForPageLoad('/conversation/new')

        util.disableEncryption();

        $("[data-qa='input-subject']").sendKeys(subjectUnsafe)
    })
    // test files
    var files = [
        {html5: smallFileMP3},
        {image: smallImageJPG},
        {image: largeImageJPG}
//        {file: smallFileAAC},
    ]
    // testFile or testImage called for every entry
    for(index in files){
        // prepare file
        var file = files[index],
            pathToFile = file[Object.keys(file)[0]],
            extension = util.getFileExtension(pathToFile),
            testIndex = parseInt(index)+1
        // test image
        if(file['image'] != undefined)
            testImage(pathToFile, extension, testIndex)
        // test html5 element
        else if(file['html5'] != undefined)
            testHTML5(pathToFile, extension, testIndex)
        //test file element
        else
            testFile(pathToFile, extension, testIndex)

    }
})
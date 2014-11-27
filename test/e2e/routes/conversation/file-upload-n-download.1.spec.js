var config = require("../../config-e2e-tests.js"),
    util = require("../../../lib/e2e/cmTestUtil.js"),
    path = require('path'),
    subjectUnsafe = 'subjectUnsafe FileUpload',
    subjectSafe = 'subjectSafe FileUpload',
    smallImageJPG = path.resolve(__dirname, '../../data/file-upload-image-24KB.jpg'),
    largeImageJPG = path.resolve(__dirname, '../../data/file-upload-image-1.4MB.jpg'),
    smallFileMP3 = path.resolve(__dirname, '../../data/file-upload-audio-23KB.mp3'),
    smallFilePDF = path.resolve(__dirname, '../../data/file-upload-file-12KB.pdf'),
    files = [
        {html5: smallFileMP3},
        {image: smallImageJPG},
        //{image: largeImageJPG},
        {file: smallFilePDF}
    ],
    testFilesNum = files.length

// expect functions
function testFile(file, extension, index) {
    var selector = '.file'

    chooseFileAndUpload(file, selector, index);

    it(getFilename(file) + ' in message displayed', function () {
        util.waitForProgressbar(10000)

        var elements = $$('cm-message cm-message-file')

        expect(elements.last().$(selector).getAttribute('class')).toBe('file ' + extension)
    })
}

function testImage(file, extension, index) {
    var selector = '.file-image img'

    chooseFileAndUpload(file, selector, index);

    it(getFilename(file) + ' in message displayed', function () {
        util.waitForProgressbar(10000)

        var elements = $$('cm-message cm-message-file')

        expect(elements.last().$(selector).isDisplayed()).toBeTruthy()
    })
}

function testHTML5(file, extension, index) {
    var selector = '.file'

    chooseFileAndUpload(file, selector, index);

    it(getFilename(file) + ' in message displayed', function () {
        util.waitForProgressbar(20000)

        var elements = $$('cm-message cm-message-file')

        expect(elements.last().$(selector + '-html5').isDisplayed()).toBeTruthy()
    })
}

function chooseFileAndUpload(file, selector, index) {
    it(getFilename(file) + ' choose and check preview', function() {

        console.log('chooseFileAndUpload '+file)

        $("[data-qa='btn-file-choose']").sendKeys(file)

        util.waitForElements('cm-files-preview ' + selector)
        // preview should be show image
        $$('cm-files-preview ' + selector).then(function (elements) {
            expect(elements.length).toEqual(1)
        })
    })

    it(getFilename(file) + ' fill message and send check preview', function () {
        $("[data-qa='btn-send-answer']").click()

        util.waitForElements('cm-message', index+1)

        // preview should be empty
        $$('cm-files-preview ' + selector).then(function (elements) {
            expect(elements.length).toEqual(0)
        })
    })
}

function getFilename(file) {
    return file.replace(/^.*(\\|\/|\:)/, '');
}

xdescribe('FileUpload create TestUser', function(){
    var ptor = util.getPtorInstance(),
        testUser

    it('should create a test user', function(){
        testUser = util.createTestUser(undefined,'file upload')
    })

    // start init tests
    describe('FileUpload unsafe upload: ', function () {

        it('login create & new conversation', function () {
            util.get('/conversation/new')
            util.waitForPageLoad('/conversation/new')

            util.disableEncryption()

            util.setVal('input-subject', subjectUnsafe)
            util.setVal('input-answer', 'test')
        })

        it('click on send message for open modal', function () {
            $("[data-qa='btn-send-answer']").click()
        })

        it('check checkbox and close modal', function () {
            util.waitAndClickQa('btn-confirm','cm-modal.active')
        })

        // testFile or testImage called for every entry
        for (index in files) {
            // prepare file
            var file = files[index],
                pathToFile = file[Object.keys(file)[0]],
                extension = util.getFileExtension(pathToFile),
                testIndex = parseInt(index) + 1
            // test image
            if (file['image'] != undefined)
                testImage(pathToFile, extension, testIndex)
            // test html5 element
            else if (file['html5'] != undefined)
                testHTML5(pathToFile, extension, testIndex)
            //test file element
            else
                testFile(pathToFile, extension, testIndex)

        }
    })

    describe('FileDownload: ',function(){

        it('login goto conversation where files were uploaded', function () {
            util.login(testUser, 'password')
            util.waitForPageLoad('/start/keyinfo')

            util.get('/talks')
            util.waitForPageLoad('/talks')

            util.waitForElements("[data-qa='conversation-list-element']")
            util.headerSearchInList(subjectUnsafe)

            $$("[data-qa='conversation-list-element']").then(function(elements) {
                expect(elements.length).not.toEqual(0)
                elements[0].click()
            })
        })

        it('see all files ready for download', function(){
            util.waitForElements('cm-message cm-message-file .file-download',testFilesNum)
            $$('cm-message cm-message-file .file-download').then(function(elements){
                expect(elements.length).toEqual(testFilesNum)
            })
        })

        it('test download of first file should be an mp3', function(){
            util.waitForElements('cm-message cm-message-file .file-download',testFilesNum)
            $$('cm-message cm-message-file .file-download').then(function(elements){
                elements[0].click()
                util.waitForProgressbar(20000)

                $$('cm-message cm-message-file .file-html5 audio').then(function(elements){
                    expect(elements.length).toEqual(1)
                })
            })
        })
    })

    it('delete test user', function(){
        util.deleteTestUser(testUser)
    })
})


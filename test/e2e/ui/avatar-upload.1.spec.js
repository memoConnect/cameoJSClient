var config = require("../config-e2e-tests.js")
var util = require("../../lib/e2e/cmTestUtil.js")
var path = require('path')

var ptor = util.getPtorInstance()

// start init tests
describe('Avatar Upload: ', function () {

    afterEach(function() { util.stopOnError() })

    var avatarStyle = '',
        newAvatar = path.resolve(__dirname, '../data/avatar-upload.jpg'),
        newAvatarStyle = ''

    it('login & got to identity list', function () {
        util.login()
        util.waitForPageLoad('/start')

        util.get('/settings/identity/list')
        util.waitForPageLoad('/settings/identity/list')
    })

    it('choose active identity and cache active avatar', function(){
        // get active avatarUrl
        $('cm-identity-tag cm-avatar i').getAttribute('style').then(function(src){
            avatarStyle = src
            util.click('identity-list-item')
        })
    })

    it('upload avatar and check updated locations', function(){
        //avatar-upload-btn
        $("[data-qa='btn-file-choose']").sendKeys(newAvatar)

        util.waitForLoader()

        $('cm-identity-edit cm-avatar i').getAttribute('style').then(function(src){
            newAvatarStyle = src
            expect(newAvatarStyle).not.toBe(avatarStyle)
        })

        $('cm-identity cm-avatar i').getAttribute('style').then(function(src){
            expect(src).not.toBe(avatarStyle)
        })

        util.get('/settings/identity/list')
        util.waitForPageLoad('/settings/identity/list')
        $('cm-identity-tag cm-avatar i').getAttribute('style').then(function(src){
            expect(src).not.toBe(avatarStyle)
        })
    })

})
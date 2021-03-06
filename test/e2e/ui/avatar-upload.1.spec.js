var config = require("../config/specs.js")
var util = require("../cmUtil.js")
var path = require('path')

// start init tests
describe('Avatar Upload: ', function () {
    var ptor = util.getPtorInstance(),
        avatarStyle = '',
        newAvatar = path.resolve(__dirname, '../data/avatar-upload.jpg'),
        newAvatarStyle = '',
        isIE = false,
        testUser

    it('check if is ie', function(){
        util.isInternetExplorer()
        .then(function(bool) {
            isIE = bool;
            if(isIE)
                console.log('browser is ie, it blocks get return false because of sendFile on input=file doesnt work')
        })
    })

    it('should create user1', function(){
        if(isIE)
            return false

        util.createTestUser(undefined, 'avatar upload')
        .then(function(loginName){
            testUser = loginName
        })
    })

    it('login & got to identity list', function () {
        if(isIE)
            return false

        util.get('/settings/identity/list')
        util.waitForPageLoad('/settings/identity/list')
    })

    it('choose active identity and cache active avatar', function(){
        if(isIE)
            return false

        // get active avatarUrl
        $('cm-identity-tag cm-avatar i').getAttribute('style').then(function(src){
            avatarStyle = src
            util.click('identity-list-item')
        })
    })

    it('upload avatar and check updated locations', function(){
        if(isIE)
            return false

        // avatar-upload-btn
        $("[data-qa='btn-file-choose']").sendKeys(newAvatar)
        .then(function(){
            return util.waitForLoader(1,'cm-upload-avatar')
        })
        .then(function() {
            return $('cm-identity-edit cm-avatar i').getAttribute('style')
        })
        .then(function(src){
            newAvatarStyle = src
            expect(newAvatarStyle).not.toBe(avatarStyle)

            return $('cm-identity cm-avatar i').getAttribute('style')
        })
        .then(function(src){
            expect(src).not.toBe(avatarStyle)

            return $('cm-identity cm-avatar i').getAttribute('style')
        })
        .then(function(src){
            expect(src).not.toBe(avatarStyle)

            util.get('/settings/identity/list')
            return util.waitForPageLoad('/settings/identity/list')
        })
        .then(function(){
            $('cm-identity-tag cm-avatar i').getAttribute('style').then(function(src){
                expect(src).not.toBe(avatarStyle)
            })
        })
    })

    it('should logout', function(){
        util.logout();
    })

    it('should delete testUser', function(){
        util.deleteTestUser(testUser)
    })
})
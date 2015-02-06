var config = require("../config/specs.js")
var util = require("../cmUtil.js")

describe('Filter Spec', function(){
    var ptor = util.getPtorInstance(),
        testuser,
        filter = 'filter_' + (new Date()).getTime()

    it('should create user1', function(){

        util.createTestUser(undefined, 'avatar upload')
        .then(function(loginName){
            testUser = loginName
        })
    })

    describe('Test Search Button at Talks', function(){

        it('should set filter', function(){
            util.get('/talks')

            util.waitForPageLoad('/talks')

            util.headerSearchInList(filter).then(function(){
                expect($("[data-qa='inp-list-search']").getAttribute('value')).toBe(filter)
            })

        })

        it('sendArchive Button should be displayed',function(){
            util.waitForQa('btn-search-at-server')
            expect($('[data-qa="btn-search-at-server"]').isDisplayed()).toBe(true)
        })

        it('should close search bar', function(){
            util.closeHeaderSearch()
        })

    })

    describe('Test Filter at route changes', function(){

        it('set Header', function(){
            util.headerSearchInList(filter)
        })

        it('at route contact/list should filter be set', function(){
            util.get('/contact/list')
            util.waitForPageLoad('/contact/list')
            .then(function(){
                    util.waitForQa('inp-list-search')
                        .then(function(){
                            expect($("[data-qa='inp-list-search']").getAttribute('value')).toBe(filter)
                        })
            })

        })

        it('at route talks should filter be set', function(){
            util.get('/talks')
            util.waitForPageLoad('/talks')
            .then(function(){
                util.waitForQa('inp-list-search')
                    .then(function(){
                        expect($("[data-qa='inp-list-search']").getAttribute('value')).toBe(filter)
                    })
            })

        })

        it('clear search', function(){
            util.waitAndClickQa('btn-close-search')
            .then(function(){
                expect($("[data-qa='inp-list-search']").getAttribute('value')).toBe('')
            })
        })

        it('should close search bar', function(){
            util.get('/settings')
            util.waitForPageLoad('/settings')
            .then(function(){
                expect($('cm-header-list-search').isPresent()).toBe(false)
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
var config = require("./config-e2e-tests.js")
var util = require("../lib/e2e/cmTestUtil.js")

describe('Route: Purl', function () {
    "use strict";

    var ptor = util.getPtorInstance()

    function checkFormForInternUser(){
        it('should have back button', function(){
            expect($('cm-back').isPresent()).toBe(true)
        })

        it('should have identity', function(){
            expect($('cm-identity').isPresent()).toBe(true)
        })

        it('should have menu', function(){
            expect($('cm-menu').isPresent()).toBe(true)
        })

        it('should have attachment button', function(){
            expect($('i[data-qa="attachments-btn"]').isPresent()).toBe(true)
        })

        it('should have normal answer container', function(){
            expect($('[data-qa="answer-ctn"]').getAttribute('class')).not.toMatch('large')
        })
    }

    function checkFormForExternUser(){
        it('should have back button', function(){
            expect($('cm-back').isPresent()).toBe(true)
        })

        it('should have identity', function(){
            expect($('cm-identity').isPresent()).toBe(true)
        })

        it('should have menu', function(){
            expect($('cm-menu').isPresent()).toBe(true)
        })

        it('should have attachment button', function(){
            expect($('i[data-qa="attachments-btn"]').isPresent()).toBe(true)
        })

        it('should have normal answer container', function(){
            expect($('[data-qa="answer-ctn"]').getAttribute('class')).not.toMatch('large')
        })
    }

    xdescribe("User1 open Purl and is logged in", function(){
        it('open "#/purl/+'+ config.purlUser1 +'" after login.', function(){
            util.login()
            util.get('/purl/'+config.purlUser1)
            util.expectCurrentUrl('#/purl/'+config.purlUser1)
        })

        checkFormForInternUser();
    })

    xdescribe("User1 open Purl and is logged out", function(){
        it('open "#/purl/+'+ config.purlUser1 +'" after logout before login.', function(){
            util.logout();
            util.get('/purl/'+config.purlUser1)
            util.expectCurrentUrl('#/purl/'+config.purlUser1)
        })

        it('login modal should be visible', function(){
            expect($('[data-qa="modal-login"]').isPresent()).toBe(true)
        })

        it('should login with correct credentials', function () {
            var user = $("input[name=user]");
            var pw = $("input[name=pw]");

            user.sendKeys(config.loginUser1);
            pw.sendKeys(config.passwordUser1);

            $("[data-qa='login-submit-btn']").click();

            util.waitForPageLoad("/purl/"+ config.purlUser1)
        })

        it('should be same url', function(){
            util.expectCurrentUrl('#/purl/'+config.purlUser1)
        })

        //checkFormForInternUser();
    })
})
var config = require("./config-e2e-tests.js")
var util = require("../lib/e2e/cmTestUtil.js")

describe('Route: Purl - ', function () {
    "use strict";

    var ptor = util.getPtorInstance()

    function checkFormForInternUser(param){
        var moep = '';

        if(typeof param !== 'undefined')
            moep = param;

        it('should have back button "'+moep+'"', function(){
            expect($('cm-back').isPresent()).toBe(true)
        })

        it('should have identity "'+moep+'"', function(){
            expect($('cm-identity').isPresent()).toBe(true)
        })

        it('should have menu "'+moep+'"', function(){
            expect($('cm-menu').isPresent()).toBe(true)
        })

        it('should have attachment button "'+moep+'"', function(){
            expect($('i[data-qa="attachments-btn"]').isPresent()).toBe(true)
        })

        it('should have normal answer container "'+moep+'"', function(){
            expect($('[data-qa="answer-ctn"]').getAttribute('class')).not.toMatch('large')
        })
    }

    function checkFormForExternUser(param){
        var moep = '';

        if(typeof param !== 'undefined')
            moep = param;

        it('should not have back button "'+moep+'"', function(){
            expect($('cm-back').isPresent()).toBe(false)
        })

        it('should not have identity  "'+moep+'"', function(){
            expect($('cm-identity').isPresent()).toBe(false)
        })

        it('should not have menu "'+moep+'"', function(){
            expect($('cm-menu').isPresent()).toBe(false)
        })

        it('should not have attachment button "'+moep+'"', function(){
            expect($('i[data-qa="attachments-btn"]').isPresent()).toBe(false)
        })

        it('should have large answer container "'+moep+'"', function(){
            expect($('[data-qa="answer-ctn"]').getAttribute('class')).toMatch('large')
        })
    }


    /**
     * Test 1
     * Intern User is logged in and Purl is for that User
     */
    describe("Test 1 - User1 open Purl and is logged in", function(){
        it('should open "#/purl/+' + config.purlUser1 +'" after login.', function(){
            util.login()
            util.get('/purl/' + config.purlUser1)
            util.expectCurrentUrl('#/purl/' + config.purlUser1)

            /**
             * for next test
             * cm-message describes that messages in purl are loaded and loading process is finish
             */
            util.waitForElement('cm-message');
        })

        describe('should checkFormForInternUser "Test1": ', function(){
            checkFormForInternUser('Test 1');
        })
    })

    /**
     * Test 2
     * Intern User is logged out and Purl is for that User
     */
    describe('Test 2 - User1 open Purl and is logged out "#/purl/' + config.purlUser1 +'"', function(){
        it('should open after logout before login.', function(){
            util.logout();
            util.get('/purl/' + config.purlUser1)
            util.expectCurrentUrl('#/purl/' + config.purlUser1)
        })

        it('login modal should be visible', function(){
            util.waitForElement("[data-qa='modal-login']");
            expect($("[data-qa='modal-login']").isPresent()).toBe(true)
        })

        it('should login with correct credentials', function () {

            ptor.sleep(1000);

            var user = $("input[name=user]");
            var pw = $("input[name=pw]");

            user.sendKeys(config.loginUser1);
            pw.sendKeys(config.passwordUser1);


            $("[data-qa='login-submit-btn']").click();

            util.waitForPageLoad("/purl/" + config.purlUser1)
        })

        it('should be same url', function(){
            util.expectCurrentUrl('#/purl/' + config.purlUser1)

            /**
             * for next test
             * cm-message describes that messages in purl are loaded and loading process is finish
             */
            util.waitForElement('cm-message');
        })

        describe('should checkFormForInternUser', function(){
            checkFormForInternUser('Test 2');
        })
    })

    /**
     * Test 3
     * Extern User open Purl when Browser is "empty"
     */
    describe('Test 3 - Extern User open Purl, no User is logged in "#/purl/' + config.purlExtern +'"', function(){
        it('should open', function(){
            util.logout();
            util.get('/purl/' + config.purlExtern)
            util.expectCurrentUrl('#/purl/' + config.purlExtern)

            /**
             * for next test
             * cm-message describes that messages in purl are loaded and loading process is finish
             */
            util.waitForElement('cm-message');
        })

        describe('should checkFormForInternUser', function(){
            checkFormForExternUser('Test 3');
        })
    })

    /**
     * Test 4
     * Extern User open Purl when Browser is Intern User 1 is logged in
     */
    describe('Test 4 - User 1 is logged in, Extern User open Purl "#/purl/' + config.purlExtern +'"', function(){
        it('should open', function(){
            util.login();

            util.get('/purl/' + config.purlExtern)
            util.expectCurrentUrl('#/purl/' + config.purlExtern)

            /**
             * for next test
             * cm-message describes that messages in purl are loaded and loading process is finish
             */
            util.waitForElement('cm-message');
        })

        describe('should checkFormForInternUser', function(){
            checkFormForExternUser('Test 4');
        })
    })

    /**
     * Test 5
     * Extern User has open Purl then Intern User 1 will see his PURL
     */
    describe('Test 5 - Extern User open Purl, then User 1 open Purl "#/purl/' + config.purlExtern +'"', function(){
        it('should open', function(){
            util.logout();

            util.get('/purl/' + config.purlExtern)
            util.expectCurrentUrl('#/purl/' + config.purlExtern)

            /**
             * for next test
             * cm-message describes that messages in purl are loaded and loading process is finish
             */
            util.waitForElement('cm-message');
        })

        it('login modal should be visible, when Intern User1 open his Purl', function(){
            util.get('/purl/' + config.purlUser1)
            util.expectCurrentUrl('#/purl/' + config.purlUser1)

            util.waitForElement('[data-qa="modal-login"]');
            expect($('[data-qa="modal-login"]').isPresent()).toBe(true)
        })

        it('should login with correct credentials', function () {
            var user = $("input[name=user]");
            var pw = $("input[name=pw]");

            user.sendKeys(config.loginUser1);
            pw.sendKeys(config.passwordUser1);

            $("[data-qa='login-submit-btn']").click();

            util.waitForPageLoad("/purl/" + config.purlUser1)
        })

        it('should be same url', function(){
            util.expectCurrentUrl('#/purl/' + config.purlUser1)

            /**
             * for next test
             * cm-message describes that messages in purl are loaded and loading process is finish
             */
            util.waitForElement('cm-message');
        })

        describe('should checkFormForInternUser', function(){
            checkFormForInternUser('Test 5');
        })
    })

    /**
     * Test 6
     * Intern User 2 open Purl, then Intern User 1 will see his PURL
     */
    describe('Test 6 - Intern User 2 is logged in, User 1 open Purl "#/purl/' + config.purlUser1 +'"', function(){
        it('should open after User 2 logged in', function(){
            util.logout();

            util.login(config.loginUser2, config.passwordUser2);

            util.get('/purl/' + config.purlUser1)
            util.expectCurrentUrl('#/purl/' + config.purlUser1)
        })


        it('login modal should be visible, when Intern User1 open his Purl', function(){
            util.waitForElement('[data-qa="modal-login"]');
            expect($('[data-qa="modal-login"]').isPresent()).toBe(true)
        })

        it('should login with correct credentials', function () {
            var user = $("input[name=user]");
            var pw = $("input[name=pw]");

            user.sendKeys(config.loginUser1);
            pw.sendKeys(config.passwordUser1);

            $("[data-qa='login-submit-btn']").click();

            util.waitForPageLoad("/purl/" + config.purlUser1)
        })

        it('should be same url', function(){
            util.expectCurrentUrl('#/purl/' + config.purlUser1)

            /**
             * for next test
             * cm-message describes that messages in purl are loaded and loading process is finish
             */
            util.waitForElement('cm-message');
        })

        describe('should checkFormForInternUser', function(){
            checkFormForInternUser('Test 6');
        })
    })
})

var config = require("./config-e2e-tests.js")
var util = require("../lib/e2e/cmTestUtil.js")

describe('registration', function () {

    var ptor;

    beforeEach(function () {
        ptor = protractor.getInstance();
        ptor.ignoreSynchronization = true;
//        browser.ignoreSynchronization = true;
    });


    it('should contain 7 input fields with placeholders', function () {
        $$("data-qa").then(function (elements) {
            expect(elements.length).toBe(7)
            Array.forEach(elements, function(element, index) {
                element.getAttribute("placeholder").then(function (text) {
                    expect(text).toBeDefined;
                });
            })
        })
    })

//    if("", function() {
//
//    })
})

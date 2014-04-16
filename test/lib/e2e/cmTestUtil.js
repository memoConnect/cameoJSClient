/**
 * Created by reimerei on 15.04.14.
 */
var config = require("../../e2e/config-e2e-tests.js")

var ptor

this.setPtorInstance = function(newPtor) {
    ptor = newPtor
}

this.waitForPageLoad = function (expectedRoute) {

    ptor.wait(function () {

        return ptor.executeScript('return window != undefined && window._route != undefined').then(function (boolean) {

            if (boolean) {

                // get current route
                return ptor.executeScript('return window._route').then(function(route) {
                    if(expectedRoute == undefined || route.path == expectedRoute) {
                        return route.status == "success"
                    } else {
//                        console.log("unexpected route:" + route.path)
                    }
                })
            }
        })


    }, config.routeTimeout, "timeout")

}

this.waitForModalClose = function () {

    ptor.wait(function () {
        return $$(".modal").then(function (elements) {
            return elements.length == 0
        })
    }, config.routeTimeout, "timeout")

}

this.waitForSpinner = function () {

    // add some initial delay
    ptor.sleep(100)

    ptor.wait(function () {
        return $$(".cm-spinner").then(function (elements) {
            return elements.length == 0
        })
    }, config.routeTimeout, "timeout")

}

this.checkWarning = function(qaValue) {
    var css = "[data-qa='" + qaValue + "']"
    var warn = $(css)
    expect(warn.isDisplayed()).toBe(true)
    warn.getText().then(function (text) {
        expect(text).not.toBe("")
    })
}

this.clearInput = function(qaValue) {
    var css = "[data-qa='" + qaValue + "']"
    var input = $(css)
    input.sendKeys(protractor.Key.chord(protractor.Key.CONTROL, "a"));
    input.sendKeys(protractor.Key.BACK_SPACE);
}

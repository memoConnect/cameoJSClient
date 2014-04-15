/**
 * Created by reimerei on 15.04.14.
 */
var config = require("../../e2e/config-e2e-tests.js")

this.waitForPageLoad = function (ptor) {

    // add some initial delay
    ptor.sleep(100)

    ptor.wait(function () {

        return ptor.executeScript('return window != undefined && window._route != undefined').then(function (boolean) {

//            console.log("Page loaded: " + boolean)

            if (boolean) {
                return ptor.executeScript('return window._route.status').then(function (status) {
                    return status == "success"
                })
            }
        })


    }, config.routeTimeout, "timeout")

}

this.waitForModalClose = function (ptor) {

    ptor.wait(function () {
        return $$(".modal").then(function (elements) {
            return elements.length == 0
        })
    }, config.routeTimeout, "timeout")

}

this.waitForSpinner = function (ptor) {

    ptor.wait(function () {
        return $$(".cm-spinner").then(function (elements) {
            return elements.length == 0
        })
    }, config.routeTimeout, "timeout")

}

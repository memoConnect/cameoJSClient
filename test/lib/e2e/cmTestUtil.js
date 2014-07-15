/**
 * Created by reimerei on 15.04.14.
 */
var config = require("../../e2e/config-e2e-tests.js")
var self = this

var ptor

this.setPtorInstance = function (newPtor) {
    ptor = newPtor
    return this
}

this.getPtorInstance = function () {
    ptor = protractor.getInstance()
    ptor.ignoreSynchronization = true
    return ptor;
}

this.get = function (path) {

    if(ptor == undefined) {
        console.error("please set ptor = util.getPtorInstance()")
    }

    var url = config.wwwUrl + '#' + path
    ptor.get(url)
    this.waitForPageLoad()

    return this
}

this.expectCurrentUrl = function (match) {
    ptor.getCurrentUrl().then(function (url) {
        expect(url).toMatch(match)
    })

    return this
}

this.logout = function () {
    self.get('/login')

    $$("cm-menu").then(function (elements) {
        if (elements.length > 0) {
            $("cm-menu .cm-handler").click()
            self.waitForElement(".cm-menu-list")
            $("[data-qa='logout-btn']").click()
        } else {
        }
    })
    return this
}

this.login = function (username, password) {

    self.logout()
    self.get('/login')

    $("body").sendKeys(protractor.Key.HOME)
    $("[data-qa='login-btn']").click();

    var user = $("input[name=user]");
    var pw = $("input[name=pw]");

    var loginUser = username || config.loginUser1;
    var loginPassword = password || config.passwordUser1;

    user.sendKeys(loginUser);
    pw.sendKeys(loginPassword);

    $("[data-qa='login-submit-btn']").click();

    self.waitForPageLoad("/talks")

    return this
}

this.createTestUser = function() {

    this.logout()

    var prefix = 'testUser23_'
    var id = Math.random().toString(36).substring(2,9)
    var loginName = prefix + id
    var password = 'password'

    this.get("/registration");

    $("[data-qa='input-loginName']").sendKeys(loginName)
    $("[data-qa='input-password']").sendKeys(password)
    $("[data-qa='input-passwordConfirm']").sendKeys(password)

    $("[data-qa='input-displayName']").sendKeys(loginName)

    $("[data-qa='link-terms']").sendKeys(protractor.Key.END)
    $("[data-qa='icon-checkbox-agb']").click()

    $("[data-qa='btn-createUser']").click()

    this.waitForPageLoad("/talks")

    return loginName
}

this.deleteTestUser = function(loginName) {

    var testUserId = loginName.split("_")[1]

    ptor.executeAsyncScript( function(testUserId, apiUrl) {
        var callback = arguments[arguments.length - 1];

        var xhr = new XMLHttpRequest();
        xhr.open("DELETE", apiUrl + "/testUser/" + testUserId, true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                callback(xhr.responseText);
            }
        }
        xhr.send('');

    }, testUserId, config.apiUrl)
}


this.getTestUserNotifications = function(loginName) {

    var testUserId = loginName.split("_")[1]

    return ptor.executeAsyncScript( function(testUserId, apiUrl) {

        var callback = arguments[arguments.length - 1];

        var xhr = new XMLHttpRequest();
        xhr.open("GET", apiUrl + "/testUser/" + testUserId, true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                callback(JSON.parse(xhr.responseText))
            }
        }
        xhr.send('');
    }, testUserId, config.apiUrl)
}

this.waitForPageLoad = function (expectedRoute) {
    ptor.wait(function () {
        return ptor.executeScript('return window != undefined && window._route').then(function (route) {
            if (route) {
                // get current route
                if (expectedRoute == undefined || route.path.search(expectedRoute) != -1) {
                    return route.status == "success"
                } else {
//                        console.log("unexpected route:" + route.path)
                }
            }
        })

    }, config.routeTimeout, 'waitForPage ' + (expectedRoute || 'any page') + ' timeout reached')
    return this
}

this.waitForElement = function (selector) {

    ptor.wait(function () {
        return $$(selector).then(function (elements) {
            return elements.length > 0
        })
    }, config.waitForTimeout, 'waitForElement ' + selector + ' timeout is reached')

    return this
}

this.waitForElements = function (selector, count) {

    if(count) {
        ptor.wait(function () {
            return $$(selector).then(function (elements) {
                return elements.length == count
            })
        }, config.waitForTimeout, 'waitForElements ' + selector + ' count: ' + count + ' timeout is reached')
    }

    return this
}

this.waitForElementVisible = function (selector, timeout) {

    ptor.wait(function () {
        return $(selector).isDisplayed().then(function (isDisplayed) {
            return isDisplayed
        })
    }, timeout || config.waitForTimeout, 'waitForElementVisible ' + selector + ' timeout is reached')

    return this
}


this.waitForElementHidden = function (selector, timeout) {

    ptor.wait(function () {
        return $(selector).isDisplayed().then(function (isDisplayed) {
            return !isDisplayed
        })
    }, timeout || config.waitForTimeout, 'waitForElementHidden ' + selector + ' timeout is reached')

    return this
}

this.waitForElementDisappear = function(selector, timeout){
    ptor.wait(function () {
        return $(selector).isElementPresent().then(function (isPresent) {
            return !isPresent
        })
    }, timeout || config.waitForTimeout, 'waitForElementDisappear ' + selector + ' timeout is reached')

    return this
}

this.waitForModalOpen = function (id) {
    ptor.wait(function () {
        return $("#" + id).isDisplayed()
    }, config.routeTimeout, "waitForModalOpen " + id + " timeout reached")

    return this
}

this.waitForModalClose = function () {

    ptor.wait(function () {

        var allHidden = true

        $$("cm-modal").each(function (element) {
            if (element.isDisplayed()) {
                allHidden = false
            }
        })
        return allHidden
    }, config.routeTimeout, "waitForModalClose timeout reached")

    return this
}

this.waitForSpinner = function () {
    // wait until spinner appears
    ptor.wait(function () {
        return $$("cm-spinner").then(function (elements) {
            return elements.length > 0
        })
    }, config.routeTimeout, 'waitForSpinner start timeout reached').then(function () {
        ptor.wait(function () {
            return $("cm-spinner").isDisplayed().then(function (isDisplayed) {
                return !isDisplayed
            })
        }, config.routeTimeout, 'waitForSpinner stop timeout reached')
    })

    return this
}

this.waitForProgressbar = function (timeout) {
    // wait until progress bar appear
    ptor.wait(function () {
        return $$("cm-progressbar").then(function (elements) {
            return elements.length == 0
        })
    }, timeout || config.routeTimeout, 'waitForProgressbar timeout reached')
    return this
}

this.checkWarning = function (qaValue) {
    var css = "[data-qa='" + qaValue + "']"
    var warn = $(css)
    expect(warn.isDisplayed()).toBe(true)
    warn.getText().then(function (text) {
        expect(text).not.toBe("")
    })

    return this
}

this.clearInput = function (qaValue) {
    var css = "[data-qa='" + qaValue + "']"
    var input = $(css)
    input.sendKeys(protractor.Key.chord(protractor.Key.CONTROL, "a"));
    input.sendKeys(protractor.Key.BACK_SPACE);

    return this
}

this.waitAndCloseNotify = function() {
    self.waitForElement("[data-qa='cm-modal-close-btn']")
    $("[data-qa='cm-modal-close-btn']").click()
    self.waitForElements("[data-qa='cm-modal-close-btn']",0)
}

this.getFileExtension = function(file){
    return file.split('.').pop()
}

this.headerSearchInList = function(searchString){
    $("[data-qa='btn-header-list-search']").click()
    this.searchInList(searchString)
}

this.searchInList = function(searchString){
    $("[data-qa='inp-list-search']").sendKeys(searchString)
}


this.clearLocalStorage = function() {
    ptor.executeScript('localStorage.clear()')
}

this.generateKey = function() {

    self.get('/settings/identity/keys/create')

    $("[data-qa='btn-generate-key']").click()

    self.waitForElementVisible("[data-qa='page-save-key']", 50000)

    $("[data-qa='btn-save-key']").click()

}


/**
 * Created by reimerei on 15.04.14.
 */
var fs = require('fs'),
    config = require("../../e2e/config-e2e-tests.js"),
    clc = require('cli-color'),
    self = this,
    ptor

this.setPtorInstance = function (newPtor) {
    ptor = newPtor
    return this
}

this.getPtorInstance = function () {
    ptor = protractor.getInstance()
    ptor.ignoreSynchronization = true

    // for every it in describe check error logs and
    // stop on error if config is on true
    afterEach(function() {
        self.checkErrorLogs()
        self.stopOnError()
    })

    return ptor
}

this.stopOnError = function () {
    if (!config.stopOnError) {
        return false;
    }

    var passed = jasmine.getEnv().currentSpec.results().passed();
    if (!passed) {
        jasmine.getEnv().specFilter = function (spec) {
            return false;
        }
    }
}

this.checkErrorLogs = function(){
    if(!config.showConsoleError) {
        return false;
    }

    ptor.manage().logs().get('browser').then(function(browserLog) {
        var errors = [];

        browserLog.forEach(function(log){
            if(log.level.name == 'SEVERE')
                errors.push(clc.red(log.message))
        })

        //expect(errors.length+' JS Errors').toBe('0 JS Errors')
        if(errors.length > 0){
            ptor.getCurrentUrl().then(function(currentUrl){
                var suite = {},
                    specNames = []

                if('currentSpec' in jasmine.getEnv()
                && 'suite' in jasmine.getEnv().currentSpec) {
                    suite = jasmine.getEnv().currentSpec.suite
                }

                if('parentSuite' in suite
                && suite.parentSuite != null
                && 'description' in suite.parentSuite)
                    specNames.push(suite.parentSuite.description)

                if('description' in suite)
                    specNames.push(suite.description)

                console.log('\n'+clc.red(errors.length+' error @ '+(specNames.join(' '))+'\n on '+currentUrl))
                errors.forEach(function(error){
                    console.log(error)
                })
            })
        }
    })
}

this.get = function (path) {

    if (ptor == undefined) {
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

this.login = function (username, password, expectedRoute) {

    self.logout()
    self.get('/login')

    this.scrollToTop()

    var user = $("input[name=user]");
    var pw = $("input[name=pw]");

    var loginUser = username || config.loginUser1;
    var loginPassword = password || config.passwordUser1;

    user.sendKeys(loginUser);
    pw.sendKeys(loginPassword);

    $("[data-qa='login-submit-btn']").click();

    if (typeof expectedRoute == 'string' && expectedRoute.length > 0) {
        self.waitForPageLoad(expectedRoute)
    } else {
        self.waitForPageLoad('(start|talks)')
    }

    return this
}

this.createTestUser = function (testUserId, from){
    //console.log('from ->' + from)

    this.logout()

    var prefix = 'testUser23_'
    var id = testUserId || Math.random().toString(36).substring(2, 9)
    var loginName = prefix + id
    var password = 'password'

    this.get("/registration");

    $("[data-qa='input-cameoId']").clear()
    $("[data-qa='input-cameoId']").sendKeys(loginName)
    $("[data-qa='input-password']").sendKeys(password)
    $("[data-qa='input-passwordConfirm']").sendKeys(password)

    $("[data-qa='input-displayName']").sendKeys(loginName)

    this.scrollToBottom()
    $("[data-qa='icon-checkbox-agb']").click()

    $("[data-qa='btn-createUser']").click()

    this.waitForPageLoad("/start/welcome")

    return loginName
}

this.deleteTestUser = function (loginName) {

    var testUserId = loginName.split("_")[1]

    ptor.executeAsyncScript(function (testUserId, apiUrl) {
        var callback = arguments[arguments.length - 1];

        var xhr = new XMLHttpRequest();
        xhr.open("DELETE", apiUrl + "/testUser/\n" + testUserId, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                callback(xhr.responseText);
            }
        }
        xhr.send('');

    }, testUserId, config.apiUrl)
}

this.getTestUserNotifications = function (loginName) {

    var testUserId = loginName.split("_")[1]

    return ptor.executeAsyncScript(function (testUserId, apiUrl) {

        var callback = arguments[arguments.length - 1]

        var xhr = new XMLHttpRequest()
        xhr.open("GET", apiUrl + "/testUser/" + testUserId, true)
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                callback(JSON.parse(xhr.responseText))
            }
        }
        xhr.send('')
    }, testUserId, config.apiUrl)
}

// todo write generic method for api calls
this.getEventSubscription = function (token) {
    return ptor.executeAsyncScript(function (token, apiUrl) {

        var callback = arguments[arguments.length - 1];

        var xhr = new XMLHttpRequest();
        xhr.open("POST", apiUrl + "/eventSubscription", true);
        xhr.setRequestHeader("Authorization", token);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                callback(JSON.parse(xhr.responseText).data.id)
            }
        }
        xhr.send('{}');
    }, token, config.apiUrl)
}

this.getEvents = function (token, subscriptionId) {

    return ptor.executeAsyncScript(function (token, subscriptionId, apiUrl) {

        var callback = arguments[arguments.length - 1];

        var xhr = new XMLHttpRequest();
        xhr.open("GET", apiUrl + "/eventSubscription/" + subscriptionId, true);
        xhr.setRequestHeader("Authorization", token);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                callback(JSON.parse(xhr.responseText))
            }
        }
        xhr.send('{}');
    }, token, subscriptionId, config.apiUrl)
}

this.broadcastEvent = function (token, event) {

    return ptor.executeAsyncScript(function (token, event, apiUrl) {

        var callback = arguments[arguments.length - 1];

        var xhr = new XMLHttpRequest();
        xhr.open("POST", apiUrl + "/event/broadcast", true);
        xhr.setRequestHeader("Authorization", token);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                callback(JSON.parse(xhr.responseText))
            }
        }
        xhr.send(JSON.stringify(event));
    }, token, event, config.apiUrl)
}

this.remoteBroadcastEvent = function (token, event, identityId) {

    return ptor.executeAsyncScript(function (token, event, apiUrl, identityId) {

        var callback = arguments[arguments.length - 1];

        var xhr = new XMLHttpRequest();
        xhr.open("POST", apiUrl + "/event/broadcast/identity/" + identityId, true);
        xhr.setRequestHeader("Authorization", token);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                callback(JSON.parse(xhr.responseText))
            }
        }
        xhr.send(JSON.stringify(event));
    }, token, event, config.apiUrl, identityId)
}

this.waitForPageLoad = function (expectedRoute) {
    ptor.wait(function () {
        return ptor.executeScript('return window != undefined && window._route').then(function (route) {
            if (route) {
                // get current route
                if (expectedRoute == undefined || route.path.search(expectedRoute) != -1) {
                    return route.status == "success"
                } else {
//                        console.log("Error: unexpected route: " + route.path)
                }
            }
        })

    }, config.routeTimeout, 'waitForPage ' + (expectedRoute || 'any page') + ' timeout reached')
    return this
}

this.waitForEventSubscription = function () {
    ptor.wait(function () {
        return ptor.executeScript('return window != undefined && window._eventSubscriptionId').then(function (subscriptionId) {
            if (subscriptionId) {
                return true
            }
        })
    }, config.routeTimeout, 'waitForEventSubscription timeout reached')
    return this
}

this.waitForElement = function (selector, timeout) {

    ptor.wait(function () {
        return $$(selector).then(function (elements) {
            return elements.length > 0
        })
    }, timeout || config.waitForTimeout, 'waitForElement ' + selector + ' timeout is reached')

    return this
}

this.waitForElements = function (selector, count) {

    if (count) {
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

this.waitForElementDisappear = function (selector, timeout) {
    ptor.wait(function () {
        return ptor.isElementPresent(by.css(selector)).then(function (isPresent) {
            return !isPresent
        })
    }, timeout || config.waitForTimeout, 'waitForElementDisappear ' + selector + ' timeout is reached')

    return this
}

this.waitForModalOpen = function () {
    this.waitForElement("cm-modal.active")
}

this.waitForModalClose = function () {
    this.waitForElementDisappear("cm-modal.active")

    return this
}

this.waitForLoader = function (count, parentSelector) {
    count = count || 1,
    parentSelector = parentSelector ? parentSelector+' ' : '' // that used for more then one loader on page
    // wait for loader appear
    ptor.wait(function() {
        return  $(parentSelector+'cm-loader').getAttribute('cm-count')
                .then(function(value){
                    return value >= count
                })
    }, config.routeTimeout, 'waitForLoader start timeout reached')
    .then(function () {
        // wait for loader disappear
        ptor.wait(function () {
            return $(parentSelector+'cm-loader').isDisplayed()
            .then(function (isDisplayed) {
                return !isDisplayed
            })
        }, config.routeTimeout, 'waitForLoader stop timeout reached')

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

this.waitAndCloseNotify = function (check) {
    self.waitForElement("cm-modal.active [data-qa='cm-modal-close-btn']")

    //Click 'dont warn me again' checkbox:
    var checkbox = $("cm-modal.active [data-qa='" + check + "']")
    if (check && checkbox.isPresent())
        checkbox.click()

    $("cm-modal.active [data-qa='cm-modal-close-btn']").click()
}

this.getFileExtension = function (file) {
    return file.split('.').pop()
}

this.headerSearchInList = function (searchString) {
    self.waitAndClickQa("btn-header-list-search")
    this.searchInList(searchString)
}

this.searchInList = function (searchString) {
    $("[data-qa='inp-list-search']").sendKeys(searchString)
}

this.clearLocalStorage = function () {
    ptor.executeScript('localStorage.clear()')
    return this
}

this.getLocalStorage = function () {

    var execute = function () {
        for (var key in localStorage) {
            if (key.length > 25) {
                var res = {
                    key: key,
                    value: localStorage.getItem(key)
                }
                return res
            }
        }
    }

    return ptor.executeScript(execute)
}

this.setLocalStorage = function (key, value) {
    ptor.executeScript(function (key, value) {
        localStorage.setItem(key, value)
    }, key, value)
    return this
}

this.getToken = function () {
    var execute = function () {
        return localStorage.getItem('token')
    }
    return ptor.executeScript(execute)
}

this.generateKey = function (keyNum, keyName) {

    if (keyNum == undefined) {
        keyNum = 0
    }

    var path = 'test/e2e/keys/' + keyNum + ".key"
    var key

    // read key from file
    fs.readFile(path, function (err, data) {
        key = String(data).slice(0, -1).replace(/(\r\n|\n)/gm,"\\n")
    })

    ptor.wait(function () {
        return key != undefined
    }, config.waitForTimeout , 'wait for file timeout reached').then(function(){
        self.get('/settings/identity/key/import')
        self.waitForPageLoad('/settings/identity/key/import')
        self.waitForElement("[data-qa='display-private-key']")
        self.setValQuick("display-private-key", key)
        self.setVal("display-private-key", " ")
        self.click("btn-import-key")
        self.waitForElement("[data-qa='btn-save-key']")
        if (keyName != undefined) {
            self.clearInput("input-key-name")
            self.setVal("input-key-name", keyName)
        }
        self.click("btn-save-key")
    })
}

this.disableEncryption = function () {
    $("cm-header:not(.ng-hide) cm-security-indicator").click()
    self.waitForPageLoad("/conversation/new/security")
    $("[data-qa='btn-encryption']").click()
    $("[data-qa='btn-security-done']").click()
    self.waitForPageLoad("/conversation/new")
}

this.clickBackBtn = function () {
    self.waitForElement("cm-header:not(.ng-hide) cm-back")
    $("cm-header:not(.ng-hide) cm-back").click()
    return this
}

this.sendFriendRequest = function (displayName) {
    self.get("/contact/search")
    $("[data-qa='inp-search-cameo-ids']").sendKeys(displayName)
    self.waitForElement("[data-qa='btn-openModal']")
    $("[data-qa='btn-openModal']").click()
    $("[data-qa='btn-sendRequest']").click()
}

this.acceptFriendRequests = function () {
    self.get('/talks')
    $("[data-qa='btn-open-menu']").click()
    self.waitForElement("[data-qa='btn-menu-contact-requests']")
    $("[data-qa='btn-menu-contact-requests']").click()
    self.waitForElement("[data-qa='contact-list-element']")
    var clickAccept = function () {
        $$("[data-qa='btn-acceptRequest']").then(function (buttons) {
            var length = buttons.length
            if (length > 0) {
                buttons[0].click()
                ptor.wait(function () {
                    return $$("[data-qa='btn-acceptRequest']").then(function (buttons2) {
                        return buttons2.length == length - 1
                    })
                })
                clickAccept()
            }
        })
    }
    clickAccept();
}

this.addExternalContact = function (displayName) {
    self.get("/contact/create")
    $("[data-qa='input-displayname']").sendKeys(displayName)
    $("[data-qa='input-phoneNumber']").sendKeys("1233")
    $("[data-qa='btn-create-contact']").click()
    self.waitForPageLoad("/contact/list")
}

this.click = function (dataQa) {
    $("[data-qa='" + dataQa + "']").click()
}


this.waitForQa = function(dataQa){
    self.waitForElement("[data-qa='" + dataQa + "']")
}

this.waitAndClickQa = function (dataQa) {
    self.waitForElement("[data-qa='" + dataQa + "']")
    $("[data-qa='" + dataQa + "']").click()
}

this.waitAndClick = function (selector) {
    self.waitForElement(selector)
    $(selector).click()
}


this.setVal = function (dataQa, text) {
    $("[data-qa='" + dataQa + "']").sendKeys(text)
}


this.blurQa = function (dataQa) {
    $("[data-qa='" + dataQa + "']").sendKeys(protractor.Key.TAB)
}

this.getVal = function (dataQa) {
    return $("[data-qa='" + dataQa + "']").getAttribute('value')
}

this.setValQuick = function (dataQa, text) {
    ptor.executeScript("document.querySelector(\"[data-qa='" + dataQa + "']\").value = '" + text + "'")
}

this.createEncryptedConversation = function (subject, message) {
    self.get("/conversation/new")
    self.waitForPageLoad("/conversation/new")
    self.waitForElement("[data-qa='input-subject']")
    self.setVal("input-subject", subject)
    self.setVal("input-answer", message)
    self.waitAndClickQa("btn-send-answer")
    self.waitAndClickQa("btn-confirm")
    self.waitForPageLoad("/conversation/*")
    self.waitForElements("cm-message", 1)
}

this.getConversation = function(subject){
    self.get("/talks")
    self.waitForPageLoad("/talks")
    self.headerSearchInList(subject)
    ptor.wait(function(){
            return $$('cm-conversation-tag').then(function(tags){
                return tags.length == 1
            })
    })
    .then(function(){
        self.waitAndClick("cm-conversation-tag")
        self.waitForElement("cm-message")
    })
}

this.readConversation = function (subject, message) {
    self.getConversation(subject)
    ptor.wait(function(){
        return $("cm-message").getText().then(function(text){
            return text.search(message) != -1
        })
    })
}

this.scrollToTop = function(){
    $("body").sendKeys(protractor.Key.HOME)
}

this.scrollToBottom = function(){
    $("body").sendKeys(protractor.Key.END)
}
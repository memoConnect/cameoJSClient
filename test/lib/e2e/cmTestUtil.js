/**
 * http://angular.github.io/protractor/#/api
 */
var fs = require('fs'),
    config = require("../../e2e/config/specs.js"),
    clc = require('cli-color'),
    self = this,
    ptor = browser.driver

this.getBrowserName = function(){
    return browser.getCapabilities().then(function(cap) {
        return cap.caps_.browserName;
    });
}

this.isInternetExplorer = function(){
    return this.getBrowserName().then(function(browserName) {
        if(browserName.indexOf('explorer') == -1) {
            return false
        }
        return true
    });
}

this.getPtorInstance = function () {
    browser.ignoreSynchronization = true

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

var getCounter = 0;

this.get = function (_path_) {
    // console.log('util.get', path)

    var path = '';

    // http://angular.github.io/protractor/#/api?view=Protractor.prototype.get
    if(getCounter == 0) {
        path = config.wwwUrl + '#' + path
        browser.get(path)
    // http://angular.github.io/protractor/#/api?view=Protractor.prototype.setLocation
    } else {
        path = _path_
        browser.setLocation(path)
    }

    //console.log(getCounter, path)

    getCounter++;

    self.waitForPageLoad()

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

    return $$("cm-menu")
        .then(function (elements) {
            if (elements.length > 0) {

                $$("cm-search-input").then(function(elements){
                    if(elements.length > 0){
                        elements[0].getAttribute('class')
                        .then(function(className){
                            if(className.indexOf('visible') >= 0){
                                self.click('btn-close-search')
                            }
                        })
                    }
                })

                $("cm-menu .cm-handler").click()
                self.waitForElement(".cm-menu-list")
                .then(function(){
                    return self.waitAndClickQa('logout-btn')
                })
            }
            return self.waitForPageLoad('/login')
        })
}

this.login = function (username, password, expectedRoute) {

    self.logout()
    self.get('/login')

    this.scrollToTop()

    var user = $("input[name='user']");
    var pw = $("input[name='pw']");

    var loginUser = username || config.loginUser1;
    var loginPassword = password || config.passwordUser1;

    user.sendKeys(loginUser);
    pw.sendKeys(loginPassword);

    $("[data-qa='login-submit-btn']").click();

    if (typeof expectedRoute == 'string' && expectedRoute.length > 0) {
        return self.waitForPageLoad(expectedRoute)
    } else {
        return self.waitForPageLoad(['/start', '/talks', '/setup'])
    }
}

this.createTestUser = function (testUserId, from){
    //console.log('from ->' + from)

    this.logout()

    var prefix = 'testUser23_'
    var id = testUserId || Math.random().toString(36).substring(2, 9)
    var loginName = prefix + id
    var password = 'password'

    this.get('/registration')
    return this.waitForPageLoad('/registration')
            .then(function(){
                self.setVal('input-cameoId',loginName,true)
                self.setVal('input-password',password)
                return self.waitAndClickQa('icon-toggle-password')
                    .then(function(){
                        self.scrollToBottom()
                        return self.waitAndClickQa('icon-checkbox-agb')
                    })
                    .then(function(){
                        return self.waitAndClickQa('btn-createUser')
                    })
                    .then(function(){
                        return self.waitForPageLoad("/setup/account")
                    })
                    .then(function(){
                        return loginName
                    })
            })
}

this.deleteTestUser = function (loginName) {

    var testUserId = loginName.split("_")[1]

    ptor.executeAsyncScript(function (testUserId, apiUrl) {
        var callback = arguments[arguments.length - 1];

        var xhr = new XMLHttpRequest();
        xhr.open("DELETE", apiUrl + "v1/testUser/" + testUserId, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                callback(xhr.responseText);
            }
        }
        xhr.send('');

    }, testUserId, config.apiUrl)

    self.clearLocalStorage();
}

this.deleteKeys = function(){
    this.get('/settings/identity/key/list')
    this.waitForPageLoad('/settings/identity/key/list')
    .then(function(){
        return  ptor.wait(function(){
                    return  $('[data-qa="btn-remove-modal"]').isPresent()
                            .then(function(bool){
                                return  bool
                                        ?   $('[data-qa="btn-remove-modal"]').click()
                                            .then(function(){
                                                return self.confirmModal()
                                            })
                                            .then(function(){
                                                return $('[data-qa="btn-remove-modal"]').isPresent()                                             
                                            })
                                            .then(function(present){
                                                return !present
                                            })
                                        :   true
                            })
                }, 4000)
    })



}

this.getTestUserNotifications = function (loginName) {

    var testUserId = loginName.split("_")[1]

    return ptor.executeAsyncScript(function (testUserId, apiUrl) {

        var callback = arguments[arguments.length - 1]

        var xhr = new XMLHttpRequest()

        xhr.open("GET", apiUrl + "v1/testUser/" + testUserId+'?ts='+(new Date()).getTime(), true)
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
        xhr.open("POST", apiUrl + "v1/eventSubscription", true);
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
        xhr.open("GET", apiUrl + "v1/eventSubscription/" + subscriptionId+'?ts='+(new Date()).getTime(), true);
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
        xhr.open("POST", apiUrl + "v1/event/broadcast", true);
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
        xhr.open("POST", apiUrl + "v1/event/broadcast/identity/" + identityId, true);
        xhr.setRequestHeader("Authorization", token);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                callback(JSON.parse(xhr.responseText))
            }
        }
        xhr.send(JSON.stringify(event));
    }, token, event, config.apiUrl, identityId)
}

this.getIdentityId = function(token){
    return ptor.executeAsyncScript(function (token, apiUrl) {

        var callback = arguments[arguments.length - 1];

        var xhr = new XMLHttpRequest();
        xhr.open("GET", apiUrl + "v1/identity", true);
        xhr.setRequestHeader("Authorization", token);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                callback(JSON.parse(xhr.responseText))
            }
        }
        xhr.send();
    }, token, config.apiUrl)
}


this.waitForPageLoad = function (expectedRoutes, printOutWaiting) {

    expectedRoutes = !Array.isArray(expectedRoutes) ? [expectedRoutes] : expectedRoutes
    // console.log('waitForPageLoad', expectedRoutes.join(', '))

    var lastRoute

    return ptor.wait(function () {
        return ptor.executeScript('return window != undefined && window._route').then(function (route) {
            if(printOutWaiting)
                console.log(route)

            if (route) {
                lastRoute = route
                // get current route
                if (        
                        expectedRoutes.length == 0 
                    ||  expectedRoutes.some(function(expected_route){
                            return route.path.search(expected_route) != -1
                        })
                ) {
                    return route.status == "success"
                } else {
//                        console.log("Error: unexpected route: " + route.path)
                }
            }
        })
    }, config.routeTimeout, 'waitForPage ' + (expectedRoutes || 'any page') + ' timeout reached (lastRoute was '+lastRoute+')')
}

this.waitForEventSubscription = function () {
    return ptor.wait(function(){
        return ptor.executeScript('return window != undefined && window._eventSubscriptionId')
            .then(function (subscriptionId) {
                if (subscriptionId) {
                    return true
                }
            })
    }, config.waitForTimeout, 'waitForEventSubscription timeout reached')
}

this.click = function (dataQa) {
    return $("[data-qa='" + dataQa + "']").click()
}

this.waitForQa = function(dataQa){
    return self.waitForElement("[data-qa='" + dataQa + "']")
}

this.waitAndClickQa = function (dataQa, preSelector, printOut) {
    var preSelector = preSelector ? preSelector+' ' : '';
    return self.waitForElement(preSelector+"[data-qa='" + dataQa + "']",'',printOut)
        .then(function(){
            if(printOut) {
                console.log(preSelector + "[data-qa='" + dataQa + "'] click yo")
            }

            $(preSelector+"[data-qa='" + dataQa + "']").click()
        })
}

this.waitAndClick = function (selector) {
    self.waitForElement(selector)
    $(selector).click()
}

this.waitForElement = function (selector, timeout, printOut) {
    return ptor.wait(function () {

        if(printOut)
            console.log('waitForElement '+selector)

        return $$(selector).then(function (elements) {

            if(printOut) {
                console.log('length = '+elements.length)
                return false;
            }

            return elements.length > 0;
        })
    }, timeout || config.waitForTimeout, 'waitForElement ' + selector + ' timeout is reached')
}

this.waitForElements = function (selector, count) {
    if (count) {
        return  ptor.wait(function () {
                    return $$(selector).then(function (elements) {
                        return elements.length == count
                    })
                }, config.waitForTimeout, 'waitForElements ' + selector + ' count: ' + count + ' timeout is reached')
    }

    return this.waitForElement(selector)
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
    return ptor.wait(function () {
        return ptor.isElementPresent(by.css(selector)).then(function (isPresent) {
            return !isPresent
        })
    }, timeout || config.waitForTimeout, 'waitForElementDisappear ' + selector + ' timeout is reached')
}

this.waitForModalOpen = function () {
    this.waitForElement("cm-modal.active")
    return this
}

this.waitForModalClose = function () {
    this.waitForElementDisappear("cm-modal.active")

    return this
}

this.confirmModal = function(){
    return $('cm-modal.active [data-qa="btn-confirm"]').click()
}

this.closeModal = function(){
    return  ptor.wait(function(){
                return $("cm-modal.active [data-qa='cm-modal-close-btn']")
            })
            .then(function(button){
                return button.click()
            })
}

this.waitForLoader = function (count, parentSelector) {
    count = count || 1
    parentSelector = parentSelector ? parentSelector+' ' : '' // that used for more then one loader on page
    // wait for loader appear
    return  ptor.wait(function() {
                return  $(parentSelector+'cm-loader').getAttribute('cm-count')
                        .then(function(value){
                            return value >= count
                        })
            }, config.routeTimeout, 'waitForLoader start timeout reached')
            .then(function () {
                // wait for loader disappear
                return ptor.wait(function () {
                    return $(parentSelector+'cm-loader').isDisplayed()
                            .then(function (isDisplayed) {
                                return !isDisplayed
                            })
                }, config.routeTimeout, 'waitForLoader stop timeout reached')
            })
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

this.checkWarning = function (qaValue, shouldBeHidden) {
    var css = "[data-qa='" + qaValue + "']"
    var warn = $(css)

    if(shouldBeHidden){
        expect(warn.isDisplayed()).toBeFalsy()
    } else {
        self.waitForQa(qaValue)
        expect(warn.isDisplayed()).toBeTruthy()

        warn.getText().then(function (text) {
            expect(text).not.toBe("")
        })
    }

    return this
}

this.clearInput = function (qaValue) {
    var css = "[data-qa='" + qaValue + "']"
    var input = $(css)
    input.sendKeys(protractor.Key.chord(protractor.Key.CONTROL, "a"));
    input.sendKeys(protractor.Key.BACK_SPACE);

    return this
}


//this is not returning the promise, it maybe better to use this.closeModal(see below)
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
    return  self.waitAndClickQa('btn-header-list-search')
            .then(function(){
                return self.setVal('inp-list-search',searchString,true)
            })
}

this.closeHeaderSearch = function(){
    return  self.waitForElement("[data-qa='inp-list-search']")
            .then(function(){
                    if($("[data-qa='inp-list-search']").getAttribute('value') == ''){
                        return self.waitAndClickQa('btn-close-search')
                    } else {
                        return self.waitForQa('btn-list-search-clear')
                        .then(function(){
                            self.click('btn-list-search-clear')
                            return self.waitAndClickQa('btn-close-search')
                        })
                    }
            })
}

this.clearLocalStorage = function () {
    ptor.executeScript('window.localStorage.clear()')

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
    ptor.executeScript(function(_key_, _value_){
        localStorage.setItem(_key_, _value_)
    }, key, value)

    ptor.wait(function(){
        return ptor.executeScript('return localStorage.getItem("'+key+'")')
            .then(function (_value_) {
                if (_value_ != undefined) {
                    return true
                }
            })
    }, config.waitForTimeout, 'setLocalStorage can\'t get out of storage')

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
    }, config.waitForTimeout , 'wait for file timeout reached')
    .then(function(){
        self.get('/settings/identity/key/import')
        return self.waitForPageLoad('/settings/identity/key/import')
    })
    .then(function(){
        self.waitForElement("[data-qa='display-private-key']")
        self.setValQuick("display-private-key", key)
        self.setVal("display-private-key", " ")
        self.click("btn-import-key")
        return self.waitForElement("[data-qa='btn-save-key']")
    })
    .then(function(){
        if (keyName != undefined) {
            self.clearInput("input-key-name")
            self.setVal("input-key-name", keyName)
        }

        self.click("btn-save-key")

        //self.checkWarning('info-key-error', true);
        return self.waitForPageLoad(['/talks', '/authentication'])
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
    self.waitForPageLoad("/contact/search")
    .then(function(){
        $("[data-qa='inp-search-cameo-ids']").sendKeys(displayName)
        return  self.waitForElement("[data-qa='btn-openModal']")
    })
    .then(function(){
        $("[data-qa='btn-openModal']").click()
        $("[data-qa='btn-sendRequest']").click()
    })

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
                    return $$("[data-qa='btn-acceptRequest']").then(function (_buttons_) {
                        return _buttons_.length == length - 1
                    })
                })
                if (length > 1) {
                    clickAccept()
                }
            }
        })
    }
    clickAccept();
}

this.addExternalContact = function (displayName) {
    self.get("/contact/create")
    $("[data-qa='input-displayname']").sendKeys(displayName)
    $("[data-qa='input-phoneNumber']").sendKeys("+491233")

    $("[data-qa='btn-create-contact']").click()

    // close notify extern modal
    self.waitForModalOpen()
    self.waitAndClickQa('btn-cancel','cm-modal.active')

    self.waitForPageLoad("/contact/list")
}

this.setVal = function (dataQa, text, withClear){

    if(withClear)
        this.clearInput(dataQa)

    return $("[data-qa='" + dataQa + "']").sendKeys(text)
}

this.sendEnter = function(dataQa, withClear){
    self.setVal(dataQa, protractor.Key.ENTER, withClear)
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

this.addRecipient = function(username){
    self.waitAndClickQa('btn-add-recipients');
    self.waitForPageLoad("/conversation/new/recipients")
    self.headerSearchInList(username);
    self.waitForQa('contact-display-name')
    $("[data-qa='btn-select-contact']").click()

    self.closeHeaderSearch()

    self.get("/conversation/new")
    self.waitForPageLoad("/conversation/new")
}

this.createUnencryptedConversation = function(subject, message, recpient){
    self.get("/conversation/new")
    self.waitForPageLoad("/conversation/new")

    self.disableEncryption();

    if(recpient){
        if(typeof recpient == 'string'){
            self.addRecipient(recpient)
        }
    }


    self.setVal("input-subject", subject)
    self.setVal("input-answer", message)
    self.waitAndClickQa("btn-send-answer")
    if(!recpient){
        self.waitAndClickQa("btn-confirm", "cm-modal.active")
    }
    self.waitForPageLoad("/conversation/*")
    self.waitForElements("cm-message", 1)

    ptor.wait(function(){
        return self.getVal("input-answer").then(function(answer){
            return answer == ''
        })
    })
}

this.createEncryptedConversation = function (subject, message) {
    self.get("/conversation/new")
    self.waitForPageLoad("/conversation/new")
    self.waitForElement("[data-qa='input-subject']")
    self.setVal("input-subject", subject)
    self.setVal("input-answer", message)
    self.waitAndClickQa("btn-send-answer")
    self.waitAndClickQa("btn-confirm","cm-modal.active")
    self.waitForPageLoad("/conversation/*")
    self.waitForElements("cm-message", 1)

    ptor.wait(function(){
        return self.getVal("input-answer").then(function(answer){
            return answer == ''
        })
    })
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

this.readConversation = function (subject, message, checkModal) {
    self.getConversation(subject)

    if(checkModal){
        self.waitForModalOpen();

        self.waitForQa('btn-modal-handshake-link').then(
            function(){
                ptor.wait(function(){
                    return $("cm-message").getText().then(function(text){
                        return text.search(message) != -1
                    })
                })
            }
        )
    } else {
        ptor.wait(function(){
            return $("cm-message").getText().then(function(text){
                return text.search(message) != -1
            })
        })
    }
}

this.scrollToTop = function(){
    return $("body").sendKeys(protractor.Key.HOME)
}

this.scrollToBottom = function(){
    return $("body").sendKeys(protractor.Key.END)
}

this.scrollToElement = function(cssSelector){
    return $(cssSelector).getLocation().then(function(positions){
        ptor.executeScript('window.scrollTo(0,'+positions.y+');')
    })
}

this.setKeygenerationTimeout = function(jasmine){
    var expectedTimeout = 180000;
    beforeEach(function () {
        jasmine.getEnv().defaultTimeoutInterval = expectedTimeout
    })

    afterEach(function () {
        jasmine.getEnv().defaultTimeoutInterval = 30000
    })
    return expectedTimeout;
}

this.logCurrentUrl = function(){
    ptor.getCurrentUrl().then(function(url){
        console.log('logCurrentUrl:', url)
    })
}

this.printOutConsoleLog = function(clear){
    browser.manage().logs().get('browser').then(function(array){
        if(!clear) {
            console.warn('Browser console.logs')
            console.warn(JSON.stringify(array, null, 2))
        }
    })
}
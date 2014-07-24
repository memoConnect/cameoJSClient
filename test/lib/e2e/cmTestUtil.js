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

this.createTestUser = function (testUserId) {

    this.logout()

    var prefix = 'testUser23_'
    var id = testUserId || Math.random().toString(36).substring(2, 9)
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

        var callback = arguments[arguments.length - 1];

        var xhr = new XMLHttpRequest();
        xhr.open("GET", apiUrl + "/testUser/" + testUserId, true);
        xhr.onreadystatechange = function () {
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
//                        console.log("Error: unexpected route: " + route.path)
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

this.waitForModalOpen = function (id) {

    ptor.wait(function () {
        return $("cm-modal.active").then(function (element) {
            return element.isDisplayed()
        })
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
    $("[data-qa='btn-header-list-search']").click()
    this.searchInList(searchString)
}

this.searchInList = function (searchString) {
    $("[data-qa='inp-list-search']").sendKeys(searchString)
}

this.clearLocalStorage = function () {
    ptor.executeScript('localStorage.clear()')
}

this.generateKey = function () {

    var privKey = [
        '-----BEGIN RSA PRIVATE KEY-----',
        'MIIEogIBAAKCAQBm4mr3cxC3YQbYM0BA9pCRlGOBy8JGCz5W9iTpeYpVCrIu/7wz',
        'YiOz3Q5mTEukC5kGzeMKbK/8RK39LlfTH1E5gwSzG9YqkSlUI5HM4S9E7kM48zGi',
        'qooCCszDMZ6Gq3XvRk3HYkqcHiliUrj+Pmv1wzLuFCp8QIPMN+pENrq4mak4079R',
        'aVJ6VIc3Jw4vIS95SEmEiYrPz/wJUQsr1eciJ1J4Z/hrvji/nH+L9Rbx2rhxgSMK',
        's25ncUCB0uuZHoR0Pvk58ixEogmcdvj6TWDe//EE0GfzHaKyf2bf2FbtGZLK8YHL',
        'zJt+2sVGySrAUNw1A7CvpmogLu6nRBZOptb7AgMBAAECggEAPdxTrpcr7ObVA7fF',
        'IYpfIHlVX1yRYiYuhIEZbpxalYmJ24J+uXJ/vwziNJYZQPiMOTAgHEt/gTIWX023',
        'FsUUxHzHnZ3WJuADNojwiHy5PDv6hUqMhJ7/vfyaY575D0YW8hiWeZTbAYWNIoZU',
        'nuIPbcTBYa8UYIM1+9t+6ybxHD7c7vD00Xzxz7RUBXCOQ+ieJG13+6114WRNNKEp',
        'zdmzQrKVso1e1yfVMtJMvfM54EOVxjMAR4rSmYLzhsoPC3bPmBCX7LB/65yFwX4s',
        'cYdP0IzhPtuN/6kAx4SwY8URw1pHYntiNosm6SIOlOeSYsEksrQ6y7tLrqP1OaiD',
        'B/5GaQKBgQCmEfhfIwbUD/bDOP+cjr+hkoFZdNQVsh8NCX42hD+Wj/0RzDo6F6vr',
        'XWz0uu/pFxZ/gQ6g/x/YNN6dS93w9DqFVS7K/GoA6DrHCcx92K1XhTKyHLbc1Trj',
        'Jci8Clz8YYgox0lDI4TQYT3e1To7AoPByhxuD71nlAMR4VI5wc7grQKBgQCemR0w',
        'Ll+P131IVllDEY2iN1aCwSYKY+LZkT3syHafl+224m6BgozxiUx5gFa04KLu81BT',
        'eUqC+MnC4jEm6lCKwR7gR2Qb7JmPph+zQfrgdJHjJLH5lzXer0XJ8X4L3JZab9jj',
        'FnRdKIIJ1meXSZ5OEsblsm53ulG9GR3OikaDRwKBgDU/K8itPWI/IBqmKubyqiTP',
        'CaQ6Hko6i1QtyAcIzi6jSjwrpDu+HURg9y9cxNGSsob9RUh/pKE5CmuayLWaSS05',
        'C8DPv9k8nKP201dCYwndzkxngoY55CCym7MXC4tsZjDU/PuG5u29UA4jhgEnpEE9',
        'YXI0n8EXJwjTmv6j0oYdAoGBAIQ8vm2R/PP+hONvu/WECUgcQ/G6AnHfXyJxS+TG',
        'MMJY90fp/KHXrJUoGa+lJqaiNrht/6faFhqmPfRUjQ8ZiBZpd8khPYNa/58asIvS',
        'k8/a4lk2G380aSJHmjULOkHBp0u4vmp6KoQSZnq1XqJyK6CFX3neEOWbYNP+wS+Z',
        'c7m5AoGADULVNWSkHn0yoLB7QPq7iVWbXPYHiT8Myrsc7i6C8t0dxLFOyTVf2Y3B',
        'aO75+8RJOoDAs63t/BxhRP2usszjarvTx9sP4H2c8r1ERmMu1vLNWMV0Dpq/Zl3D',
        'b8stI0PXwZcu1IP8j4P3fv31IGXjnrKs81t9uCCTLdeM1eJrNsM=',
        '-----END RSA PRIVATE KEY-----'].join('\n');

    self.get('/settings/identity/keys/import')
    self.waitForElement("[data-qa='display-private-key']")
    self.setValQuick("display-private-key", privKey)
    self.setVal("display-private-key", " ")
    self.click("btn-import-key")
    self.waitForElement("[data-qa='btn-save-key']")
    self.click("btn-save-key")
}

this.disableEncryption = function () {
    $("cm-header:not(.ng-hide) cm-security-indicator").click()
    self.waitForPageLoad("/conversation/new/security-settings")
    $("[data-qa='btn-encryption']").click()
    $("[data-qa='btn-security-done']").click()
    self.waitForPageLoad("/conversation/new")
}

this.clickBackBtn = function () {
    $("cm-header:not(.ng-hide) cm-back").click()
}

this.sendFriendRequest = function (displayName) {
    self.get("/contacts/search")
    $("[data-qa='inp-search-cameo-ids']").sendKeys(displayName)
    self.waitForElement("[data-qa='btn-openModal']")
    $("[data-qa='btn-openModal']").click()
    $("[data-qa='btn-sendRequest']").click()
}

this.acceptFriendRequests = function () {
    $("[data-qa='btn-open-menu']").click()
    self.waitForElement("[data-qa='btn-menu-contact-requests']")
    $("[data-qa='btn-menu-contact-requests']").click()
    self.waitForElement("cm-contact-tag")
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
    self.get("/contact/new")
    $("[data-qa='input-displayname']").sendKeys(displayName)
    $("[data-qa='input-phonenumber']").sendKeys("1233")
    $("[data-qa='btn-create-contact']").click()
    self.waitForPageLoad("/contacts")
}

this.click = function (dataQa) {
    $("[data-qa='" + dataQa + "']").click()
}

this.setVal = function (dataQa, text) {
    $("[data-qa='" + dataQa + "']").sendKeys(text)
}

this.getVal = function (dataQa) {
    return $("[data-qa='" + dataQa + "']").getAttribute('value')
}

this.setValQuick = function (dataQa, text) {
    ptor.executeScript("document.querySelector(\"[data-qa='" + dataQa + "']\").value = '" + text + "'")
}





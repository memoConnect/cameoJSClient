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

this.generateKey = function (keyNum, keyName) {

    var privKeys = []

    privKeys[0] = [
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
        '-----END RSA PRIVATE KEY-----'].join('\\n');

    privKeys[1] = [
        '-----BEGIN RSA PRIVATE KEY-----',
        'MIIEowIBAAKCAQB7lfMPMFBL7j+riZfyrtMgX0JQiWSHCFJAAaByUdRh9qynARA2',
        'ucbpwwiMzUOWO5CBJG+DKxQAil0vn9/DEqffGt11vQouOf0De3yUefeli2ryLXGX',
        'DWdpAhL110JXB9fyBHyICBlOJlqmKbyzDXwyB0C7rbYmVDX3jVY/nD67y7Z1nflt',
        'tNU/f9OlzW8fJi1ghAAvE25kHeniXaQw0XXqAD2s9pg1Vx0wTBlHYaUFokCSle2L',
        'fN8Psqq4/HNS5C9pRNzMgcIyt+L+LLoThwR3yYXlCcfgkTJhSVFFf0YshHnW7Nn1',
        'F/Nq26f7YHn0ieWC3i8cVhp/HKwRZYGmxu7tAgMBAAECggEAamU0pL3eUxBgpihF',
        'tTtHLdZ0u+scrZe/X7VG0USbiF8aUoh60fJsSfGLWdSZPCw5gsTAb/dVOAXmpcqI',
        'lGNqPIvfXq6JpjRsG2RjY1wBlPaK8sWmxflXLrMHabiRN2XcRlIQd/go+PvSDL1f',
        '4/JXGqbd1vV9HFBhSabXOtojs/44E/j0G+sKyeppV5qBIJKZB7EVL0h16NJuefsN',
        'JVH+AeKYW3alpguTupdAXv3GuOdwGqWm2n5ZZCTS4S2YDHr332PyfbtgV08v5bNw',
        'nVkFFBshCkY+sCx3XoSFRdLdvRl0uMi2mYHZYGIwbqJbNSyOJbQkggaor8f8ctoK',
        'fYfiTQKBgQDlB0K22MJwftuqEWZroeCJ4ksMCzubRVWOFAwbeT73z3ZLWUc4Sy88',
        'mBtmxRSyIAOOR8xBxtAp0oGKFUNqmhcG7g65h7psOy+XCmrIE9n2cctL42PrfAiT',
        '3LcCwJj+jFdA+WsM8v0J/Nhb0aIXL93rIhH9nayyCQkUsU1hTIFZXwKBgQCKI87m',
        '/yRfmlPGCjpokkR3HLuwHpKDAhGnMQxSPF6syL3szNhT9vtTkJhHp3AXdcm0pYkF',
        'YAW8Ne07IN5yoIf9WjsEE3jjyWh+Yo2GNOZ/9HNrmPUCkoTIX+toL2ghd42b8zrQ',
        'D5MK2b6QAX599T6uginrdLqS84Mc7XFtpdR/MwKBgQC6WET81rKlq2H5Jv0pd+Vk',
        '6t1a6EzQUgKBfmg3dlg4cvFx7ysWb334lF4/KP1kzM13140mu6elT6ScgB6BPuyb',
        'c9hBNmEFLMbU4uHs9tHyRbY+gb5L3HhyLjQtph0Vh4R61jU2rQIbPUGgu5lhuk2a',
        'wfbXXpIjrVxZHMWz8/aOiwKBgDwTsqn3kIQbhA9+50QPSMNctau0wBdF0RObWzZw',
        'luQiMadIt1Rc95SyL+gJw9AQI/byfxLdXeEqus+aTeQgOMRQd5YgOdUnBNDiX5Zc',
        'b1p6n6/Nx9CklCbowGKBK5JSgj2unIdcHqD7bcsHO1HgVLBkX4LNM08xpHXyNgBv',
        'vGjNAoGBAJVc07lKWzXGlsrFCdSY/FXqp7QUorxNHJIaG73ITPaZYSm7UMg3Mm3G',
        'cfDbnCTzOq9PVWxWp69y/trGd16gJUGPBCSx13E+oVDhPuXi5NM5YpofQbVafyS1',
        '0jP6c1HaYFtt7PvDNd+Gg15CnTBJ9MbAXt7RoM89oUxafuv5LWke',
        '-----END RSA PRIVATE KEY-----'].join('\\n');

    privKeys[2] = [
        '-----BEGIN RSA PRIVATE KEY-----',
        'MIIEogIBAAKCAQBrynjddZdgxQfjvezn4raK05dQR1du/yiP6qhF3jnOQnhPSYJH',
        'LsNjo7v5Zwj/pnPstC0BFt0nMDDqhQokew0aDLa0Ohsa84O4I+yC9d2lXcfhmDTQ',
        'vuZP+YKX9qKymhd9tiAtJa2TAoT3LMbkb5lwr4P9/ZyGXkwmFl/24UrgISX4UiYD',
        'gXaso+wa4RHpDDkO2SCV02oEODHdxRoe6yGTMLBCgREkAM3PKp79ZctBOu7POBEN',
        '7M9J8Ih1YPJN6Uh/fCa2a8QoR2R5A1mhmCvX1c+Oquh95YRPnApVer1rBB4CtGet',
        'CbPIQPcleSgqBlOf82sh3UhEUN7qo8Lv07/3AgMBAAECggEAGH12HIrdC+V4N2wt',
        'aTn/U2djl5+948AhTSF5ffZRl+VORGVlLhsX1Ymb6bxZNQxyhjMhjn/NW1v9oSr8',
        '9PDoNyTwVd5lzifJo4q178NAypOWGFFmno7g8Qa1fyVQLdgIwk0g3mETILWP1EDe',
        'J4SbjhiymoCGkZjXIEgxIXxqcKWL6O5m57E4fmOYG5xnDs2tV2greI/tM+nBcBNq',
        'rEE49XVImnT/ip6uOP9cN86dIkOgRYHikPOvKORgK46appoOAMU6KCg8WSOawDv4',
        'cZs7txQvUBBTmhcJNGg8ukKrjDPTQjoIXIDm3h4KNwhiGqsSTJiJnaxPzDqMNyBj',
        'Ja0IIQKBgQCmjmZ0FujPP8T7FfotxQK9vUBfTCNbIVbaWds4jMpiF8XFI5EeCjIt',
        'SyeA21/1pzRUBUX2IvgSw9KwKR8M+3I40vOfI09C5tydUDolecK34bg4Pq/QWM3v',
        'rNtsZc16N1j4TmAny0pHgnCFb7oIo7RGIrUUweFYPUay7GlU2mfyTwKBgQClrTUt',
        '/EYgKNIJ0yMoTnTDEAgu7juQa04u3+FOaBOF6LmXZYmeUBBJ8EPPcFaxYO7M+OEV',
        'Q6HDJn+edm9iXIckq1fS47RGFr7aNi8Th/JiAb1W3qcHDFLWxMTuFIxkraUJMqxw',
        'LymDU+5alZ7H/tsYvS+msiHfuDAXZtpaLGM12QKBgQCNfDocM7nhFFLI2IqFhu4l',
        'MDcWvR7rsw6MvfgzuaXSXk9qgCQuWIr3XvhXxgNmMnuJRFGCHYKOrjqz2rq91Hvb',
        'OZgqf1w9gM+38wbx/tUiT2SmotnHKykFiNl8454BTDMP+8RDCbY3uN7M+3QVErt5',
        'ONKKp4g95Q/BvoJbyoyykQKBgC0Yw6P7yl7QnbOc7DH5gSDjiUa1BDOgccyiliKQ',
        'g9fsbDBArEASjQyDQQIDEyX/O6FBkYsHOM30+cH5fQIqK4MYvLQj1RtK77JYE2Je',
        'm+R/krlFq/NoMFhTgUNJBpoVBhpF19hFjig4PWYc2faYcaz/OixGyp+p9DU6gu8O',
        'rAapAoGAL/DmAWKP33pt2x0QBSyVBHsN3R6tip9nmVxeMG/q4ZUGOADZx7Tw7cRI',
        'XULsD37don9PMMQrh0vs/kI1K+UhDo4tBEegg1xGpKHwUlkCloMBqD1tc0jOKQem',
        'E021mUW/uBHAB981w5n3lTfTVeB90sOtlioHxqBitcGYDMelO0s=',
        '-----END RSA PRIVATE KEY-----'].join('\\n')

    if(keyNum == undefined || keyNum >= privKeys.length){
        keyNum = 0
    }

    self.get('/settings/identity/keys/import')
    self.waitForElement("[data-qa='display-private-key']")
    self.setValQuick("display-private-key", privKeys[keyNum])
    self.setVal("display-private-key", " ")
    self.click("btn-import-key")
    self.waitForElement("[data-qa='btn-save-key']")
    if(keyName != undefined) {
        self.clearInput("input-key-name")
        self.setVal("input-key-name", keyName)
    }
    ptor.debugger()
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

this.stopOnError = function() {

    if(config.stopOnError) {
        var passed = jasmine.getEnv().currentSpec.results().passed();
        if (!passed) {
            jasmine.getEnv().specFilter = function (spec) {
                return false;
            };
        }
    }
}





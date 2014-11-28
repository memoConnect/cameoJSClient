var config = require("../config-e2e-tests.js")
var util = require("../../lib/e2e/cmTestUtil.js")

// start init tests
describe('Textarea Resize', function () {
    var ptor = util.getPtorInstance()

    it('login & open new conversation', function () {
        util.login()
        util.waitForPageLoad('/start')

        util.get('/conversation/new')
        util.waitForPageLoad('/conversation/new')
    })

    it('default',function(){
        var textarea = $("[data-qa='input-answer']")

        expect(textarea.getAttribute('value')).toBe('')
        expect(textarea.getAttribute('rows')).toBe('1')
        expect(textarea.getCssValue('overflow')).toBe('hidden')
    })

    it('check rows calculation max 8 text with newlines', function(){
        var textarea = $("[data-qa='input-answer']"),
            oneRow = 'moep moep moep',
            twoRows = 'moep moep moep \nsecond row',
            fourRows = 'moep moep moep \nsecond row \nthird row \nfourth row',
            moreThanMaxRows = 'moep moep moep \nsecond \nthird \nfourth \nfifth \nsixth \nseventh \neigth \nninth'

        textarea.sendKeys(oneRow)

        expect(textarea.getAttribute('value')).toBe(oneRow)
        expect(textarea.getAttribute('rows')).toBe('1')

        util.clearInput('input-answer')
        textarea.sendKeys(twoRows)

        expect(textarea.getAttribute('value')).toBe(twoRows)
        expect(textarea.getAttribute('rows')).toBe('2')
        util.clearInput('input-answer')

        textarea.sendKeys(fourRows)

        expect(textarea.getAttribute('value')).toBe(fourRows)
        expect(textarea.getAttribute('rows')).toBe('4')
        util.clearInput('input-answer')

        textarea.sendKeys(moreThanMaxRows)

        expect(textarea.getAttribute('value')).toBe(moreThanMaxRows)
        expect(textarea.getAttribute('rows')).toBe('8')
        expect(textarea.getCssValue('overflow')).toBe('auto')
        util.clearInput('input-answer')

        expect(textarea.getAttribute('value')).toBe('')
        expect(textarea.getAttribute('rows')).toBe('1')
    })

    it('check input without newlines', function(){
        var textarea = $("[data-qa='input-answer']"),
            longText = 'mmmmmmmmeeeeeeeeooooooooooppppppppppppppppppppppppppppppppppppppp'

        textarea.sendKeys(longText)
        expect(textarea.getAttribute('value')).toBe(longText)
        expect(textarea.getAttribute('rows')).toBe('3')
    })
})
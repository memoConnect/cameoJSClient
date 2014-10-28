'use strict';

describe('Filter cmAutolink', function () {
    var element,
        scope,
        textDefault = 'hallo moeper',
        textWithLink = 'juhu http://www.moep.de alter verwalter',
        textWithTwoLinksAndBreak = 'juhu http://www.moep.de\nhttp://www.peom.de alter verwalter',
        noneLink = 'moep.de/123',
        linkFull = 'http://www.moep.de/123',
        linkWithHashTag = 'http://localhost:8000/app/#/conversation/123',
        linkFullHttps = 'https://www.moep.de/123',
        linkWww = 'www.moep.de/123',
        linkLong = 'https://memo-berlin.atlassian.net/secure/RapidBoard.jspa?rapidView=1&view=detail&selectedIssue=CAM-500',
        linkUmlOe = 'http://dasörtliche.de',
        linkUmlUe = 'http://dasürtliche.de',
        linkUmlAe = 'http://dasärtliche.de'

    // example:
    // <div ng-data-bind="www.google.de | cmAutolink:50"></div>

    beforeEach(module('cmUi'))

    function createDrtv(text, truncateSize) {
        inject(function ($rootScope, $compile) {
            scope = $rootScope.$new()
            scope.text = text
            element = angular.element('<div ng-bind-html="text | cmAutolink'+(truncateSize?':'+truncateSize:'')+'"></div>')
            element = $compile(element)(scope)
            scope.$digest()
        })
    }

    it('default should have no link', function () {
        createDrtv(textDefault)
        expect(element.html()).toBe(textDefault)
    })

    it('text with link will replaced by a html a-tag', function(){
        createDrtv(textWithLink)
        expect(element.html()).not.toBe(textWithLink)
        expect(element.find('a').length).toBe(1)
        expect(element.text()).toBe(textWithLink)
    })

    it('text with link will replaced by a html a-tag', function(){
        createDrtv(textWithTwoLinksAndBreak)
        expect(element.html()).not.toBe(textWithTwoLinksAndBreak)
        expect(element.find('a').length).toBe(2)
        expect(element.text()).toBe(textWithTwoLinksAndBreak)
    })

    it('that not should replaced by autolink', function(){
        createDrtv(noneLink)
        expect(element.find('a').length).toBe(0)
    })

    it('links should replaced by a html a-tag', function(){
        createDrtv(linkFull)
        expect(element.find('a').length).toBe(1)
        expect(element.text()).toBe(linkFull)

        createDrtv(linkWithHashTag)
        expect(element.find('a').length).toBe(1)
        expect(element.text()).toBe(linkWithHashTag)

        createDrtv(linkFullHttps)
        expect(element.find('a').length).toBe(1)
        expect(element.text()).toBe(linkFullHttps)

        createDrtv(linkWww)
        expect(element.find('a').length).toBe(1)
        expect(element.text()).toBe(linkWww)
        expect(element.find('a').attr('href')).toBe('http://'+linkWww)
    })

    it('long links should be truncated default at 50 letters', function(){
        var truncate1, truncate2
        createDrtv(linkLong)
        expect(element.find('a').length).toBe(1)
        truncate1 = element.text()
        expect(truncate1).not.toBe(linkLong)

        createDrtv(linkLong,30)
        expect(element.find('a').length).toBe(1)
        truncate2 = element.text()
        // because of truncate text isnt the same like before
        expect(truncate2).not.toBe(linkLong)
        expect(truncate2).not.toBe(truncate1)
    })

    it('links with umlaut', function(){
        //linkUmlOe linkUmlAe linkUmlUe
        createDrtv(linkUmlOe)
        expect(element.find('a').length).toBe(1)
        expect(element.text()).toBe(linkUmlOe)
        expect(element.find('a').attr('href')).toBe(linkUmlOe)

        createDrtv(linkUmlAe)
        expect(element.find('a').length).toBe(1)
        expect(element.text()).toBe(linkUmlAe)
        expect(element.find('a').attr('href')).toBe(linkUmlAe)

        createDrtv(linkUmlUe)
        expect(element.find('a').length).toBe(1)
        expect(element.text()).toBe(linkUmlUe)
        expect(element.find('a').attr('href')).toBe(linkUmlUe)
    })
})
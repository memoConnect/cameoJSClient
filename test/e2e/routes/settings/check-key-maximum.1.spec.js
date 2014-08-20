var config = require("../../config-e2e-tests.js")
var util = require("../../../lib/e2e/cmTestUtil.js")
var ptor = util.getPtorInstance()

describe('Check key maximum: ',function(){

    var privKey = [
        '-----BEGIN RSA PRIVATE KEY-----',
        'MIIEpQIBAAKCAQEA2tXZzqdfH8CVhJFCMuuZ1seF6TPF/8XkFKrLbfVwvZoF5Jof',
        'LauafppvcHO2rqtl0+psWidkgebkFMgjhGIDdruwmsnrf3RSJ5S6xAV7/Z2Mn13X',
        'CPuIE0WQiNipZB8VlMZOfFRp+rLtkRemI+Xq+8TCArmatkN3JTbnEKDhjUgMrqxk',
        'QqK+40ZEdECF0q6H3BYA+ymOVPWp+5uhg36t9+DwNXWMgNwiZX5S8QjQov+/pnwg',
        'FB8OcI63RerXBfrYNLigT6WSTEwBe22Zy6T5lyvhfcrt945fcGH+WZ9pMH2yeFAU',
        'vl5d5hIjIG5WOLRA+0utV2ADOa618UE8GxPhAwIDAQABAoIBACJaT8bRH22sncwh',
        'wXKc6Zl92Ney+PId7qAP779jOD+LXkF0sFBLEAWv2K6ee58P6PxLYJcGeBCsXkGk',
        '6W5utHx/GkoySHXJnNv5zRfYhI5bnSenY4pVchcUZIwW9wBwoMKqHsgFuF1SmVid',
        'jcc04J6FVK9404CpNprw83T4zG+RBXc40s0SaqVx6XhgDb5RuXkCBCREfdFRqlN/',
        '1U8glQtggp7fVvisjHZDvP4IS9DQfC5Zv3nXgckEIkRtjWuxJEKxHzplvcEpg3b5',
        'NrPu3CFh3RwygjeGQTQg20MhqnB/QA2tXj1D2dgPE/Guj37WtNYqx/S2vS2821A0',
        'PuFfVQECgYEA/AdohbeiwLcWxhGVI+QPQc21TvwKTFOOfdnn3RHKYrkdek6bG93r',
        'A1Ecq9dAhkaHOZy64XAoBO4hK8lIJDEMxOoL0F+sA3e/GiiIUxQr7fAE8axbFXcD',
        'cMXNvWVcyvzwHlOiON0GHydtIsvkzjtzZyACE/Hru7UynjZq7GlFRJkCgYEA3kiN',
        'Rk8ma3a44Hfug9BgkqEA0OUHUWNbVjSPUWjMee1n8IrV6kQZNIJC6ldcjJ9zBkQi',
        'C5cNCxbI1bmN8xlx29sQTERBatOSwq7yePPZylpcuOyE/HuN5nH+LCbmT7cYHZNs',
        'qqUsq+9kmmOanyVPfZE+f4e559qhSsObaQkK9/sCgYEAg2lpeq+x0UKmQUjRtxEn',
        'U2xraW/J/tpipgSE/aRVHvze/fMWtYUVEXmttXxbTKhhwgyS9RGCDHAOI8KkNxrM',
        'SbCv0ErSakx5/K29x3PxI/PO4CS6qYqQ5LB/Ao5jwAP7QBTjtTqqAnyQT2B5QX+G',
        'QPNTogq2m/1zE0PUpMiPMaECgYEAzbVC2LBjE8yZJ1KWLvJmjQvm32s0rINQgaS+',
        'hU6A/M1SBW/Wq6g90zRBjPEwOwtMvZ3MDAHMFlkNn4zK6xC/KAHBQXNhPuVxyi1x',
        'Q7IX+YZKjPCF2crV9U/FM0MEnP0KmkRWqk2V27/90EshSuqSd9g0iH0o9IKGBdSk',
        'PD4cIoUCgYEA65e39Jf4VyTTPBgXAgQkDqMfwxnZyscd2wnJiWX5gzEhkUNaEfjp',
        't9IfzCAYgru01omROapCFBLU1TLilfsWWqX2j8EnQBD/w2Yrc3evHPeZsKjTqPHK',
        'SS947dx+ZdNKY4lkIDTu5QVqz1NVKCVWWid0jAfjhnA9+QK0z9f6unw=',
        '-----END RSA PRIVATE KEY-----'
    ].join('\\n')

    afterEach(function() { util.stopOnError() });

    it('login',function() {
        util.get('/login')
        util.login()
    })

    it('open keyoverview and a message should be present',function(){
        util.get('settings/identity/keys')
        expect($("[data-qa='message-no-keys']").isPresent()).toBe(true)
        expect($("cm-footer").isPresent()).toBe(true)
    })

    it('import a key', function(){
        util.click("btn-import-key")
        util.expectCurrentUrl("settings/identity/keys/import")
        util.setValQuick("display-private-key", privKey)
        util.setVal("display-private-key", " ")
        util.click("btn-import-key")
        util.waitForElement("[data-qa='btn-save-key']")
        util.click("btn-save-key")
    })

    it('check if message and footer for create/import disapear', function(){
        util.expectCurrentUrl("settings/identity/keys")
        expect($("[data-qa='message-no-keys']").isPresent()).toBe(false)
        expect($("[data-qa='canCreate']").isPresent()).toBe(false)
        expect($("[data-qa='canNotCreate']").isPresent()).toBe(true)
        $$("[data-qa='key-list-item']").then(function(elements){
            expect(elements.length).toEqual(1)
        })
    })

    it('check closed routes', function(){
        util.get('settings/identity/keys/import')
        util.expectCurrentUrl("settings/identity/keys")
        util.get('settings/identity/keys/create')
        util.expectCurrentUrl("settings/identity/keys")
    })

    it('remove key and check if message and footer for create/import appear', function(){
        util.waitForElement("[data-qa='btn-remove-modal']")
        util.click("btn-remove-modal")
        util.click("btn-remove-key");

        util.waitForElement("[data-qa='message-no-keys']")
        expect($("[data-qa='message-no-keys']").isPresent()).toBe(true)

        $$("[data-qa='key-list-item']").then(function(elements){
            expect(elements.length).toEqual(0)
        })

        expect($("[data-qa='canCreate']").isPresent()).toBe(true)
    })

    it('check open routes', function(){
        util.get('settings/identity/keys/import')
        util.expectCurrentUrl("settings/identity/keys/import")
        util.get('settings/identity/keys/create')
        util.expectCurrentUrl("settings/identity/keys/create")
    })
})
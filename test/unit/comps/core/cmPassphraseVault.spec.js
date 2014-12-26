'use strict';

window.Worker = undefined

describe('cmPassphraseVault', function () {
    var cmPassphraseVault,
        cmUserModel,
        cmIdentityFactory,
        cmKey,
        $rootScope,
        passphrase = 'akjdshfiu3z97zaweoun83w78nrwz4d97qt4wr9aw7f4wfsa876fo87as6fontma97femta97ftewmf97tm',
        identity1,
        identity2,
        identity3,
        vault1, 
        vault2,
        vault3,
        vault4,
        vault5,
        key1_plain =   ['-----BEGIN RSA PRIVATE KEY-----'
                        ,'MIIEowIBAAKCAQEAm2NqiVoqfxXZiYVRMLCUXqnqlMLyce2ZPubTVeLau3MqN5k6'
                        ,'DOY4h8AnI1nfukp7L0ehkM24l+kaQp0s8rwe301BpnlwaMd72oTeHH/bwIlPZS5K'
                        ,'Sl/VqPoEeukNNYr+Lla3G7yizF03v9IDzW3UkvIyvz4X7ykIvakH6ByWPdajOhL+'
                        ,'QyE5JN5HzLQJLqB0NpsU8qKMroYmnpesoEAzoopt3DT4WYOiqWP3n9bNwON/lcV0'
                        ,'afdSGKNMgbJlRlHlWQL+tZI7Lgxk4yR8sEEQQHSC/o8B6YpMPraiqxUdmsa2IsvE'
                        ,'ZoTwBgzHWNRFOs9ZPw5fypDF5PEtMVfErH3HeQIDAQABAoIBAD06j2BQBy7MjUuD'
                        ,'HNryuYQTsDuuFZqO5TPEAMJ3AXmbh6cg2Z77mIrlTIbBg0cE0kVvFFratUImuBJH'
                        ,'nM6JEiErcBMJByJCeKtCb8MLHqxfbsmP0/Y6jRZobhuAeZP/kOjxgnWLfxrIII+V'
                        ,'UapA/OJqTVTOQuAaazdQw6zSluEGdPISDR5n3JiO25HbwAbHav16KCkT9J64tBjr'
                        ,'ROX97KtJ7/BzNZDSa3XAfr0eaGZp+nDKlaGVYKv7VEuZWcb5QQN59A6bJ6y/i+88'
                        ,'r/3wBYq6JFGxQt5XoKcSsnOepCnY9mZPCdRl9ZHKNndwckRDAgql1eJqqKImngz7'
                        ,'vaMoYAECgYEA1n0F30njxBlZ3lHbCpGOjlUXnJUfDau8q/LT2qFa8QQO68reBINe'
                        ,'ntPMUdxp3a8ZW45/gg9bSjgBqHAommutzOmkCdVRvgN6mLda76NafjnXT1MFXPTf'
                        ,'N6UiCpP7+dfMiMuZ262Ltny2utv6Q2sQlYJVs5By1JTyKO8oC9x0veECgYEAuXY9'
                        ,'qhJo92uFzHJeXmPlT3fTrApwfEm2k46WKWDjzmx0Qlx9mB5kfydRVnsgbpgcSxlO'
                        ,'IX/uzc/bsLBVFHJnG/T45O4PGSmL18MEj/VtCf0ZuMl1xcrZZ7m+2WA1IwsEAjSQ'
                        ,'SCxJYjkUnmT9wdgZbaJQTPpZeKPozxZ4lAaJzJkCgYEAmaGHeT5VtHpsEoATIujL'
                        ,'cUul0/RD/+jJBWizMmBs4UGE5oOyrwzh02XlbaUw9yaaRSg2UJRrUSf4mAtuKd2C'
                        ,'6clYQ+rV2AJp58U9j3Q0N0F65UiUCNcko5jWXzlMPNLDoCAlnmIaNqXxxLoX8f5Y'
                        ,'LJ7kf++xMG9XXNagmo5X2EECgYB4BJ+1LsLE0s08WArf1I+x1J6jqAHRPLatWMmu'
                        ,'L2hczmySAV65kXmBm8UUTQvY5hDxPIgGP88fW1MVTZdRaxN00Rw8sh4NL4iy8R5D'
                        ,'txSAMU1y+tR/Ul1MtbRe4dahPeCzOKbiPd6jdML2Ge7pgdo6y55homVCH/hqA2W2'
                        ,'jWChiQKBgFW2+v22sIknYehisgQMkKb8TPkZjMay7E4CsB6Lpd+jru6D3agkd4ef'
                        ,'ilJns7qEL7B+Mlru0qUbsp74m0cnezltZ/0zz2HiJa1fJUD3+AiUXAE0JpQJsyB3'
                        ,'kS8sazAGHA6y2M85F3AiQV0IxtXyVU1rcHqycvU81wvoMorFrsIY'
                        ,'-----END RSA PRIVATE KEY-----'].join('\n'),
        key2_plain =   ['-----BEGIN RSA PRIVATE KEY-----'
                        ,'MIIEpQIBAAKCAQEA6pap8EqXwCyoA1c1m4V4Y60TsBIwCdwYkrZRrSYP6wxUm7Bb'
                        ,'sm7J5cgpe/8W24ZZlAEUA82llsPUTkTlE4mH3k5E6A+0StpGJkXmek/n+xD5KFhx'
                        ,'+xfzh3zRs3VPozVPyDmlxb+OU2aue+k3SNhykjtDK/CHIORDOm6rvM7sWJIlH9Cg'
                        ,'DHLMGYV10YbAH0aqtZDJRRdQPxLjeRbbUhnjbAZgAvpoKZyxKmDvYoi7BD9QMQ/b'
                        ,'x9ARiUj1l+JHepp/+eaHYY1uwaO4n4hixyr1ylz1613GjI6DPUdFnUfyoPpfHFH2'
                        ,'4vv24/CcWucy/QEOuiFt253qDzymHT/u/Fv2pwIDAQABAoIBAQCuAmY6BMq91SIn'
                        ,'oDf2jbG4ljjFYShbF/TuVukM++/Q1YupFM9f8wg2Nxx2isiEvAqUW5xiGdgbllVU'
                        ,'XYxiyqCLCRnZ3VRKNdDVMQJ+delI9dUr1TdvHtwZA0B10q3pDXGJvyE1JxtGyCLj'
                        ,'bSICGfQafnUcEcXaYxdvL4qaeg8cvpeG3man5ipfQ7guMQIpYkZwJ2rQ7UJbFKV7'
                        ,'0VkTuK1wQO3lU3WUHNsbkYRf2+fefpL3S7hXBXH7BXho8LXzNLg/ZRednNU68DhA'
                        ,'jGuRlOnyE9oFk0blH0ccNkc2tirQTdS6fjCjoltyZjURNcnoigCrlH8CdsgUzTvf'
                        ,'ljcyPOZhAoGBAP9c5X6KpX+eOcbAaTjIFMSxbgesjXV3UoWJMHAgvnSaG1ong4nQ'
                        ,'iBjOnhFW3lZK/oMnd7JnPORGC1PzCwLcDN91F8KxNu1D20mc+SSFjyu/Jgn8xG6H'
                        ,'VhlsRS091wiv6MEvR5hu1F5xZ5SJccKjOmW6FJUK5Eas8lN5w4CjDhx3AoGBAOss'
                        ,'f57/BQ9TCTUwa9QDPvr6aPrF7Svho7S5litiIgVvf5KudWJOxGWXV/daNS1b9lCn'
                        ,'QIEd5ZyuEOuNGySk5o2OFbEccAq4qnf4BMFS4k9QBFci/AGzs1U+mpPeJBboAKON'
                        ,'vZwgL+Ds/pqXmzjtwNxxBGxhtOwVmp8pNmNXIPNRAoGBAJiI+gDTerY3YlWpW3Dy'
                        ,'ew1e2tW0qa7v/pgLcaaYuItX/lyk27q3mIQQ73R2CktLcqoPKj2j00ib2mpj9EDa'
                        ,'Bsp33CCM0L17WgKnxF6fdPzxqhwvI3rOVozLEqtKlCb5RLQYtNCF608auH+OdiiI'
                        ,'bfqT43V/0wmwhvN7+V7ehzBTAoGAQSiNG5Jw5nQNQw1tcsqLcqJa39BjDBtybipV'
                        ,'byO7ZWIlKJDpuRk11Sf/mWsG/NBUCLiuaJfN/IFF8t2fvaFqt6G8ZNwKNw4/PQoc'
                        ,'1yuNxIfZDAOHazlM4Lt9vKZ5vVb+hlJJTK6mVV2UlWSX/0fwfaNapGTV6et6ccrL'
                        ,'ZO7JFGECgYEAxkio7YWuk/xjB38iWlhPPQA/Jbwdxr4uQH9YNALZqCdE6D2ycZJn'
                        ,'3PV7nFq8vRWe+vjLhyPTYuVXt3Gut8PHg8BO+MSSUYWRsICsTTGK5L58oUxzpfDE'
                        ,'13bOyHlnS+21aUkXGzpRJ/0zd5HSy7MzvfNmGkfdZC5l2CipcsVuYF4='
                        ,'-----END RSA PRIVATE KEY-----'].join('\n'),
        key1,
        key2

    beforeEach(function(){
        module('cmCore')
        module('cmConfig')


        inject(function(_cmPassphraseVault_, _cmUserModel_, _cmKey_, _cmIdentityFactory_, _$rootScope_){
            cmPassphraseVault   =   cmPassphraseVault   || _cmPassphraseVault_
            cmUserModel         =   cmUserModel         || _cmUserModel_
            cmKey               =   cmKey               || _cmKey_
            cmIdentityFactory   =   cmIdentityFactory   || _cmIdentityFactory_
            $rootScope          =   $rootScope          || _$rootScope_
        })
    })

    it('should have a method to create a passphrase vault encrypting raw data.', function(){
        expect(typeof cmPassphraseVault.encryptPassphrase).toBe('function')
    })

    it('should have a method to create a passphrase vault with existing vault data.', function(){
        expect(typeof cmPassphraseVault.create).toBe('function')
    })

    describe('vault instance', function(){

        var setup

        beforeEach(function(){
            if(setup) return false

            setup = true

            identity1 = cmIdentityFactory.create({id:'id1', cameoId: 'id1@cameo.io'})
            identity2 = cmIdentityFactory.create({id:'id2', cameoId: 'id2@cameo.io'})
            identity3 = cmIdentityFactory.create({id:'id2', cameoId: 'id3@cameo.io'})

            identity1.userKey = 'my_user_key'

            key1 = new cmKey()
            key2 = new cmKey()

            key1
            .setKey(key1_plain)
            .setId('key1')


            key2
            .setKey(key2_plain)
            .setId('key2')


            identity1.keys.register(key1)
            identity2.keys.register(key2)

            cmUserModel
            .importData(identity1, [identity1])
            .signPublicKey(key1, key1.id, identity1)

            cmUserModel
            .importData(identity1, [identity1])
            .storeKey(key1)


            cmPassphraseVault.encryptPassphrase({
                passphrase:     passphrase,
                identities:     [identity1, identity2]
            })
            .then(function(vault){
                vault1 = vault
                return cmPassphraseVault.create(vault1.exportData())
            })
            .then(function(vault){
                vault2 = vault
            })
            .catch(function(reason){
                console.log(reason)
            })



            /** Bad vaults: **/
            
            //wrong keys for one recipient:
            vault3 =    cmPassphraseVault.create({
                            "sePassphrase":null,
                            "aePassphraseList":[
                                {
                                    "keyId":"key1",
                                    "encryptedPassphrase":"iATvMjTUMc8ffQkl3B7vnO4WUlnzlmYQwAiyKUjrMtsg/92lrA8nVC5jXcRLkTRDe+Mf10D/YwgM1Wuw8uAWgl8c6ay8/8HsrR0+5xro1ZE1VaXh4Ek3f+MnAAJmGVsmh0g+Q6pbcqGnA+eHwXL56xvKu41refTqwuotIQODe9jwsCew6JCllXiTeuC0n8y9gAN6Q+hlHtRJnStPH+Q6Qe1v9tOyd6eA08j2lIUxRcCejV7NPVANfKlSzBtGyeKp1Nv5B/mJAqEQb0ZEygDCgVIwAmzkUbJHCaZSYxPpiego5HkyoPyDL2WS6MmP+igfZYJeCO+Bt8BtrKXiJ79bUw=="
                                },
                                {
                                    "keyId":"key2",
                                    "encryptedPassphrase":"QKJjjKNmKxPQmOTZY3AV/VfpfnUroaTzcxdt0wojpZb03b1M2/Bm6q3blDjbVbKMquT6ZWsYZ+5XRTX+poXNNCnXK1FgQyQQX1BXbWZRcGc4tWGKiUQz3ujsJxLSV77ACTr6bZpo3F8G+f07fQXHOC+P0URfqCLVk9tQ/EHm32IB72d8vz3tKtr7TiBSpxZ09QRlCAsmC8F2R5rr64ZUlPLur/4Be9b8b4QCFmBgvEMUzsmRlRFBGR5SVASJdqC7bTECPIDVVGy0KFwtLkiArMEo4SZIUVeKwNEhCZ48yCv9wYYuRLJ2o1mhcvTMP68+PLiK1CSvMlJq0vxHaSSyQw=="
                                }
                            ],
                            "keyTransmission":"asymmetric",
                            "recipientKeyList":[
                                {
                                    "identityId":"id1",
                                    "keys":[
                                        {"id":"key1"},
                                        {"id":"key2"}   //surplus key!
                                    ]
                                },
                                {
                                    "identityId":"id2",
                                    "keys":[
                                        {"id":"key2"}
                                    ]
                                }
                            ],
                            "signatures":[
                                {
                                    "keyId":"key1",
                                    "content":"754cb44e8475c3686927d19eb59d968465dd439158e24a62910d0756f3cd8c0cd2f25a1dcaa030702656f2fc486dc9a7251c55b4fa9a2e9319538e1129546d3444c199189faa95c82fc1ff22725643d24f03edf42ab27f616159ee246d3161bd0029336f88e2b8f3725d43f9a16723e6a326e0ab4fd8cb887041c7cdf5531aaf513e279635017e36caab7974a04dfdf393088db53acbdc02c53216e2b11bd9705c0dc757c6690e4184871dce9bcb7801630f93d5cc0eaf424608678bf866ef4bc858be5c29b3896643f0a69e4379df68653a6eccfb67b8a368c0d0361446d0976131ae5ae6b175f86f91f0ad3a385c022b2bc4409f75012f53b1858896bd83c8"
                                }
                            ]
                        })

            //missing recipient recipient:
            vault4 =    cmPassphraseVault.create({
                            "sePassphrase":null,
                            "aePassphraseList":[
                                {
                                    "keyId":"key1",
                                    "encryptedPassphrase":"iATvMjTUMc8ffQkl3B7vnO4WUlnzlmYQwAiyKUjrMtsg/92lrA8nVC5jXcRLkTRDe+Mf10D/YwgM1Wuw8uAWgl8c6ay8/8HsrR0+5xro1ZE1VaXh4Ek3f+MnAAJmGVsmh0g+Q6pbcqGnA+eHwXL56xvKu41refTqwuotIQODe9jwsCew6JCllXiTeuC0n8y9gAN6Q+hlHtRJnStPH+Q6Qe1v9tOyd6eA08j2lIUxRcCejV7NPVANfKlSzBtGyeKp1Nv5B/mJAqEQb0ZEygDCgVIwAmzkUbJHCaZSYxPpiego5HkyoPyDL2WS6MmP+igfZYJeCO+Bt8BtrKXiJ79bUw=="
                                },
                                {
                                    "keyId":"key2",
                                    "encryptedPassphrase":"QKJjjKNmKxPQmOTZY3AV/VfpfnUroaTzcxdt0wojpZb03b1M2/Bm6q3blDjbVbKMquT6ZWsYZ+5XRTX+poXNNCnXK1FgQyQQX1BXbWZRcGc4tWGKiUQz3ujsJxLSV77ACTr6bZpo3F8G+f07fQXHOC+P0URfqCLVk9tQ/EHm32IB72d8vz3tKtr7TiBSpxZ09QRlCAsmC8F2R5rr64ZUlPLur/4Be9b8b4QCFmBgvEMUzsmRlRFBGR5SVASJdqC7bTECPIDVVGy0KFwtLkiArMEo4SZIUVeKwNEhCZ48yCv9wYYuRLJ2o1mhcvTMP68+PLiK1CSvMlJq0vxHaSSyQw=="
                                }
                            ],
                            "keyTransmission":"asymmetric",
                            "recipientKeyList":[
                                {
                                    "identityId":"id1",
                                    "keys":[
                                        {"id":"key1"}
                                    ]
                                    //missing recipient
                                }
                            ],
                            "signatures":[
                                {
                                    "keyId":"key1",
                                    "content":"754cb44e8475c3686927d19eb59d968465dd439158e24a62910d0756f3cd8c0cd2f25a1dcaa030702656f2fc486dc9a7251c55b4fa9a2e9319538e1129546d3444c199189faa95c82fc1ff22725643d24f03edf42ab27f616159ee246d3161bd0029336f88e2b8f3725d43f9a16723e6a326e0ab4fd8cb887041c7cdf5531aaf513e279635017e36caab7974a04dfdf393088db53acbdc02c53216e2b11bd9705c0dc757c6690e4184871dce9bcb7801630f93d5cc0eaf424608678bf866ef4bc858be5c29b3896643f0a69e4379df68653a6eccfb67b8a368c0d0361446d0976131ae5ae6b175f86f91f0ad3a385c022b2bc4409f75012f53b1858896bd83c8"
                                }
                            ]
                        })

            //bad signature:
            vault5 =    cmPassphraseVault.create({
                            "sePassphrase":null,
                            "aePassphraseList":[
                                {
                                    "keyId":"key1",
                                    "encryptedPassphrase":"iATvMjTUMc8ffQkl3B7vnO4WUlnzlmYQwAiyKUjrMtsg/92lrA8nVC5jXcRLkTRDe+Mf10D/YwgM1Wuw8uAWgl8c6ay8/8HsrR0+5xro1ZE1VaXh4Ek3f+MnAAJmGVsmh0g+Q6pbcqGnA+eHwXL56xvKu41refTqwuotIQODe9jwsCew6JCllXiTeuC0n8y9gAN6Q+hlHtRJnStPH+Q6Qe1v9tOyd6eA08j2lIUxRcCejV7NPVANfKlSzBtGyeKp1Nv5B/mJAqEQb0ZEygDCgVIwAmzkUbJHCaZSYxPpiego5HkyoPyDL2WS6MmP+igfZYJeCO+Bt8BtrKXiJ79bUw=="
                                },
                                {
                                    "keyId":"key2",
                                    "encryptedPassphrase":"QKJjjKNmKxPQmOTZY3AV/VfpfnUroaTzcxdt0wojpZb03b1M2/Bm6q3blDjbVbKMquT6ZWsYZ+5XRTX+poXNNCnXK1FgQyQQX1BXbWZRcGc4tWGKiUQz3ujsJxLSV77ACTr6bZpo3F8G+f07fQXHOC+P0URfqCLVk9tQ/EHm32IB72d8vz3tKtr7TiBSpxZ09QRlCAsmC8F2R5rr64ZUlPLur/4Be9b8b4QCFmBgvEMUzsmRlRFBGR5SVASJdqC7bTECPIDVVGy0KFwtLkiArMEo4SZIUVeKwNEhCZ48yCv9wYYuRLJ2o1mhcvTMP68+PLiK1CSvMlJq0vxHaSSyQw=="
                                }
                            ],
                            "keyTransmission":"asymmetric",
                            "recipientKeyList":[
                                {
                                    "identityId":"id1",
                                    "keys":[
                                        {"id":"key1"},
                                    ]
                                },
                                {
                                    "identityId":"id2",
                                    "keys":[
                                        {"id":"key2"}
                                    ]
                                }
                            ],
                            "signatures":[
                                {
                                    //wrong key for signature:
                                    "keyId":"key2",
                                    "content":"754cb44e8475c3686927d19eb59d968465dd439158e24a62910d0756f3cd8c0cd2f25a1dcaa030702656f2fc486dc9a7251c55b4fa9a2e9319538e1129546d3444c199189faa95c82fc1ff22725643d24f03edf42ab27f616159ee246d3161bd0029336f88e2b8f3725d43f9a16723e6a326e0ab4fd8cb887041c7cdf5531aaf513e279635017e36caab7974a04dfdf393088db53acbdc02c53216e2b11bd9705c0dc757c6690e4184871dce9bcb7801630f93d5cc0eaf424608678bf866ef4bc858be5c29b3896643f0a69e4379df68653a6eccfb67b8a368c0d0361446d0976131ae5ae6b175f86f91f0ad3a385c022b2bc4409f75012f53b1858896bd83c8"
                                }
                            ]
                        })

            $rootScope.$apply()
        })


        it('should be able to en- and decrypt a passphrase.', function(){
            var result1, result2, result1_cached

            vault1.get()
            .then(function(result){
                result1 = result
                return vault1.get() //get a second time to test caching:
            })
            .then(function(result){
                result1_cached = result
            })

            vault2.get()
            .then(function(result){
                result2 = result
            })

            $rootScope.$apply()
            

            expect(result1).toBe(passphrase)
            expect(result2).toBe(passphrase)
            expect(result1_cached).toBe(passphrase)
        })

        it('should be able to sign and verify recipient key lists and key transmission type.', function(){
            var result1, result2


            vault1.verifyAuthenticity()
            .then(function(){
                result1 = true
            })
            .catch(function(reason){
                console.log(reason)
            })         

            vault2.verifyAuthenticity()
            .then(function(){
                result2 = true
            })

            $rootScope.$apply()

            expect(result1).toBe(true)
            expect(result2).toBe(true)

        })

  
        it('should expose unauthentic vaults', function(){
            var bad4, bad5, bad6

            vault3.verifyAuthenticity()
            .catch(function(){
                bad4 = true
            })

            vault4.verifyAuthenticity()
            .catch(function(){
                bad5 = true
            })

            vault5.verifyAuthenticity()
            .catch(function(){
                bad6 = true
            })

            $rootScope.$apply()

            expect(bad4).toBe(true)
            expect(bad5).toBe(true)
            expect(bad6).toBe(true)
        })
    })
})
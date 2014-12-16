'use strict';

describe('cmPassphraseVault', function () {
    var cmPassphraseVault,
        cmUserModel,
        cmIdentityFactory,
        cmKey,
        $rootScope,
        identity1,
        identity2,
        vault1, 
        vault2,
        passphrase = "kjdshwwieuro8437zröo4zfo4euhfywu4hfurewfnzöresiunzfhresiunhfsegr"

    beforeEach(function(){
        module('cmCore')
        module('cmConfig')


        inject(function(_cmPassphraseVault_, _cmUserModel_, _cmKey_, _cmIdentityFactory_, _$rootScope_){
            cmPassphraseVault   =   _cmPassphraseVault_
            cmUserModel         =   _cmUserModel_
            cmKey               =   _cmKey_
            cmIdentityFactory   =   _cmIdentityFactory_
            $rootScope          =   _$rootScope_
        })
    })


    it('should have a method to create a passphrase vault encrypting raw data.', function(){
        expect(typeof cmPassphraseVault.encryptPassphrase).toBe('function')

        identity1 = cmIdentityFactory.create()
        cmUserModel.importData(identity1, [identity1])

        cmPassphraseVault.encryptPassphrase({
            passphrase:     passphrase,
            password:       '123',
            identities:     [cmUserModel.data.identity]
        })
        .then(function(vault){
            vault1 = vault
            console.log(vault)
        })

        $rootScope.$apply()

        console.log(vault1)
    })

    it('should have a method to create a passphrase vault with existing vault data.', function(){
        expect(typeof cmPassphraseVault.create).toBe('function')
    })

    describe('PassphraseVault instance', function(){
        it('should ...', function(){

        })

        it('should ...', function(){

        })

        it('should ...', function(){

        })

        it('should ...', function(){

        })

        it('should ...', function(){

        })

        it('should ...', function(){

        })

        it('should ...', function(){

        })

        it('should ...', function(){

        })


    })
})
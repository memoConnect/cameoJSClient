describe('service cmCountryPrefix', function(){

    var cmCountryPrefix

    describe('check service and document/browser didn\'t support api', function(){
        beforeEach(function(){
            module('cmUi')
            module('cmConfig')
            inject(function(_cmCountryPrefix_){
                cmCountryPrefix = _cmCountryPrefix_
            })
        })

        it('countries array should empty', function(){
            expect(typeof cmCountryPrefix.countries).toBe('object')
            expect(cmCountryPrefix.countries.length).toEqual(0)
        })
    })
})
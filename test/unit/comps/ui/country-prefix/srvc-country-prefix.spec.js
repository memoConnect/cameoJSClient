describe('service cmCountryPrefix', function(){

    var cmCountryPrefix, $httpBackend, $rootScope

    describe('check service', function(){
        beforeEach(function(){
            module('cmUi')
            module('cmConfig')
            inject(function(_cmCountryPrefix_, _$httpBackend_, _$rootScope_){
                cmCountryPrefix = _cmCountryPrefix_,
                $httpBackend = _$httpBackend_,
                $rootScope = _$rootScope_
            })
        })

        it('countries array should empty', function(){
            expect(typeof cmCountryPrefix.countries).toBe('object')
            expect(cmCountryPrefix.countries.length).toEqual(0)
        })

        it('ready should false', function(){
            expect(typeof cmCountryPrefix.ready).toBe('boolean')
            expect(cmCountryPrefix.ready).toBeFalsy()
        })

        it('handleView is for directives that work with this service', function(){
            expect(typeof cmCountryPrefix.handleView).toBe('function')
            expect(cmCountryPrefix.handleView).toBeDefined()
        })

        describe('loadPrefixes is a json loader method', function(){
            it('should be defined', function(){
                expect(typeof cmCountryPrefix.loadPrefixes).toBe('function')
                expect(cmCountryPrefix.loadPrefixes).toBeDefined()
            })

            it('on call should load countries and only load once', function(){
                $httpBackend.whenGET('i18n/countryprefix.json')
                    .respond('["af,93","al,355","dz,213","de,49"]')

                cmCountryPrefix.loadPrefixes()

                $httpBackend.flush()
                $rootScope.$apply()

                expect(cmCountryPrefix.countries.length).toEqual(4)
                expect(cmCountryPrefix.ready).toBeTruthy()

                // only load once
                cmCountryPrefix.loadPrefixes()
            })
        })

        describe('getDefaultCountry return the default country', function(){
            it('should be defined', function(){
                expect(typeof cmCountryPrefix.getDefaultCountry).toBe('function')
                expect(cmCountryPrefix.getDefaultCountry).toBeDefined()
            })

            it('should return a promise', function(){
                var promise = cmCountryPrefix.getDefaultCountry()
                expect(typeof promise).toBe('object')
            })

            it('should return country de and +49', function(){
                var promise = cmCountryPrefix.getDefaultCountry()

                promise.then(function(country){
                    expect(country.shortcut).toBe('de')
                    expect(country.numberPrefix).toBe('+49')
                })

                $rootScope.$apply()
            })
        })

        describe('getCountries returns all loaded countries', function(){
            it('should be defined', function(){
                expect(typeof cmCountryPrefix.getCountries).toBe('function')
                expect(cmCountryPrefix.getCountries).toBeDefined()
            })

            it('should return a promise', function(){
                var promise = cmCountryPrefix.getCountries()
                expect(typeof promise).toBe('object')
            })

            it('should return loaded countries', function(){
                $httpBackend.whenGET('i18n/countryprefix.json')
                    .respond('["af,93","al,355","dz,213","de,49"]')

                var promise = cmCountryPrefix.getCountries()

                promise.then(function(countries){
                    expect(countries.length).toEqual(4)
                    expect(countries[0].shortcut).toBe('af')
                    expect(countries[3].shortcut).toBe('de')
                })

                $httpBackend.flush()
                $rootScope.$apply()
            })
        })

        describe('getOneByShortcut found one by shortcut', function(){
            it('should be defined', function(){
                expect(typeof cmCountryPrefix.getOneByShortcut).toBe('function')
                expect(cmCountryPrefix.getOneByShortcut).toBeDefined()
            })

            it('should return an empty array', function(){
                expect(cmCountryPrefix.getOneByShortcut().length).toEqual(0)
                expect(cmCountryPrefix.getOneByShortcut(undefined).length).toEqual(0)
                expect(cmCountryPrefix.getOneByShortcut(false).length).toEqual(0)
                expect(cmCountryPrefix.getOneByShortcut({}).length).toEqual(0)
                expect(cmCountryPrefix.getOneByShortcut([]).length).toEqual(0)
                expect(cmCountryPrefix.getOneByShortcut('').length).toEqual(0)
            })

            it('should found in countries', function(){
                $httpBackend.whenGET('i18n/countryprefix.json')
                    .respond('["af,93","al,355","dz,213","de,49"]')

                cmCountryPrefix.loadPrefixes()

                $httpBackend.flush()
                $rootScope.$apply()

                expect(cmCountryPrefix.getOneByShortcut('af').length).toEqual(1)
                expect(cmCountryPrefix.getOneByShortcut('de').length).toEqual(1)
                expect(cmCountryPrefix.getOneByShortcut('dz').length).toEqual(1)
                expect(cmCountryPrefix.getOneByShortcut('al').length).toEqual(1)
                // not in json
                expect(cmCountryPrefix.getOneByShortcut('be').length).toEqual(0)
            })
        })

        describe('getOneByNumberPrefix found one by numberPrefix', function(){
            it('should be defined', function(){
                expect(typeof cmCountryPrefix.getOneByNumberPrefix).toBe('function')
                expect(cmCountryPrefix.getOneByNumberPrefix).toBeDefined()
            })

            it('should return an empty array', function(){
                expect(cmCountryPrefix.getOneByNumberPrefix().length).toEqual(0)
                expect(cmCountryPrefix.getOneByNumberPrefix(undefined).length).toEqual(0)
                expect(cmCountryPrefix.getOneByNumberPrefix(false).length).toEqual(0)
                expect(cmCountryPrefix.getOneByNumberPrefix({}).length).toEqual(0)
                expect(cmCountryPrefix.getOneByNumberPrefix([]).length).toEqual(0)
                expect(cmCountryPrefix.getOneByNumberPrefix('').length).toEqual(0)
            })

            it('should found in countries', function(){
                $httpBackend.whenGET('i18n/countryprefix.json')
                    .respond('["af,93","al,355","dz,213","de,49"]')

                cmCountryPrefix.loadPrefixes()

                $httpBackend.flush()
                $rootScope.$apply()

                expect(cmCountryPrefix.getOneByNumberPrefix(93).length).toEqual(1)
                expect(cmCountryPrefix.getOneByNumberPrefix('93').length).toEqual(1)
                expect(cmCountryPrefix.getOneByNumberPrefix('+93').length).toEqual(1)
                expect(cmCountryPrefix.getOneByNumberPrefix(355).length).toEqual(1)
                expect(cmCountryPrefix.getOneByNumberPrefix('355').length).toEqual(1)
                expect(cmCountryPrefix.getOneByNumberPrefix('+355').length).toEqual(1)
                expect(cmCountryPrefix.getOneByNumberPrefix(213).length).toEqual(1)
                expect(cmCountryPrefix.getOneByNumberPrefix('213').length).toEqual(1)
                expect(cmCountryPrefix.getOneByNumberPrefix('+213').length).toEqual(1)
                expect(cmCountryPrefix.getOneByNumberPrefix(49).length).toEqual(1)
                expect(cmCountryPrefix.getOneByNumberPrefix('49').length).toEqual(1)
                expect(cmCountryPrefix.getOneByNumberPrefix('+49').length).toEqual(1)
                // not in json
                expect(cmCountryPrefix.getOneByNumberPrefix(1).length).toEqual(0)
                expect(cmCountryPrefix.getOneByNumberPrefix('1').length).toEqual(0)
                expect(cmCountryPrefix.getOneByNumberPrefix('+1').length).toEqual(0)
            })
        })
    })
})
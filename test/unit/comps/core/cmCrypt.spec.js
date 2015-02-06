'use strict';

describe('cmCrypt', function () {
    var cmCrypt;

    window.Worker = undefined;

    beforeEach(module('cmCore'))
    beforeEach(inject(function(_cmCrypt_) {
        cmCrypt = _cmCrypt_;
    }))

    describe('should provide the function',function(){
        it('hash',function(){
            expect(typeof cmCrypt.hash).toBe('function')
        })

        it('hashObject', function(){
            expect(typeof cmCrypt.hashObject).toBe('function')
        })

        it('base64Encode',function(){
            expect(typeof cmCrypt.base64Encode).toBe('function')
        })

        it('base64Decode',function(){
            expect(typeof cmCrypt.base64Decode).toBe('function')
        })

        it('encryptWithShortKey',function(){
            expect(typeof cmCrypt.hash).toBe('function')
        })

        it('encrypt',function(){
            expect(typeof cmCrypt.hash).toBe('function')
        })

        it('decrypt',function(){
            expect(typeof cmCrypt.hash).toBe('function')
        })
    })

    describe('calling hash with a string', function () {
        it('returns a hash', function () {
            expect(cmCrypt.hash('Wumms')).toEqual('FV3hCGq2XmRD9SiUvaiANZ4w8ZvUTklOS3THYVyz4do=')
        })
    })

    describe('.hashObject()', function(){
        var obj_0 = { 1: undefined },
            obj_1 = {
                key_1:      "my first value",
                key_2:      {
                    "key in a box": "value in a box"
                },
                _:          "value with funny key",
                1:          "value with numerical key",
                array:      [1, "2A", { 'my_key' : 'my_value' }]
            }

        function shuffleKeys(obj){

            obj = angular.extend({}, obj)

            if(! (typeof obj != "object") ) return obj

            var keys        = Object.keys(),
                shuffled    = {},
                i

            while(i = Math.floor(Math.random()*keys.length)){
                var key = keys.splice(i,1)

                shuffeld[key] = shuffleKeys(obj[key])
            }
            return shuffled
        }

        function getRandomObject(max_size, min_size){

            max_size = isNaN(max_size) ? 8 : max_size
            min_size = min_size || 0

            var size    = Math.ceil(Math.random()*max_size),
                obj     = {},
                i       = 0

            size = size < min_size ? min_size : size

            while(size-i > 0){
                obj[cmCrypt.hash(Math.random().toString())] =   Math.random() > 0.5
                    ?   cmCrypt.hash(cmCrypt.hash(Math.random().toString()))
                    :   getRandomObject(max_size-1)
                i++
            }

            return obj
        }

        it('should throw an error if it encounter non string values somewhere within the passed argument.', function(){
            expect(function(){ cmCrypt.hashObject(              )}).toThrow()
            expect(function(){ cmCrypt.hashObject( undefined    )}).toThrow()
            expect(function(){ cmCrypt.hashObject( null         )}).toThrow()
            expect(function(){ cmCrypt.hashObject( function(){} )}).toThrow()
            expect(function(){ cmCrypt.hashObject( false        )}).toThrow()
            expect(function(){ cmCrypt.hashObject( true         )}).toThrow()
            expect(function(){ cmCrypt.hashObject( cmCrypt      )}).toThrow()
            expect(function(){ cmCrypt.hashObject( obj_0        )}).toThrow()
            expect(function(){ cmCrypt.hashObject( new Date()   )}).toThrow()
            expect(function(){ cmCrypt.hashObject( Math         )}).toThrow()


        })

        it('should throw an error if it encounters a cyclic object.', function(){
            var obj     = { key: "my string" },
                cyclic  = { obj : obj}

            obj.cyclic = cyclic

            expect(function(){ cmCrypt.hashObject(cyclic) }).toThrow()
        })

        it('should calculate a proper hash for a proper object.', function(){
            //different strings should have different hashes:
            expect(cmCrypt.hashObject("my string")).toBeTruthy()
            expect(cmCrypt.hashObject("my string")).not.toBe(cmCrypt.hashObject(cmCrypt.hashObject("my other string")))

            //same data, same order:
            expect(cmCrypt.hashObject({A:1, B:2})).toBe(cmCrypt.hashObject({A:1, B:2}))
            expect(cmCrypt.hashObject({'A':1, 'B':2, 'C':{'A':1,'B':2}})).toBe(cmCrypt.hashObject({'A':1, 'B':2, 'C':{'A':1,'B':2}}))
            //expect(cmCrypt.hashObject({'A':1, 'B':2, 'C':[{'A':1},{'B':2}]})).toBe(cmCrypt.hashObject({'A':1, 'B':2, 'C':[{'A':1},{'B':2}]}))
            //expect(cmCrypt.hashObject(obj_example_1,sortHelper)).toBe(cmCrypt.hashObject(obj_example_1,sortHelper))

            //same data, different order:
            expect(cmCrypt.hashObject({A:1, B:2})).toBe(cmCrypt.hashObject({B:2, A:1}))
            expect(cmCrypt.hashObject({'A':1, 'C':{'B':2,'A':1}, 'B':2 })).toBe(cmCrypt.hashObject({'A':1, 'B':2, 'C':{'A':1,'B':2}}))
            //expect(cmCrypt.hashObject({'A':1, 'C':[{'B':2},{'A':1}], 'B':2 })).not.toBe(cmCrypt.hashObject({'A':1, 'B':2, 'C':[{'A':1},{'B':2}]}))
            //expect(cmCrypt.hashObject(obj_example_1,sortHelper)).toBe(cmCrypt.hashObject(obj_example_2,sortHelper))

            ////different, data;
            expect(cmCrypt.hashObject({A:1, B:2})).not.toBe(cmCrypt.hashObject({A:2, B:1}))

            //array:
            expect(cmCrypt.hashObject({0:'A', 1:'B'})).toBe(cmCrypt.hashObject(['A','B']))

            //test object;
            expect(cmCrypt.hashObject(obj_1)).toBe("44QIT/asE9ZhRn8/jT5P+te3FrJrA/7i0G6zqSde2Pw=")

            //random objects:

            for(var i = 0; i < 10; i++){
                var randomObject    = getRandomObject(8),
                    shuffledObject  = shuffleKeys(randomObject)

                // copy with shuffled keys should be a different object
                expect(randomObject === shuffledObject).toBe(false)
                // copy with shuffled keys should have the same hash
                expect(cmCrypt.hashObject(randomObject)).toBe(cmCrypt.hashObject(shuffledObject))
            }
        })

        it('should calculate a proper hash for a proper objects which have a sortHelper.', function(){
            var obj_example_1 = {
                keyTransmission:"asymmetric",
                passphrase: "TFJzm0C0MtGIkc-Ef4_UVpDklgPGYBtozB5LnfjEZo7nwikioDqqEqSblahy",
                recipientKeyList: [
                    {identityId:"tHw6j8gma4STDhgir1e8",keys:{id:"FuuJ-LyGBcmpWtyK-aSUf425-Y34wX-EE5Qbgz-kBp8"}},
                    {identityId:"ZyUtvXTKuJdOnLC6PFt6",keys:{id:"GPLFLhY-5PeebaSQspYjebPLkNSTgRVWbHu0soctSKM"}},
                    {identityId:"jW1LQLmL8gAnCWdzAZaG",keys:{id:"UFeFdPNfYqXihkwaZgJnMJOmZV8xfwMlCTSUN_hPGTc"}}
                ]
            };

            var obj_example_2 = {
                keyTransmission:"asymmetric",
                passphrase: "TFJzm0C0MtGIkc-Ef4_UVpDklgPGYBtozB5LnfjEZo7nwikioDqqEqSblahy",
                recipientKeyList: [
                    {identityId:"tHw6j8gma4STDhgir1e8",keys:{id:"FuuJ-LyGBcmpWtyK-aSUf425-Y34wX-EE5Qbgz-kBp8"}},
                    {identityId:"jW1LQLmL8gAnCWdzAZaG",keys:{id:"UFeFdPNfYqXihkwaZgJnMJOmZV8xfwMlCTSUN_hPGTc"}},
                    {identityId:"ZyUtvXTKuJdOnLC6PFt6",keys:{id:"GPLFLhY-5PeebaSQspYjebPLkNSTgRVWbHu0soctSKM"}}
                ]
            };

            var sortHelper = {'recipientKeyList':'identityId'};

            //same data, same order without sortHelper
            expect(cmCrypt.hashObject(obj_example_1)).toBe(cmCrypt.hashObject(obj_example_1))

            //same data, same order with sortHelper
            expect(cmCrypt.hashObject(obj_example_1,sortHelper)).toBe(cmCrypt.hashObject(obj_example_1,sortHelper))

            //same data, different order without sortHelper:
            expect(cmCrypt.hashObject(obj_example_1)).not.toBe(cmCrypt.hashObject(obj_example_2))

            //same data, different order with sortHelper:
            expect(cmCrypt.hashObject(obj_example_1,sortHelper)).toBe(cmCrypt.hashObject(obj_example_2,sortHelper))

        })
    })

    describe('calling hash with invalid argument', function () {
        it('should throw an error.', function () {
            expect(function(){ cmCrypt.hash()       }).toThrow()
            expect(function(){ cmCrypt.hash(null)   }).toThrow()
            expect(function(){ cmCrypt.hash("")     }).toThrow()
            expect(function(){ cmCrypt.hash(true)   }).toThrow()
        })
    })

    describe('encrypt a string with a short key', function () {
        it('should encrypt and decrypt a String', function () {
            var testString = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec qu'
            var secretKey = 'abcdefghi'
            var encryptedShit = cmCrypt.encryptWithShortKey(secretKey, testString)
            var decryptedShit = cmCrypt.decrypt(secretKey, encryptedShit)
            expect(decryptedShit).toEqual(testString)
        })
    })

    describe('encrypt a string with a strong key', function () {
        it(' should encrypt and decrypt a String', function () {
            var testString = "StringLorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc, quis gravida magna mi a libero. Fusce vulputate eleifend sapien. Vestibulum purus quam, scelerisque ut, mollis sed, nonummy id, metus. Nullam accumsan lorem in dui. Cras ultricies mi eu turpis hendrerit fringilla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In ac dui quis mi consectetuer lacinia. Nam pretium turpis et arcu. Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis, ipsum. Sed aliquam ultrices mauris. Integer ante arcu, accumsan a, consectetuer eget, posuere ut, mauris. Praesent adipiscing. Phasellus ullamcorper ipsum rutrum nunc. Nunc nonummy metus. Vestibulum volutpat pretium libero. Cras id dui. Aenean ut eros et nisl sagittis vestibulum. Nullam nulla eros, ultricies sit amet, nonummy id, imperdiet feugiat, pede. Sed lectus. Donec mollis hendrerit risus. Phasellus nec sem in justo pellentesque facilisis. Etiam imperdiet imperdiet orci. Nunc nec neque. Phasellus leo dolor, tempus non, auctor et, hendrerit quis, nisi. Curabitur ligula sapien, tincidunt non, euismod vitae, posuere imperdiet, leo. Maecenas malesuada. Praesent congue erat at massa. Sed cursus turpis vitae tortor. Donec posuere vulputate arcu. Phasellus accumsan cursus velit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Sed aliquam, nisi quis porttitor congue, elit erat euismod orci, ac placerat dolor lectus quis orci. Phasellus consectetuer vestibulum elit. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc. Vestibulum fringilla pede sit amet augue. In turpis. Pellentesque posuere. Praesent turpis. Aenean posuere, tortor sed cursus feugiat, nunc augue blandit nunc, eu sollicitudin urna dolor sagittis lacus. Donec elit libero, sodales nec, volutpat a, suscipit non, turpis. Nullam sagittis. Suspendisse pulvinar, augue ac venenatis condimentum, sem libero volutpat nibh, nec pellentesque velit pede quis nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Fusce id purus. Ut varius tincidunt libero. Phasellus dolor. Maecenas vestibulum mollis diam. Pellentesque ut neque. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. In dui magna, posuere eget, vestibulum et, tempor auctor, justo. In ac felis quis tortor malesuada pretium. Pellentesque auctor neque nec urna. Proin sapien ipsum, porta a, auctor quis, euismod ut, mi. Aenean viverra rhoncus pede. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Ut non enim eleifend felis pretium feugiat. Vivamus quis mi. Phasellus a est. Phasellus magna. In hac habitasse platea dictumst. Curabitur at lacus ac velit ornare lobortis. Curabitur a felis in nunc fringilla tristique. Morbi mattis ullamcorper velit. Phasellus gravida semper nisi. Nullam vel sem. Pellentesque libero tortor, tincidunt et, tincidunt eget, semper nec, quam. Sed hendrerit. Morbi ac felis. Nunc egestas, augue at pellentesque laoreet, felis eros vehicula leo, at malesuada velit leo quis pede. Donec interdum, metus et hendrerit aliquet, dolor diam sagittis ligula, eget egestas libero turpis vel mi. Nunc nulla. Fusce risus nisl, viverra et, tempor et, pretium in, sapien. Donec venenatis vulputate lorem. Morbi nec metus. Phasellus blandit leo ut odio. Maecenas ullamcorper, dui et placerat feugiat, eros pede varius nisi, condimentum viverra felis nunc et lorem. Sed magna purus, fermentum eu, tincidunt eu, varius ut, felis. In auctor lobortis lacus. Quisque libero metus, condimentum nec, tempor a, commodo mollis, magna. Vestibulum ullamcorper mauris at ligula. Fusce fermentum. Nullam cursus lacinia erat. Praesent blandit laoreet nibh. Fusce convallis metus id felis luctus adipiscing. Pellentesque egestas, neque sit amet convallis pulvinar, justo nulla eleifend augue, ac auctor orci leo non est. Quisque id mi. Ut tincidunt tincidunt erat. Etiam feugiat lorem non metus. Vestibulum dapibus nunc ac augue. Curabitur vestibulum aliquam leo. Praesent egestas neque eu enim. In hac habitasse platea dictumst. Fusce a quam. Etiam ut purus mattis mauris sodales aliquam. Curabitur nisi. Quisque malesuada placerat nisl. Nam ipsum risus, rutrum vitae, vestibulum eu, molestie vel, lacus. Sed augue ipsum, egestas nec, vestibulum et, malesuada adipiscing, dui. Vestibulum facilisis, purus nec pulvinar iaculis, ligula mi congue nunc, vitae euismod ligula urna in dolor. Mauris sollicitudin fermentum libero. Praesent nonummy mi in odio. Nunc interdum lacus sit amet orci. Vestibulum rutrum, mi nec elementum vehicula, eros quam gravida nisl, id fringilla neque ante vel mi. Morbi mollis tellus ac sapien. Phasellus volutpat, metus eget egestas mollis, lacus lacus blandit dui, id egestas quam mauris ut lacus. Fusce vel dui. Sed in libero ut nibh placerat accumsan. Proin faucibus arcu quis ante. In consectetuer turpis ut velit. Nulla sit amet est. Praesent metus tellus, elementum eu, semper a, adipiscing nec, purus. Cras risus ipsum, faucibus ut, ullamcorper id, varius ac, leo. Suspendisse feugiat. Suspendisse enim turpis, dictum sed, iaculis a, condimentum nec, nisi. Praesent nec nisl a purus blandit viverra. Praesent ac massa at ligula laoreet iaculis. Nulla neque dolor, sagittis eget, iaculis quis, molestie non, velit. Mauris turpis nunc, blandit et, volutpat molestie, porta ut, ligula. Fusce pharetra convallis urna. Quisque ut nisi. Donec mi odio, faucibus at, scelerisque quis, convallis in, nisi. Suspendisse non nisl sit amet velit hendrerit rutrum. Ut leo. Ut a nisl id ante tempus hendrerit. Proin pretium, leo ac pellentesque mollis, felis nunc ultrices eros, sed gravida augue augue mollis justo. Suspendisse eu ligula. Nulla facilisi. Donec id justo. Praesent porttitor, nulla vitae posuere iaculis, arcu nisl dignissim dolor, a pretium mi sem ut ipsum. Curabitur suscipit suscipit tellus. Praesent vestibulum dapibus nibh. Etiam iaculis nunc ac metus. Ut id nisl quis enim dignissim sagittis. Etiam sollicitudin, ipsum eu pulvinar rutrum, tellus ipsum laoreet sapien, quis venenatis ante odio sit amet eros. Proin magna. Duis vel nibh at velit scelerisque suscipit. Curabitur turpis. Vestibulum suscipit nulla quis orci. Fusce ac felis sit amet ligula pharetra condimentum. Maecenas egestas arcu quis ligula mattis placerat. Duis lobortis massa imperdiet quam. Suspendisse potenti. Pellentesque commodo eros a enim. Vestibulum turpis sem, aliquet eget, lobortis pellentesque, rutrum eu, nisl. Sed libero. Aliquam erat volutpat. Etiam vitae tortor. Morbi vestibulum volutpat enim. Aliquam eu nunc. Nunc sed turpis. Sed mollis, eros et ultrices tempus, mauris ipsum aliquam libero, non adipiscing dolor urna a orci. Nulla porta dolor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos hymenaeos. Pellentesque dapibus hendrerit tortor. Praesent egestas tristique nibh. Sed a libero. Cras varius. Donec vitae orci sed dolor rutrum auctor. Fusce egestas elit eget lorem. Suspendisse nisl elit, rhoncus eget, elementum ac, condimentum eget, diam. Nam at tortor in tellus interdum sagittis. Aliquam lobortis. Donec orci lectus, aliquam ut, faucibus non, euismod id, nulla. Curabitur blandit mollis lacus. Nam adipiscing. Vestibulum eu odio. Vivamus laoreet. Nullam tincidunt adipiscing enim. Phasellus tempus. Proin viverra, ligula sit amet ultrices semper, ligula arcu tristique sapien, a accumsan nisi mauris ac eros. Fusce neque. Suspendisse faucibus, nunc et pellentesque egestas, lacus ante convallis tellus, vitae iaculis lacus elit id tortor. Vivamus aliquet elit ac nisl. Fusce fermentum odio nec arcu. Vivamus euismod mauris. In ut quam vitae odio lacinia tincidunt. Praesent ut ligula non mi varius sagittis. Cras sagittis. Praesent ac sem eget est egestas volutpat. Vivamus consectetuer hendrerit lacus. Cras non dolor. Vivamus in erat ut urna cursus vestibulum. Fusce commodo aliquam arcu. Nam commodo suscipit quam. Quisque id odio. Praesent venenatis metus at tortor pulvinar varius. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vita";
            var secretKey = 'aäb cde fgh ijk lmn oöp qrsß tuü vwx yz AÄBC DEF GHI JKL MNO ÖPQ RST UÜV WXYZ ! kj4h23h4'
            var encryptedShit = cmCrypt.encrypt(secretKey, testString)
            var decryptedShit = cmCrypt.decrypt(secretKey, encryptedShit)
            expect(decryptedShit).toEqual(testString)
        });

        it('should return false if decrypt failed.', function(){
            var encryptedtText = cmCrypt.encrypt('aäb cde fgh ijk lmn oöp qrsß tuü vwx yz AÄBC DEF GHI JKL MNO ÖPQ RST UÜV WXYZ ! kj4h23h4', 'xxx')

            expect(cmCrypt.decrypt(''       ,''     )).toBe(false)
            expect(cmCrypt.decrypt(''       ,'abc'  )).toBe(false)
            expect(cmCrypt.decrypt(undefined,'abc'  )).toBe(false)
            expect(cmCrypt.decrypt(null     ,'abc'  )).toBe(false)
            expect(cmCrypt.decrypt({}       ,'abc'  )).toBe(false)

            expect(cmCrypt.decrypt(''       , encryptedtText  )).toBe(false)
            expect(cmCrypt.decrypt(''       , encryptedtText  )).toBe(false)
            expect(cmCrypt.decrypt(undefined, encryptedtText  )).toBe(false)
            expect(cmCrypt.decrypt(null     , encryptedtText  )).toBe(false)
            expect(cmCrypt.decrypt({}       , encryptedtText  )).toBe(false)



        })
    })


    describe('asymmetric encryption', function(){
        var key              = undefined,
            publicKey        = undefined,
            privateKey       = undefined,
            secret           = 'priv',      //test key is too short to encrypt anything much longer
            encrypted_secret = undefined,
            decrypted_secret = undefined


        it('should provide a function "getKeysizes" with 2 available key sizes', function(){
            expect(cmCrypt.getKeySizes().length).toEqual(2)
        })

        it('should provide a function "generateAsyncKeypair"', function(){
            expect(typeof cmCrypt.generateAsyncKeypair).toBe('function')
        })

        it('should provide a function "cancelGeneration"', function(){
            expect(typeof cmCrypt.cancelGeneration).toBe('function')
        })

        it('should asynchronously generate a working 128-bit key pair within 3 seconds.', function(){
            runs(function(){
                inject(function($rootScope){
                    cmCrypt
                        .generateAsyncKeypair(128)
                        .then(
                        function(result){
                            key        = result.key
                            publicKey  = key.getPublicKey()
                            privateKey = key.getPrivateKey()
                        }
                    )
                    $rootScope.$apply()
                })
            })

            waitsFor(function() {
                return publicKey && privateKey
            }, 'public and private key to be defined', 3000);
        })

        it('should not generate a key pair without a given proper key size', function(){
            expect(cmCrypt.generateAsyncKeypair()).toBeFalsy()
            expect(cmCrypt.generateAsyncKeypair('huhu')).toBeFalsy()
            expect(cmCrypt.generateAsyncKeypair({test:1})).toBeFalsy()
            expect(cmCrypt.generateAsyncKeypair(['pups'])).toBeFalsy()
        })

    })

    describe('random string generator', function(){

        it("generate long random string using with big alphabet", function(){
            expect(cmCrypt.randomString(70, false).length).toBe(70)
        })

        it("generate long random string using with short alphabet", function(){
            expect(cmCrypt.randomString(100, true).length).toBe(100)
            expect(cmCrypt.randomString(100, true)).not.toMatch(/[A-Z]/)
        })

        it("generate short random string using with short alphabet", function(){
            expect(cmCrypt.randomString(10, true).length).toBe(10)
        })

    })


})
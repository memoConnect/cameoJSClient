describe("cmLanguage", function() {

    
    xdescribe("setup", function(){

        var language_tables = {};

        beforeEach(module('cameoClient'))

        it('should find an array of correctly formatted keys for supported languages at cameo.supported_languages', function() {
            expect(Object.prototype.toString.call( cameo.supported_languages )).toEqual('[object Array]')                
            cameo.supported_languages.forEach(function(lang_key){                        
                expect(lang_key.match(/^[a-z]{2}_[A-Z]{2}$/)).not.toEqual(null) // de_DE
            })
        })



        it('should find string with path to languages files at cameo.path_to_language files.', function(){
            expect(typeof cameo.path_to_languages).toEqual('string')        
        })



        it('should find and load correctly named and json formatted files for all supported languages within 5 second.', function() {        
            var count = cameo.supported_languages.length

            runs(function(){
                cameo.supported_languages.forEach(function(lang_key){           
                    var file = '/app/'+cameo.path_to_languages+'/lang-'+lang_key+'.json'
                    $.getJSON(file)
                    .done(  function(data)  { language_tables[lang_key] = data })
                    .fail(  function(xhr, status, error) { console.log('Error getting JSON from '+file+': '+status) })
                    .always(function()      { count-- })
                })
            })

            waitsFor(function() {
                return(count==0)   
            }, "languages files.", 5000)

            runs(function(){
                expect(Object.keys(language_tables).length).toEqual(cameo.supported_languages.length)
            })        
        })



        it('should find a translation for each message_id for all supported langauges.', function(){
            var message_ids = {}

            //Helper function to serialize all message ids
            function extendList(list, str, obj){          
                if(typeof obj == 'string') {
                    list.push(str)
                } else {
                    $.each(obj, function(key, value){
                        extendList(list, str+(str?'.':'')+key, value)
                    })                
                }            
            }

            //Helper function to compare language lists od message ids
            function diffLists(list1, list2){            
                list1.sort()
                list2.sort()

                var i = 0

                while (list1[i] && (list1[i] == list2[i])) { i++ } 

                return(list1[i] || list2[i])    
            }

            var list = [],
                all_the_same = true

            $.each(language_tables, function(lang_key, language_data){
                if(list.length == 0){
                    extendList(list, '', language_data)            
                }else{
                    var next_list = [],
                        last_diff = undefined

                    extendList(next_list, '', language_data)            
                    last_diff = diffLists(list, next_list)

                    if(last_diff) console.log('Missing or surplus message id in '+lang_key+': '+last_diff)

                    all_the_same = all_the_same && !last_diff
                    list = next_list
                }            
            })

            expect(all_the_same).toEqual(true)
        })
    })

    describe("Module", function() {

        var ctrl, scope, translate, compile
        
        beforeEach(module('cmLanguage', function($translateProvider){            
            $translateProvider.translations('en_US', {
                'TEST': 'works',            
            })
            $translateProvider.preferredLanguage( 'en_US' );
        }))

        
        beforeEach(inject(function($rootScope, _$compile_, cmTranslate){
            scope        = $rootScope.$new()                        
            translate    = cmTranslate
            $compile     = _$compile_       
        }))
        
        it('should provude a service "cmTranslate".', function(){
            expect(translate).toBeDefined()
        })


        it('should provide a functionen "switchLanguage" on controller\'s scope to switch between supported languages.', function(){
            expect(typeof scope.switchLanguage).toEqual('function')            
        })


        it('should provide a functionen "getLanguageName" on controller\'s scope to get the translation of a languages\'s name by its key.', function(){
            expect(typeof scope.getLanguageName).toEqual('function')            
        })


        it('should provide a functionen "getCurrentLanguage" on controllers\'s scope to return the currently active languages\'s key.', function(){
            expect(typeof scope.getCurrentLanguage).toEqual('function')            
        })


        it('should provide translation filter \'cmTranslate\'', function(){            
            var el = $('<span>{{"TEST"|cmTranslate}}</span>')
                  
            $compile(el)(scope)
            scope.$digest()      
            expect(el.text()).toEqual('works')            
           
        })

    })   

})
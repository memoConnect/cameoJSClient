describe("Language Support", function() {            
    var ctrl, scope,         
        language_tables = {};

    beforeEach(module("cameoClient"))
    beforeEach(function(){});

    it('should find an array of correctly formatted keys for supported languages at cameo.supported_languages', function() {
        expect(Object.prototype.toString.call( cameo.supported_languages )).toEqual('[object Array]')                
        cameo.supported_languages.forEach(function(lang_key){                        
            expect(lang_key.match(/^[a-z]{2}_[A-Z]{2}$/)).not.toEqual(null) // de_DE
        })
    })

    it('should find string with path to languages files at cameo.path_to_language files.', function(){
        expect(typeof cameo.path_to_languages).toEqual('string')        
    })

    it('should find and load correctly named and json formatted files for all supported languages within 1 second.', function() {        
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
        }, "Language files should be queried.", 1000)

        runs(function(){
            expect(Object.keys(language_tables).length).toEqual(cameo.supported_languages.length)
        })        
    })



    it('should provide a translation of each message_id for all supported langauges.', function(){
        var message_ids = {}

        function extendList(list, str, obj){          
            if(typeof obj == 'string') {
                list.push(str)
            } else {
                $.each(obj, function(key, value){
                    extendList(list, str+'.'+key, value)
                })                
            }            
        }

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



    it('should provide a controller "LanguageCtrl".', function() {            
        inject(function($controller, $rootScope, $translate) {        
            scope   = $rootScope.$new()
            ctrl    = $controller("LanguageCtrl", {$translate: $translate, $scope: scope})        
        })

        expect(ctrl).toBeDefined()
    })



    describe("LangaugeCtrl", function() {
        it('should provide a functionen on its scope to switch between supported languages.', function(){
            expect(typeof scope.switchLanguage).toEqual('function')            
        })
    })   
})
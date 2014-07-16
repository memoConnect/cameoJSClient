'use strict';

angular.module('cmCore')
.factory('cmTransferFormData',[
    'cmUtil',
    '$location',
    '$rootScope',
    '$timeout',
    function(cmUtil, $location, $rootScope, $timeout){
        var formData = {},
            privateData = {};

        function cmTransferFormData(_options_){
            var self = this,
                defaultOptions = {
                    isCurrentRoute: function($locationPath){
                        return true;
                    },
                    $scope: null,
                    id:'',
                    scopeVar:'formData',
                    ignoreVar:'',
                    privateData:undefined,
                    onGet:function(){}
                },
                options = angular.extend({}, defaultOptions, _options_ || {});

            // private watch on route start and success
            function init(){
                if(options.$scope != null) {
                    options.$scope.$on('$routeChangeStart', function () {
                        console.log('set??')
                        if(!options.isCurrentRoute($location.$$path)) {
                            self.set();
                        }
                    });
                    options.$scope.$on('$routeChangeSuccess', function(){
                        console.log('get??')
                        if(options.isCurrentRoute($location.$$path)){
                            self.get();
                        }
                    });

//                    $rootScope.$on('formData:set', function(){
//
//                    });
//
//                    $rootScope.$on('formData:get', function(){
//
//                    });
                }
            }

            // set the formData of outfilled inputs
            self.set = function(){
                self.reset();
                console.log('set!!',options.scopeVar,JSON.stringify(options.$scope[options.scopeVar]))
                formData[options.id] = options.$scope[options.scopeVar];

                if(options.privateData != undefined){
                    privateData[options.id] = options.privateData;
                }
                // clear data exp.: password
                if(options.ignoreVar != ''){
                    delete formData[options.id][options.ignoreVar];
                }
            };

            // get only on same route and if formData is full of data
            self.get = function(){
                console.log('get!!',options.id,(options.id in formData),JSON.stringify(formData[options.id]))
                if((options.id in formData)){
                    options.$scope[options.scopeVar] = formData[options.id];
                    options.onGet(formData[options.id], privateData[options.id]);
                    self.reset();
                }
            };

            // reset persist data
            self.reset = function(){
                formData[options.id] = {};
                privateData[options.id] = {};
            };

            init();

            return self;
        }

        return cmTransferFormData;
    }]
);
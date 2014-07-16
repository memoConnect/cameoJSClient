'use strict';

angular.module('cmCore')
.factory('cmTransferScopeData',[
    'cmUtil',
    '$location',
    '$rootScope',
    function(cmUtil, $location, $rootScope){
        var formData = {},
            privateData = {};

        function cmTransferScopeData($scope, _options_){
            var self = this,
                defaultOptions = {
                    id:'',
                    scopeVar:'formData',
                    ignoreVar:'',
                    privateData:undefined,
                    onGet:function(){}
                },
                options = angular.extend({}, defaultOptions, _options_ || {});

            // private watch on route start and success
            function init(){
                if($scope != undefined) {
                    $rootScope.$on('$routeChangeStart', function () {
                        self.set();
                    });
                    self.get();
                }
            }

            // set the formData of outfilled inputs
            self.set = function(){
                self.reset();
                formData[options.id] = $scope[options.scopeVar];

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
                if((options.id in formData)){
                    console.log('get!!',formData[options.id],options.scopeVar,$scope)
                    $scope[options.scopeVar] = formData[options.id];
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

        return cmTransferScopeData;
    }]
);
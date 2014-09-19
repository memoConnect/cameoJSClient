'use strict';

angular.module('cmCore')
.factory('cmTransferScopeData',[
    'cmUtil',
    '$location', '$rootScope',
    function(cmUtil,
             $location, $rootScope) {
        var scopeData = {},
            privateData = {},
            defaultOptions = {
                id: '',
                scopeVar: '',
                ignoreVar: '',
                isDone: false,
                onSet: function(){},
                onGet: function(scopeData, privateData){}
            };

        // set the formData of outfilled inputs
        function _set($scope, options){
            if(options.isDone)
                return false;

            _reset(options);

            options.onSet();

            scopeData[options.id] = $scope[options.scopeVar];

            if (options.privateData != undefined) {
                privateData[options.id] = options.privateData;
            }

            // clear data exp.: password
            if (options.ignoreVar != '') {
                delete scopeData[options.id][options.ignoreVar];
            }
        }

        // get only on same route and if formData is full of data
        function _get($scope, options){
            if ((options.id in scopeData) && scopeData[options.id] != null) {
                if(typeof $scope[options.scopeVar] == 'object'){
                    $scope[options.scopeVar] = angular.extend({}, $scope[options.scopeVar], scopeData[options.id]);
                }else{
                    $scope[options.scopeVar] = scopeData[options.id]

                }
                options.onGet(scopeData[options.id], privateData[options.id]);
                _reset(options);
            }
        }

        // reset persist data
        function _reset(options){
            delete scopeData[options.id];
            scopeData[options.id] = null;
            delete privateData[options.id];
            privateData[options.id] = null;
        }

        return {
            create: function ($scope, _options_) {
                if ($scope == undefined)
                    return false;

                var options = angular.extend({}, defaultOptions, _options_ || {});
                // init
                var clearEvent = $rootScope.$on('$routeChangeStart', function () {
                    _set($scope, options);
                });

                _get($scope, options);

                $scope.$on('$destroy',function(){
                    clearEvent();
                });

                // return clear function
                return function(){
                    options.isDone = true;
                    clearEvent();
                    _reset(options);
                }
            }
        }
    }]
);
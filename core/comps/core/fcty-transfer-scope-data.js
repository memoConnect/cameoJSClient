'use strict';

angular.module('cmCore')
.factory('cmTransferScopeData',[
    'cmUtil',
    '$location', '$rootScope',
    function(cmUtil,
             $location, $rootScope) {

        var keepIdsClear = [],
            scopeData = {},
            noneScopeData = {},
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

            _clear(options);

            // if in keepClear array ignore set
            if(keepIdsClear.indexOf(options.id) >= 0){
                // remove for next time settable
                keepIdsClear.splice(keepIdsClear.indexOf(options.id), 1);
                return false;
            }

            options.onSet();

            scopeData[options.id] = $scope[options.scopeVar];

            if (options.noneScopeData != undefined) {
                noneScopeData[options.id] = options.noneScopeData;
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
                options.onGet(scopeData[options.id], noneScopeData[options.id]);
                _reset(options);
            // when only noneScopeData is full data
            } else if(noneScopeData[options.id] != null){
                options.onGet({}, noneScopeData[options.id]);
                _reset(options);
            }
        }

        // reset persist data
        function _clear(options){
            delete scopeData[options.id];
            scopeData[options.id] = null;
            delete noneScopeData[options.id];
            noneScopeData[options.id] = null;
        }

        function _reset(){
            scopeData = {};
            noneScopeData = {};
        }

        $rootScope.$on('logout', _reset);

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
                    _clear(options);
                }
            },
            keepClear: function(data){
                this.clear(data);

                if(keepIdsClear.indexOf(data.id) < 0)
                    keepIdsClear.push(data.id);
            },
            clear: function(data){
                if(typeof data == 'object' && typeof data.id != 'undefined' && data.id != ''){
                    _clear(data);
                }
            },
            reset: function(){
                _reset();
            }
        }
    }]
);
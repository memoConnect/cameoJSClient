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
                scopeVar: 'formData',
                ignoreVar: '',
                privateData: undefined,
                onGet: function(scopeData, privateData){}
            };

        // set the formData of outfilled inputs
        function _set($scope, options){
            _reset(options);
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
            if ((options.id in scopeData)) {
                $scope[options.scopeVar] = scopeData[options.id];
                options.onGet(scopeData[options.id], privateData[options.id]);
                _reset(options);
            }
        }

        // reset persist data
        function _reset(options){
            scopeData[options.id] = {};
            privateData[options.id] = {};
        }

        return {
            create: function ($scope, _options_) {
                if ($scope == undefined)
                    return false;

                var options = angular.extend({}, defaultOptions, _options_ || {});

                // init
                $rootScope.$on('$routeChangeStart', function () {
                    _set($scope, options);
                });
                _get($scope, options);
            }
        }
    }]
);
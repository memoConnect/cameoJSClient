'use strict';

angular.module('cmCore').provider('cmRoutes', [
    'cmConfigProvider',
    '$injector',
    function(cmConfigProvider,
             $injector){

        function ucfirst(str) {
            //  discuss at: http://phpjs.org/functions/ucfirst/
            // original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // bugfixed by: Onno Marsman
            // improved by: Brett Zamir (http://brett-zamir.me)
            //   example 1: ucfirst('kevin van zonneveld');
            //   returns 1: 'Kevin van zonneveld'

            str += '';
            var f = str.charAt(0)
                .toUpperCase();
            return f + str.substr(1);
        }

        /**
         * create routes
         * @param settings
         *
         * full control:
         'login': {
            route:['/login'], // multiple possible
            hasCtrl: true,
            isOtherwise: true
        }
         * creates route '/login'
         * and template 'routes/login/login.html'
         * and controller 'routes/login/login-ctrl.html'
         *
         * short control:
         'terms': {}
         * creates route '/terms'
         * and template 'routes/terms/terms.html'
         *
         */

        function createRoutes(settings){
            angular.forEach(settings,function(_settings_, routeKey) {
                var routes = [],
                    routeParams = {
                        templateUrl: '',
                        controller: '',
                        css: '',
                        guests: false,
                        resolve: {},
                        isDefault: false
                    };
                // create params for route
                if (angular.isDefined(_settings_['templateUrl'])) {
                    routeParams.templateUrl = _settings_['templateUrl'];
                } else {
                    if(routeKey.indexOf('-') != -1){
                        var arr  = routeKey.split('-'),
                            ctrlRoute = '',
                            i = 0;

                        while(i < arr.length){
                            ctrlRoute += '/'+arr[i];
                            i++;
                        }

                        routeParams.templateUrl = 'routes' + ctrlRoute + '/' + routeKey + '.html';
                    } else {
                        routeParams.templateUrl = 'routes/' + routeKey + '/' + routeKey + '.html';
                    }
                }
                // check if route has/need controller
                if (angular.isDefined(_settings_['hasCtrl']) && _settings_.hasCtrl === true){

                    if(routeKey.indexOf('-') != -1){
                        var arr  = routeKey.split('-'),
                            ctrlRoute = '',
                            i = 0;

                        while(i < arr.length){
                            ctrlRoute += ucfirst(arr[i]);
                            i++;
                        }

                        routeParams.controller = ctrlRoute+'Ctrl';
                        // root ctrl
                    } else {
                        routeParams.controller = ucfirst(routeKey)+'Ctrl';
                    }
                }

                if (angular.isDefined(_settings_['css']))
                    routeParams.css = _settings_['css'];

                if (angular.isDefined(_settings_['guests']))
                    routeParams.guests = _settings_['guests'];

                // route resolver
                routeParams.resolve.i18n = function(cmBoot){
                    return cmBoot.isReady.i18n();
                };

                routeParams.resolve.font = function(cmBoot){
                    return cmBoot.isReady.font();
                };

                if (angular.isDefined(_settings_['waitForFirstBoot']) && _settings_['waitForFirstBoot'] == true){
                    routeParams.resolve.firstBoot = function(cmBoot) {
                        return cmBoot.isReady.firstBoot();
                    }
                }

                if (angular.isDefined(_settings_['waitForUserModel']) && _settings_['waitForUserModel'] == true){
                    routeParams.resolve.userModel = function(cmBoot) {
                        return cmBoot.isReady.userModel();
                    }
                }

                if (angular.isDefined(_settings_['waitForPurl']) && _settings_['waitForPurl'] == true){
                    routeParams.resolve.resolveData = function(cmBoot, $route) {
                        return cmBoot.isReady.purl($route.current.params.purlId);
                    }
                }

                if (angular.isDefined(_settings_['reloadOnSearch'])){
                    routeParams.reloadOnSearch = _settings_['reloadOnSearch'];
                }
                if(angular.isDefined(_settings_['isDefault'])){
                    routeParams.isDefault = _settings_['isDefault'];
                }

                // create route as defined or take simple route
                if(angular.isDefined(_settings_['routes']))
                    routes = _settings_.routes;
                else
                    routes.push('/'+routeKey);

                // add route to provider
                angular.forEach(routes,function(route){
                    $injector.get('$routeProvider').
                        when(route, routeParams);
                });
                // check otherwise
                if(angular.isDefined(_settings_['isDefault'])){
                    $injector.get('$routeProvider').otherwise({
                        redirectTo: '/'+routeKey
                    });
                }
            });
        }

        this.create = function(){
            createRoutes(cmConfigProvider.get('routes'));
        };

        this.$get = [
            'cmConfig',
            function(cmConfig){

            return {
                create: function() {
                    createRoutes(cmConfig.routes);
                }
            }
        }];
    }
]);
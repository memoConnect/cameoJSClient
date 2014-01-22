'use strict';
var cameo = {
    //restApi: "http://"+location.host+"/api"
    restApi: "https://s.kolibritalk.com/api/v1"
   ,token: null
};

define(['angularAMD', 'angular-route', 'angular-cookies'], function (angularAMD) {

    var app = angular.module('cameoClientAngular', ['ngRoute','ngCookies']);

    app.config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider){
        //$locationProvider.html5Mode(true);
        $routeProvider.
        when('/login', angularAMD.route({
            templateUrl: 'tpl/form/login.html',
            controller: 'LoginCtrl'
        })).
        when('/start', angularAMD.route({
            templateUrl: 'tpl/start.html',
            controller: 'StartCtrl'
        })).
        when('/talks', angularAMD.route({
            templateUrl: 'tpl/list/talks.html',
            controller: 'TalksCtrl'
        })).
        when('/mediawall', angularAMD.route({
            templateUrl: 'tpl/list/mediawall.html',
            controller: 'MediaWallCtrl'
        })).
        when('/conversation/:conversationId', angularAMD.route({
            templateUrl: 'tpl/conversation.html',
            controller: 'ConversationCtrl'
        })).
        otherwise({
            redirectTo: '/login'
        });
    }])
    /*.run(['$rootScope', '$locationProvider', '$cookieStore',
    function($rootScope, $locationProvider, $cookieStore){

        function goToHome(){
            if(angular.isUndefined($cookieStore.get("token"))){
                $location.path("/login");
            } else if($location.$$path == "/login"){
                $location.path("/start");
            }
        }

        $rootScope.$on( "$routeChangeStart", function(){

            goToHome();

            if(angular.isDefined($cookieStore.get("token"))){
                // set token
                cameo.token = $cookieStore.get("token");
            }
        });

        goToHome();
    }]);*/

    // Bootstrap Angular when DOM is ready
    angularAMD.bootstrap(app);

    return app;
});
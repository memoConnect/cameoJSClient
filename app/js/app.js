'use strict';
var cameo = {
    restApi: "https://s.kolibritalk.com/api/v1"
   ,token: null
};

cameo.app = angular.module('cameoApp', [
  'ngRoute'
 ,'ngCookies'
 ,'cameoControllers'
 ,'cameoApi'
]);

cameo.app.
    config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider){
        $locationProvider.html5Mode(true);
        $routeProvider.
            when('/login', {
                templateUrl: 'tpl/form/login.html',
                controller: 'AuthCtrl'
            }).
            when('/start', {
                templateUrl: 'tpl/start.html',
                controller: 'StartCtrl'
            }).
            when('/talks', {
                templateUrl: 'tpl/list/talks.html',
                controller: 'TalksCtrl'
            }).
            when('/mediawall', {
                templateUrl: 'tpl/list/mediawall.html',
                controller: 'MediaWallCtrl'
            }).
            when('/conversation/:conversationId', {
                templateUrl: 'tpl/conversation.html',
                controller: 'ConversationCtrl'
            }).
            otherwise({
                redirectTo: '/login'
            });
        }]).
    run( function($rootScope, $location, $cookieStore){

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
    });

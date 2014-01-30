'use strict';
var cameo = {
    //restApi:              "http://"+location.host+"/api"
    restApi:                "https://s.kolibritalk.com/api/v1"
   ,token:                  null
   ,supported_languages:    ['de_DE', 'en_US']
   ,path_to_languages:      'languages'
};

var app = angular.module('cameoClient', 
            [
                'ngRoute',
                'ngCookies', 
                'pascalprecht.translate'        //language support
            ]);

app.config(['$routeProvider', '$locationProvider',
function($routeProvider, $locationProvider){
    //$locationProvider.html5Mode(true);
    $routeProvider.
    when('/login', {
        templateUrl: 'tpl/form/login.html',
        controller: 'LoginCtrl'
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
}]);






app.run(['$rootScope', '$location', '$cookieStore',
function($rootScope, $location, $cookieStore){

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
}]);
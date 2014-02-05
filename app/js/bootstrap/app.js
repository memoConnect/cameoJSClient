'use strict';
var cameo = {
    //restApi:              "http://"+location.host+"/api"
    restApi:                "https://dev.cameo.io/api/v1"
   ,token:                  null
   ,supported_languages:    ['de_DE', 'en_US']
   ,path_to_languages:      'languages'
};


var app = angular.module('cameoClient', [
    'ngRoute',
    'ngCookies',    
    'cmAPI',
    'cmCrypt',
    'cmLanguage',
    'cmLogger',
    'cmNotify',
]);

app.service('cm',[
    'cmAPI'
    'cmCrypt',
    'cmLogger',
    'cmNotify',
    'cmTranslate',
    
    

    function(cmLogger, cmNotify, cmTranslate){
        return {
            log:        cmLogger,
            notify:     cmNotify,
            translate:  cmTranslate,
            crypt:      cmCrypt
            api:        cmAPI
        }
    }
])

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
    when('/registry', {
        templateUrl: 'tpl/form/registry.html',
        controller: 'RegistryCtrl'
    }).
    otherwise({
        redirectTo: '/login'
    });
}]);

app.run(['$rootScope', '$location', '$cookieStore',
function($rootScope, $location, $cookieStore){
    $rootScope.$on( "$routeChangeStart", function(){
//        var path_exceptions = ['/login', '/registry'];
        var path = $location.$$path;

        
        if(angular.isUndefined($cookieStore.get("token"))){
            if(path != "/login" && path != "/registry"){
                $location.path("/login");
            }
        } else if($location.$$path == "/login"){
            $location.path("/start");
        }

        if(angular.isDefined($cookieStore.get("token"))){
            cameo.token = $cookieStore.get("token");
        }
        
    });
}]);
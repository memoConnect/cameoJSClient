/*
'use strict';
var cameo = {
    //restApi: "http://"+location.host+"/api"
    restApi: "https://s.kolibritalk.com/api/v1"
   ,token: null
};

var app = angular.module('cameoClient', ['ngRoute','ngCookies']);

app.config(['$routeProvider', '$locationProvider',function($routeProvider, $locationProvider){
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
}]);*/

(function() {
    "use strict";
    this.cameo = {
        restApi: "https://s.kolibritalk.com/api/v1",
        token: null
    };

    this.app = angular.module('cameoClient', ['ngRoute', 'ngCookies']);

    this.app.config([
        '$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
            $routeProvider.when('/login', {
                templateUrl: 'tpl/form/login.html',
                controller: 'LoginCtrl'
            });
            $routeProvider.when('/start', {
                templateUrl: 'tpl/start.html',
                controller: 'StartCtrl'
            });
            $routeProvider.when('/talks', {
                templateUrl: 'tpl/list/talks.html',
                controller: 'TalksCtrl'
            });
            $routeProvider.when('/conversation/:conversationId', {
                templateUrl: 'tpl/conversation.html',
                controller: 'ConversationCtr'
            });
            $routeProvider.when('/mediawall', {
                templateUrl: 'tpl/list/mediawall.html',
                controller: 'MediaWallCtrl'
            });
            $routeProvider.otherwise({
                redirectTo: '/login'
            });
        }
    ]);

    this.app.run([
        '$rootScope', '$location', '$cookieStore', function($rootScope, $location, $cookieStore) {
            var goToHome;
            goToHome = function() {
                if (angular.isUndefined($cookieStore.get('token'))) {
                    return $location.path('/login');
                } else if ($location.$$path === '/login') {
                    return $location.path('/login');
                }
            };
            return $rootScope.$on('$routeChangeStart', function() {
                goToHome();
                if (angular.isDefined($cookieStore.get('token'))) {
                    cameo.token = $cookieStore.get('token');
                }
                goToHome();
            });
        }
    ]);

}).call(this);
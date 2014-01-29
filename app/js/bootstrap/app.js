'use strict';
var cameo = {
    //restApi: "http://"+location.host+"/api"
    restApi: "https://s.kolibritalk.com/api/v1"
   ,token: null
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





/* Langugae support */

var translations =  {
                        HEADLINE:       'What an awesome module!',
                        PARAGRAPH:      'Srsly!',
                        NAMESPACE:      {
                                            PARAGRAPH: 'And it comes with awesome features!'
                                        },
                        AUTO_LOGIN:     'auto login (Max)',
                        BUTTON_TEXT_DE: 'de',                        
                        BUTTON_TEXT_EN: 'en',
                    };
                     
app.config(['$translateProvider', function ($translateProvider) {

    $translateProvider.useStaticFilesLoader({
      prefix: 'languages/',            //neue route BE
      suffix: '.json'
    });

    $translateProvider.preferredLanguage('en_US');
    //$translateProvider.useLocalStorage();
}]);


app.controller('TranslateCtrl', ['$translate', '$scope', function ($translate, $scope) {

    // Make language switch available to the application scope:
    //  Example ng-click="changeLanguage('de')"
    $scope.changeLanguage = function (langKey) {
        $translate.uses(langKey);
    };
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
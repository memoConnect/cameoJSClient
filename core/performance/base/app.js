angular.module('cameoClientPerformance',[
    'ngRoute',
    'ngCookies',
    'ngSanitize',
    // cameo dependencies
    'cmRoutes',
    'cmWidgets',
    'cmCore',
    'cmPhonegap',
    'cmUi',
    'cmUser',
    'cmContacts',
    'cmConversations',
    'cmValidate'])
    .config(['$sceDelegateProvider','$routeProvider',function($sceDelegateProvider, $routeProvider){

        $sceDelegateProvider.resourceUrlWhitelist([
            'self',
            'https://stage.cameo.io/**'
        ]);

        $routeProvider.
            when('/start', {
                templateUrl: 'performance/routes/ctrl-start.html',
                controller: 'CtrlStart'
            }).
            when('/keygen', {
                templateUrl: 'performance/routes/ctrl-keygen.html',
                controller: 'CtrlKeygen'
            })
            .when('/ui', {
                templateUrl: 'performance/routes/ctrl-ui.html',
                controller: 'CtrlUi'
            })
            .when('/endecrypt', {
                templateUrl: 'performance/routes/ctrl-endecrypt.html',
                controller: 'CtrlEndecrypt'
            })
            .otherwise({
                redirectTo: '/start'
            });
    }]);
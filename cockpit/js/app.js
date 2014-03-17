var app = angular.module("cockpit", ["ngRoute", "cmAuth", "cmApi", "cmCrypt", "cmLogger", "cockpitList", "cockpitEdit", "cockpitMain"])

app.config(["cmApiProvider",
    function (cmApiProvider) {
        cmApiProvider.restApiUrl("http://localhost:9000/api/cockpit/v1")
    }
])

app.config(function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'cockpitMain.html',
        controller: 'cockpitMainCtrl'
    })
    $routeProvider.when('/:elementName', {
        templateUrl: 'cockpitList.html',
        controller: 'cockpitListCtrl'
    })
    $routeProvider.when('/:elementName/:id', {
        templateUrl: 'cockpitEdit.html',
        controller: 'cockpitEditCtrl'
    })
        .otherwise({redirectTo: "/"})
});

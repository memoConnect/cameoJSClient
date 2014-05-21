var app = angular.module("cockpit", ["ngRoute", "cmCore", "cockpitList", "cockpitEdit", "cockpitMain"])

app.config(["cmApiProvider",
    function (cmApiProvider) {
        cmApiProvider.restApiUrl(cameo_config.restApi.replace("/a/v1", "/a/cockpit/v1"))
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
    $routeProvider.when('/:elementName/filter/:filterName/:filterTerm', {
        templateUrl: 'cockpitList.html',
        controller: 'cockpitListCtrl'
    })
    $routeProvider.when('/:elementName/:id', {
        templateUrl: 'cockpitEdit.html',
        controller: 'cockpitEditCtrl'
    })
        .otherwise({redirectTo: "/"})
});

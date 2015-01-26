angular.module("cockpit", [
    "ngRoute", "cmCore", "cockpitList", "cockpitEdit", "cockpitMain"
])
.config(["cmApiProvider", "cmConfigProvider",
    function (cmApiProvider, cmConfigProvider) {
        cmApiProvider.restApiUrl(cmConfigProvider.get('restApi').replace("/a/", "/a/cockpit/"))
    }
])
.config(function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'cockpitMain.html',
        controller: 'cockpitMainCtrl'
    })
    .when('/:elementName', {
        templateUrl: 'cockpitList.html',
        controller: 'cockpitListCtrl'
    })
    .when('/:elementName/filter/:filterName/:filterTerm', {
        templateUrl: 'cockpitList.html',
        controller: 'cockpitListCtrl'
    })
    .when('/:elementName/:id', {
        templateUrl: 'cockpitEdit.html',
        controller: 'cockpitEditCtrl'
    })
    .otherwise({redirectTo: "/"});
});

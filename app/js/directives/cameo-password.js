'use strict';
app.directive('cameoPassword', function () {
    return  {
        restrict    :   'E',
        templateUrl :   'tpl/directives/cameo-password.html',
        scope       :   {},
        controller  :   'RegistryCtrl'
    }
});
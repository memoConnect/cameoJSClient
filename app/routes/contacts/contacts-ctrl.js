define([
    'app',
    'ngload!pckContacts',
    'ngload!pckUi',
    'ngload!pckValidate'
], function(app){
    'use strict';

    app.register.controller('ContactsCtrl',[
        '$scope',
        'cmContactsModel',
        function($scope, cmContactsModel){
            $scope.tabs = [
                {i18n:'ADD','default':true},
                {i18n:'REQUESTS'}
            ];
        }
    ]);
});
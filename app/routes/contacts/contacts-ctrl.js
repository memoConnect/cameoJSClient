define([
    'app',
    'ngload!pckContacts',
    'ngload!pckUi',
    'ngload!pckValidate'
], function(app){
    'use strict';

    app.register.controller('ContactsCtrl',[
        '$scope',
        '$modal',
        function($scope, $modal){
            // deprecated tabs for friendrequests
            $scope.tabs = [
                {i18n:'ADD','default':true},
                {i18n:'REQUESTS'}
            ];

            // search or add modal popup
            $scope.openAddModal = function(){
                $modal.open({
                    windowClass: 'cm-with-nose-to-add-edge',
                    template:
                        '<i class="fa cm-nose-right"></i>'+
                        '<a href="#/contacts/search" ng-click="close()" class="cm-btn cm-btn-lg cm-btn-block cm-btn-primary">{{"CONTACTS.LABEL.SEARCH_IDENTITY"|cmTranslate}}</a>'+
                        '<a href="#/contact/new" ng-click="close()" class="cm-btn cm-btn-lg cm-btn-block cm-btn-primary">{{"CONTACTS.LABEL.ADD_EXTERN"|cmTranslate}}</a>',
                    controller: function ($rootScope, $scope, $modalInstance) {

                        $scope.close = function(){
                            if($modalInstance != undefined)
                                $modalInstance.close();
                        };
                    }
                });
            };
        }
    ]);
});
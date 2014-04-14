define([
    'app',
    'ngload!pckContacts',
    'ngload!pckUi',
    'ngload!pckValidate'
], function(app){
    'use strict';

    app.register.controller('ContactCtrl',[
        '$scope',
        '$routeParams',
        'cmContactsModel',
        'cmIdentityFactory',
        'cmUtil',
        function($scope, $routeParams, cmContactsModel, cmIdentityFactory, cmUtil){

            $scope.cmUtil = cmUtil;

            if($routeParams.id == 'new'){
                $scope.contact = {};
                $scope.identity = {};
                $scope.editable = true;
                $scope.chooseAvatar = true;
            } else {
                $scope.chooseAvatar = false;
                cmContactsModel.getOne($routeParams.id).then(
                    function (data) {
                        // set data froom api
                        $scope.contact = data;
                        // get identity model
                        $scope.identity = cmIdentityFactory.create(data.identity);

                        // cameo user can't edit only extern end local
                        $scope.editable = data.contactType == 'internal' ? false : true;
                    }
                );
            }
        }
    ]);
});

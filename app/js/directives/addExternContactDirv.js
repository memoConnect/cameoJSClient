define([
    'app',
    '_d/typeChooserDirv'
], function(app){
    'use strict'

    app.register.directive('cmAddExternContact',
        function(ModelContacts, cmLogger){

            function fulltrim(string){
                return string.replace(/(?:(?:^|\n)\s+|\s+(?:$|\n))/g,'').replace(/\s+/g,'');
            }

            return {
                restrict: 'A',
                scope: {},
                templateUrl: 'js/directives/addExternContact.html',
                controller: function($scope, $element, $attrs){
                    var lockNicknameCreation = false;
                    $scope.data = {
                        name: '',
                        surname: ''
                    };

                    $scope.handleNickname = function(){
                        lockNicknameCreation = true;
                        $scope.data.nickname = fulltrim($scope.data.nickname);
                    };

                    $scope.createNickname = function(){
                        if($scope.data.nickname == "") lockNicknameCreation = false;
                        if(lockNicknameCreation) return false;
                        $scope.data.nickname = fulltrim($scope.data.name+" "+$scope.data.surname);
                    };
                }
            }
        })
    return app;
});
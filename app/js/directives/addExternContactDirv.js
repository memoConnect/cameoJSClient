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
                    $scope.formVisible = false;

                    $scope.data = {
                        name: '',
                        surname: ''
                    };

                    /**
                     * simple toggle for form visibility
                     */
                    $scope.toggleForm = function(){
                        if($scope.formVisible == true)
                            $scope.formVisible = false;
                        else
                            $scope.formVisible = true;
                    };

                    /**
                     * handle the nickname input
                     * change lock Nickname boolean
                     * and trim all white spaces
                     */
                    $scope.handleNickname = function(){
                        lockNicknameCreation = true;
                        $scope.data.nickname = fulltrim($scope.data.nickname);
                    };

                    /**
                     * concat name and surname to nickname if the input isnt locked
                     */
                    $scope.createNickname = function(){
                        if($scope.data.nickname == "")
                            lockNicknameCreation = false;

                        if(lockNicknameCreation)
                            return false;

                        $scope.data.nickname = fulltrim($scope.data.name+" "+$scope.data.surname);
                    };
                }
            }
        })
    return app;
});
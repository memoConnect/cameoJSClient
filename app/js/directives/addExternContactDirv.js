define([
    'app',
    '_d/typeChooserDirv'
], function(app){
    'use strict';

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
                var pristineDisplayName = true;
                $scope.formVisible = false;

                $scope.data = {
                    displayName: '',
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
                $scope.handleDisplayName = function(){
                    pristineDisplayName = false;
                    $scope.data.nickname = fulltrim($scope.data.displayName);
                };

                /**
                 * concat name and surname to nickname if the input isnt locked
                 */
                $scope.createDisplayName = function(){
                    if($scope.data.displayName == "")
                        pristineDisplayName = true;

                    if(pristineDisplayName === false)
                        return false;

                    $scope.data.displayName = fulltrim($scope.data.name+" "+$scope.data.surName);
                    return true;
                };

                /**
                 * Validateform and create external contact
                 */
                $scope.checkForm = function(){
                    console.log($scope.addExternContact);

                    //ModelContacts.addContact($scope.data);
                };
            }
        }
    });

    return app;
});
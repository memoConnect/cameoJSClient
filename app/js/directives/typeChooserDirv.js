define([
    'app'
], function(app){
    'use strict';

    app.register.directive('cmTypeChooser',
        function(cmLogger){
            return {
                restrict: 'A',
                scope: {
                    chooseValue: '='
                },
                templateUrl: 'tpl/directives/cm-type-chooser.html',
                link: function($scope, $element, $attrs){

                    function find(value, searchDefault){
                        var btn = "";
                        angular.forEach($scope.buttons,function(button){
                            if(searchDefault != undefined && 'default' in button){
                                btn = button.value;
                            }
                            if(value != undefined && button.value == value){
                                btn = button.value;
                            }
                        })
                        return btn;
                    }

                    $scope.buttons = [
                        {i18n:'TYPE_CHOOSER.PRIVATE',value:'private'},
                        {i18n:'TYPE_CHOOSER.BUSINESS',value:'business'},
                        {i18n:'TYPE_CHOOSER.OTHER',value:'other','default':true}
                    ];

                    $scope.setActive = function(value){
                        $scope.chooseValue = find(value);
                    };

                    $scope.setActive(find(null, true));
                }
            }
        });
})
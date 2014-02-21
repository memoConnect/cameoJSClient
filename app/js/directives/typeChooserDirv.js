define([
    'app'
], function(app){
    'use strict';

    app.register.directive('cmTypeChooser',
        function(cmLogger){
            // defined types
            var types = {
                types: [
                    {i18n:'DIRV.TYPE_CHOOSER.PRIVATE',value:'private'},
                    {i18n:'DIRV.TYPE_CHOOSER.BUSINESS',value:'business'},
                    {i18n:'DIRV.TYPE_CHOOSER.OTHER',value:'other','default':true}
                ],
                provider: [
                    {i18n:'DIRV.TYPE_CHOOSER.LANDLINE',value:'landline'},
                    {i18n:'DIRV.TYPE_CHOOSER.IP',value:'ip'},
                    {i18n:'DIRV.TYPE_CHOOSER.FAX',value:'fax'},
                    {i18n:'DIRV.TYPE_CHOOSER.MOBILE',value:'mobile','default':true}
                ]
            };

            return {
                scope: true,
                templateUrl: 'js/directives/typeChooser.html',
                controller: function($scope, $element, $attrs){
                    // handle special type of choose default
                    if('chooseType' in $attrs && $attrs.chooseType in types){
                        $scope.buttons = types[$attrs.chooseType];
                    } else {
                        $scope.buttons = types.types;
                    }

                    /**
                     * search in buttons array for value or default
                     * @string value
                     * @boolean searchDefault
                     * @returns {string}
                     */
                    function find(value, searchDefault){
                        var btn = "";
                        angular.forEach($scope.buttons, function(button){
                            if(searchDefault != undefined && 'default' in button){
                                btn = button.value;
                            }
                            if(value != undefined && button.value == value){
                                btn = button.value;
                            }
                        });
                        return btn
                    }

                    /**
                     * set button to active and set parent scope variable
                     * @string value
                     */
                    $scope.setActive = function(value){
                        $scope.active = find(value);
                        $scope.data[$attrs.chooseToData] = $scope.active;
                    };

                    // set default button
                    $scope.setActive(find(null, true))
                }
            }
        })
    return app;
});
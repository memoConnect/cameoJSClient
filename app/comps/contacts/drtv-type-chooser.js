'use strict';

angular.module('cmContacts').directive('cmTypeChooser',[
    'cmLogger',
    function (cmLogger){
        // defined types
        var types = {
            types: [
                {i18n:'DRTV.TYPE_CHOOSER.PRIVATE',value:'private','default':true},
                {i18n:'DRTV.TYPE_CHOOSER.BUSINESS',value:'business'},
                {i18n:'DRTV.TYPE_CHOOSER.OTHER',value:'other'}
            ],
            provider: [
                {i18n:'DRTV.TYPE_CHOOSER.LANDLINE',value:'landline'},
                {i18n:'DRTV.TYPE_CHOOSER.IP',value:'ip'},
                {i18n:'DRTV.TYPE_CHOOSER.FAX',value:'fax'},
                {i18n:'DRTV.TYPE_CHOOSER.MOBILE',value:'mobile','default':true}
            ]
        };

        return {
            scope: true,
            templateUrl: 'comps/contacts/drtv-type-chooser.html',
            controller: function($scope, $element, $attrs){
                $scope.buttons = [];
                // TODO: reset parent form must reset types
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
                $scope.setActive = function(value ,isFirst){

                    if(isFirst == undefined && 'cmDisabled' in $attrs && $scope.$eval($attrs.cmDisabled) == true){
                        return false;
                    }

                    $scope.active = find(value);
                    // addtion to parent data collection
                    if($scope.data != undefined && $attrs['chooseToData'] != undefined)
                        $scope.data[$attrs.chooseToData] = $scope.active;

                    // direct addtion to item
                    if('cmChooseValueTo' in $attrs && $scope.$eval($attrs['cmChooseValueTo']) != undefined){
                        $scope.$eval($attrs['cmChooseValueTo']).type = $scope.active;
                    }
                };

                // set default button
                $scope.setActive(find(null, true),true)
            }
        }
    }
]);
'use strict';

/**
 * @ngdoc directive
 * @name cmUi.directive:cmCountryPrefixList
 * @description
 * a list for all possile countries with prefix and flag
 *
 * @restrict E
 * @requires cmCountryPrefix
 * @requires cmUtil
 * @requires $timeout
 * @requires $window
 * */

angular.module('cmUi')
.directive('cmCountryPrefixList',[
    'cmCountryPrefix', 'cmUtil',
    '$timeout', '$window',
    function (cmCountryPrefix, cmUtil,
              $timeout, $window){

        return{
            restrict: 'E',
            templateUrl: 'comps/ui/country-prefix/drtv-country-prefix-list.html',
            controller: function($scope){
                $scope.activeListCountry = {};
                $scope.foundCountry = {};
                $scope.countries = [];
                // init
                cmCountryPrefix.getCountries().then(function(countries){
                    $scope.countries = countries;
                });

                $scope.chooseCountry = function(country){
                    $scope.$broadcast('cmCountryPrefixHandler:set', country);
                };
            },
            link: function(scope, element){
                // scroll into mask
                function scrollTo(elementTo){
                    var elementToScroll = elementTo || element[0].querySelector('.is-active')

                    if(elementToScroll){
                        var wrapOffsetTop = element[0].offsetTop,
                            middleOfWrap = (element[0].offsetHeight / 2) - (elementToScroll.offsetHeight / 2);

                        var newTop = elementToScroll.offsetTop - wrapOffsetTop - middleOfWrap;
                        element[0].scrollTop = newTop;
                    }
                }

                // search for countries
                var searchValue = '',
                    timer = null;
                function searchForCountry(event){
                    // on esc close
                    if(event.keyCode == 27){
                        scope.$apply(function(){
                            scope.chooseCountry();
                        });
                        return false;
                    }
                    // on return confirm search
                    if(event.keyCode == 13){
                        scope.$apply(function(){
                            scope.chooseCountry(scope.foundCountry);
                        });
                        return false;
                    }

                    // numpad
                    if(event.keyCode >= 96 && event.keyCode <= 105) {
                        searchValue = searchValue + String.fromCharCode(event.keyCode - 48).toLowerCase();
                    // chars and numbers and symbols
                    } else {
                        searchValue = searchValue + String.fromCharCode(event.keyCode).toLowerCase();
                    }

                    var elementFound;
                    // search for chars
                    if(searchValue.search(/^[a-zA-Z]*$/) == 0){
                        elementFound = element[0].querySelector("[cm-country-prefix-shortcut^='"+searchValue+"']")
                    // search for numberprefix
                    } else if(searchValue.search(/^[0-9]*$/) == 0){
                        elementFound = element[0].querySelector("[cm-country-prefix-number^='"+searchValue+"']")
                    }

                    // element found
                    if(elementFound){
                        scrollTo(elementFound);
                        scope.$apply(function(){
                            scope.foundCountry = cmCountryPrefix.getOneByShortcut(elementFound.getAttribute('cm-country-prefix-shortcut'))[0];
                        });
                    }

                    //reset searchValue
                    $timeout.cancel(timer);
                    $timeout(function(){
                        searchValue = '';
                    },1000)
                }

                // detect keyinput
                function initFilter(unbind){
                    if(!unbind){
                        angular.element($window).on('keyup', searchForCountry);
                    } else {
                        angular.element($window).off('keyup', searchForCountry);
                    }
                }

                function clickOutside(e){
                    if(e.target != element[0] && // target not drtv
                        !cmUtil.findParent('cmCountryPrefixList',e.target) && // isnt list
                        !cmUtil.findParent('cmCountryPrefixHandler',e.target) // isnt handler
                    ) {
                        toggleList(false);
                        scope.$apply(function() {
                            scope.chooseCountry();
                        });
                    }
                }

                function toggleList(visibility, activeCountry){
                    scope.activeListCountry = activeCountry || {};

                    if(visibility) {
                        element.addClass('is-visible');
                        angular.element($window).on('click',clickOutside);
                        angular.element($window).on('touchstart',clickOutside);
                        initFilter();
                        // be sure active is setted
                        $timeout(function () {
                            scrollTo();
                        }, 50);
                        // reset list
                    } else {
                        element.removeClass('is-visible');
                        angular.element($window).off('click',clickOutside);
                        angular.element($window).off('touchstart',clickOutside);
                        initFilter(true);
                        scope.foundCountry = {};
                    }
                }

                // event handling for toggle list click outside
                var killWatcher = scope.$on('cmCountryPrefixList:toggle', function(event, visibility, activeCountry){
                    toggleList(visibility, activeCountry);
                });

                scope.$on('$destroy', function(){
                    angular.element($window).off('keyup', searchForCountry);
                    angular.element($window).off('click',clickOutside);
                    angular.element($window).off('touchstart',clickOutside);
                    killWatcher();
                });
            }
        }
    }
]);
'use strict';

angular.module('cmConversations').directive('cmSearchConversations',[
    'cmConversationFactory',
    'cmFilter',
    'cmLoader',
    '$timeout',
    function (cmConversationFactory, cmFilter, cmLoader, $timeout){
        return {
            restrict: 'EA',
            template: '<button class="cm-btn-grey" data-qa="load-more-btn" ng-click="searchArchive()" cm-reactive><span ng-show="!showLoader">{{"TALKS.SEARCH_ARCHIVE"|cmTranslate}}<i class="fa cm-search"></i></span><cm-loader cm-color="ci-color" ng-show="showLoader"></cm-loader></button>',
            link: function(scope, element){
                scope.setDefault = function(){
                    scope.isDisabled = false;
                    if(element.hasClass('cm-disabled')){
                        element.removeClass('cm-disabled');
                    }
                };

                scope.setDefault();

                scope.updateElement = function(){
                    if(!element.hasClass('cm-disabled')){
                        element.addClass('cm-disabled');
                        scope.isDisabled = true;
                    }
                };
            },
            controller: function($scope){
                var loader = new cmLoader($scope);
                var isLoading = false;

                $scope.timeout = null;
                $scope.limit = 10;
                $scope.offset = 0;
                $scope.numberOfMatches = 0;
                $scope.searchString = '';
                $scope.oldString = '';

                $scope.searchArchive = function(){
                    $scope.searchString = cmFilter.get();

                    if(typeof $scope.searchString == 'string' && $scope.searchString != '' && $scope.searchString.length >= 3 && !isLoading && !$scope.isDisabled){
                        isLoading = true;
                        loader.start();

                        if($scope.timeout != null) $timeout.cancel($scope.timeout);

                        $scope.timeout = $timeout(function(){
                            cmConversationFactory.search($scope.searchString, $scope.limit, $scope.offset).then(
                                function(data){
                                    if(typeof data.conversations != 'undefined'){
                                        $scope.offset = data.conversations.length;
                                    }

                                    if(typeof data.numberOfMatches == 'number'){
                                        $scope.numberOfMatches = data.numberOfMatches;
                                    }
                                },
                                function(result){
                                    //console.log('error', result)
                                }
                            ).finally(
                                function(){
                                    loader.stop();
                                    isLoading = false;
                                    $scope.updateElement();
                                }
                            )
                        },500);
                    }
                };

                function clear(){
                    $scope.offset = 0;
                    $scope.numberOfMatches = 0;

                    $scope.setDefault();
                }

                //cmFilter.onSet('wdgt-talks', clear);

                cmFilter.onClear('wdgt-talks', clear);

            }
        }
    }
]);
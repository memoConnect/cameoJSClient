'use strict';

angular.module('cmConversations').directive('cmSearchConversations',[
    'cmConversationFactory',
    'cmFilter',
    'cmLoader',
    '$timeout',
    '$document',
    function (cmConversationFactory, cmFilter, cmLoader, $timeout, $document){
        return {
            restrict: 'E',
            template: '<button class="cm-btn-grey" data-qa="btn-search-archive" ng-click="searchArchive()" cm-reactive><span ng-show="!showLoader"><span class="enabledText">{{"TALKS.SEARCH.BUTTON.SERVER_SEARCH_ACTIVE"|cmTranslate}}</span><span class="disabledText cm-hide">{{"TALKS.SEARCH.BUTTON.SERVER_SEARCH_INACTIVE"|cmTranslate}}</span><i class="fa cm-search"></i></span><cm-loader cm-color="ci-color" ng-show="showLoader"></cm-loader></button>',
            link: function(scope, element){

                function toggleButtonText(){
                    if(scope.isDisabled){
                        angular.element($document[0].querySelector('span.disabledText')).removeClass('cm-hide')
                        angular.element($document[0].querySelector('span.enabledText')).addClass('cm-hide')
                    } else {
                        angular.element($document[0].querySelector('span.enabledText')).removeClass('cm-hide')
                        angular.element($document[0].querySelector('span.disabledText')).addClass('cm-hide')
                    }
                }

                scope.setDefault = function(){
                    scope.isDisabled = false;
                    element.removeClass('cm-disabled');
                    toggleButtonText()
                };

                scope.updateElement = function(){
                    if(scope.matches.loaded == scope.matches.qty){
                        scope.isDisabled = true;
                        element.addClass('cm-disabled');
                        toggleButtonText()

                    } else {
                        scope.setDefault();
                    }
                };

                scope.setDefault();
            },
            controller: function($scope){
                var loader = new cmLoader($scope),
                    isLoading = false,
                    limit = 10;

                $scope.timeout = null;

                $scope.matches = {
                    loaded: 0,
                    qty: 0
                };

                $scope.searchArchive = function(){
                    var s = cmFilter.get();

                    if(typeof s == 'string' && s != '' && s.length >= 3 && !isLoading && !$scope.isDisabled){
                        isLoading = true;
                        loader.start();

                        if($scope.timeout != null) $timeout.cancel($scope.timeout);

                        $scope.timeout = $timeout(function(){
                            cmConversationFactory.search(s, limit, $scope.matches.loaded).then(
                                function(data){
                                    if(typeof data.conversations != 'undefined'){
                                        $scope.matches.loaded = $scope.matches.loaded + data.conversations.length;
                                    }

                                    if(typeof data.numberOfMatches == 'number'){
                                        $scope.matches.qty = data.numberOfMatches;
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
                    $scope.matches = {
                        loaded: 0,
                        qty: 0
                    };

                    $scope.setDefault();
                }

                cmFilter.onUpdate('wdgt-talks', clear);
                cmFilter.onClear('wdgt-talks', clear);

                $scope.$on('$destroy',function(){
                    clear();
                    cmFilter.removeOnUpdate('wdgt-talks');
                    cmFilter.removeOnClear('wdgt-talks');
                });

            }
        }
    }
]);
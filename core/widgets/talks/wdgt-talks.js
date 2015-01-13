'use strict';

/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetConversationOverview
 * @description
 * List conversations.
 *
 * @restrict AE
 * @example
 */


angular.module('cmWidgets')
.directive('cmWidgetTalks', [
    'cmUserModel', 'cmConversationFactory', 'cmFilter',
    function(cmUserModel, cmConversationFactory, cmFilter){
        return {
            restrict:       'AE',
            scope:          true,   
            templateUrl:    'widgets/talks/wdgt-talks.html',
            controller: function($scope, $element, $attrs){
                /**
                 * init conversations to scope
                 */
                $scope.conversations = cmConversationFactory;
                if($scope.conversations.length == 0){
                    $scope.conversations.getList();
                }

                /**
                 * load more Conversations
                 */
                $scope.loadMoreTalks = function(){
                    if(cmUserModel.isAuth() != false){
                        $scope.conversations.getList($scope.conversations.getLimit(), $scope.conversations.length);
                    }
                };

                /**
                 * Show More Button
                 * @returns {boolean}
                 */
                $scope.moreTalksAvailable = function(){
                    if($scope.conversations.length == 0){
                        return false;
                    }

                    if($scope.conversations.length == $scope.conversations.getQuantity()){
                        return false;
                    }

                    return true;
                };

                /**
                 * add ServerSideSearch for filter
                 */
                var searchLimit = 10,
                    searchOffset = 0,
                    searchNumberOfMatches = 0;

                $scope.searchArchive = function(){
                    var s = cmFilter.get();

                    if(typeof s == 'string' && s != '' && s.length >= 3){
                        cmConversationFactory.search(s, searchLimit, searchOffset).then(
                            function(data){
                                if(typeof data.conversations != 'undefined'){
                                    searchOffset = data.conversations.length;
                                }

                                if(typeof data.numberOfMatches == 'number'){
                                    searchNumberOfMatches = data.numberOfMatches;
                                }
                            },
                            function(result){
                                //console.log('error', rtesult)
                            }
                        )
                    }
                };

                $scope.moreArchiveTalksAvailable = function(){
                    if(searchOffset > 0 && searchNumberOfMatches > 0 && (searchOffset >= searchNumberOfMatches)){
                        return false;
                    }

                    return true;
                };

                function onClearFilter(){
                    searchOffset = 0;
                    searchNumberOfMatches = 0;
                }

                cmFilter.onClear('wdgt-talks', onClearFilter);
            }
        }
    }
]);
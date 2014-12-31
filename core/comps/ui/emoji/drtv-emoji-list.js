'use strict';

angular.module('cmUi')
.directive('cmEmojiList',[
    'cmUtil', 'emoji',
    '$window', '$rootScope',
    function (cmUtil, emoji,
              $window, $rootScope) {

        var blacklist = ['poop', 'shit', '\\-1', '\\+1', 'facepunch', 'shipit'],
            sortCategories = {
                'cameo': ['moep'],
                'people': ['smiley', 'hands', 'ape', 'cat', 'faces', 'hearts', 'specials', 'woman', 'unsorted'],
                'symbols': ['lock', 'unsorted'],
                'nature': ['misc', 'pet', 'planets']
            };

        return{
            restrict: 'E',
            template: '<div ng-show="showList">' +
                        '<div ng-repeat="emoji in emojis" class="emoji-wrapper" ng-click="insertEmoji(emoji)" cm-reactive>' +
                            '<i class="emoji emoji_{{emoji}}" title=":{{emoji}}:">{{emoji}}</i>' +
                        '</div>' +
                    '<div>',
            require: '?ngModel',
            link: function(scope, element, attrs, ngModel){
                var textarea;

                function clickOutside(e){
                    if(e.target != element[0] && // target not emojilist
                        !cmUtil.findParent('cmEmojiList',e.target) && // isnt list
                        !cmUtil.findParent('cmEmojiHandler',e.target) // isnt handler
                    ) {
                        scope.toggleList('close',true);
                    }
                }

                function createEmoji(emoji){
                    if(blacklist.indexOf(emoji) == -1) {
                        scope.emojis.push(emoji);
                    }
                }

                scope.emojis = [];

                scope.toggleList = function(action, withApply){
                    scope.showList = action != undefined && action == 'close' || action == undefined && scope.showList ? false : true;

                    if(scope.showList){
                        element.addClass('is-visible');
                        angular.element($window).on('click',clickOutside);
                        angular.element($window).on('touchstart',clickOutside);
                    } else {
                        element.removeClass('is-visible');
                        angular.element($window).off('click',clickOutside);
                        angular.element($window).off('touchstart',clickOutside);
                    }

                    if(withApply != undefined && withApply)
                        scope.$apply();

                };

                scope.insertEmoji = function(emoji){
                    if(textarea != undefined && textarea.length > 0){
                        scope.insertAt(':'+emoji+':');
                    }
                };

                scope.insertAt = function(text){
                    var oldValue = ngModel.$viewValue,
                        textStart = textarea[0].selectionStart,
                        textEnd = textarea[0].selectionEnd,
                        insertSymbol = text+' ',
                        strWithEmoticon = oldValue.substring(0, textStart);
                    strWithEmoticon+= cmUtil.endsWith(strWithEmoticon, ' ') ? insertSymbol : ' '+insertSymbol;
                    strWithEmoticon+= oldValue.substring(textEnd);

                    scope.toggleList('close');

                    ngModel.$setViewValue(strWithEmoticon);
                    ngModel.$commitViewValue();
                    ngModel.$render();

                    textarea[0].focus();
                    textarea[0].selectionStart = textEnd+insertSymbol.length;
                    textarea[0].selectionEnd = textEnd+insertSymbol.length;
                };

                // create emojis
                Object.keys(sortCategories).forEach(function(mainCat){
                    sortCategories[mainCat].forEach(function(subCat){
                        emoji.getFromCategory(mainCat, subCat).forEach(function(emoji){
                            createEmoji(emoji);
                        });
                    });
                });

                scope.toggleList('close');

                // emoji-list-handler watcher
                var killWatcher = $rootScope.$on('cmEmojiList:toggle',function(){
                    scope.toggleList();
                });

                // textarea for emoji insertion
                if(attrs.cmTextarea){
                    textarea = angular.element(document.getElementById(attrs.cmTextarea));
                }

                scope.$on('$destroy', function(){
                    killWatcher();
                    angular.element($window).off('click',clickOutside);
                    angular.element($window).off('touchstart',clickOutside);
                });
            }
        }
    }
]);
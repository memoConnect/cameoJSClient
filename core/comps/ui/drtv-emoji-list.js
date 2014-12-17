'use strict';

angular.module('cmUi')
.directive('cmEmojiList',[
    'emoji',
    'cmUtil',
    '$document',
    '$rootScope',
    function (emoji, cmUtil, $document, $rootScope) {

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
            scope: {
                ngModel: '=ngModel'
            },
            link: function(scope, element, attrs){

                var textarea = undefined,
                    textareaModel = undefined,
                    body = angular.element($document[0].querySelector('body'));

                /**
                 * Function returns a reference of requested parent element.
                 * @param {String} tag_name Tag name of requested parent element.
                 * @param {HTMLElement} el Initial element (from which search begins).
                 */
                function findParent (tag_name, el) {
                    // loop up until parent element is found
                    while (el && el.nodeName !== tag_name) {
                        el = el.parentNode;
                    }
                    // return found element
                    return el;
                }

                function clickOutside(e){
                    if(e.target != element[0] && // target not emojilist
                       !findParent('CM-EMOJI-LIST',e.target) && // emojilist isnt parent
                       !findParent('CM-EMOJI-HANDLER',e.target) // isnt handler
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
                        body.on('click',clickOutside);
                        body.on('touchstart',clickOutside);
                    } else {
                        element.removeClass('is-visible');
                        body.off('click',clickOutside);
                        body.off('touchstart',clickOutside);
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
                    var oldValue = textarea.val(),
                        textStart = textarea[0].selectionStart,
                        textEnd = textarea[0].selectionEnd,
                        insertSymbol = text+' ',
                        strWithEmoticon = oldValue.substring(0, textStart);
                    strWithEmoticon+= cmUtil.endsWith(strWithEmoticon, ' ') ? insertSymbol : ' '+insertSymbol;
                    strWithEmoticon+= oldValue.substring(textEnd);

                    scope.toggleList('close');

                    //textarea.val(strWithEmoticon);
                    scope.ngModel = strWithEmoticon;

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

//                emoji.getAllAsString().split(',').forEach(function(emoji){
//                    createEmoji(emoji);
//                });

                scope.toggleList('close');

                // emoji-list-handler watcher
                $rootScope.$on('cmEmojiList:toggle',function(){
                    scope.toggleList();
                });

                // textarea for emoji insertion
                if(attrs.cmTextarea){
                    textarea = angular.element(document.getElementById(attrs.cmTextarea));
                }
            }
        }
    }
])
.directive('cmEmojiHandler',[
   '$rootScope',
   function($rootScope){
       return{
           restrict: 'E',
           template: '<i class="fa cm-smile-negative with-cursor" ng-click="toggleList()" cm-reactive></i>',
           scope: true,
           controller: function($scope){
               $scope.toggleList = function(){
                   $rootScope.$broadcast('cmEmojiList:toggle');
               }
           }
       }
   }
]);
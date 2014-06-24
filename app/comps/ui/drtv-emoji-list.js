'use strict';

angular.module('cmUi').directive('cmEmojiList',[
    'emoji',
    'cmUtil',
    '$document',
    function (emoji, cmUtil, $document) {

        var blacklist = ['poop', 'shit', '\\-1', '\\+1', 'facepunch', 'shipit'],
            sortCategories = {
                "people": ["smiley", "hands", "ape", "cat", "faces", "hearts", "specials", "woman", "unsorted"],
                "symbols": ["lock", "unsorted"],
                "nature": ["misc", "pet", "planets"]
            };

        return{
            restrict: 'E',
            template: '<div ng-show="showList"><div>',
            link: function(scope, element, attrs){

                var textarea = undefined,
                    textareaModel = undefined,
                    handler = undefined,
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
                       e.target != handler[0]) { // target isnt handler
                       console.log('clickOutside')
                        scope.toggleList(true);
                    }
                }

                function createEmoji(emoji){
                    if(blacklist.indexOf(emoji) == -1) {
                        var icon = angular.element('<div class="emoji-wrapper"><i class="emoji emoji_' + emoji + '" title=":' + emoji + ':">' + emoji + '</i></div>');
                        icon.on('click', function () {
                            scope.insertEmoji(emoji)
                        });
                        element.children().append(icon);
                    }
                }

                scope.toggleList = function(doClose, withoutApply){
                    scope.showList = scope.showList || doClose ? false : true;

                    if(withoutApply == undefined)
                        scope.$apply();

                    if(scope.showList){
                        body.on('click',clickOutside);
                        body.on('touchstart',clickOutside);
                    } else {
                        body.off('click',clickOutside);
                        body.off('touchstart',clickOutside);
                    }

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

                    scope.toggleList(true);

                    if(textareaModel != undefined) {
                        //textarea.val(strWithEmoticon);
                        scope[textareaModel] = strWithEmoticon;
                        scope.$apply();
                    }

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

                scope.toggleList(true, true);

                // visiblitity handler
                if(attrs.cmHandler){
                    handler = angular.element(document.getElementById(attrs.cmHandler));
                    handler.on('click',function(){scope.toggleList()});
                }

                // textarea for emoji insertion
                if(attrs.cmTextarea){
                    textarea = angular.element(document.getElementById(attrs.cmTextarea));

                    if(textarea.length > 0) {
                        textareaModel = textarea.attr('ng-model');
                    }
                }
            }
        }
    }
]);
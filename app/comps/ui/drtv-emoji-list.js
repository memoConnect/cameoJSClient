'use strict';

angular.module('cmUi').directive('cmEmojiList',[
    'emoji',
    'cmUtil',
    function (emoji, cmUtil){

        var blacklist = ['poop', 'shit', '\\-1', '\\+1', 'facepunch', 'shipit'];

        return{
            restrict: 'E',
            template: '<div ng-show="showList"><div>',
            link: function(scope, element, attrs){

                var textarea = undefined,
                    textareaModel = undefined;

                scope.showList = false;

                scope.toggleList = function(){
                    scope.showList = scope.showList ? false : true;
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

                    scope.showList = false;

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
                emoji.getAllAsString().split(',').forEach(function(emoji){
                    if(blacklist.indexOf(emoji) == -1) {
                        var icon = angular.element('<div class="emoji-wrapper"><i class="emoji emoji_' + emoji + '" title=":' + emoji + ':">' + emoji + '</i></div>');
                        icon.on('click', function () {
                            scope.insertEmoji(emoji)
                        });
                        element.children().append(icon);
                    }
                });
                // visiblitity handler
                if(attrs.cmHandler){
                    var handler = angular.element(document.getElementById(attrs.cmHandler));
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
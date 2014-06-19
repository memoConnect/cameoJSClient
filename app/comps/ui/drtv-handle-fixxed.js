'use strict';

angular.module('cmUi').directive('cmHandleFixxed',[
    'cmEnv',
    function (cmEnv) {
        return {
            restrict: 'A',
            link: function (scope, element) {

                function stopEvent(e){
                    if(e.target != trigger) {
                        e.preventDefault();
                        e.stopPropagation();
                        return false;
                    }
                }

                // Fix mobile floating toolbar when input is focused
                if(cmEnv.isiOS){
//                    var headerAndFooter = angular.element(document.querySelectorAll('cm-header, div.answer, cm-footer'));
//
//                    element
//                    .on('focus', function(e) {
//                        headerAndFooter.css('position', 'absolute');
//                    })
//                    .on('blur', function(e) {
//                        headerAndFooter.css('position', '');
//                    });

                    var view = angular.element(document.querySelector('body'));
                    var trigger = document.querySelector('i.cm-post');

                    element
                    .find('textarea')
                    .on('focus',function(){
                        view.on('touchstart',stopEvent);
                    })
                    .on('blur',function(){
                        view.off('touchstart',stopEvent)
                    });
                }
            }
        }
    }
]);
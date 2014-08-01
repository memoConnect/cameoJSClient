'use strict';

/**
 password security settings:
 cm-ios-focus="{
    fixedElements:'cm-header, cm-conversation-controls',
    scrollTop:true,
    handler:'#captcha-anchor'
}"

 conversation subject:
 cm-ios-focus="{
    fixedElements:'cm-header',
    scrollTop:true
}"

 conversation answer:
 cm-ios-focus="{
    fixedElements:'cm-header',
    handler:'.post-wrap'
}"

 var settings = undefined,
 fixedElements = undefined,
 view = undefined,
 handler = undefined;

 function stopEvent(e){
    if(e.target != element[0] && e.target != handler) {
        element[0].blur();
        e.preventDefault();
        e.stopPropagation();
        return false;
    }
}

 // Fix mobile floating toolbar when input is focused
 if(cmEnv.isiOS && attrs.cmIosFocus != ''){
    settings = scope.$eval(attrs.cmIosFocus),
    fixedElements = angular.element($document[0].querySelectorAll(settings.fixedElements)),
    view = angular.element($document[0].querySelectorAll('body,html')),
    handler = $document[0].querySelector(settings.handler);

    element.on('focus', function(event){
        view.on('touchstart',stopEvent);
        fixedElements.css('position','absolute');
        if('scrollTop' in settings && settings.scrollTop) {
            angular.forEach(view, function (tag) {
                tag.scrollTop = 0;
            });
        }
    });

    element.on('blur', function(event){
        fixedElements.css('position','fixed');
        view.off('touchstart',stopEvent);
    });
}
 */

angular.module('cmUi').directive('input',[
    'cmEnv',
    '$document',
    function (cmEnv,
              $document) {

        return {
            restrict: 'EA',
            link: function (scope, element) {
                // only for mobile devices
                if(!('isNotMobile' in cmEnv) || cmEnv.isNotMobile)
                    return false;

                // mobile device? go on!
                var tagName = element[0].tagName.toLowerCase(),
                    fixedElements = angular.element($document[0].querySelectorAll('cm-header, cm-footer')),
                    view = angular.element($document[0].querySelectorAll('body,html'));

                console.log(fixedElements)

                function stopEvent(e){
                    if(e.target != element[0] && e.target != handler) {
                        element[0].blur();
                        e.preventDefault();
                        e.stopPropagation();
                        return false;
                    }
                }

                function onFocus(){
                    view.on('touchstart',stopEvent);
                    fixedElements.css('position','absolute');
                    angular.forEach(fixedElements,function(fixedElement){
                        if(fixedElement.tagName.toLowerCase() == 'cm-footer')
                            angular.element(fixedElement).addClass('ng-hide');
                    });
                }

                function onBlur(){
                    fixedElements.css('position','fixed');
                    angular.forEach(fixedElements,function(fixedElement){
                        if(fixedElement.tagName.toLowerCase() == 'cm-footer')
                            angular.element(fixedElement).removeClass('ng-hide');
                    });
                    view.off('touchstart',stopEvent);
                }

                if(tagName == 'input' && element.attr('type') != 'checkbox' ||// only inputs text,password,mail,tel,
                   tagName == 'textarea' // accept texareas to
                ){
                    element.on('focus', onFocus);
                    element.on('blur', onBlur);

                    scope.$on('$destroy', onBlur);
                }
            }
        }
    }
]);
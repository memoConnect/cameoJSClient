'use strict';

angular.module('cmContacts').directive('cmContactType',[
    function (){
        return {
            restrict: 'AE',

            link: function(scope, element, attrs){
                var contact = scope.$eval(attrs.cmData),
                    type    = contact.contactType,
                    icon    = ''

                icon = (type == 'internal')  ? 'cm-rhino-positive'   : icon
                icon = (type == 'external')  ? 'cm-address-book'     : icon
                icon = (type == 'local')     ? 'cm-mobile'           : icon
                icon = (type == 'pending')   ? 'cm-contacts'         : icon

                element.append(
                    angular.element('<i></i>')
                    .addClass('fa')
                    .addClass(icon)
                ).addClass(type)
            }
        }
    }
]);
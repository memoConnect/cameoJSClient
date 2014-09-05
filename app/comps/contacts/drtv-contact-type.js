'use strict';

angular.module('cmContacts').directive('cmContactType',[
    function (){
        return {
            restrict: 'AE',
            link: function(scope, element, attrs){
                function refresh(contact){
                    var type    = contact.contactType,
                        icon    = ''

                    icon = (type == 'internal')  ? 'cm-rhino-positive'   : icon
                    icon = (type == 'external')  ? 'cm-address-book'     : icon
                    icon = (type == 'local')     ? 'cm-mobile'           : icon
                    icon = (type == 'pending')   ? 'cm-rhino-positive'   : icon

                    element.children().remove()

                    element.append(
                        angular.element('<i class="cm-grey"></i>')
                        .addClass('fa')
                        .addClass('cm-lg-icon')
                        .addClass(icon)
                    ).addClass(type)
                }

                scope.$watchCollection(attrs.cmData, refresh)
            }
        }
    }
]);
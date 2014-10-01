'use strict';

angular.module('cmContacts').directive('cmContactType',[

    'cmContactsModel',

    function (cmContactsModel){
        return {
            restrict: 'AE',
            link: function(scope, element, attrs){
                function refresh(identity){

                    var contact = cmContactsModel.findByIdentityId(identity.id)
                        type    = contact ? contact.contactType : 'unknown',
                        icon    = ''

                    icon = (type == 'internal') ? 'cm-rhino-positive'   : icon
                    icon = (type == 'external') ? 'cm-address-book'     : icon
                    icon = (type == 'local')    ? 'cm-mobile'           : icon
                    icon = (type == 'pending')  ? 'cm-rhino-positive'   : icon
                    icon = (type == 'unknown')  ? 'cm-address-book'     : icon         

                    element.children().remove()

                    element.append(
                        angular.element('<i class="cm-grey"></i>')
                        .addClass('fa')
                        //.addClass('cm-lg-icon')
                        .addClass(icon)
                    ).addClass(type)
                }

                scope.$watchCollection(attrs.cmData, refresh)
            }
        }
    }
]);
'use strict';

angular.module('cmContacts').directive('cmContactType',[
    'cmContactsModel',
    function (cmContactsModel){
        return {
            restrict: 'AE',
            link: function(scope, element, attrs){
                function refresh(data){
                    // data maybe a contact or an identity
                    var identity = data.identity || data;

                    var contact = data.contactType
                                ? data
                                : cmContactsModel.findByIdentity(data),
                        type    = contact ? contact.contactType : 'unknown',
                        icon    = ''

                    icon = (type == 'internal') ? 'cm-rhino-positive'   : icon;
                    icon = (type == 'external') ? 'cm-address-book'     : icon;
                    icon = (type == 'local')    ? 'cm-mobile'           : icon;
                    icon = (type == 'pending')  ? 'cm-rhino-positive'   : icon;
                    icon = (type == 'unknown')  ? 'cm-address-book'     : icon;

                    element.children().remove();

                    element.append(
                        angular.element('<i></i>')
                        .addClass('fa')
                        .addClass(icon)
                    ).addClass(type);
                }

                scope.$watchCollection(attrs.cmData, refresh);
            }
        }
    }
]);
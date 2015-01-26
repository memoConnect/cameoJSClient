'use strict';

angular.module('cmContacts').directive('cmContactTrust',[
    'cmContactsModel',
    function (cmContactsModel){
        return {
            restrict: 'E',
            templateUrl: 'comps/contacts/drtv-contact-trust.html',
            controller: function($scope, $element, $attrs){

                $scope.withText = ('cmWithText' in $attrs) ? true : false;

                var contact,
                    watchOn = true;

                function init(){
                    $scope.$on('$destroy',function(){
                        if(contact && 'securityAspects' in contact)
                            contact.securityAspects.off('refresh', refresh);
                    });

                    initWatch();
                }

                function initWatch(data){
                    if(!watchOn || !data)
                        return false;

                    contact = data.contactType
                    ? data
                    : cmContactsModel.findByIdentity(data);

                    if(contact)
                        watchOn = false;
                    else
                        return false;

                    contact.securityAspects.on('refresh', refresh);

                    refresh();
                }

                function refresh(){
                    contact.securityAspects
                        .get()
                        .then(function(){
                            $scope.noKey = contact.securityAspects.applies('NO_KEY');
                            $scope.hasKey = contact.securityAspects.applies('AT_LEAST_ONE_KEY');
                            $scope.hasAuthenticatedKey = contact.securityAspects.applies('AT_LEAST_ONE_AUTHENTICATED_KEY');
                        });
                }

                init();

                $scope.$watchCollection($attrs.cmData, initWatch);
            }
        }
    }
]);
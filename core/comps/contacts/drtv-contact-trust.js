'use strict';

angular.module('cmContacts').directive('cmContactTrust',[
    'cmContactsModel',
    function (cmContactsModel){
        return {
            restrict: 'E',
            scope: {
                data: '=cmData'
            },
            templateUrl: 'comps/contacts/drtv-contact-trust.html',
            controller: function($scope, $element, $attrs){

                $scope.withText = ('cmWithText' in $attrs) ? true : false;

                function refresh(){

                    var contact = $scope.data.contactType
                        ? $scope.data
                        : cmContactsModel.findByIdentity($scope.data)

                    contact.securityAspects.off('refresh', refresh);
                    contact.securityAspects.on('refresh', refresh);

                    $scope.$on('$destroy',function(){
                        contact.securityAspects.off('refresh', refresh);
                    });

                    contact.securityAspects
                        .get()
                        .then(function(){
                            $scope.noKey = contact.securityAspects.applies('NO_KEY');
                            $scope.hasKey = contact.securityAspects.applies('AT_LEAST_ONE_KEY');
                            $scope.hasAuthenticatedKey = contact.securityAspects.applies('AT_LEAST_ONE_AUTHENTICATED_KEY');
                    });
                }

                refresh();

                $scope.$watchCollection($scope.data, refresh);
            }
        }
    }
]);
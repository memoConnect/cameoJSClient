'use strict';

angular.module('cmContacts').directive('cmContactTag',[
    'cmUserModel',
    '$rootScope', '$routeParams', '$timeout',
    function (cmUserModel,
              $rootScope, $routeParams, $timeout){
        return {
            restrict: 'AE',
            scope: {
                contact: "=cmContact"
            },
            templateUrl: 'comps/contacts/drtv-contact-tag.html',
            link: function(scope, element){
                if('id' in $routeParams
                    && scope.contact
                    && scope.contact.id == $routeParams.id){
                    element.addClass('is-active');
                }
            },
            controller: function($scope){

                $scope.editContact = function () {
                    if($scope.contact.contactType != 'pending') {
                        $rootScope.goTo('/contact/' + $scope.contact.id);
                    }
                };
   
                function refreshScope(){
                    $scope.contact.securityAspects
                    .get()
                    .then(function(){
                        $scope.noKey                = $scope.contact.securityAspects.applies('NO_KEY')
                        $scope.hasKey               = $scope.contact.securityAspects.applies('AT_LEAST_ONE_KEY')
                        $scope.hasAuthenticatedKey  = $scope.contact.securityAspects.applies('AT_LEAST_ONE_AUTHENTICATED_KEY')
                    })
                }

                var refresh_scheduled = false

                function scheduleRefresh(){
                    //prevent more than 1 refresh call per second
                    if(!refresh_scheduled){
                        refresh_scheduled = true
                        $timeout(function(){
                            $scope.contact.securityAspects.refresh();
                        }, 1000)
                        .then(function(){
                            refresh_scheduled = false
                        })
                    } 
                }

                refreshScope()

                $scope.contact.securityAspects.on('refresh', refreshScope)
                $scope.contact.identity.on('update:finished', scheduleRefresh)
                cmUserModel.on('update:finished', scheduleRefresh)

                $scope.$on('$destroy',function(){
                    $scope.contact.securityAspects.on('refresh', refreshScope)
                    $scope.contact.identity.off('update:finished', scheduleRefresh)
                    cmUserModel.off('update:finished', scheduleRefresh)
                })
            }
        }
    }
]);
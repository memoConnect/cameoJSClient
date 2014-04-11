function cmContactTag($location){
    return {
        restrict: 'AE',
        transclude: 'true',
        templateUrl: 'comps/contacts/contact-tag.html',

        controller: function($scope, $element, $attrs){
            $scope.contact = $scope.$eval($attrs.cmData || $attrs.cmContactTag);

            $scope.edit = function(id){
                $location.path('/contact/'+id);
            };
        }
    }
}
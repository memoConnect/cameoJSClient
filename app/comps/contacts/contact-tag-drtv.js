function cmContactTag($location){
    return {
        restrict: 'AE',
        require: '^cmContactsList',
        priority: 2,
        
        controller: function($scope, $element, $attrs){
            //$scope.contact = $scope.$eval($attrs.cmData || $attrs.cmContactTag);

            $scope.edit = function(id){
                $location.path('/contact/'+id);
            };
        }
    }
}
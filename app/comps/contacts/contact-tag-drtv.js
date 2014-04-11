function cmContactTag(){
    return {
        restrict: 'AE',
        require: '^cmContactsList',
        scope:  {
                    contact : "=cmData"
                },
        controller: function($scope, $element, $attrs){
            //$scope.contact = $scope.$eval($attrs.cmData || $attrs.cmContactTag)
        }
        
    }
}
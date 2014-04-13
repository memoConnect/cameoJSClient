function cmContactTag(){
    return {
        restrict: 'AE',
        require: '^cmContactsList',
        scope:  {
                    contact : "=cmData"
                },
        priority: '2',
        
        controller: function($scope, $element, $attrs){
            //$scope.contact = $scope.$eval($attrs.cmData || $attrs.cmContactTag)
        }
        
    }
}
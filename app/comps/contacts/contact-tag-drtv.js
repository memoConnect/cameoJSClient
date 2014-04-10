function cmContactTag(){
    return {
        restrict: 'AE',
        require: '^cmContactList',
        transclude: 'true',
        templateUrl: 'comps/contacts/contact-tag.html',

        controller: function($scope, $element, $attrs, cmContactList){
            $scope.contact = $scope.$eval($attrs.cmData || $attrs.cmContactTag)

            
        }
        
    }
}
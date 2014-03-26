function cmAvatar(){
    return {
        restrict : 'AE',
        
        link: function($scope, $element, $attrs){
            var identity = $scope.$eval($attrs.cmData);
            if(identity){
                $element.css({'background-image': 'url(' + identity.getAvatar() +')','background-size':'cover'});
            }
        }

    }
}

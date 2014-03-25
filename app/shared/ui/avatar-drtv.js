function cmAvatar(){
    return {
        restrict : 'AE',
//        template : '<i class="fa cm-person"></i>',
        link: function($scope, $element, $attrs){
//            var identity = $scope.$eval($attrs.cmData);
//            if(identity){
//                $element.css({'background-image': 'url(' + identity.getAvatar() +')','background-size':'cover'});
//            }
        }

    }
}

function cmContactType(){
    return {
        restrict: 'AE',

        link: function(scope, element, attrs){
            var contact = scope.$eval(attrs.cmData),            
                type    = contact.contactType,
                icon    = ''

            icon = (type == 'internal')  ? 'cm-rhino-positive'   : icon
            icon = (type == 'external')  ? 'cm-address-book'     : icon
            icon = (type == 'local')     ? 'cm-mobile'           : icon

            console.log(type)

            element.append(
                angular.element('<i></i>')
                .addClass('fa')
                .addClass(icon)
            ).addClass(type)
        }
    }
}
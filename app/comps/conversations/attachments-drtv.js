'use strict';

function cmAttachments() {
    return {
        restrict: 'AE',
        template: '<i class="fa fa-paperclip"></i>', //MOCK

        link: function (scope, element, attrs) {
            //mocked
            element.css({
                "font-size": "2em",
                "vertical-align": "middle"
            })
        }
    }
}

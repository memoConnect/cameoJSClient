angular.module('cmUi')
.directive('cmDefaultButtons',[

    'cmConfig',
    '$location',

    function (cmConfig, $location){
        return {
            restrict: 'E',
            transclude: true,
            scope: true,
            priority: 0,
            replace: true,
            template:   '<a ' +
                            'ng-repeat="btn in Object.keys(btns)" ' +
                            'href="#/{{btn}}" ' +
                            'class="btn-footer" ' +
                            'cm-weight="1" ' +
                            'cm-rubber-space-repeat ' +
                            'ng-class="{active:btns[btn].isActive}">' +
                            '<i ng-if="btns[btn].icon" class="fa {{btns[btn].icon}}"></i>' +
                            '{{btns[btn].i18n|cmTranslate}}' +
                        '</a>',

            link: function(scope, element, attrs){
                scope.btns = {};
                scope.Object = Object;                

                scope.btns = cmConfig.footer || {};

                // set active & width
                var btns = Object.keys(scope.btns);

                angular.forEach(btns, function (btnHref) {
                    var btn = scope.btns[btnHref];
                    btn.isActive = btnHref != '' && $location.$$path.search(btnHref) != -1;
                });
            }
        }
    }
]);
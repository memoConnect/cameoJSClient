var cmUi = angular.module('cmUi', [
    'cmLanguage'
])

cmUi.directive('cmAdaptiveChange', [
    cmAdaptiveChange
])

cmUi.directive('cmSpinner',[
    cmSpinner
])

cmUi.directive('cmPointSpinner',[
    cmPointSpinner
])

cmUi.directive('cmNavTabs',[
    '$routeParams',
    cmNavTabs
])
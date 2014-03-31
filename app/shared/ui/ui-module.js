angular.module('cmUi', [
    'cmLanguage',
    'cmUserModel',
    'ui.bootstrap'
])

.directive('cmView', [
    '$route',
    cmView
])

.directive('cmAdaptiveChange', [
    cmAdaptiveChange
])

.directive('cmRubberSpace',[
    cmRubberSpace
])

.directive('cmSpinner',[
    cmSpinner
])

.directive('cmPointSpinner',[
    cmPointSpinner
])

.directive('cmNavTabs',[
    '$routeParams',
    cmNavTabs
])

.directive('cmHeader',[
    cmHeader
])

.directive('cmBack',[
    '$window',
    '$location',
    cmBack
])

.directive('cmIdentity',[
    'cmUserModel',
    cmIdentity
])

.directive('cmAvatar',[
    cmAvatar
])

.directive('cmLogo',[
    cmLogo
])

.directive('cmMenu',[
    '$window',
    '$document',
    'cmUserModel',
    cmMenu
])

.directive('cmFooter',[
    '$location',
    'cmTranslate',
    cmFooter
])

.directive('cmEdge',[
    '$location',
    cmEdge
])

.directive('cmResizeTextarea',[
    cmResizeTextarea
])

.directive('cmOverlay',[
    '$rootScope',
    cmOverlay
])

.filter('cmDigits', [
    function(){
        return function(number, digits){
            var x   = parseFloat(number)                
                str =  (Math.round(x * Math.pow(10, digits)) / Math.pow(10, digits)).toString()

            str = str.match(/\./) ? str : str+'.'
            while(str.indexOf('.') >= str.length-2) str +='0'

            return str.match(/^[0-9\.]*$/) ? str : '0'
        }
    }
]);
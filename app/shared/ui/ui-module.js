angular.module('cmUi', [
    'cmLanguage',
    'cmUserModel',
    'ui.bootstrap'
])

.directive('cmView', [
    '$route',
    '$location',
    'cmUserModel',
    cmView
])

.directive('cmAdaptiveChange', [
    '$timeout',
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
    'cmLogger',
    cmAvatar
])

.directive('cmLogo',[
    cmLogo
])

.directive('cmMenu',[
    '$window',
    '$document',
    '$location',
    'cmUserModel',
    'cmVersion',
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

.directive('cmDateSeperator',[
    cmDateSeperator
])

.directive('cmScrollTo',[
    '$timeout',
    cmScrollTo
])

.directive('cmReload',[
    '$route',
    cmReload
])

.directive('cmMultiInput',[
    cmMultiInput
])

.directive('cmLargeInput',[
    cmLargeInput
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
])

.filter('truncate', function () {
    return function (text, length, end) {
        if (isNaN(length))
            length = 10;

        if (end === undefined)
            end = "...";

        if (text.length <= length || text.length - end.length <= length) {
            return text;
        }
        else {
            return String(text).substring(0, length-end.length) + end;
        }

    };
});

angular.module('cmUi', [
    'cmLanguage',
    'ui.bootstrap'
])

.directive('cmAdaptiveChange', [
    cmAdaptiveChange
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

.directive('cmFooter',[
    '$location',
    cmFooter
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
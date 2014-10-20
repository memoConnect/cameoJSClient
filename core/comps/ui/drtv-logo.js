'use strict';

/**
 * @ngdoc directive
 * @name cmUi.directive:cmLogo
 * @description
 * Our logo with glyphs
 *
 * @example
 <example module="cmUi">
     <file name="style.css">
        cm-logo{display:block;font-size:40px}
     </file>
     <file name="index.html">
        <link type="text/css" rel="stylesheet" href="../app/css/font-awesome.css"></link>
         <cm-logo></cm-logo>
     </file>
 </example>
 */

angular.module('cmUi').directive('cmLogo',[
    function (){
        return {
            restrict: 'AE',
            template:
            //'<i class="fa cm-logo"></i>'+
                '<i class="fa cm-logo-c"></i>'+
                '<i class="fa cm-logo-a"></i>'+
                '<i class="fa cm-logo-m"></i>'+
                '<i class="fa cm-logo-e"></i>'+
                '<i class="fa cm-logo-o"></i>'+
                '<span class="net-wrap"><i class="fa cm-logo-net"></i></span>'
        }
    }
]);
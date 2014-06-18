'use strict';

/**
 * @ngdoc directive
 * @name cmUi.directive:cmEdge
 * @description
 * For create conversation, new contact or add recipient.<br/>
 * Works with CameoAwesome Glyphs
 *
 * @restrict E
 * @requires cameoAwesome
 *
 * @example
 <example module="cmUi">
    <file name="style.css">
         cm-edge {
          position: relative;
          display: block;
          top: 0;
          right: 0;
          z-index: 1;
          cursor: pointer;
          font-size: 6rem;
          width: 1em;
          height: 1em;
          line-height: 1em;
        }
         cm-edge .background {
          color: #02bed2;
          position: absolute;
          right: 0;
          top: -0.03em;
        }
         cm-edge .foreground{
          color: #ffffff;
          position: absolute;
          right: 0;
          top: 0;
        }
    </file>
    <file name="index.html">
        <link type="text/css" rel="stylesheet" href="../app/css/font-awesome.css"></link>
        <cm-edge></cm-edge>
    </file>
 </example>
 */

angular.module('cmUi').directive('cmEdge',[
    function (){
        return{
            restrict: 'E',
            link: function(scope, element){
                var background = angular.element('<i class="fa cm-edge background"></i>'),
                    foreground = angular.element('<i class="fa cm-edge-add foreground"></i>');

                element
                .append(background)
                .append(foreground);
            }
        }
    }
]);
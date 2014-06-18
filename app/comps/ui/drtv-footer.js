'use strict';

/**
 * @ngdoc directive
 * @name cmUi.directive:cmFooter
 * @description
 * Footer navigation
 *
 * @restrict E
 * @requires $location
 * @requires cmTranslate
 *
 * @example
 <example module="cmUi">
     <file name="style.css">
         cm-footer {
          display: block;
          position: relative;
          bottom: 0;
          z-index: 9;
          background-color: #000000;
          padding: 0;
          font-size: 1.4rem;
          height: 4rem;
        }
         cm-footer button,
         cm-footer a {
          display: inline-block;
          height: 100%;
          text-align: center;
          border-radius: 0;
          background: transparent;
          border: none;
          padding: 0;
          color: #ffffff;
          overflow: hidden;
          text-decoration: none;
          line-height: 4rem;
        }
         cm-footer button.active,
         cm-footer a.active,
         cm-footer button:hover,
         cm-footer a:hover {
          color: #02bed2;
          box-shadow: 0 0.3em 0 #02bed2 inset;
          text-decoration: none;
        }
         cm-footer button.full-width,
         cm-footer a.full-width {
          display: block;
          width: 100%;
          color: #02bed2;
        }
         cm-footer button.deactivated,
         cm-footer a.deactivated {
          color: #444444;
          box-shadow: none;
        }
     </file>
     <file name="index.html">
         <link type="text/css" rel="stylesheet" href="../app/css/font-awesome.css"></link>
         default:
         <cm-footer cm-rubber-space></cm-footer>

         one button:
         <cm-footer>
            <button class="full-width">handle button <i class="fa cm-checkbox-right"></i></button>
         </cm-footer>
     </file>
 </example>
 */

angular.module('cmUi').directive('cmFooter',[
    '$location',
    'cmTranslate',
    function ($location, cmTranslate){
        return {
            restrict: 'AE',
            priority: '0',

            link : function(scope, element){
                //if element has no children add default elements:
                if(element.children().length == 0 ) {
                    scope.btns.forEach(function(btn){
                        var el = angular.element('<a cm-weight="1">'+cmTranslate(btn.i18n)+'</a>');
                        el.toggleClass('active', btn.isActive ? true : false);
                        if(btn.href != '')
                            el.attr('href', '#'+btn.href);
                        else
                            el.addClass('deactivated');
                        element.append(el);
                    });
                }
            },
            controller: function($scope){
                $scope.btns = [
                    {i18n:'DRTV.FOOTER.TALKS',    href:'/talks'},
                    {i18n:'DRTV.FOOTER.CONTACTS', href:'/contacts'},
                    {i18n:'DRTV.FOOTER.MEDIA',    href:''}
                ];

                angular.forEach($scope.btns,function(btn){
                    btn.isActive = btn.href != '' && $location.$$path.search(btn.href) != -1;
                });
            }
        }
    }
]);
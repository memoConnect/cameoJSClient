'use strict';

/**
 * @ngdoc directive
 * @name cmUi.directive:cmLoader
 *
 * @description
 * shows default a spinner and with attr
 * http://fgnass.github.io/spin.js/
 *
 */

angular.module('cmUi')
.directive('cmLoader',[
    function (){
        return {
            restrict:   'AE',
            template:   function(element, attrs){
                            return  {
                                        'spinner'   :   '<div class="spinner-wrapper"><div class="spinner"></div></div>',
                                        'balls'     :   '<div class="followingBallsWrapper halt">'+
                                                            '<div class="G_1 followingBallsG"></div>'+
                                                            '<div class="G_2 followingBallsG"></div>'+
                                                            '<div class="G_3 followingBallsG"></div>'+
                                                            '<div class="G_4 followingBallsG"></div>'+
                                                        '</div>'
                                    }[attrs.type || 'spinner']
                        },
            scope: true,
            controller: function($scope, $element, $attrs){
                var type = $attrs.type || 'spinner';

                $element.addClass(type);

                var opts = {};
                if($attrs.cmColor) {

                    switch($attrs.cmColor){
                        case 'ci-color':
                            opts.color = '#02BED2';
                        break;
                        case 'inp-grey':
                            opts.color = '#666666';
                        break;
                        default:
                            opts.color = $attrs.cmColor;
                    }
                }

                // spinner size
                if($attrs.cmSize == 'small') {
                    opts.lines = 10;
                    opts.length = 4;
                    opts.width = 4;
                    opts.radius = 6;
                }

                if(type =='spinner'){
                    var spinner = new Spinner(opts);
                    var loadingContainer = angular.element($element[0].querySelector('.spinner'))[0];
                }

                $scope.animate = function(start){
                    if(start == undefined) start = true

                    if(type == 'spinner'){
                        if(start){
                            spinner = spinner.spin()
                            loadingContainer.appendChild(spinner.el);
                        } else {
                            spinner.stop()
                            loadingContainer.innerHTML = '';
                        }
                    }

                    if(type == 'balls'){
                        if(start){
                            $element.children().removeClass('halt')
                        }else{
                            $element.children().addClass('halt')
                        }
                    }
                };

                $scope.$watch($attrs.ngShow, function(bool){
                    if(bool != false){
                        $scope.animate(true);
                        $element.attr('cm-count', parseInt($element.attr('cm-count') || 0)+1)
                    } else {
                        $scope.animate(false);
                    }
                });

                $scope.$watch($attrs.cmHalt, function(bool){
                    if(bool != false){
                        $scope.animate(true);
                    } else {
                        $scope.animate(false);
                    }
                });

                /**
                 * @ngdoc event
                 * @name start
                 * @eventOf cmUi.directive:cmLoader
                 * @description
                 * $scope.$on('cmLoader:start',...)
                 */
                $scope.$on('cmLoader:start', function(){
                    $scope.animate(true);
                });

                /**
                 * @ngdoc event
                 * @name stop
                 * @eventOf cmUi.directive:cmLoader
                 * @description
                 * $scope.$on('cmLoader:stop',...)
                 */
                $scope.$on('cmLoader:stop', function(){
                    $scope.animate(false);
                });
            }
        }
    }
]);
'use strict';

angular.module('cmUi').directive('cmModal', [

    'cmModal',

    function (cmModal){
        return {
            restrict: 'AE',
            transclude: true,
            scope: true,
            
            templateUrl: function(tElement, tAttrs){
                var type = tAttrs.type || 'plain',
                    templateUrl =   {
                                        'plain'     : 'shared/ui/drtv-modal-plain.html'
                                    }

                return templateUrl[type]
            },
            

            link: function(scope, element, attrs, controller, transclude){ 
                angular.element(document.getElementById('cm-app')).append(element)

                scope.toggle = function(on){
                    on = (on == undefined ? $element.css('display') == 'none' : on)
                    if(on){
                        element.css('display', 'block')                        
                    }else{
                        element.css('display', 'none')
                    }
                }

                scope.open = function(){
                    this.toggle(true)  
                }

                scope.close = function(){
                    this.toggle(false)  
                }

                scope.toggle(false)
                

                //close modal when clicked outside:
                element.on('click', function(){
                    scope.close()
                })
                element.children().on('click', function(event){
                    event.stopPropagation()
                })     

                element.addClass('nose-'+attrs.nose)

                scope.toggle(false)
            },

            controller: function($scope, $element, $attrs){
                cmModal.register($attrs.id, $scope)                
            }
        }
    }
])

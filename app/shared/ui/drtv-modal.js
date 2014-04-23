'use strict';

angular.module('cmUi').directive('cmModal', [

    'cmModal',
    'cmTranslate',

    function (cmModal, cmTranslate){
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
                var to_be_parent =  angular.element(document.getElementById('cm-app'))

                //move modal up the dom hierarchy, if necessary:
                if(element.parent()[0] != to_be_parent[0]) to_be_parent.append(element)



                function addNose(){
                    if(!attrs.nose) return null

                    var nose        =   angular.element('<i class="nose fa"></i>'),
                        nose_side   =   attrs.nose.split('-'),
                        nose_class  =   {
                                            'top-left':     'cm-nose-up flip',
                                            'top-right':    'cm-nose-up',
                                            'left-top':     'cm-nose-left flip',
                                            'left-bottom':  'cm-nose-left',
                                            'right-top':    'cm-nose-right',
                                            'right-bottom': 'cm-nose-right flip',
                                            'bottom-left':  'cm-nose-down flip',
                                            'bottom-right': 'cm-nose-down'
                                        }

                    nose
                    .addClass(nose_class[attrs.nose]) 
                    .addClass(nose_side[0])
                    .css(nose_side[1], attrs.nosePosition || '2rem')

                    element
                    .addClass('nose-'+nose_side[0])

                    element.find('article').append(nose)
                }

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

                element
                .addClass(attrs.severity)


                addNose()
                scope.toggle(false)

                cmModal.register(attrs.id, scope)
            },

            controller: function($scope, $element, $attrs){                

                $scope.title    = cmTranslate($attrs.title)
                $scope.severity = $attrs.severity || 'info'

            }
        }
    }
])

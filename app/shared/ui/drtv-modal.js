'use strict';

angular.module('cmUi').directive('cmModal', [

    'cmModal',
    'cmTranslate',
    '$rootScope',
    '$timeout',

    function (cmModal, cmTranslate, $rootScope, $timeout){
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

                scope.setData = function(data){
                    scope[attrs.cmDataAs || 'data'] = data

                    transclude(scope,function(clone){
                        element.find('ng-transclude').html('').append(clone);
                    })

                    return this
                }

                scope.toggle = function(on){
                    on = (on == undefined ? $element.css('display') == 'none' : on)
                    if(on){
                        element.css('display', 'block')
                        
                        // timeout for scope apply and animation
                        $timeout(function () {
                            $rootScope.isModalVisible = true;
                            // trigger CSS transitions
                            scope.animate = 'in';
                        });

                    }else{

                        // timeout for scope apply and animation
                        $timeout(function () {
                            scope.animate = 'out';
                            $timeout(function(){
                                element.css('display', 'none')
                                $rootScope.isModalVisible = false;
                                scope.animate = 'none';
                            }, 3000)
                        })
                    }
                }

                scope.open = function(){
                    this.toggle(true)  
                }

                scope.close = function(){
                    this.toggle(false)  
                }



                scope.toggle(false)
                scope.animate = 'none'

                //close modal when clicked on backdrop
                angular.element(element.children()[1]).on('click', function(){
                    scope.close()
                })
//                element.children().on('click', function(event){
//                    event.stopPropagation()
//                })

                element
                .addClass(attrs.severity)


                addNose()
                scope.toggle(false)

                var to_be_parent =  angular.element(document.getElementById('cm-app'))

                //move modal up the dom hierarchy, if necessary:
                if(element.parent()[0] != to_be_parent[0]) to_be_parent.append(element)

                cmModal.register(attrs.id, scope)
            },

            controller: function($scope, $element, $attrs){   

                $scope.title    = cmTranslate($attrs.title)
                $scope.severity = $attrs.severity || 'info'

            }
        }
    }
])

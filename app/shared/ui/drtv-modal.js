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

                scope.refresh = function(){
                    transclude(scope, function (clone) {
                        element.find('ng-transclude').append(clone);
                    })
                }

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
                // add external data to scope
                scope.setData = function(data){
                    if(data != undefined) {
                        scope[attrs.cmDataAs || 'data'] = data
                    }
                    return this
                }
                // toggle visiblity modal
                scope.toggle = function(on){
                    on = (on == undefined ? $element.hasClass('active') : on)
                    if(on){                        
                        element.addClass('active')
                        $timeout(function(){
                            $rootScope.isModalVisible = true;
                        })                        
                    } else {
                        element.removeClass('active')
                        $timeout(function(){
                            $rootScope.isModalVisible = false;
                        })
                    }
                }

                scope.open = function(){
                    this.toggle(true)
                }

                scope.close = function(){
                    this.toggle(false);
                    //scope.refresh();
                }

                //close modal when clicked on backdrop
                angular.element(element.children()[1]).on('click', function(){
                    scope.close()
                })
//                element.children().on('click', function(event){
//                    event.stopPropagation()
//                })

                element
                .addClass(attrs.severity)
                .css('transition-duration', '300ms')

                addNose()

//                var to_be_parent = angular.element(document.getElementById('cm-app'))
//
//                //move modal up the dom hierarchy, if necessary:
//                if(element.parent()[0] != to_be_parent[0]) to_be_parent.append(element)

                cmModal.register(attrs.id, scope)

                scope.refresh();
            },

            controller: function($scope, $element, $attrs){   
                $scope.title    = cmTranslate($attrs.title)
                $scope.severity = $attrs.severity || 'info'
            }
        }
    }
])

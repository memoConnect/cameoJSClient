'use strict';

angular.module('cmUi')
.directive('cmModal', [
    'cmModal', 'cmTranslate',
    '$rootScope', '$timeout', '$q',
    function (cmModal, cmTranslate,
              $rootScope, $timeout, $q){

        // handle nose position
        function addNose(element, attrs){
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

        return {
            restrict: 'AE',
            transclude: true,
            scope: true,
            
            templateUrl: function(tElement, tAttrs){
                var type = tAttrs.type || 'plain',
                    templateUrl = {
                        plain:      'comps/ui/modal/drtv-modal-plain.html',
                        fullscreen: 'comps/ui/modal/drtv-modal-fullscreen.html',
                        alert:      'comps/ui/modal/drtv-modal-alert.html',
                        confirm:    'comps/ui/modal/drtv-modal-confirm.html'
                    };

                return templateUrl[type];
            },

            link: function(scope, element, attrs, controller, transclude){

                scope.closeBtn = attrs.cmCloseBtn || true;
                scope.footerLabel = attrs.cmFooterLabel || undefined;
                scope.footerIcon = attrs.cmFooterIcon || undefined;

                // refresh modal content
                scope.refresh = function(){                   
                    transclude(scope, function (clone) {
                        var transclude_container = element.find('ng-transclude');

                        transclude_container
                        .children()
                        .remove();

                        transclude_container
                        .append(clone);                 
                    })
                };

                // add external data to scope
                scope.setData = function(data){
                    if(data != undefined) {
                        scope[attrs.cmDataAs || 'data'] = data;
                    }
                    return this;
                };

                // toggle visiblity modal
                scope.toggle = function(on){
                    on = (on == undefined ? $element.hasClass('active') : on);
                    if(on){
                        scope.refresh();
                        element.addClass('active');
                        $timeout(function(){
                            $rootScope.isModalVisible = true;
                        })                        
                    } else {
                        element.removeClass('active');
                        $timeout(function(){
                            $rootScope.isModalVisible = false;
                        })
                    }

                    return this
                };

                scope.isActive = function(){
                    return element.hasClass('active')
                }

                // open modal
                scope.open = function(ttl){
                    scope.toggle(true);
                    return scope
                };
                // close modal
                scope.close = function(fromBackdrop){

                    if(!fromBackdrop && 'onFooterClick' in scope){
                        scope.onFooterClick();
                    }

                    this.toggle(false);
                    cmModal.trigger('modal:closed', attrs.id);

                    return this;
                };

                // close modal when clicked on backdrop
                if(!('cmCloseOnBackdrop' in attrs) || attrs.cmCloseOnBackdrop != "false"){
                    angular.element(element.children()[1]).on('click', function () {
                        scope.close(true);
                    });
                }

                element
                .addClass(attrs.severity)

                addNose(element, attrs);
                // register modal to service
                cmModal.register(attrs.id, scope);
                // refresh content
                scope.refresh();
            },

            controller: function($scope, $element, $attrs){
                $scope.title    = $attrs.cmTitle;
                $scope.severity = $attrs.severity || 'info';
                $scope.options  = $scope.$eval($attrs.cmOptions) || {withoutBackdrop:false}
                $scope.id       = $attrs.id
            }
        }
    }
]);
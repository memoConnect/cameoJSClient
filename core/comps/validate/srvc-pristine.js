'use strict';

angular.module('cmValidate')
    .service('cmPristine',[
        'cmObject',
        'cmLogger',
        function(cmObject, cmLogger){
            var self = this,
                elements = [];
                /*
                element = {
                    name: 'moep',
                    isPristine: true || false
                }
                 */
            cmObject.addEventHandlingTo(this);

            function searchElement(element){
                return elements.some(function(e){
                    return (e.name == element.$name)
                });
            }

            function checkElement(element){
                if(typeof element.$name != 'undefined' && element.$name != ''){
                    return true;
                }

                return false;
            }

            function findIndex(element){
                var i = 0,
                    index = -1;

                while(i < elements.length){
                    if(elements[i].name == element.$name){
                        index = i;
                        break;
                    }
                    i++;
                }

                return index;
            }

            /**
             * add Element
             * @param element ngModel
             */
            this.initView = function(scope){
                scope.isPristine = true;
                function pristine_callback(){
                    console.log('updated of ngModel biatsch',self.is())
                    scope.isPristine = self.is();
                }
                self.on('updated',pristine_callback);

                scope.$on('$destroy', function(){
                    self.off('updated',pristine_callback);
                })
            };

            this.resetView = function(scope){
                scope.isPristine = true;
                self.trigger('reinit');
            };

            this.add = function(element){
                //cmLogger.debug('cmPristine.add');

                if(!checkElement(element)){
                    cmLogger.warn('cmFormPristine (add) detects that element has no name! Is it an ngModel Object?');
                    return false;
                }

                if(!searchElement(element)){
                    elements.push({name: element.$name, isPristine: true});

                    this.trigger('added');
                } else {
                    cmLogger.debug('cmFormPristine detects same element more then one time!');
                }
            };

            this.is = function(){
                //cmLogger.debug('cmPristine.is');
                return !elements.some(function (e){
                    return (e.isPristine == false);
                })
            };

            this.set = function(element, bool){
                //cmLogger.debug('cmPristine.set');

                if(!checkElement(element)){
                    cmLogger.debug('cmFormPristine (set) detects that element has no name! Is it an ngModel Object?');
                    return false;
                }

                if(searchElement(element)){
                    elements[findIndex(element)].isPristine = bool;

                    this.trigger('updated');
                }
            };

            this.remove = function(element){
                //cmLogger.debug('cmPristine.remove');

                if(!checkElement(element)){
                    cmLogger.debug('cmFormPristine (remove) detects that element has no name! Is it an ngModel Object?');
                    return false;
                }

                if(searchElement(element)){
                    var index = findIndex(element);

                    if(index != -1){
                        elements.splice(index, 1);
                    }
                    this.trigger('removed');
                }
            };

            this.reset = function(){
                //cmLogger.debug('cmPristine.reset');

                elements = null;
                elements = [];

                this.trigger('reset');
            };

            this.getAll = function(){
                //cmLogger.debug('cmPristine.getAll');

                return elements;
            }
        }
    ]
);
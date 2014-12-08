'use strict';

angular.module('cmValidate')
    .service('cmPristine',[
        'cmObject',
        'cmLogger',
        function(cmObject, cmLogger){
            var self = this,
                elements = [];
                /*
                {
                    name: '',
                    isPristine: true
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

            this.add = function(element){
                //cmLogger.debug('cmPristine.add');

                if(!checkElement(element)){
                    cmLogger.warn('cmFormPristine (add) detects that element has no name! Is it an ngModel Object?');
                    return false;
                }

                if(!searchElement(element)){
                    elements.push({name: element.$name, isPristine: true});
                } else {
                    cmLogger.warn('cmFormPristine detects same element more then one time!');
                }
            };

            this.is = function(){
                //cmLogger.debug('cmPristine.is');

                return !elements.some(function (e){ return (e.isPristine == false)})
            };

            this.set = function(element, bool){
                //cmLogger.debug('cmPristine.set');

                if(!checkElement(element)){
                    cmLogger.warn('cmFormPristine (set) detects that element has no name! Is it an ngModel Object?');
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
                    cmLogger.warn('cmFormPristine (remove) detects that element has no name! Is it an ngModel Object?');
                    return false;
                }

                if(searchElement(element)){
                    var index = findIndex(element);

                    if(index != -1){
                        elements.splice(index, 1);
                    }
                }
            };

            this.reset = function(){
                //cmLogger.debug('cmPristine.reset');

                elements = null;
                elements = [];
            };
        }
    ]
);
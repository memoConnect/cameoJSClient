 'use strict';

angular.module('cmUi')
.service('cmModal',[
    'cmObject', 'cmLogger',
    '$rootScope', '$compile', '$document',
    function(cmObject, cmLogger,
             $rootScope, $compile, $document){
        var self = {};

        cmObject.addEventHandlingTo(self);

        self.instances = {};

        self.register = function(id, scope){

            if(!scope){
                cmLogger.error('cmModal: unable to register modal without id or scope.');
                return null;
            }

            var old_scope = self.instances[id];

            if(old_scope != scope){
                self.instances[id] = scope;
                self.trigger('register', id);
            }

            return self;
        };

        self.open = function(id, data){
            if(self.instances[id]){
                self.instances[id]
                    .setData(data)
                    .open();
                self.trigger('modal:opened',id);
            } else {
                self.one('register', function(event, registered_id){
                    return !!(registered_id == id ? self.open(id, data) : false);
                });
            }

            
            return self;
        };

        self.close = function(id){
            var instance = self.instances[id]
            
            if(instance){
                self.instances[id].close();

                self.trigger('modal:closed',id);
            }
            return self;
        };

        self.closeAll = function(){
            angular.forEach(self.instances, function(modal_instance){
                modal_instance.close();
            });

            return self;
        };

        self.create = function(config, template, target, scope){
            var attrs = ''
            
            //Todo: könnte man schöner machen:
            angular.forEach(config, function(value, key){ attrs += key+'="'+value+'"' });

            // clear existing instance
            if(self.instances[config.id] != undefined){
                delete self.instances[config.id];
            }

            // clear DOM element, if neccessary
            if(angular.element($document[0].getElementById(config.id)).length > 0){
                angular.element($document[0].getElementById(config.id)).remove();
            }

            // create new element
            var scope = scope || $rootScope.$new();


            var modal = $compile('<cm-modal '+attrs+' >'+(template||'')+'</cm-modal>')(scope);
            // move modal up the dom hierarchy, if necessary:

            if(target == 'body'){
                target = $document[0].querySelector('body');
            }

            angular.element(target || $document[0].querySelector('#cm-app') || $document[0].querySelector('body')).append(modal);

            // the modal directive (<cm-modal>) will register itself on next digest

            return modal
        };

        $rootScope.openModal        = self.open;
        $rootScope.closeModal       = self.close;
        $rootScope.isModalVisible   = false;
//        $rootScope.$watch('isModalVisible' ,function(newValue){
//            console.log('watch modal '+newValue)
//            $rootScope.isModalVisible = newValue;
//        });

        // close all modals on route change:
        $rootScope.$on('$routeChangeStart logout', function(){
            self.closeAll();
        });

        // closeAll on ESC
        $document.bind('keydown', function (event) {
            if (event.which === 27) {
                self.closeAll();
            }
        });

        return self;
    }
]);
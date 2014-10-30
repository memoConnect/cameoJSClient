 'use strict';

angular.module('cmUi')
.service('cmModal',[
    'cmObject', 'cmLogger',
    '$rootScope', '$compile', '$document', '$q', '$timeout',
    function(cmObject, cmLogger,
             $rootScope, $compile, $document, $q, $timeout){
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

        self.open = function(id, data, ttl){
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

            if(ttl){ $timeout(function(){ self.close(id)}, ttl) }

            return self;
        };

        self.close = function(id){
            var instance = self.instances[id];
            
            if(instance){
                self.instances[id].close();

                self.trigger('modal:closed',id);
            }
            return self;
        };

        self.closeAll = function(){
            angular.forEach(self.instances, function (modal_instance) {
                modal_instance.close();
            });

            return self;
        };

        self.create = function(config, template, target, scope){
            var attrs = '';
            
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

        self.confirm = function(config){

            config  =   {
                            text:   config.text,
                            cancel: config.cancel   || 'MODAL.LABEL.CANCEL',
                            okay:   config.okay     || 'MODAL.LABEL.OK',
                            title:  config.title    || 'DRTV.CONFIRM.HEADER',
                            html:   config.html     || '',
                            data:   config.data
                        }

            var deferred    = $q.defer(),
                scope       = $rootScope.$new(),
                modalId     = 'modal-confirm-'+(new Date()).getTime();

            scope.text              =   config.text       || '';
            scope.labelOkay         =   config.okay
            scope.labelCancel       =   config.cancel

            scope.cancel            =   function(){ 
                                            $rootScope.closeModal(modalId)
                                        }
            scope.confirm           =   function(){
                                            deferred.resolve(this)
                                            $rootScope.closeModal(modalId) 
                                        }
            self.create({
                id:             modalId,
                type:           'confirm',
                'class':        'no-padding',
                'cm-close-btn': false,
                'cm-title':     config.title
            },'<cm-modal-confirm>'+config.html+'</cm-modal-confirm>',null,scope);

            self.open(modalId, config.data);

            self.one('modal:closed', function(event, id){
                if(id == modalId)
                    deferred.reject()

                return true //remove event binding
            })

            return deferred.promise
        };

        $rootScope.openModal        = self.open
        $rootScope.closeModal       = self.close
        $rootScope.isModalVisible   = false
        $rootScope.confirm          = self.confirm

//        $rootScope.$watch('isModalVisible' ,function(newValue){
//            console.log('watch modal '+newValue)
//            $rootScope.isModalVisible = newValue;
//        });

        // close all modals on route change:
        $rootScope.$on('$routeChangeStart', function(){
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
angular.module('cmUi').service('cmModal',[

    '$rootScope',
    'cmObject',
    'cmLogger',
    '$compile',
    '$document',

    function($rootScope, cmObject, cmLogger, $compile, $document){

        var modal_instances = {},
            modalService = {}

        cmObject.addEventHandlingTo(modalService)

        modalService.visible = false;

        modalService.register = function(id, scope){

            if(!id){
                cmLogger.error('cmModal: unable to register modal without an id.')
                return null
            }

            var old_scope = modal_instances[id]

            if(old_scope != scope){
                modal_instances[id] = scope
                this.trigger('register', id)
            }

            return this
            
        }

        modalService.open = function(id, data){
            if(modal_instances[id]){
                modal_instances[id]
                .setData(data)
                .open() 
            } else {
                this.on('register', function(registered_id){
                    if(registered_id == id) 
                        modal_instances[id]
                        .setData(data)
                        .open() 
                })
            }
            return this
        }

        modalService.close = function(id){
            modal_instances[id].close()
            return this
        }

        modalService.closeAll = function(){
            angular.forEach(modal_instances, function(modal_instance, key){
                modal_instance.close()
            })
            return this
        }

        modalService.create = function(config, template){
            // clear existing instance
            if(modal_instances[config.id] != undefined){
                console.log('intance exists')
                delete modal_instances[config.id];
                // clear DOM element
                if(angular.element(document.getElementById(config.id)).length > 0){
                    angular.element(document.getElementById(config.id)).remove();
                }
            }
            // create new element
            var attrs = '',
                scope = $rootScope.$new()

            //Todo: könnte man schöner machen:
            angular.forEach(config, function(value, key){
                attrs += key+'="'+value+'"'
            });

            var modal = $compile('<cm-modal '+attrs+' >'+template+'</cm-modal>')(scope)
            // move modal up the dom hierarchy, if necessary:
            angular.element(document.getElementById('cm-app')).append(modal)

            return modal;
        }

        $rootScope.openModal    = modalService.open
        $rootScope.closeModal   = modalService.close
        $rootScope.isModalVisible = modalService.visible
//        $rootScope.$watch('isModalVisible' ,function(newValue){
//            console.log('watch modal '+newValue)
//            $rootScope.isModalVisible = newValue;
//        });

        //close all modals on route change:
        $rootScope.$on('$routeChangeStart', function(){
            modalService.closeAll();
        })

        $document.bind('keydown', function (evt) {
            if (evt.which === 27) {
                modalService.closeAll();
            }
        });

        return modalService
    }
])

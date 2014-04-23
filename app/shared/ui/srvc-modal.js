angular.module('cmUi').service('cmModal',[

    '$rootScope',
    'cmObject',
    'cmLogger',
    '$compile',

    function($rootScope, cmObject, cmLogger, $compile){

        var modal_instances = {},
            modalService = {}

        cmObject.addEventHandlingTo(modalService)

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

        modalService.open = function(id){
            if(modal_instances[id]){
                modal_instances[id].open() 
            } else {
                this.on('register', function(registered_id){
                    if(registered_id == id) modal_instances[id].open() 
                })
            }

            return this
        }

        modalService.close = function(id){
            modal_instances[id].close()
            return this
        }

        modalService.create = function(config){
            var attrs = '',
                scope = $rootScope.$new()

            //Todo: könnte man schöner machen:
            angular.forEach(config, function(value, key){
                attrs += key+'="'+value+'"'
            })

            $compile('<cm-modal '+attrs+' ></cm-modal>')(scope)

            return this
        }

        $rootScope.openModal    = modalService.open
        $rootScope.closeModal   = modalService.close

        //close all modals on route change:
        $rootScope.$on('$routeChangeStart', function(){
            angular.forEach(modal_instances, function(modal_instance, key){
                modal_instance.close()
            })
        })

        return modalService
    }
])

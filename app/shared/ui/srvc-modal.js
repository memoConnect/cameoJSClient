angular.module('cmUi').service('cmModal',[

    '$rootScope',

    function($rootScope){

        var modal_instances = {}

        var modalService = {
            register : function(id, scope){
                var old_scope

                if(old_scope = modal_instances[id]){
                    old_scope.close()
                }

                modal_instances[id] = scope
            },

            open : function(id){
                modal_instances[id].open() 
            },

            close : function(id){
                modal_instances[id].close()
            } 
        }

        $rootScope.openModal    = modalService.open
        $rootScope.closeModal   = modalService.close

        return modalService
    }
])

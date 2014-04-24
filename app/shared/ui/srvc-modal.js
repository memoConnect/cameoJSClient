angular.module('cmUi').service('cmModal',[

    '$rootScope',
    'cmObject',
    'cmLogger',
    '$compile',
    '$document',

    function($rootScope, cmObject, cmLogger, $compile, $document){

        var self = {}

        cmObject.addEventHandlingTo(self)

        self.instances = {}

        self.register = function(id, scope){

            if(!scope){
                cmLogger.error('cmModal: unable to register modal without id or scope.')
                return null
            }

            var old_scope = self.instances[id]

            if(old_scope != scope){
                self.instances[id] = scope
                self.trigger('register', id)
            }

            return self
            
        }

        self.open = function(id, data){
            if(self.instances[id]){
                self.instances[id]
                .setData(data)
                .open() 
            } else {
                self.on('register', function(registered_id){
                    if(registered_id == id) 
                        self.instances[id]
                        .setData(data)
                        .open() 
                })
            }
            return self
        }

        self.close = function(id){
            self.instances[id].close()
            return self
        }

        self.closeAll = function(){
            angular.forEach(self.instances, function(modal_instance, key){
                modal_instance.close()
            })
            return self
        }

        self.create = function(config, template, target){
            // clear existing instance
            if(self.instances[config.id] != undefined){
                console.log('intance exists')
                delete self.instances[config.id];
            }

            // clear DOM element, if neccessary
            if(angular.element(document.getElementById(config.id)).length > 0){
                angular.element(document.getElementById(config.id)).remove();
            }

            // create new element
            var attrs = '',
                scope = $rootScope.$new()

            //Todo: könnte man schöner machen:
            angular.forEach(config, function(value, key){
                attrs += key+'="'+value+'"'
            });

            var modal = $compile('<cm-modal '+attrs+' >'+template||''+'</cm-modal>')(scope)
            // move modal up the dom hierarchy, if necessary:
            angular.element(target || document.getElementById('cm-app') || 'body').append(modal)

            return modal
        }



        $rootScope.openModal    = self.open
        $rootScope.closeModal   = self.close
        $rootScope.isModalVisible = false
//        $rootScope.$watch('isModalVisible' ,function(newValue){
//            console.log('watch modal '+newValue)
//            $rootScope.isModalVisible = newValue;
//        });

        //close all modals on route change:
        $rootScope.$on('$routeChangeStart', function(){
            self.closeAll();
        })

        $document.bind('keydown', function (evt) {
            if (evt.which === 27) {
                self.closeAll();
            }
        });

        return self
    }
])

'use strict';

angular.module('cmNodeWebkit').service('cmNodeWebkitMenu', [
    'cmNodeWebkit', '$nodeWebkitCameoConfig', 'cmNodeWebkitEventWrapper',
    'cmUserModel', 'cmLogger',
    '$rootScope',
    function (cmNodeWebkit, $nodeWebkitCameoConfig, cmNodeWebkitEventWrapper,
              cmUserModel, cmLogger,
              $rootScope)
    {
        var self = this;

        cmNodeWebkitEventWrapper.addTrigger(this);

        // Load native UI library
        var gui = this.gui = require('nw.gui');
        var win = this.win = this.gui.Window.get();

        function createMenuItems(menu, items){
            if(typeof menu != 'undefined' && typeof items != 'undefined'){
                items.forEach(function(item){

                    if(typeof item.click == 'string'){
                        item.click = (function(eventName){
                            return function(){
                                self.trigger(eventName);
                            }
                        })(item.click);
                    }

                    if(typeof item.onlyWithAuth != 'undefined' && cmUserModel.isAuth() == false){
                        item.enabled = false;
                    } else {
                        item.enabled = true;
                    }

                    if(item.items){
                        item.submenu = new gui.Menu();
                        createMenuItems(item.submenu, item.items);
                    }

                    menu.append(new gui.MenuItem(item));
                })
            }
        }

        this.init = function(){
            //cmLogger.debug('cmNodeWebkitMenu.init');

            if(!cmNodeWebkit.isAvailable('cmNodeWebkitMenu.init')){
                return false;
            }

            this.render();
        };

        this.render = function(){
            cmLogger.debug('cmNodeWebkitMenu.render');

            if(!cmNodeWebkit.isAvailable('cmNodeWebkitMenu.render') && typeof $nodeWebkitCameoConfig.rootMenu != 'object' && typeof $nodeWebkitCameoConfig.rootMenu.items != 'object'){
                return false;
            }

            // Create a menubar for window menu
            var menu = new gui.Menu({type:'menubar'});

            var nativeMenuBar = new gui.Menu({type:'menubar'});

            createMenuItems(menu, $nodeWebkitCameoConfig.rootMenu.items);

            //assign the menuItems to window menu
            try {
                nativeMenuBar.createMacBuiltin("cameoNet");
                win.menu = nativeMenuBar;
            } catch (e) {
                win.menu = menu;
            }
        };

        $rootScope.$on('login', function(){
            self.render();
        });

        $rootScope.$on('logout', function(){
            self.render();
        });
    }
]);

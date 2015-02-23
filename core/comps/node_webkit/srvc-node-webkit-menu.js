'use strict';

angular.module('cmNodeWebkit').service('cmNodeWebkitMenu', [
    'cmNodeWebkit', '$nodeWebkitCameoConfig', 'cmNodeWebkitEventWrapper',
    'cmUserModel', 'cmLogger',
    '$rootScope', '$filter',
    function (cmNodeWebkit, $nodeWebkitCameoConfig, cmNodeWebkitEventWrapper,
              cmUserModel, cmLogger,
              $rootScope, $filter)
    {
        var self = this,
            gui, win;

        cmNodeWebkitEventWrapper.addTrigger(this);

        if(cmNodeWebkit.isAvailable()){
            // Load native UI library
            gui = this.gui = require('nw.gui');
            win = this.win = this.gui.Window.get();
        }

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

                    if(typeof item.langKey == 'string' && item.langKey.length > 0){
                        item.label = $filter('cmTranslate')(item.langKey.toString());
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
            //cmLogger.debug('cmNodeWebkitMenu.render');

            if(!cmNodeWebkit.isAvailable('cmNodeWebkitMenu.render') && typeof $nodeWebkitCameoConfig != 'object' && typeof $nodeWebkitCameoConfig.rootMenu != 'object' && typeof $nodeWebkitCameoConfig.rootMenu.items != 'object'){
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
            if(cmNodeWebkit.isAvailable()) {
                self.render();
            }
        });

        $rootScope.$on('logout', function(){
            if(cmNodeWebkit.isAvailable()) {
                self.render();
            }
        });

        $rootScope.$on('$translateChangeSuccess', function(){
            if(cmNodeWebkit.isAvailable()) {
                self.render();
            }
        });
    }
]);

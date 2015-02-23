'use strict';

angular.module('cmNodeWebkit').service('cmNodeWebkitEventWrapper', [
    'cmNodeWebkit', 'cmObject', 'cmLogger', '$rootScope',
    function(cmNodeWebkit, cmObject, cmLogger, $rootScope){
        var self = this,
            gui, win;

        cmObject.addEventHandlingTo(this);

        if(cmNodeWebkit.isAvailable()){
            gui = this.gui = require('nw.gui');
            win = this.win = this.gui.Window.get();
        }

        this.addTrigger = function(obj){
            //cmLogger.debug('cmNodeWebkitEventWrapper.addTrigger -> ' + JSON.stringify(obj));

            obj.trigger = this.trigger;
        };

        /**
         * handle events
         */

        this.on('goto-quickstart', function(){
            $rootScope.goTo('/start/quickstart');
            $rootScope.$apply();
        });

        this.on('goto-about-us', function(){
            $rootScope.goTo('/settings/about');
            $rootScope.$apply();
        });

        this.one('app-close', function(){
            win.close();
        });
    }
]);
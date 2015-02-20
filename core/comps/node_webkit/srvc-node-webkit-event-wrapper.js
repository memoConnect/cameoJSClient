'use strict';

angular.module('cmNodeWebkit').service('cmNodeWebkitEventWrapper', [
    'cmObject', 'cmLogger', '$rootScope',
    function(cmObject, cmLogger, $rootScope){
        var self = this;

        cmObject.addEventHandlingTo(this);

        var gui = this.gui = require('nw.gui');
        var win = this.win = this.gui.Window.get();

        this.addTrigger = function(obj){
            //cmLogger.debug('cmNodeWebkitEventWrapper.addTrigger -> ' + JSON.stringify(obj));

            obj.trigger = this.trigger;
        };

        /**
         * handle events
         */

        this.on('goto-quickstart', function(){
            $rootScope.goTo('/start/quickstart');
        });

        this.on('goto-about-us', function(){
            $rootScope.goTo('/settings/about');
        });

        this.one('app-close', function(){
            win.close();
        });
    }
]);
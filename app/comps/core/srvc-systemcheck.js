'use strict';

/**
 * @ngdoc object
 * @name cmSystemCheck
 * @description
 */
angular.module('cmCore').service('cmSystemCheck', [
    'cmUserModel',
    'cmObject',
    'LocalStorageAdapter',
    '$rootScope',
    function(cmUserModel, cmObject, LocalStorageAdapter, $rootScope){
        var self = this;

        cmObject.addEventHandlingTo(this);

        this.checkLocalStorage = function(forceRedirect){
            var test = {key: 'cameoNet', value: 'cameoNet'};
            if (!LocalStorageAdapter.check()) {
                this.trigger('check:failed', {forceRedirect:forceRedirect});

                return false;
            } else {
                if (LocalStorageAdapter.save(test.key, test.value)) {
                    LocalStorageAdapter.remove(test.key);

                    return true;
                }

                this.trigger('check:failed', {forceRedirect:forceRedirect});
                return false;
            }
        };

        this.run = function(forceRedirect){
            this.checkLocalStorage(forceRedirect);
        };

        this.on('check:failed', function(event, data){
            if(typeof data == 'object'){
                if('forceRedirect' in data && data.forceRedirect == true){
                    cmUserModel.doLogout(false);
                    $rootScope.goto('/systemcheck');
                }
            }
        });
    }
]);
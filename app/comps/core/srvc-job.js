'use strict';

angular.module('cmCore').service('cmJob', [
    '$rootScope',
    '$window',
    '$location',
    'cmTranslate',
    'cmHooks',
    'cmLogger',
    function($rootScope, $window, $location, cmTranslate, cmHooks, cmLogger){

        var jobIsActive = false,
            jobFunction = null;

        return {
            isActive: function(){
                cmLogger.debug('cmJob.isActive');
                return jobIsActive;
            },
            start: function(message, cancelCallback){
                cmLogger.debug('cmJob.start '+message);
                jobIsActive = true;

                $window.onbeforeunload = function () {
                    return cmTranslate(message||'JOB.IN_PROGRESS')
                };

                jobFunction = $rootScope.$on('$locationChangeStart', function(event, next) {
                    event.preventDefault();

                    cmHooks.openModalConfirm(message, function(){
                        if(typeof cancelCallback == 'function'){
                            cancelCallback();
                        }

                        $location.url($location.url(next).hash());
                    });
                });
            },
            stop: function(){
                cmLogger.debug('cmJob.stop');
                jobIsActive = false;

                $window.onbeforeunload = null;

                jobFunction();
            }
        }
    }
]);
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
            jobFunction = null,
            pendingUrl = {path:'',replace:false};

        function resetPendingUrl(){
            cmLogger.debug('cmJob.resetPendingUrl');
            pendingUrl = {path:'',replace:false}
        }

        return {
            isActive: function(){
                //cmLogger.debug('cmJob.isActive');
                return jobIsActive;
            },
            start: function(message, cancelCallback){
                //cmLogger.debug('cmJob.start '+message);
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

                        stop();


                        if(pendingUrl.path != ''){
                            $rootScope.goTo(pendingUrl.path, pendingUrl.replace);
                        } else {
                            $rootScope.goBack();
                        }
                    });
                });
            },
            stop: function(){
                //cmLogger.debug('cmJob.stop');
                jobIsActive = false;

                $window.onbeforeunload = null;

                jobFunction();
            },
            setPendingUrl: function(path, replace){
                //cmLogger.debug('cmJob.setPendingUrl ' + path);

                if(typeof path == 'string' && path.length > 0){
                    pendingUrl.path = path;

                    if(replace){
                        pendingUrl.replace = replace;
                    }

                    $rootScope.$broadcast('$locationChangeStart');
                }
            }
        }
    }
]);
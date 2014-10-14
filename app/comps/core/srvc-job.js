'use strict';

angular.module('cmCore').service('cmJob', [
    '$rootScope',
    '$window',
    '$location',
    'cmTranslate',
    'cmModal',
    'cmLogger',
    function($rootScope, $window, $location, cmTranslate, cmModal, cmLogger){

        var jobIsActive = false,
            jobi18n = '',
            jobFunctionUnbind = null,
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
//                cmLogger.debug('cmJob.start '+message);
                jobIsActive = true;

                cmTranslate(message||'JOB.IN_PROGRESS').then(function(_jobi18n_){
                    jobi18n = _jobi18n_;
                });

                $window.onbeforeunload = function () {
                    return jobi18n;
                };

                jobFunctionUnbind = $rootScope.$on('$locationChangeStart', function(event, next) {
                    event.preventDefault();

                    cmModal.confirm({
                        text:   message,
                        cancel: 'NO',
                        okay:   'YES'
                    })
                    .then(function(){
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
//                cmLogger.debug('cmJob.stop');
                jobIsActive = false;

                $window.onbeforeunload = null;

                if(jobFunctionUnbind)
                    jobFunctionUnbind();
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
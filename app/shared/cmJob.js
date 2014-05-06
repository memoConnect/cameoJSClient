'use strict';

angular.module('cmJob', ['cmLogger','cmLanguage'])
    .service('cmJob', [
        '$rootScope',
        '$window',
        '$location',
        'cmLogger',
        'cmTranslate',
        function($rootScope, $window, $location, cmLogger, cmTranslate){

            var jobIsActive = false,
                jobFunction = null;

            return {
                isActive: function(){
                    return jobIsActive;
                },
                start: function(message){
                    cmLogger.debug('job start '+message)
                    jobIsActive = true;

                    $window.onbeforeunload = function () {
                        return cmTranslate(message||'JOB.IN_PROGRESS')
                    };

                    jobFunction = $rootScope.$on('$locationChangeStart', function(event, next) {
                        event.preventDefault();
                        var answer = confirm(cmTranslate(message||'JOB.IN_PROGRESS'))
                        if (answer) {
                            $location.url($location.url(next).hash());
                            $rootScope.$apply();
                        }
                    });
                },
                stop: function(){
                    cmLogger.debug('job stop')
                    jobIsActive = false;

                    $window.onbeforeunload = null;

                    jobFunction();
                }
            }
        }
    ]);
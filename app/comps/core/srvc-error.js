angular.module('cmCore')
.service('cmError', [
    '$rootScope',
    '$window',
    '$injector',
    function($rootScope, $window, $injector){
        var self = {
            showOnPage: function(error){
                $rootScope.errorThrown = error;
                $rootScope.goto('/error');
            }
        };

        $window.onerror = function(msg, url, line, col, error) {
            self.showOnPage({
                jserror: msg,
                location: $injector.get('$location').$$path,
                script: url,
                at: line+':'+col,
                error: error
            });
            //window.location.href = window.location.pathname + '#/error';
            return false;
        };

        return self;
    }
])
.factory('$exceptionHandler', [
    'cmLogger',
    '$injector',
    function (cmLogger,
              $injector) {
        return function (exception, cause) {

            var stack = (exception.stack+'');

            var error = {
                location:   $injector.get('$location').$$path,
                exception:  exception,
                msg:        exception.message,
                stack:      stack.replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, ' \n'),
                cause:      cause
            };

            cmLogger.error(JSON.stringify(error,null,2));

            if(typeof exception == 'object' && 'message' in exception && exception.message.indexOf('defined') >= 0){
                $injector.get('cmError').showOnPage(error);
            }

            //throw exception;
        };
    }
]);
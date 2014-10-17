angular.module('cmCore')
.service('cmError', [
    function(){
        window.onerror = function(msg, url, line, col, error) {
            //window.location.href = window.location.pathname + '#/error?msg=' + msg + '&url='+url+'&line='+line+'&col='+col+'&error='+error
            return false
        }
    }
])
.factory('$exceptionHandler', [
    'cmLogger',
    '$injector',
    function (cmLogger,
              $injector) {
        return function (exception, cause) {
    //        exception.message += ' (caused by "' + cause + '")';
            cmLogger.error(JSON.stringify({
                location:   $injector.get('$location').$$path,
                msg:        exception.message,
                stack:      exception.stack
            },null,2));
            //throw exception;
        };
    }
]);
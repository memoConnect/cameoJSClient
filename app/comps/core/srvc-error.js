angular.module('cmCore').service('cmError', [

    '$rootScope',
    'cmModal',
    'translateFilter',

    function($rootScope, cmModal, translateFilter){

        window.onerror = function(msg, url, line, col, error) {
            window.location.href = window.location.pathname + '#/error?msg=' + msg + '&url='+url+'&line='+line+'&col='+col+'&error='+error
            return false
        }
    }
])
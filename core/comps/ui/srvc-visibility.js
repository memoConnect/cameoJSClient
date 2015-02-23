'use strict';

// https://developer.mozilla.org/en-US/docs/Web/Guide/User_experience/Using_the_Page_Visibility_API?redirectlocale=en-US&redirectslug=DOM/Using_the_Page_Visibility_API

/*
example:
 var defaultTitle = $document[0].querySelector('title').innerHTML;
 cmVisibility.add('keyName for remove',function(isHidden, isTab){
    var title = defaultTitle;
    if(isHidden == true){
        title = defaultTitle +' '+ (isTab?'tab':'window')+' leaved';
    }
    $document[0].querySelector('title').innerHTML = title;
 })
*/

angular.module('cmUi')
.factory('cmVisibility',[
    'cmLogger',
    '$document', '$window',
    function(cmLogger,
             $document, $window) {

        function detectBrowserForTabApi() {
            // Opera 12.10 and Firefox 18 and later support
            if (typeof doc.hidden !== 'undefined') {
                isHidden = 'hidden';
                eventName = 'visibilitychange';
                return true;
            } else if (typeof doc.mozHidden !== 'undefined') {
                isHidden = 'mozHidden';
                eventName = 'mozvisibilitychange';
                return true;
            } else if (typeof doc.msHidden !== 'undefined') {
                isHidden = 'msHidden';
                eventName = 'msvisibilitychange';
                return true;
            } else if (typeof doc.webkitHidden !== 'undefined') {
                isHidden = 'webkitHidden';
                eventName = 'webkitvisibilitychange';
                return true;
            }
        return false;
        }

        function isValidKey(key){
            if(!key || typeof key != 'string' || key == '')
                return false;
            return true;
        }

        function findCallback(key){
            var index = -1;

            if(!isValidKey(key))
                return index;

            self.callbacks.forEach(function(callback, _index_){
                if(callback.key == key)
                    index = _index_;
            });

            return index;
        }

        function handleVisibilityChange(isHidden, isTab) {
            if(self.callbacks.length == 0)
                return false;

            if (isHidden) {
                self.callbacks.forEach(function(callback){
                    if(callback.method != null)
                        callback.method(true, isTab);
                });
            } else {
                self.callbacks.forEach(function(callback){
                    if(callback.method != null)
                        callback.method(false, isTab);
                });
            }
        }

        var isHidden,
            eventName,
            doc = $document[0],
            callbacks = [],
            self = {
                callbacks: [],
                isTabEventAvailable: function(){
                    return !(typeof doc[isHidden] === 'undefined');
                },
                add: function(key, callback){
                    var index = findCallback(key);
                    if (index == -1) {
                        if(isValidKey(key)) {
                            this.callbacks.push({
                                key: key,
                                method: typeof callback == 'function' ? callback : function(isHidden){}
                            });
                        }
                    } else {
                        cmLogger.warn('cmVisibility.add key "'+key+'" already exists. please do a remove before add.');
                    }
                },

                remove: function(key){
                    var index = findCallback(key);
                    if (index > -1) {
                        this.callbacks.splice(index, 1);
                    }
                }
            };

        // tab visibility
        if(detectBrowserForTabApi()){
            // Handle page visibility change
            $document.on(eventName, function(){
                handleVisibilityChange(doc[isHidden], true);
            });
        }

        // window visibility
        angular.element($window)
        .on('focus', function() {
            handleVisibilityChange(false, false);
        })
        .on('blur', function() {
            handleVisibilityChange(true, false);
        });

        return self;
    }
]);
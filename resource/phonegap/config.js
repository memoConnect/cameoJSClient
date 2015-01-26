var phonegapCameoConfig = {
    googleSenderId: '<%= googleSenderId %>'
};

// ios 8 useragent bug
// http://stackoverflow.com/questions/24784541/cordova-2-9-x-ios-8-useragent-bug
// https://github.com/apache/cordova-js/blob/26e3e49e49b2fb61ca836572af85c7a776ea9f1c/src/common/init.js#L46-L65

// Replace navigator before any modules are required(), to ensure it happens as soon as possible.
// We replace it so that properties that can't be clobbered can instead be overridden.
function replaceNavigator(origNavigator) {
    var CordovaNavigator = function() {};
    CordovaNavigator.prototype = origNavigator;
    var newNavigator = new CordovaNavigator();
    // This work-around really only applies to new APIs that are newer than Function.bind.
    // Without it, APIs such as getGamepads() break.
    if (CordovaNavigator.bind) {
        for (var key in origNavigator) {
            if (typeof origNavigator[key] == 'function') {
                newNavigator[key] = origNavigator[key].bind(origNavigator);
            }
            else {
                (function(k) {
                    Object.defineProperty(newNavigator, k, {
                        get: function() {
                            return origNavigator[k];
                        },
                        configurable: true,
                        enumerable: true
                    });
                })(key);
            }
        }
    }
    return newNavigator;
}

if (window.navigator) {
    window.navigator = replaceNavigator(window.navigator);
}
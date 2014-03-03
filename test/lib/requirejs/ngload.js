/*jslint node: true, vars: true, nomen: true */
/*globals define */

'use strict';
define({
    load: function (name, req, onload, config) {
        //console.log("ngamd loaded: ", req.toUrl(name));
        req(['app', 'angularAMD', name], function (app, angularAMD, value) {
            //console.log("Processing queues.");
            angularAMD.processQueue();
            onload(value);
        });
    }
});

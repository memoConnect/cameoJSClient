/*jslint node: true, vars: true, nomen: true */
/*globals define */

'use strict';
define({
    load: function (name, req, onload, config) {
        //console.log("ngamd loaded: ", req.toUrl(name));
        req(['app', 'angularAMD', name], function (app, angularAMD, value) {

//            try {
//                //console.log('bootstrapped manual');
//                angularAMD.bootstrap(app);
//            } catch (e){
//                //console.log('bootstrapped is done '+e);
//            }

            //console.log("Processing queues.");
            angularAMD.processQueue();
            onload(value);
        });
    }
});

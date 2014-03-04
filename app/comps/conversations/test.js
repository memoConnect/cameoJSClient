define(
    [
    'angularAMD',         
    './conversations-module',
    './conversationsAdapter-srvc',
    './conversationsModel-srvc'
    ], 

    function (angularAMD) {
        console.log('check1')
        angularAMD.processQueue();
        console.log('check2')
    }
);
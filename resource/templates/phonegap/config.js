var phonegap_cameo_config = {
    deviceReady: false,
    pushIpAppId: '<%= pushIpAppId %>',
    googleSenderId: '<%= googleSenderId %>'
};

function deviceReady(){
    document.addEventListener('deviceready', function () {
        phonegap_cameo_config.deviceReady = true;
    });
}
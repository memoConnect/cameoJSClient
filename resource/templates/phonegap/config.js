var phonegap_cameo_config = {
    deviceReady: false,
    pushIpAppId: '<%= pushIpAppId %>',
    googleSenderId: '<%= googleSenderId %>'
};

function deviceReady(){
    document.addEventListener('deviceready', function () {
        console.log('deviceready triggered and now phonegap_cameo_config.deviceReady=true')
        phonegap_cameo_config.deviceReady = true;
    });
}
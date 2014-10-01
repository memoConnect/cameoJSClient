var phonegap_cameo_config = {
    deviceReady: false,
    pushIpAppId: '<%= pushIpAppId %>',
    googleSenderId: '<%= googleSenderId %>'
};

function deviceReady(){
    console.log('deviceReady:deviceready???')
    document.addEventListener('deviceready', function () {
        console.log('deviceReady:deviceready!!!')
        phonegap_cameo_config.deviceReady = true;
    });
}
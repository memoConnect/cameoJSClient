var phonegap_cameo_config = {
    DeviceReady: false,
    PushIpAppId: '<%= pushIpAppId %>',
    GoogleSenderId: '<%= googleSenderId %>'
};

function deviceReady(){
    document.addEventListener('deviceready', function () {
        console.log('device:ready bam')
        phonegap_cameo_config.DeviceReady = true;
    });
}
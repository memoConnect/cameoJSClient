var phonegapCameoConfig = {
    deviceReady: false,
    pushIpAppId: '<%= pushIpAppId %>',
    googleSenderId: '<%= googleSenderId %>'
};
// device plugin handle that
function deviceReady(){
    document.addEventListener('deviceready', function () {
        console.log('deviceready triggered and now phonegapCameoConfig.deviceReady=true')
        phonegapCameoConfig.deviceReady = true;
    });
}
// applauncher plugin call that method
function handleOpenURL(url) {
    if('handleOpenURL' in window)
        window.handleOpenURL(url);
}
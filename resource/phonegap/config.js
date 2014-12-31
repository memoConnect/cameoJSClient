var phonegapCameoConfig = {
    deviceReady: false,
    googleSenderId: '<%= googleSenderId %>'
};
// device plugin handle that
function deviceReady(){
    document.addEventListener('deviceready', function () {
        //console.log('deviceready triggered and now phonegapCameoConfig.deviceReady=true')
        phonegapCameoConfig.deviceReady = true;
    });
}
// applauncher plugin call that method
function handleOpenURL(url) {
    // watcher in 'core/comps/phonegap/srvc-launch-app.js'
    var event = new CustomEvent('launchApp', { 'detail': {url:url} });
    window.dispatchEvent(event);
}
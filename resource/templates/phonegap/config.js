var phonegap_cameo_config = {
    deviceReady: false,
    pushIpAppId: '<%= pushIpAppId %>',
    googleSenderId: '<%= googleSenderId %>',
    onBootParams: {}
};
// device plugin handle that
function deviceReady(){
    document.addEventListener('deviceready', function () {
        console.log('deviceready triggered and now phonegap_cameo_config.deviceReady=true')
        phonegap_cameo_config.deviceReady = true;
    });
}
// applauncher plugin call that method
function handleOpenURL(url) {
    var protocolRegexp = '.*://',
        queryRegexp = '([^?=&]+)(=([^&]*))?';

    url
    .replace(new RegExp( protocolRegexp, 'g' ),'')
    .replace(new RegExp( queryRegexp, 'g' ),function( $0, $1, $2, $3 ){ phonegap_cameo_config.onBootParams[ $1 ] = $3; });

    console.log(phonegap_cameo_config.onBootParams)
}
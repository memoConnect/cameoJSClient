var phonegapCameoConfig = {
    deviceReady: false,
    pushIpAppId: '<%= pushIpAppId %>',
    googleSenderId: '<%= googleSenderId %>',
    onLaunchParams: {}
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
    var protocolRegexp = '.*://',
        queryRegexp = '([^?=&]+)(=([^&]*))?';

    url
    .replace(new RegExp( protocolRegexp, 'g' ),'')
    .replace(new RegExp( queryRegexp, 'g' ),function( $0, $1, $2, $3 ){ phonegapCameoConfig.onLaunchParams[ $1 ] = $3; });

    console.log('onLaunchParams '+JSON.stringify(phonegapCameoConfig.onLaunchParams))
}
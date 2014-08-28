var deviceReady = false;

// device APIs are available
function onDeviceReady() {
    console.log('device ready')
    console.log('check device ' + (typeof device))
    console.log('check requirejs ' + (typeof define))
    console.log('check angularjs ' + (typeof angular))
    // set global var
    deviceReady = true;
    // do function
    //checkConnection();
    initPuship();
}

function prettify(object) {
    return JSON.stringify(object, undefined, 2);
}

function loadContacts() {
    if (!deviceReady)
        return false;

    var options = new ContactFindOptions();
    // search string
    options.filter = "";
    options.multiple = true;
    // looks specific type
    var filter = ['name', 'displayName', 'phoneNumbers', 'emails'];

    console.log('start of reading contacts---------------');
    // find contacts
    navigator.contacts.find(filter,
        function (contacts) {
            console.log('contacts success ' + contacts.length)
            document.getElementById('contactsNumber').innerHTML = 'contacts success ' + contacts.length;
            for (var i = 0; i < contacts.length; i++) {
                var clearContact = contacts[i];

//                    for(var data in clearContact){
//                        if(data == null)
//                            delete clearContact[data];
//                    }

                console.log(prettify(clearContact));
            }
            console.log('end of reading contacts---------------');
        }, function onError(contactError) {
            alert('onError!');
        }, options
    );
}

function checkConnection() {
    var networkState = navigator.connection.type;

    var states = {};
    states[Connection.UNKNOWN] = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI] = 'WiFi connection';
    states[Connection.CELL_2G] = 'Cell 2G connection';
    states[Connection.CELL_3G] = 'Cell 3G connection';
    states[Connection.CELL_4G] = 'Cell 4G connection';
    states[Connection.CELL] = 'Cell generic connection';
    states[Connection.NONE] = 'No network connection';

    document.getElementById('networkState').innerHTML = 'Connection type: ' + states[networkState];
}

function initPuship() {
    console.info("#####")
    console.info("initPuship")
    Puship.PushipAppId = "<%= pushIpAppId %>";

    function censor(censor) {
        var i = 0;

        return function(key, value) {
            if(i !== 0 && typeof(censor) === 'object' && typeof(value) == 'object' && censor == value)
                return '[Circular]';

            if(i >= 29) // seems to be a harded maximum of 30 serialized objects?
                return '[Unknown]';

            ++i; // so we know we aren't using the original object anymore

            return value;
        }
    }

    if (Puship.Common.GetCurrentOs() == Puship.OS.ANDROID) {
        var GCMCode = "<%= googleSenderId %>"; // This is the senderID provided by Google. I.E.: "28654934133"
        Puship.GCM.Register(GCMCode,{
            successCallback: function (pushipresult) {
                console.info("#####")
                console.info("device registered")
//                console.info("device registered: " +JSON.stringify(pushipresult, censor(pushipresult)))
                console.info("DeviceToken: "+pushipresult.DeviceToken+" DeviceId:"+pushipresult.DeviceId)
            },
            failCallback: function (pushipresult) {
                console.info("#####")
                console.info("error during registration: " + JSON.stringify(pushipresult))
            }
        });
    } else if (Puship.Common.GetCurrentOs() == Puship.OS.IOS) {
        Puship.APNS.Register({
            successCallback: function (pushipresult) {
                console.info("#####")
                console.info("device registered: " +JSON.stringify(pushipresult, censor(pushipresult)))
                console.info("DeviceToken: "+pushipresult.DeviceToken+" DeviceId:"+pushipresult.DeviceId)
            },
            failCallback: function (pushipresult) {
                console.info("#####")
                console.info("error during registration: " + JSON.stringify(pushipresult))
            }
        });
    } else {
        console.info("Not supported platform");
    }

    Puship.Common.OnPushReceived(function (event) {
        console.info("#####")
        console.info('push received');
        try {
            console.info(event.notification.Alert);
        }
        catch (err) {
            console.info("Cannot display alert in background");
        }
    });

    Puship.Common.GetPushMessagesByDevice(
        {
            //limit: 10, //max limit is 50 default is 20
            //offset: 100,
            successCallback: function (regresult) {
                console.info("#####")
                console.info("GetPushMessagesByDevice done");

                if (regresult.length > 0) {
                    console.info("Message 1 of " + regresult.length + ": " + regresult[0].Message)
                } else {
                    console.info("No message found");
                }
            },
            failCallback: function (regresult) {
                console.info("#####")
                console.info("error during GetPushMessagesByDevice: " + JSON.stringify(regresult))
            }
        });
}

// Wait for device API libraries to load
document.addEventListener("deviceready", onDeviceReady, false);
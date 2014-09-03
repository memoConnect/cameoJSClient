var Puship = Puship || {};
Puship.PushipAppId = null;
Puship.Domain = 'http://puship.cloudapp.net/';
Puship.gcmregid = '';
Puship.Events = Puship.Events || {};
Puship.OS = {IOS: {value: 1, name: "iOS", code: "IOS"}, ANDROID: {value: 2, name: "Android", code: "ANDROID"}, WP: {value: 3, name: "Windows Phone", code: "WP"}, BLACKBERRY: {value: 4, name: "BlackBerry", code: "BB"}};
var RESPONSESTATUS = {REGISTERED: {value: 200, name: "Registered", code: "REGISTERED"}, GENERICERROR: {value: 500, name: "Generic Error", code: "GENERICERROR"}, APPLICATIONNOTFOUND: {value: 404, name: "Application not found", code: "APPLICATIONNOTFOUND"}, DEVICENOTFOUND: {value: 405, name: "Device not found", code: "DEVICENOTFOUND"}};
Puship.GCM = function () {
    var privateInstanceIdentifier = '';
    var privateAppId = '';
    var privateDeviceType = -1;
    var privateSuccessCallback = GCM_Success;
    var privateFailCallback = GCM_Fail;

    function GCM_Event(e) {
        //console.log('GCM_Event: ' + e.event);
        switch (e.event) {
            case'registered':
                Puship.gcmregid = e.regid;
                if (Puship.gcmregid.length > 0) {
                    //console.log('REGISTERED -> REGID:' + e.regid);
                    Puship.Common.RegisterOnPuship(e.regid, privateAppId, privateDeviceType, {instanceId: privateInstanceIdentifier, successCallback: privateSuccessCallback, failCallback: privateFailCallback});
                }
                break;
            case'message':
                //console.log('MESSAGE -> MSG:' + e.message);
                //console.log('MESSAGE -> MSGCNT:' + e.msgcnt);
                //console.log('e:' + JSON.stringify(e));
                if (e.foreground) {
                    if (e.payload != null) {
                        //console.log('soundname:' + e.payload.sound);
                        //var my_media = new Media("/android_asset/www/" + e.payload.sound);
                        //my_media.play();
                    }
                } else {
                    //console.log('inline');
                    Puship.Common.NotifyPush(ConvertPush(e));
                }
                break;
            case'error':
                //console.warn('ERROR -> MSG:' + e.msg);
                privateFailCallback(e);
                break;
            default:
                alert('EVENT -> Unknown, an event was received and we do not know what it is');
                break;
        }
    }

    function GCM_Success(e) {
        //console.log('success method');
        //console.log('e:' + JSON.stringify(e));
        if (e == "ALREADY REGISTERED" && privateSuccessCallback != GCM_Success) {
            privateSuccessCallback(e);
        }
        //console.log('exit from success');
    }

    function GCM_Fail(e) {
        //console.log('GCM_Fail -> GCM plugin failed to register');
        //console.log('GCM_Fail -> ' + e.msg);
        privateFailCallback(e);
    }

    function ConvertPush(GCMPush) {
        //console.log("Converting GCM...");
        var CommonPush = {
            Badge: GCMPush.payload == null ? GCMPush.msgcnt : GCMPush.payload.msgcnt,
            Alert: GCMPush.message,
            Sound: GCMPush.payload == null ? GCMPush.sound : GCMPush.payload.sound
        };
        //console.log("CommonPush: " + JSON.stringify(CommonPush));
        return CommonPush;
    }

    return{Register: function (GCMProject, optionalparams) {
        //console.log('Calling GCM Register');
        privateAppId = Puship.PushipAppId;
        privateDeviceType = 2;
        if (!optionalparams)optionalparams = {};
        privateSuccessCallback = Puship.Common.DefaultValue(optionalparams.successCallback, GCM_Success);
        privateFailCallback = Puship.Common.DefaultValue(optionalparams.failCallback, GCM_Fail);
        privateInstanceIdentifier = Puship.Common.DefaultValue(optionalparams.instanceId, device.uuid);
        //console.log('Params initialized');
        var pushNotification = window.plugins.pushNotification;
        if (pushNotification != null) {
            pushNotification.register(GCM_Success, GCM_Fail, {"senderID": GCMProject, "ecb": "Puship.GCM.GCM_Event"});
        } else {
            return cordova.exec(GCM_Success, GCM_Fail, 'GCMPlugin', 'register', [
                {senderID: GCMProject, ecb: "Puship.GCM.GCM_Event"}
            ]);
        }
    }, UnRegister: function (successCallback, failureCallback) {
        //console.log("Start unregistering app");
        var UnregisterSuccessCallback = Puship.Common.DefaultValue(successCallback, function () {
            //console.log("Success Unregistering app");
        });
        var UnregisterFailCallback = Puship.Common.DefaultValue(failureCallback, function (err) {
            //console.log("Error during Unregistering app");
            //console.log("error:" + JSON.stringify(err));
        });
        var pushNotification = window.plugins.pushNotification;
        if (pushNotification != null) {
            pushNotification.unregister(UnregisterSuccessCallback, UnregisterFailCallback);
        } else {
            //console.log("Calling native unregister");
            return cordova.exec(UnregisterSuccessCallback, UnregisterFailCallback, 'GCMPlugin', 'unregister', [
                {}
            ]);
        }
    }, GCM_Event: GCM_Event};
}();
function PushipWPNotificationCallback(pushMessage) {
    Puship.WP.NotificationCallback(pushMessage);
}
Puship.WP = function () {
    var privateInstanceIdentifier = '';
    var privateAppId = '';
    var privateDeviceType = -1;
    var privateSuccessCallback = GCM_Success;
    var privateFailCallback = GCM_Fail;

    function Register(optionalparams) {
        //console.log('Calling WP Register');
        privateAppId = Puship.PushipAppId;
        privateDeviceType = 3;
        if (!optionalparams)optionalparams = {};
        privateSuccessCallback = Puship.Common.DefaultValue(optionalparams.successCallback, GCM_Success);
        privateFailCallback = Puship.Common.DefaultValue(optionalparams.failCallback, GCM_Fail);
        privateInstanceIdentifier = Puship.Common.DefaultValue(optionalparams.instanceId, device.uuid);
        //console.log('Params initialized');
        //console.log("Getting user token");
        cordova.exec(RegisterResultCallBack, privateFailCallback, "PushipPlugin", "GetUserToken", []);
    }

    function RegisterResultCallBack(tokenresult) {
        //console.log('Result token:' + JSON.stringify(tokenresult));
        Puship.Common.RegisterOnPuship(tokenresult, privateAppId, privateDeviceType, {instanceId: privateInstanceIdentifier, successCallback: privateSuccessCallback, failCallback: privateFailCallback});
    }

    function GCM_Success(e) {
        //console.log('success method');
        //console.log('e:' + JSON.stringify(e));
        //console.log('exit from success');
    }

    function GCM_Fail(e) {
        //console.log('GCM_Fail -> GCM plugin failed to register');
        //console.log('GCM_Fail -> ' + e.msg);
        privateFailCallback(e);
    }

    function ConvertPush(MPNSPush) {
        //console.log("Converting MPNS...");
        var CommonPush = {Badge: 1, Alert: MPNSPush, Sound: "default"};
        //console.log("CommonPush: " + JSON.stringify(CommonPush));
        return CommonPush;
    }

    function NotificationCallback(notification) {
        //console.log('raising puship event');
        Puship.Common.NotifyPush(ConvertPush(notification));
    }

    return{Register: Register, UnRegister: function (successCallback, failureCallback) {
        //console.log("Start unregistering app");
        var UnregisterSuccessCallback = Puship.Common.DefaultValue(successCallback, function () {
            //console.log("Success Unregistering app");
        });
        var UnregisterFailCallback = Puship.Common.DefaultValue(failureCallback, function (err) {
            //console.log("Error during Unregistering app");
            //console.log("error:" + JSON.stringify(err));
        });
        //console.log("Calling native unregister");
        return cordova.exec(UnregisterSuccessCallback, UnregisterFailCallback, 'GCMPlugin', 'unregister', [
            {}
        ]);
    }, NotificationCallback: NotificationCallback};
}();
Puship.APNS = function () {
    var privateInstanceIdentifier = '';
    var privateAppId = '';
    var privateDeviceType = -1;
    var privateSuccessCallback = GCM_Success;
    var privateFailCallback = GCM_Fail;
    var privatePushCallback = PushCallback;
    var privateApntoken = '';

    function PushCallback(push) {
        //console.log('push received');
    }

    function GCM_Success(e) {
        //console.log('success method');
        //console.log('e:' + JSON.stringify(e));
        //console.log('exit from success');
    }

    function GCM_Fail(e) {
        //console.log('GCM_Fail -> GCM plugin failed to register');
        //console.log('GCM_Fail -> ' + e.msg);
        privateFailCallback(e);
    }

    function ConvertPush(APNPush) {
        var CommonPush = {Badge: APNPush.badge, Alert: APNPush.alert, Sound: APNPush.sound};
        //console.log("CommonPush: " + JSON.stringify(CommonPush));
        return CommonPush;
    }

    return{Register: function (optionalparams) {
        //console.log('Calling APNS Register');
        privateAppId = Puship.PushipAppId;
        privateDeviceType = 1;
        if (!optionalparams)optionalparams = {};
        privateSuccessCallback = Puship.Common.DefaultValue(optionalparams.successCallback, GCM_Success);
        privateFailCallback = Puship.Common.DefaultValue(optionalparams.failCallback, GCM_Fail);
        privateInstanceIdentifier = Puship.Common.DefaultValue(optionalparams.instanceId, device.uuid);
        privatePushCallback = Puship.Common.DefaultValue(optionalparams.pushCallback, PushCallback);
        var pushNotification = window.plugins.pushNotification;
        if (pushNotification != null) {
            //console.log("Registering with CLI");
            pushNotification.register(function (resultToken) {
                //console.log("token: " + resultToken);
                privateApntoken = resultToken;
                Puship.Common.RegisterOnPuship(resultToken, privateAppId, privateDeviceType, {instanceId: privateInstanceIdentifier, successCallback: privateSuccessCallback, failCallback: privateFailCallback});
            }, function (status) {
                //console.warn('Error callback');
                //console.warn('registerDevice:%o', status);
                privateFailCallback(status);
            }, {"badge": "true", "sound": "true", "alert": "true", "ecb": "Puship.APNS.notificationCallback"});
        } else {
            //console.log("Registering with Manual Installation");
            Puship.APNS.registerDevice({alert: true, badge: true, sound: true}, function (status) {
                //console.log("token: " + status.deviceToken);
                privateApntoken = status.deviceToken;
                //console.log('registerDevice:%o', status);
                Puship.Common.RegisterOnPuship(status.deviceToken, privateAppId, privateDeviceType, {instanceId: privateInstanceIdentifier, successCallback: privateSuccessCallback, failCallback: privateFailCallback});
            }, function (status) {
                //console.warn('Error callback');
                //console.warn('registerDevice:%o', status);
                privateFailCallback(status);
            });
        }
    }, registerDevice: function (config, successCallback, errorCallback) {
        cordova.exec(successCallback, errorCallback, "PushNotification", "registerDevice", config ? [config] : []);
    }, getPendingNotifications: function (callback) {
        cordova.exec(callback, callback, "PushNotification", "getPendingNotifications", []);
    }, getRemoteNotificationStatus: function (callback) {
        cordova.exec(callback, callback, "PushNotification", "getRemoteNotificationStatus", []);
    }, setApplicationIconBadgeNumber: function (badge, callback) {
        var pushNotification = window.plugins.pushNotification;
        if (pushNotification != null) {
            //console.log("setApplicationIconBadgeNumber with CLI");
            pushNotification.setApplicationIconBadgeNumber(callback, callback, badge);
        } else {
            //console.log("setApplicationIconBadgeNumber with Manual Installation");
            cordova.exec(callback, callback, "PushNotification", "setApplicationIconBadgeNumber", [
                {badge: badge}
            ]);
        }
    }, cancelAllLocalNotifications: function (callback) {
        cordova.exec(callback, callback, "PushNotification", "cancelAllLocalNotifications", []);
    }, notificationCallback: function (notification) {
        //console.log('raising puship event');
        if (window.plugins.pushNotification != null)
            Puship.Common.NotifyPush(ConvertPush(notification)); else
            Puship.Common.NotifyPush(ConvertPush(notification.aps));
    }, UnRegister: function () {
        //console.log("Start unregistering apple device");
        var UnregisterSuccessCallback = Puship.Common.DefaultValue(successCallback, function () {
            //console.log("Success Unregistering apple device");
        });
        var UnregisterFailCallback = Puship.Common.DefaultValue(failureCallback, function (err) {
            //console.log("Error during Unregistering apple device");
            //console.log("error:" + JSON.stringify(err));
        });
        var pushNotification = window.plugins.pushNotification;
        if (pushNotification != null) {
            pushNotification.unregister(UnregisterSuccessCallback, UnregisterFailCallback);
        } else {
            //console.log("Calling fake unregister");
            UnregisterSuccessCallback();
        }
    }};
}();
Puship.BPNS = function () {
    var privateInstanceIdentifier = '';
    var privateAppId = '';
    var privateDeviceType = -1;
    var privateSuccessCallback = null;
    var privateFailCallback = null;
    var iport = 32200;
    var iserverUrl = "";
    var iappId = "";
    var imax = 100;
    var iwakeUpPage = "index.html";

    function REG_Success(e) {
        //console.log('success method');
        //console.log('e:' + JSON.stringify(e));
        if (privateSuccessCallback) {
            privateSuccessCallback(e);
        }
        //console.log('exit from success');
    }

    function REG_Fail(e) {
        //console.log('BB Fail -> BB plugin failed to register');
        if (privateFailCallback) {
            privateFailCallback(e);
        }
        //console.log('BB Fail -> BB plugin failed to register');
    }

    function onRegister(status) {
        //console.log('Service call done with status: ' + status);
        if (status == 0) {
            //console.log("Registration done");
            Puship.Common.RegisterOnPuship(GetToken(), privateAppId, privateDeviceType, {instanceId: privateInstanceIdentifier, successCallback: REG_Success, failCallback: REG_Fail});
        }
        else if (status == 1) {
            alert("push register status network error");
        }
        else if (status == 2) {
            alert("push register status rejected by server");
        }
        else if (status == 3) {
            alert("push register status invalid parameters");
        }
        else if (status == -1) {
            alert("push register status general error");
        }
        else {
            alert("push register status unknown");
        }
    }

    function ConvertPush(BPNPush) {
        var CommonPush = {Badge: 1, Alert: blackberry.utils.blobToString(BPNPush.payload), Sound: "default"};
        //console.log("CommonPush: " + JSON.stringify(CommonPush));
        return CommonPush;
    }

    function onData(data) {
        //console.log("Push notifications received");
        try {
            //console.log("data received: " + JSON.stringify(data));
            var resultpush = ConvertPush(data);
            //console.log('raising puship event');
            Puship.Common.NotifyPush(resultpush);
            return 0;
        }
        catch (err) {
            //console.log("error from push notification data: " + err);
        }
    }

    function onSimChange() {
        //console.log('handle Sim Card change');
    }

    function OpenBISPushListener() {
        try {
            //console.log('Calling BB services');
            var ops = {port: iport, appId: iappId, serverUrl: iserverUrl, wakeUpPage: iwakeUpPage, maxQueueCap: imax};
            blackberry.push.openBISPushListener(ops, onData, onRegister, onSimChange);
        }
        catch (err) {
            //console.log("Error during open listener:" + err);
            try {
                //console.log("try shotdown listener");
                blackberry.push.closePushListener();
            } catch (er) {
                //console.log("error during closing listener: " + er);
            }
        }
    }

    function GetToken() {
        return blackberry.identity.PIN;
    }

    return{Register: function (port, serverUrl, appId, optionalparams) {
        //console.log('Initializing BPNS variables');
        iport = port;
        iserverUrl = serverUrl;
        iappId = appId;
        if (!optionalparams)optionalparams = {};
        privateAppId = Puship.PushipAppId;
        privateDeviceType = 4;
        privateSuccessCallback = optionalparams.successCallback;
        privateFailCallback = optionalparams.failCallback;
        privateInstanceIdentifier = Puship.Common.DefaultValue(optionalparams.instanceId, device.uuid);
        imax = Puship.Common.DefaultValue(optionalparams.max, imax);
        iwakeUpPage = Puship.Common.DefaultValue(optionalparams.wakeUpPage, iwakeUpPage);
        //console.log('Calling BPNS Register');
        OpenBISPushListener();
    }, UnRegister: function () {
        blackberry.push.closePushListener();
    }};
}();
Puship.Common = function () {
    var privateCurrentPlatform = null;

    function DefaultValue(arg, def) {
        return(typeof arg == 'undefined' ? def : arg);
    }

    function GetAppId() {
        if (Puship.PushipAppId == null) {
            //console.warn("PushipAppId is NOT setted");
            return null;
        }
        return Puship.PushipAppId;
    }

    function WriteResponceStatus(code) {
        if (code == RESPONSESTATUS.REGISTERED.value) {
            //console.log(RESPONSESTATUS.REGISTERED.name);
        }
        else if (code == RESPONSESTATUS.GENERICERROR.value) {
            //console.warn(RESPONSESTATUS.GENERICERROR.name);
        }
        else if (code == RESPONSESTATUS.APPLICATIONNOTFOUND.value) {
            //console.warn(RESPONSESTATUS.APPLICATIONNOTFOUND.name);
        }
        else if (code == RESPONSESTATUS.DEVICENOTFOUND.value) {
            //console.warn(RESPONSESTATUS.DEVICENOTFOUND.name);
        }
        else {
            //console.warn("Code not found");
        }
    }

    function NotifyPush(push) {
        //console.log("NotifyPush Callback:" + push);
        var ev;
        //console.log("dispatch for firefox + others");
        ev = document.createEvent('HTMLEvents');
        ev.notification = push;
        ev.initEvent('puship-notification', true, true, push);
        document.dispatchEvent(ev);
        //console.log("notificationCallback dispached");
    }

    function OnPushReceived(callback) {
        //console.log("setting callback");
        document.addEventListener("puship-notification", callback);
        //console.log("setting callback done");
    }

    function AddTagFilter(tag, optionalparams) {
        if (!optionalparams)optionalparams = {};
        var appKey = Puship.PushipAppId;
        //console.log('Optional params: ' + JSON.stringify(optionalparams));
        var privateInstanceIdentifier = DefaultValue(optionalparams.instanceId, device.uuid);
        var pSuccessCallBack = DefaultValue(optionalparams.successCallback, function (pushipresult) {
            //console.log('Internal puship addfilter success managed');
        });
        var pFailCallBack = DefaultValue(optionalparams.failCallback, function (pushipresult) {
            //console.log('Internal puship addfilter fail managed');
        });
        var pRemovePrevTag = DefaultValue(optionalparams.removePrevTag, false);
        //console.log('Adding Tag Filter...');
        var request = new XMLHttpRequest();
        //console.log('AppId:' + appKey);
        //console.log('Tag:' + tag);
        var deviceId = appKey.toString() + "_" + privateInstanceIdentifier;
        //console.log('DeviceIdentifier:' + deviceId);
        var getstr = Puship.Domain + "services/puship.svc/AddTagFilter?AppId='" + appKey + "'&DeviceIdentifier='" + deviceId
            + "'&Tag='" + tag + "'&RemovePrevTag=" + pRemovePrevTag + "&$format=json";
        //console.log('RequestTo:' + getstr);
        request.open('GET', getstr, true);
        request.onreadystatechange = function () {
            if (request.readyState == 4) {
                //console.log('Processing responce');
                if (request.status == 200 || request.status == 201) {
                    try {
                        var code = JSON.parse(request.responseText).d.AddTagFilter;
                        if (code == 200) {
                            //console.log('Filter added succesfully');
                            pSuccessCallBack(this);
                        } else {
                            //console.warn('Error during filter adding execution');
                            WriteResponceStatus(code);
                            pFailCallBack(this);
                        }
                    } catch (e) {
                        //console.warn('Error during responce parsing' + this.statusText);
                        pFailCallBack(e);
                    }
                    ;
                } else {
                    //console.warn('Error during filter adding' + this.statusText);
                    pFailCallBack(this);
                }
            }
        }
        //console.log('Calling AddTagFilter endpoint');
        request.send();
    }

    function RemoveTagFilter(tag, optionalparams) {
        if (!optionalparams)optionalparams = {};
        var appKey = Puship.PushipAppId;
        //console.log('Optional params: ' + JSON.stringify(optionalparams));
        var privateInstanceIdentifier = DefaultValue(optionalparams.instanceId, device.uuid);
        var pSuccessCallBack = DefaultValue(optionalparams.successCallback, function (pushipresult) {
            //console.log('Internal puship removefilter success managed');
        });
        var pFailCallBack = DefaultValue(optionalparams.failCallback, function (pushipresult) {
            //console.log('Internal puship removefilter fail managed');
        });
        //console.log('Removing Tag Filter...');
        var request = new XMLHttpRequest();
        //console.log('AppId:' + appKey);
        //console.log('Tag:' + tag);
        var deviceId = appKey.toString() + "_" + privateInstanceIdentifier;
        //console.log('DeviceIdentifier:' + deviceId);
        var getstr = Puship.Domain + "services/puship.svc/RemoveTagFilter?AppId='" + appKey + "'&DeviceIdentifier='" + deviceId
            + "'&Tag='" + tag + "'&$format=json";
        //console.log('RequestTo:' + getstr);
        request.open('GET', getstr, true);
        request.onreadystatechange = function () {
            if (request.readyState == 4) {
                //console.log('Processing responce');
                if (request.status == 200 || request.status == 201) {
                    try {
                        var code = JSON.parse(request.responseText).d.RemoveTagFilter;
                        if (code == 200) {
                            //console.log('Filter removed succesfully');
                            pSuccessCallBack(this);
                        } else {
                            //console.warn('Error during filter removing execution');
                            WriteResponceStatus(code);
                            pFailCallBack(this);
                        }
                    } catch (e) {
                        //console.warn('Error during responce parsing' + this.statusText);
                        pFailCallBack(e);
                    }
                    ;
                } else {
                    //console.warn('Error during Filter removing' + this.statusText);
                    pFailCallBack(this);
                }
            }
        }
        //console.log('Calling RemoveTagFilter endpoint');
        request.send();
    }

    function CleanTagFilter(optionalparams) {
        if (!optionalparams)optionalparams = {};
        var appKey = Puship.PushipAppId;
        //console.log('Optional params: ' + JSON.stringify(optionalparams));
        var privateInstanceIdentifier = DefaultValue(optionalparams.instanceId, device.uuid);
        var pSuccessCallBack = DefaultValue(optionalparams.successCallback, function (pushipresult) {
            //console.log('Internal puship cleanfilter success managed');
        });
        var pFailCallBack = DefaultValue(optionalparams.failCallback, function (pushipresult) {
            //console.log('Internal puship cleanfilter fail managed');
        });
        //console.log('Cleaning Tag Filter...');
        var request = new XMLHttpRequest();
        //console.log('AppId:' + appKey);
        var deviceId = appKey.toString() + "_" + privateInstanceIdentifier;
        //console.log('DeviceIdentifier:' + deviceId);
        var getstr = Puship.Domain + "services/puship.svc/CleanTagFilter?AppId='" + appKey + "'&DeviceIdentifier='" + deviceId
            + "'&$format=json";
        //console.log('RequestTo:' + getstr);
        request.open('GET', getstr, true);
        request.onload = function () {
            //console.warn('Processing CleanTagFilter responce');
            if (this.status == 200 || this.status == 201) {
                var code = JSON.parse(this.response).d.CleanTagFilter;
                if (code == 200) {
                    //console.log('Filter cleaned succesfully');
                    pSuccessCallBack(this);
                } else {
                    //console.warn('Error during filter cleaning execution');
                    WriteResponceStatus(code);
                    pFailCallBack(this);
                }
            } else {
                //console.warn('Error during filter cleaning call: ' + this.statusText);
                pFailCallBack(this);
            }
        };
        request.onreadystatechange = function () {
            if (request.readyState == 4) {
                //console.log('Processing responce');
                if (request.status == 200 || request.status == 201) {
                    try {
                        var code = JSON.parse(request.responseText).d.CleanTagFilter;
                        if (code == 200) {
                            //console.log('Filter cleaned succesfully');
                            pSuccessCallBack(this);
                        } else {
                            //console.warn('Error during filter cleaning execution');
                            WriteResponceStatus(code);
                            pFailCallBack(this);
                        }
                    } catch (e) {
                        //console.warn('Error during responce parsing' + this.statusText);
                        pFailCallBack(e);
                    }
                    ;
                } else {
                    //console.warn('Error during push getting' + this.statusText);
                    pFailCallBack(this);
                }
            }
        }
        //console.log('Calling CleanTagFilter endpoint');
        request.send();
    }

    function GetTagFilters(optionalparams) {
        if (!optionalparams)optionalparams = {};
        var appKey = Puship.PushipAppId;
        //console.log('Optional params: ' + JSON.stringify(optionalparams));
        var privateInstanceIdentifier = DefaultValue(optionalparams.instanceId, device.uuid);
        var pSuccessCallBack = DefaultValue(optionalparams.successCallback, function (pushipresult) {
            //console.log('Internal puship getfilter success managed');
        });
        var pFailCallBack = DefaultValue(optionalparams.failCallback, function (pushipresult) {
            //console.log('Internal puship getfilter fail managed');
        });
        //console.log('Get Tag Filters...');
        var request = new XMLHttpRequest();
        //console.log('AppId:' + appKey);
        var deviceId = appKey.toString() + "_" + privateInstanceIdentifier;
        //console.log('DeviceIdentifier:' + deviceId);
        var getstr = Puship.Domain + "services/puship.svc/GetTagFilters?AppId='" + appKey + "'&DeviceIdentifier='" + deviceId
            + "'&$format=json";
        //console.log('RequestTo:' + getstr);
        request.open('GET', getstr, true);
        request.onreadystatechange = function () {
            if (request.readyState == 4) {
                //console.log('Processing responce');
                if (request.status == 200 || request.status == 201) {
                    try {
                        pSuccessCallBack(JSON.parse(request.responseText).d);
                    } catch (e) {
                        //console.warn('Error during responce parsing' + this.statusText);
                        pFailCallBack(e);
                    }
                    ;
                } else {
                    //console.warn('Error during filter getting' + this.statusText);
                    pFailCallBack(this);
                }
            }
        }
        //console.log('Calling GetTagFilters endpoint');
        request.send();
    }

    var pushOptionalParams = null;

    function GetPushMessages(optionalparams) {
        if (!optionalparams) {
            pushOptionalParams = {};
        }
        else {
            pushOptionalParams = optionalparams;
        }
        if (pushOptionalParams.byCurrentPosition == true) {
            if (pushOptionalParams.Latitude == null || pushOptionalParams.Longitude == null) {
                if (GetCurrentOs() == Puship.OS.ANDROID) {
                    optionalparams.enableHighAccuracy = true;
                }
                navigator.geolocation.getCurrentPosition(pushCurrentPositionSuccess, pushCurrentPositionError, optionalparams);
            } else {
            }
        } else {
            GetPushMessagesInternal(pushOptionalParams);
        }
    }

    function pushCurrentPositionSuccess(position) {
        //console.log('Latitude: ' + position.coords.latitude + '\n' + 'Longitude: ' + position.coords.longitude + '\n' + 'Altitude: ' + position.coords.altitude + '\n' + 'Accuracy: ' + position.coords.accuracy + '\n' + 'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '\n' + 'Heading: ' + position.coords.heading + '\n' + 'Speed: ' + position.coords.speed + '\n' + 'Timestamp: ' + position.timestamp + '\n');
        pushOptionalParams.Latitude = position.coords.latitude;
        pushOptionalParams.Longitude = position.coords.longitude;
        GetPushMessagesInternal(pushOptionalParams);
    }

    function pushCurrentPositionError(error) {
        var pFailCallBack = DefaultValue(pushOptionalParams.failCallback, function (pushipresult) {
            //console.log('Internal puship GetPushMessage fail managed');
        });
        //console.warn('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
        pFailCallBack(error);
    }

    function GetPushMessagesInternal(optionalparams) {
        if (!optionalparams)optionalparams = {};
        var appKey = Puship.PushipAppId;
        //console.log('Optional params: ' + JSON.stringify(optionalparams));
        var privateInstanceIdentifier = DefaultValue(optionalparams.instanceId, device.uuid);
        var privateLimit = DefaultValue(optionalparams.limit, 20);
        var privateOffset = DefaultValue(optionalparams.offset, 0);
        var privateTags = DefaultValue(optionalparams.tag, "");
        var adddevicepush = DefaultValue(optionalparams.addDevicePush, false);
        var pSuccessCallBack = DefaultValue(optionalparams.successCallback, function (pushipresult) {
            //console.log('Internal puship GetPushMessages success managed');
        });
        var pFailCallBack = DefaultValue(optionalparams.failCallback, function (pushipresult) {
            //console.log('Internal puship GetPushMessages fail managed');
        });
        //console.log('Get Push Messages...');
        var request = new XMLHttpRequest();
        //console.log('AppId:' + appKey);
        //console.log('Tag:' + privateTags);
        var deviceId = appKey.toString() + "_" + privateInstanceIdentifier;
        //console.log('DeviceIdentifier:' + deviceId);
        var getstr = Puship.Domain + "Services/Puship.svc/GetPushMessages?AppId='" + appKey + "'&DeviceType=" + GetCurrentOs().value + "&Limit=" + privateLimit + "&Offset=" + privateOffset + "&Tags='" + privateTags + "'";
        if (adddevicepush) {
            getstr += "&DeviceId='" + deviceId + "'";
        }
        if (optionalparams.Latitude)getstr += "&Latitude=" + optionalparams.Latitude;
        if (optionalparams.Longitude)getstr += "&Longitude=" + optionalparams.Longitude;
        getstr += "&$format=json";
        //console.log('RequestTo:' + getstr);
        request.open('GET', getstr, true);
        request.onreadystatechange = function () {
            if (request.readyState == 4) {
                //console.log('Processing responce');
                if (request.status == 200 || request.status == 201) {
                    try {
                        pSuccessCallBack(JSON.parse(request.responseText).d);
                    } catch (e) {
                        //console.warn('Error during responce parsing' + this.statusText);
                        pFailCallBack(e);
                    }
                    ;
                } else {
                    //console.warn('Error during push getting' + this.statusText);
                    pFailCallBack(this);
                }
            }
        }
        //console.log('Calling GetPushMessages endpoint');
        request.send();
    }

    function GetPushMessagesByDevice(optionalparams) {
        if (!optionalparams)optionalparams = {};
        var appKey = Puship.PushipAppId;
        //console.log('Optional params: ' + JSON.stringify(optionalparams));
        var privateInstanceIdentifier = DefaultValue(optionalparams.instanceId, device.uuid);
        var privateLimit = DefaultValue(optionalparams.limit, 20);
        var privateOffset = DefaultValue(optionalparams.offset, 0);
        var pSuccessCallBack = DefaultValue(optionalparams.successCallback, function (pushipresult) {
            //console.log('Internal puship GetPushMessagesByDevice success managed');
        });
        var pFailCallBack = DefaultValue(optionalparams.failCallback, function (pushipresult) {
            //console.log('Internal puship GetPushMessagesByDevice fail managed');
        });
        //console.log('Get Push Messages...');
        var request = new XMLHttpRequest();
        //console.log('AppId:' + appKey);
        var deviceId = appKey.toString() + "_" + privateInstanceIdentifier;
        //console.log('DeviceIdentifier:' + deviceId);
        var getstr = Puship.Domain + "Services/Puship.svc/GetPushMessagesByDevice?DeviceId='" + deviceId + "'&Limit=" + privateLimit + "&Offset=" + privateOffset;
        getstr += "&$format=json";
        //console.log('RequestTo:' + getstr);
        request.open('GET', getstr, true);
        request.onreadystatechange = function () {
            if (request.readyState == 4) {
                //console.log('Processing responce');
                if (request.status == 200 || request.status == 201) {
                    try {
                        pSuccessCallBack(JSON.parse(request.responseText).d);
                    } catch (e) {
                        //console.warn('Error during responce parsing' + this.statusText);
                        pFailCallBack(e);
                    }
                    ;
                } else {
                    //console.warn('Error during push getting' + this.statusText);
                    pFailCallBack(this);
                }
            }
        }
        //console.log('Calling GetPushMessagesByDevice endpoint');
        request.send();
    }

    function RegisterOnPuship(deviceToken, appKey, deviceType, optionalparams) {
        //console.log('Registering on Puship...');
        if (!optionalparams)optionalparams = {};
        //console.log('Optional params: ' + JSON.stringify(optionalparams));
        var privateInstanceIdentifier = DefaultValue(optionalparams.instanceId, device.uuid);
        var pSuccessCallBack = DefaultValue(optionalparams.successCallback, function (pushipresult) {
            //console.log('Internal puship success managed');
        });
        var pFailCallBack = DefaultValue(optionalparams.failCallback, function (pushipresult) {
            //console.log('Internal puship fail managed');
        });
        var request = new XMLHttpRequest();
        //console.log('AppId:' + appKey);
        //console.log('Token:' + deviceToken);
        var deviceId = appKey.toString() + "_" + privateInstanceIdentifier;
        //console.log('DeviceIdentifier:' + deviceId);
        //console.log('DeviceType:' + deviceType);
        var getstr = Puship.Domain + "services/puship.svc/RegisterDevice?AppId='" + appKey + "'&DeviceType=" + deviceType + "&Token='" + deviceToken + "'&DeviceIdentifier='" + deviceId + "'&language='en'";
        getstr += '&$format=json';
        //console.log('RequestTo:' + getstr);
        request.open('GET', getstr, true);
        request.onreadystatechange = function () {
            if (request.readyState == 4) {
                //console.log('Processing responce');
                if (request.status == 200 || request.status == 201) {
                    var code = JSON.parse(request.responseText).d.RegisterDevice;
                    if (code == 200) {
                        //console.log('Registered succesfully');
                        this.DeviceToken = deviceToken;
                        this.DeviceId = deviceId;
                        pSuccessCallBack(this);
                    } else {
                        //console.warn('Error during registration device execution');
                        WriteResponceStatus(code);
                        pFailCallBack(this);
                    }
                } else {
                    //console.warn('Error during registration' + this.statusText);
                    pFailCallBack(this);
                }
            }
        }
        //console.log('Calling RegisterOnPuship endpoint');
        request.send();
    }

    function UnRegister(optionalparams) {
        var cOS = GetCurrentOs();
        if (!optionalparams)optionalparams = {};
        if (cOS == Puship.OS.ANDROID) {
            Puship.GCM.UnRegister(optionalparams.SuccessCallback, optionalparams.FailCallback);
        }
        else if (cOS == Puship.OS.WP) {
        }
        else if (cOS == Puship.OS.IOS) {
            Puship.APNS.UnRegister(optionalparams.SuccessCallback, optionalparams.FailCallback);
        }
        else {
            Puship.BPNS.UnRegister();
            if (optionalparams.SuccessCallback)optionalparams.SuccessCallback();
        }
    }

    var positionAppKey = null;
    var positionOptionalParams = null;

    function RegisterCurrentPosition(optionalparams) {
        positionAppKey = Puship.PushipAppId;
        if (!optionalparams) {
            positionOptionalParams = {};
        }
        else {
            positionOptionalParams = optionalparams;
        }
        if (GetCurrentOs() == Puship.OS.ANDROID) {
            positionOptionalParams.enableHighAccuracy = true;
        }
        navigator.geolocation.getCurrentPosition(currentPositionSuccess, currentPositionError, positionOptionalParams);
    }

    function currentPositionSuccess(position) {
        //console.log('Optional params: ' + JSON.stringify(positionOptionalParams));
        //console.log('Latitude: ' + position.coords.latitude + '\n' + 'Longitude: ' + position.coords.longitude + '\n' + 'Altitude: ' + position.coords.altitude + '\n' + 'Accuracy: ' + position.coords.accuracy + '\n' + 'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '\n' + 'Heading: ' + position.coords.heading + '\n' + 'Speed: ' + position.coords.speed + '\n' + 'Timestamp: ' + position.timestamp + '\n');
        var isodate = new Date(position.timestamp);
        var isodatestring = ISODateString(isodate);
        //console.log("ISO date: " + isodatestring);
        var privateInstanceIdentifier = DefaultValue(positionOptionalParams.instanceId, device.uuid);
        var pSuccessCallBack = DefaultValue(positionOptionalParams.successCallback, function (pushipresult) {
            //console.log('Internal puship RegisterPosition success managed');
        });
        var pFailCallBack = DefaultValue(positionOptionalParams.failCallback, function (pushipresult) {
            //console.log('Internal puship RegisterPosition fail managed');
        });
        //console.log('Registering Position...');
        var request = new XMLHttpRequest();
        //console.log('AppId:' + positionAppKey);
        var deviceId = positionAppKey.toString() + "_" + privateInstanceIdentifier;
        //console.log('DeviceIdentifier:' + deviceId);
        var getstr = Puship.Domain + "services/puship.svc/RegisterPosition?AppId='" + positionAppKey + "'&DeviceIdentifier='" + deviceId
            + "'&Latitude=" + position.coords.latitude
            + "&Longitude=" + position.coords.longitude
            + "&Accuracy=" + position.coords.accuracy
            + "&TimeStamp=datetime'" + isodatestring + "'";
        if (position.coords.speed)getstr += "&Speed=" + position.coords.speed;
        if (position.coords.heading)getstr += "&Heading=" + position.coords.heading;
        if (position.coords.altitude)getstr += "&Altitude=" + position.coords.altitude;
        if (position.coords.altitudeAccuracy)getstr += "&AltitudeAccuracy=" + position.coords.altitudeAccuracy;
        getstr += '&$format=json';
        //console.log('RequestTo:' + getstr);
        request.open('GET', getstr, true);
        request.onreadystatechange = function () {
            if (request.readyState == 4) {
                //console.log('Processing responce');
                if (request.status == 200 || request.status == 201) {
                    try {
                        var code = JSON.parse(request.responseText).d.RegisterPosition;
                        if (code == 200) {
                            //console.log('Position Registered succesfully');
                            pSuccessCallBack(this);
                        } else {
                            //console.warn('Error during registration position execution');
                            WriteResponceStatus(code);
                            pFailCallBack(this);
                        }
                    } catch (e) {
                        //console.warn('Error during responce parsing' + this.statusText);
                        pFailCallBack(e);
                    }
                    ;
                } else {
                    //console.warn('Error during call to registration position' + this.statusText);
                    pFailCallBack(this);
                }
            }
        }
        //console.log('Calling RegisterPosition endpoint');
        request.send();
    }

    function currentPositionError(error) {
        var pFailCallBack = DefaultValue(positionOptionalParams.failCallback, function (pushipresult) {
            //console.log('Internal puship RegisterPosition fail managed');
        });
        //console.warn('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
        pFailCallBack(error);
    }

    function GetCurrentOs() {
        if (privateCurrentPlatform == null) {
            var cPlatform = device.platform;
            //console.log("returned value as: " + cPlatform);
            if (cPlatform.indexOf("Android") >= 0) {
                privateCurrentPlatform = Puship.OS.ANDROID;
            }
            else if (cPlatform.indexOf("Win") >= 0) {
                privateCurrentPlatform = Puship.OS.WP;
            }
            else if (cPlatform.indexOf("iPhone") >= 0 || cPlatform.indexOf("iPad") >= 0 || cPlatform.indexOf("iOS") >= 0) {
                privateCurrentPlatform = Puship.OS.IOS;
            }
            else {
                privateCurrentPlatform = Puship.OS.BLACKBERRY;
            }
        }
        return privateCurrentPlatform;
    }

    function Clean() {
        var cOS = GetCurrentOs();
        if (cOS == Puship.OS.ANDROID) {
        }
        else if (cOS == Puship.OS.WP) {
        }
        else if (cOS == Puship.OS.IOS) {
            Puship.APNS.setApplicationIconBadgeNumber(0);
        }
        else {
        }
    }

    function ISODateString(d) {
        return d.getUTCFullYear() + '-'
            + pad(d.getUTCMonth() + 1) + '-'
            + pad(d.getUTCDate()) + 'T'
            + pad(d.getUTCHours()) + ':'
            + pad(d.getUTCMinutes()) + ':'
            + pad(d.getUTCSeconds()) + 'Z';
    }

    function pad(n) {
        return n < 10 ? '0' + n : n;
    }

    return{OnPushReceived: OnPushReceived, NotifyPush: NotifyPush, RegisterOnPuship: RegisterOnPuship, AddTagFilter: AddTagFilter, RemoveTagFilter: RemoveTagFilter, CleanTagFilter: CleanTagFilter, GetTagFilters: GetTagFilters, GetPushMessages: GetPushMessages, GetPushMessagesByDevice: GetPushMessagesByDevice, GetCurrentOs: GetCurrentOs, Clean: Clean, UnRegister: UnRegister, RegisterCurrentPosition: RegisterCurrentPosition, GetAppId: GetAppId, DefaultValue: DefaultValue};
}();
window.onbeforeunload = function (e) {
    //console.log('Unloading...');
    if (Puship.gcmregid.length > 0) {
        //console.log('Local unregistering app...');
        if (window.plugins && window.plugins.GCM) {
            //console.log('Try unregisterding GCM...');
            Puship.GCM.UnRegister(function () {
                //console.log("unregistered done");
            }, function () {
                //console.log("unregisteder error");
            });
            //console.log('Try unregisterding GCM... Called');
        }
    }
};
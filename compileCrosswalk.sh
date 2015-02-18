#!/bin/bash
set -e
cordovaVersion="3.6.3-0.2.13"
phongapVersion="3.6.3-0.22.7"
antProperties="ant.properties"

[ $(cordova --version) == ${cordovaVersion} ]
[ $(phonegap --version) == ${phongapVersion} ]

[ ! -z ${ANDROID_HOME} ]
[ ! -z ${JAVA_HOME} ]
[ ! -z ${CROSSWALK_HOME} ]

cd build/phonegap-tmp
cordova platform rm android
cordova platform add android

cd platforms/android/
sed -i '/<\/application>/a <uses-permission android:name="android.permission.ACCESS_WIFI_STATE" \/><uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" \/>' AndroidManifest.xml
cp ${CROSSWALK_HOME}/VERSION .

cd CordovaLib/
rm -rf *
cp -a ${CROSSWALK_HOME}/framework/* .
android update project --subprojects --path . --target "android-19"
ant debug

cd ../../../

if [ -e ${antProperties} ]; then
    cp -v ${antProperties} ./platforms/android/
fi

cordova build android --release



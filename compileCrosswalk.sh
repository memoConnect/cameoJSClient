#!/bin/bash
cordovaVersion="3.6.3-0.2.13"
phongapVersion="3.6.3-0.22.7"
antProperties="ant.properties"

if [ $(cordova --version) != ${cordovaVersion} ]; then
    echo "Invalid cordova version. Required: ${cordovaVersion}"
    exit 1
fi
if [ $(phonegap --version) != ${phongapVersion} ] ; then
    echo "Invalid phonegap version. Required: ${phongapVersion}"
    exit 1
fi
if [ -z ${ANDROID_HOME} ]; then
    echo "ANDROID_HOME is not set"
    exit 1
fi
if [ -z ${JAVA_HOME} ]; then
    echo "JAVA_HOME is not set"
    exit 1
fi
if [ -z ${CROSSWALK_HOME} ]; then
    echo "CROSSWALK_HOME is not set"
    exit 1
fi

set -e

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



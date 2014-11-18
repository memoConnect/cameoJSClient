#!/bin/bash
set -e

cd build/phonegap-tmp
cordova platform rm android
cordova platform add android

cd platforms/android/
sed -i '/<\/application>/a <uses-permission android:name="android.permission.ACCESS_WIFI_STATE" \/>' AndroidManifest.xml
cp /opt/crosswalk-cordova-8.37.189.12-arm/VERSION .

cd CordovaLib/
rm -rf *
cp -a /opt/crosswalk-cordova-8.37.189.12-arm/framework/* .
android update project --subprojects --path . --target "android-19"
ant debug

cd ../../../
cordova build android



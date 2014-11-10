#!/bin/bash

cp /opt/crosswalk-cordova-8.37.189.12-arm/VERSION build/phonegap-tmp/platforms/android/
rm -rf build/phonegap-tmp/platforms/android/CordovaLib/*
cp -ar /opt/crosswalk-cordova-8.37.189.12-arm/framework/* build/phonegap-tmp/platforms/android/CordovaLib/


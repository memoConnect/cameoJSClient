#!/bin/bash
./setup.sh

echo -e "\e[33m[cameo - add device to adb]\033[0m"

adb connect 192.168.178.46:5555
adb devices

echo -e "\e[33m[cameo - create phonegap]\033[0m"
./node_modules/grunt-cli/bin/grunt phonegap

cd phonegap-build
phonegap run android
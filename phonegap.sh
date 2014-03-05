#!/bin/bash
./setup.sh 

if [ ! -z "$1" ]; then
	echo -e "\e[33m[cameo - connecting to adb device at $1:5555]\033[0m"
	adb connect $1:5555
fi

device=$(adb devices | head -2 | tail -1)

if [ -z "$device" ]; then
	echo -e "\e[33m[cameo - No device found]\033[0m"
	exit 1
else
	echo -e "\e[33m[cameo - Deploying to device: $device]\033[0m"
fi

echo -e "\e[33m[cameo - create phonegap]\033[0m"
./node_modules/grunt-cli/bin/grunt phonegap

cd phonegap-build
phonegap run android

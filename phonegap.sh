#!/bin/bash
./setup.sh

if [ ! -z "$1" ]; then
	echo -e "\e[33m[ CameoClient - connecting to adb device at $1:5555 ]\033[0m"
	adb connect $1:5555
fi

device=$(adb devices | head -2 | tail -1)

if [ -z "$device" ]; then
	echo -e "\e[33m[ CameoClient - no device found ]\033[0m"
	exit 1
else
	echo -e "\e[33m[ CameoClient - deploying after build to device: $device]\033[0m"
fi

echo -e "\e[33m[cameo - build phonegap]\033[0m"
# do grunt task to make some magic
./node_modules/grunt-cli/bin/grunt phonegap-local

echo -e "\e[33m[ CameoClient - compile phonegap and install on: $device ]\033[0m"
# change to buildet dir and compile .apk
./node_modules/grunt-cli/bin/grunt phonegap:run
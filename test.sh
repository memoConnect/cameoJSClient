#!/bin/bash

testScreenshotBase="/opt/screenshots"

case "$1" in
   "stage")
        target=--target="stage"
        testScreenshotPath="${testScreenshotBase}/stage"
      ;;
   "dev")
        target=--target="dev"
        testScreenshotPath="${testScreenshotBase}/dev"
      ;;
   "test")
        target=--target="test"
        testScreenshotPath="${testScreenshotBase}/test"
      ;;
   "prod")
        target=--target="prod"
        testScreenshotPath="${testScreenshotBase}/prod"
      ;;
esac

if [ ! -z $2 ]; then
    wwwUrlArg=--wwwUrl=${2}
    echo -e "\e[33m[ CameoClientTest - setting WWW Url to ${wwwUrlArg} ]\033[0m"
fi

if [ ! -z $3 ]; then
    apiUrlArg=--apiUrl=${3}
    echo -e "\e[33m[ CameoClientTest - setting API Url to ${apiUrlArg} ]\033[0m"
fi

./setup.sh

if [ ! -z "$4" ]; then
    echo -e "\e[33m[ CameoClientTest running e2e specs: $4 ]\033[0m"
    ./node_modules/grunt-cli/bin/grunt tests-e2e:all  ${target} ${wwwUrlArg} ${apiUrlArg} --specs=${4} --disableUglify=true --testScreenshotPath="${testScreenshotBase}/custom"
else
    echo -e "\e[33m[ CameoClientTest - running all unit and e2e tests ]\033[0m"
    ./node_modules/grunt-cli/bin/grunt tests-unit ${target} ${wwwUrlArg} ${apiUrlArg}
    [ $? -eq 0 ] || exit $?; # exit for none-zero return code
    ./node_modules/grunt-cli/bin/grunt tests-e2e  ${target} ${wwwUrlArg} ${apiUrlArg} --testScreenshotPath=${testScreenshotPath}
fi
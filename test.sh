#!/bin/bash

case "$1" in
   "stage")
        target=--target="stage"
      ;;
   "dev")
        target=--target="dev"
      ;;
   "test")
        target=--target="test"
      ;;
   "prod")
        target=--target="prod"
      ;;
esac

if [ ! -z $2 ]; then
    wwwUrlArg=--wwwUrl=${2}
    echo -e "\e[33m[ CameoClient - setting WWW Url to ${wwwUrlArg} ]\033[0m"
fi

if [ ! -z $3 ]; then
    apiUrlArg=--apiUrl=${3}
    echo -e "\e[33m[ CameoClient - setting API Url to ${apiUrlArg} ]\033[0m"
fi

./setup.sh

echo -e "\e[33m[ CameoClient - running unit/e2e tests ]\033[0m"
#./node_modules/grunt-cli/bin/grunt tests-unit ${target} ${wwwUrlArg} ${apiUrlArg}
./node_modules/grunt-cli/bin/grunt tests-e2e  ${target} ${wwwUrlArg} ${apiUrlArg}


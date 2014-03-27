#!/bin/bash
case "$1" in
   "prod")
        target="prod"
      ;;
   "stage")
        target="stage"
      ;;
   "dev")
        target="dev"
      ;;
   "test")
        target="test"
      ;;
   *)
      echo -e "\e[33m[cameo - Invalid mode: ${mode}]\033[0m"
      exit 1
      ;;
esac

if [ ! -z $2 ]; then
    apiUrlArg=--apiUrl=\"${2}\"
fi
echo -e "\e[33m[ CameoClient - setting API Url to ${apiUrlArg} ]\033[0m"


./setup.sh

echo -e "\e[33m[ CameoClient - starting deploy ]\033[0m"

./node_modules/grunt-cli/bin/grunt deploy --target=${target} ${apiUrlArg}
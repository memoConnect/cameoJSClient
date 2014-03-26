#!/bin/bash
case "$1" in
   "prod")
        gruntTask="prod-deploy"
      ;;
   "stage")
        gruntTask="stage-deploy"
      ;;
   "dev")
        gruntTask="dev-deploy"
      ;;
   *)
      echo -e "\e[33m[cameo - Invalid mode: ${mode}]\033[0m"
      exit 1
      ;;
esac

./setup.sh

echo -e "\e[33m[cameo - dev-deploy]\033[0m"

./node_modules/grunt-cli/bin/grunt ${gruntTask}
./node_modules/grunt-cli/bin/grunt clear-dist
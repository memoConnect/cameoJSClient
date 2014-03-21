#!/bin/bash
./setup.sh

echo -e "\e[33m[cameo - dev-deploy]\033[0m"
./node_modules/grunt-cli/bin/grunt dev-deploy
./node_modules/grunt-cli/bin/grunt cockpit-deploy
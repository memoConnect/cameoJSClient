#!/bin/bash
./setup.sh

echo -e "\e[33m[cameo - starting tests headless]\033[0m"
./node_modules/grunt-cli/bin/grunt karma:jenkins

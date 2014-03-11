#!/bin/bash
./setup.sh

echo -e "\e[33m[cameo - unit tests]\033[0m"
./node_modules/grunt-cli/bin/grunt karma:jenkins

echo -e "\e[33m[cameo - e2e tests]\033[0m"
./node_modules/grunt-cli/bin/grunt teste2e

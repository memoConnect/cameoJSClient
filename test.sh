#!/bin/bash
./setup.sh

echo -e "\e[33m[ CameoClient - running unit/e2e tests ]\033[0m"
./node_modules/grunt-cli/bin/grunt tests-all

#!/bin/bash
echo -e "\e[33m[cameo - setup javascript environment]\033[0m"

npm install
./node_modules/protractor/bin/webdriver-manager update --standalone

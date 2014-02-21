#!/bin/bash
echo "setup JavaScript enviroment"

npm install
./node_modules/protractor/bin/webdriver-manager update --standalone

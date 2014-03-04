#!/bin/bash
echo "setup JavaScript enviroment"

rm -r node_modules

npm install
./node_modules/protractor/bin/webdriver-manager update --standalone

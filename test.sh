#!/bin/bash
echo "starting tests headless"
npm install
./node_modules/grunt-cli/bin/grunt karma:jenkins

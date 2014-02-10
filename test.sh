#!/bin/bash
echo "starting tests headless"
npm install
./node_modules/karma/bin/karma start config/karma-headless.conf.js

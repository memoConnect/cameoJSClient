#!/bin/bash
echo "starting tests headless"
npm install
./node_modules/karma/bin/karma start config/karma.unit.requirejs.conf.js

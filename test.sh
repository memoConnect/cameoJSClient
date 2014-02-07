#!/bin/bash
echo "starting tests headless"
npm install
karma start config/karma-headless.conf.js

#!/bin/bash
./setup.sh

echo "starting tests headless"
./node_modules/grunt-cli/bin/grunt karma:jenkins

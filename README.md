cameoJSClient
==================

cameo Web / MobileWeb / Hybrid client


Set your own local environment (exp.: for own local mongoDB)
--------
#### app/base/env.js
    'use strict';
    var env = {
        restApi: 'http://localhost:9000/api/v1'
    }


Grunt Task (before single run do '$ npm install')
--------
#### run only all unit tests
    $ grunt tests-unit

#### run only all e2e tests
    $ grunt tests-e2e

#### deploy the app to one android device with phonegap-adapter.js
    $ grunt phonegap
    $ grunt phonegap:run

#### zip the /app, send to build.phonegap.com and get all app files (.apk, .ipa & .xpa)
    $ grunt phonegap-bs

#### deploy /app without phonegap-adapter
    $ grunt www
    $ grunt dev-deploy // copy /app to /dist/app and minify all *.js

#### start a watcher for .less to .css files
    $ grunt watcher


Shell Scripts
--------
#### setup.sh
    $ npm prune // clear all unused modules
    $ npm install // install/update all modules in package.json

#### test.sh
    calling setup.sh
    ----
    $ grunt tests-unit
    $ grunt tests-e2e

#### phonegap.sh
    calling setup.sh
    ----
    $ adb connect 127.0.0.1:5555 // connect wlan adb device
    $ adb devices // checking if one devices is connected
    ----
    $ grunt phonegap
    $ grunt phonegap:run

#### compile.sh
    calling compile.sh
    ----
    $ grunt dev-deploy
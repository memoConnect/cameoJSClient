cameoJSClient
==================

cameo Web / MobileWeb / Hybrid client


Set your own local environment (exp.: for own local mongoDB)
--------


Grunt Task (before single run do '$ npm install')
--------
### create css files initially, or just use watcher task that includes initial css creation
    $ grunt concat:less less

#### run only all unit tests
    $ grunt tests-unit

#### run only all e2e tests
    $ grunt tests-e2e

#### deploy the app to one android device with phonegap-adapter.js
    $ grunt phonegap phonegap:run

#### zip the /app, send to build.phonegap.com and get all app files (.apk, .ipa & .xpa), you need your own Phonegap Build credentials
    $ grunt phonegap-bs

#### deploy /app without phonegap-adapter (copy /app to /dist/app and minify all *.js)
    $ grunt www dev-deploy

#### start a watcher to compile .less to .css files continous
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
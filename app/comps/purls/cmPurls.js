define([
    'app',
    'cmApi',
    'util',
    'cmLogger'
], function (app) {
    'use strict';

//    var cmContacts = angular.module('cmContacts',['cmApi','cmLogger','Util']);

    app.register.service('cmPurls',[
        'cmApi',
        'cmLogger',
        'Util',
        function(cmApi, cmLogger, Util){
            return {
            }
        }]);

    return app;
});
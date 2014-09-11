'use strict';

//https://github.com/apache/cordova-plugin-network-information/blob/cd67d7a30f51efe7b2e3adb098ae65409d292d21/doc/index.md

angular.module('cmPhonegap').service('cmLocalContacts', [
    'cmPhonegap', 'cmUtil', 'cmLogger',
    function (cmPhonegap, cmUtil, cmLogger) {
        var self = {
            state: '',
            plugin: null,

            init: function(){

                if(!('contacts' in navigator)) {
                    //cmLogger.info('CONTACTS PLUGIN IS MISSING');
                    return false;
                }

                cmPhonegap.isReady(function(){
                    self.plugin = navigator.contacts;
                });
            },

            loadContacts: function(){
                var options = new ContactFindOptions();
                // search string
                options.filter = "";
                options.multiple = true;
                // looks specific type
                var filter = ['name', 'displayName', 'phoneNumbers', 'emails'];

                console.log('start of reading contacts---------------');
                // find contacts
                this.plugin.find(filter,
                    function (contacts) {
                        console.log('contacts success ' + contacts.length)

                        for (var i = 0; i < contacts.length; i++) {
                            var clearContact = contacts[i];

                            console.log(prettify(clearContact));
                        }

                        console.log('end of reading contacts---------------');
                    }, function onError(contactError) {
                        console.log(contactError)
                    }, options
                );
            }
        };

        return self;
    }
]);
'use strict';

// https://github.com/wildabeast/cordova-plugin-contacts/blob/b8f6ce5bd04298f7fd4cba7c136389cf66eddc6b/doc/index.md

/*  android & ios contact json
 {
    displayName: "GiverName FamilyName"
    name: {
        familyName: "FamilyName"
        formatted: "GiverName FamilyName"
        givenName: "GiverName"
        middleName: "MiddleName"
    }
    phoneNumbers: Array[
     {
        id: "1234"
        pref: false
        type: "mobile" // mobile | work | fax
        value: "+49 123 4567890"
     }
     length: 1
    ]
    emails: Array[
     {
         id: "1246"
         pref: false
         type: "work" // other
         value: "some.coworker@cameo.io"
     }
     length: 1
    ]
 }
 */

angular.module('cmPhonegap').service('cmLocalContacts', [
    'cmPhonegap', 'cmUtil', 'cmLogger',
    '$q', '$navigator', '$phonegapCameoConfig',
    function (cmPhonegap, cmUtil, cmLogger,
              $q, $navigator, $phonegapCameoConfig) {

        var self = {
            plugin: null,

            init: function () {
                if(typeof $phonegapCameoConfig == 'undefined') {
                    return false;
                }

                cmPhonegap.isReady(function(){
                    if(!('contacts' in $navigator)) {
                        //cmLogger.info('CONTACTS PLUGIN IS MISSING');
                        return false;
                    }
                    console.log('localContacts ready',$navigator.contacts)
                    self.plugin = $navigator.contacts;
                });

                return true;
            },

            canRead: function () {
                return this.plugin != null;
            },

            selectOne: function() {
                var loaded = $q.defer();

                if(this.canRead()){
                    this.plugin.pickContact(
                        function (contact) {
                            loaded.resolve(contact);
                        },
                        function onError(contactError) {
                            loaded.reject(contactError);
                        }
                    );
                }

                return loaded.promise;
            }
        };

        self.init();

        return self;
    }
]);
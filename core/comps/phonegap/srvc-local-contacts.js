'use strict';

// https://github.com/wildabeast/cordova-plugin-contacts/blob/b8f6ce5bd04298f7fd4cba7c136389cf66eddc6b/doc/index.md

/*  android & ios contact json
 {
    displayName: "GiverName FamilyName",
    name: {
        familyName: "FamilyName",
        formatted: "GiverName FamilyName",
        givenName: "GiverName",
        middleName: "MiddleName",
    },
    phoneNumbers: [
     {
        id: "1234",
        pref: false,
        type: "mobile", // mobile | work | fax
        value: "+49 123 4567890",
     }
    ],
    emails: [
     {
         id: "1246",
         pref: false,
         type: "work", // other
         value: "some.coworker@cameo.io",
     }
    ]
 }
 */

angular.module('cmPhonegap').service('cmLocalContacts', [
    'cmPhonegap', 'cmUtil', 'cmLogger', 'cmDevice',
    '$q', '$navigator',
    function (cmPhonegap, cmUtil, cmLogger, cmDevice,
              $q, $navigator) {

        var self = {
            plugin: null,

            init: function () {
                cmPhonegap.isReady('cmLocalContacts',function(){
                    if(!('contacts' in $navigator)) {
                        //cmLogger.info('CONTACTS PLUGIN IS MISSING');
                        return false;
                    }
                    self.plugin = $navigator.contacts;
                });
            },

            canRead: function() {
                if(cmDevice.emulateDevice)
                    cmLogger.warn('cmPhonegap.cmLocalContacts.debug == true!!!');
                return cmDevice.emulateDevice || !cmDevice.emulateDevice && this.plugin != null;
            },

            selectOne: function() {
                var loaded = $q.defer();

                if(cmDevice.emulateDevice){
                    loaded.resolve({
                        displayName: "GiverName FamilyName",
                        name: {
                            familyName: "FamilyName",
                            formatted: "GiverName FamilyName",
                            givenName: "GiverName",
                            middleName: "MiddleName"
                        },
                        phoneNumbers: [
                            {
                                id: "1234",
                                pref: false,
                                type: "mobile", // mobile | work | fax
                                value: "+49 123 4567890"
                            },
                            {
                                id: "2343",
                                pref: false,
                                type: "work", // mobile | work | fax
                                value: "+49 123 "
                            },
                            {
                                id: "2343",
                                pref: false,
                                type: "work", // mobile | work | fax
                                value: "+49523123123 "
                            },
                            {
                                id: "2343",
                                pref: false,
                                type: "work", // mobile | work | fax
                                value: "+49 (30) 23434234"
                            }
                        ],
                        emails: [
                            {
                                id: "1246",
                                pref: false,
                                type: "work", // other
                                value: "some.coworker@cameo.io"
                            },
                            {
                                id: "3534",
                                pref: false,
                                type: "other", // other
                                value: "other.coworker@cameo.io"
                            }
                        ]
                    });// return mock use above
                    return loaded.promise;
                }

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
'use strict';

// https://github.com/wildabeast/cordova-plugin-contacts/blob/b8f6ce5bd04298f7fd4cba7c136389cf66eddc6b/doc/index.md

/*  android & ios contact json
 {
    addresses: Array[
      {
        country: "Germany"
        formatted: "Street 123↵12345 City"
        id: "811"
        locality: "City"
        postalCode: "12345"
        pref: false
        streetAddress: "Street 123"
        type: "home"
      }
    ]
    birthday: null
    categories: null
    displayName: "GiverName FamilyName"
    emails: Array[
     {
         id: "1246"
         pref: false
         type: "work" // other
         value: "some.coworker@cameo.io"
     }
     length: 1
    ]
    id: "225"
    ims: null
    name: {
        familyName: "FamilyName"
        formatted: "GiverName FamilyName"
        givenName: "GiverName"
        middleName: "MiddleName"
    }
    nickname: null
    note: ""
    organizations: Array[
     {
        id: "1245"
        name: "cameoNet"
        pref: false
        type: "custom"
     }
     length: 1
    ]
    phoneNumbers: Array[
     {
        id: "1234"
        pref: false
        type: "mobile" // mobile | work | fax
        value: "+49 123 4567890"
     }
     length: 1
    ]
    photos: Array[
     {
        id: "1236"
        pref: false
        type: "url"
        value: "content://com.android.contacts/contacts/225/photo"
     }
     length: 1
    ]
    rawId: "225"
    urls: null
 }
 */

angular.module('cmPhonegap').service('cmLocalContacts', [
    'cmPhonegap', 'cmUtil', 'cmLogger',
    '$q',
    function (cmPhonegap, cmUtil, cmLogger, $q) {

        var self = {
            state: '',
            plugin: null,

            init: function () {
                if (!('contacts' in navigator)) {
                    //cmLogger.info('CONTACTS PLUGIN IS MISSING');
                    return false;
                }

                cmPhonegap.isReady(function () {
                    self.plugin = navigator.contacts;
                });
            },

            canRead: function () {
                return false //self.plugin != null;
            },

            // TODO: pick error app crashed
            //E/AndroidRuntime(15951):        at org.apache.cordova.CordovaActivity.onActivityResult(CordovaActivity.java:897)
            // https://code.cs.nott.ac.uk/p/gp13-ajp/source/tree/83/code/gh-app/platforms/android/CordovaLib/src/org/apache/cordova/CordovaActivity.java

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
            },

            loadAll: function (stringFilter) {
                var loaded = $q.defer();

                if(this.canRead()) {
                    var options = new ContactFindOptions();
                    // search string
                    options.filter = stringFilter ? stringFilter : '';
                    options.multiple = true;
                    // looks specific type
                    var filter = ['name', 'displayName', 'phoneNumbers', 'emails'];
                    // find contacts
                    this.plugin
                        .find(
                        function (contacts) {
                            loaded.resolve(contacts);
                        },
                        function onError(contactError) {
                            loaded.reject(contactError);
                        },
                        filter,
                        options
                    );
                }

                return loaded.promise;
            }
        };

        self.init();

        return self;
    }
]);
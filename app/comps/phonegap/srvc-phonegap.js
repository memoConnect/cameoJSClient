'use strict';

angular.module('cmPhonegap').service('cmPhonegap', [
    '$q',
    function ($q) {

        var isReady = $q.defer();

        var self = {
            isReady: function(callback){
                // if config doesn't get device ready watch again
                if(!phonegap_cameo_config.deviceReady){
                    document.addEventListener('deviceready', function () {
                        phonegap_cameo_config.deviceReady = true;
                        isReady.resolve();
                    });

                    isReady.promise.then(function(){
                        callback();
                    });
                // nothing to wait phonegap is ready
                } else {
                    callback();
                }
            },
            closeApp: function(){
                return false;

                document.addEventListener('backbutton', function(e) {
                    navigator.app.exitApp();
                });
            },
            loadContacts: function(){
                return false;

                var options = new ContactFindOptions();
                // search string
                options.filter = "";
                options.multiple = true;
                // looks specific type
                var filter = ['name', 'displayName', 'phoneNumbers', 'emails'];

                console.log('start of reading contacts---------------');
                // find contacts
                navigator.contacts.find(filter,
                    function (contacts) {
                        console.log('contacts success ' + contacts.length)
                        document.getElementById('contactsNumber').innerHTML = 'contacts success ' + contacts.length;
                        for (var i = 0; i < contacts.length; i++) {
                            var clearContact = contacts[i];

//                    for(var data in clearContact){
//                        if(data == null)
//                            delete clearContact[data];
//                    }

                            console.log(prettify(clearContact));
                        }
                        console.log('end of reading contacts---------------');
                    }, function onError(contactError) {
                        alert('onError!');
                    }, options
                );
            }
        };

        // on home close app
        self.closeApp();

        return self;
    }]
);
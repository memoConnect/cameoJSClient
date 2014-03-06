// Wait for device API libraries to load
document.addEventListener("deviceready", onDeviceReady, false);

// device APIs are available
function onDeviceReady() {
    var options = new ContactFindOptions();
    options.filter="";        // empty search string returns all contacts
    options.multiple=true;    // return multiple results
    filter = ["displayName"];

    // find contacts
    navigator.contacts.find(filter, onSuccess, onError, options);
}

// onSuccess: Get a snapshot of the current contacts
function onSuccess(contacts) {
    for (var i = 0; i < contacts.length; i++) {
        console.log("Display Name = " + contacts[i].displayName);
    }
}

// onError: Failed to get the contacts
function onError(contactError) {
    alert('onError!');
}
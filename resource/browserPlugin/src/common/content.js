var browserName = kango.browser.getName();

function callApp(json,eventName){
    var event = new CustomEvent(eventName, {'detail':json||{}});
    window.dispatchEvent(event);
}

kango.console.log('plugin cameoNet content '+browserName)

callApp({},'cmBrowser:isAvailable');

// app check if browser plugin is available
window.addEventListener('cmBrowser:checkAvailability', function(){
    callApp({},'cmBrowser:isAvailable');
});

// set
window.addEventListener('cmBrowser:setItem', function(event){
    var params = event.detail;
    kango.storage.setItem(params.key,params.value);
    callApp({},'cmBrowser:setItemDone');
});

// get
window.addEventListener('cmBrowser:getItem', function(event){
    var params = event.detail,
        returnObj = {
            value: kango.storage.getItem(params.key)
        };
    callApp(returnObj,'cmBrowser:setGetDone');
});

// remove
window.addEventListener('cmBrowser:removeItem', function(event){
    var params = event.detail;
    kango.storage.removeItem(params.key);
    callApp({},'cmBrowser:removeItemDone');
});

// get all
window.addEventListener('cmBrowser:getAllKeys', function(){
    var returnObj = {
        keys: kango.storage.getKeys()
    };
    callApp(returnObj,'cmBrowser:getAllKeysDone');
});

// clear storage
window.addEventListener('cmBrowser:clear', function(){
    kango.storage.clear();
    callApp({},'cmBrowser:clearDone');
});
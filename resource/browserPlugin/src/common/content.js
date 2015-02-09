var browserName = kango.browser.getName();

function callApp(json,eventName){
	var event = new CustomEvent(eventName || 'cmBrowser:toApp', {'detail':json||{}});
	window.dispatchEvent(event);
}

kango.console.log('plugin cameoNet content '+browserName)

// app check if browser plugin is available
window.addEventListener('cmBrowser:checkAvailability', function(){
	callApp({},'cmBrowser:isAvailable');
});

window.addEventListener('cmBrowser:setItem', function(event){
	var params = event.detail;
	kango.storage.setItem(params.key,params.value);
	callApp({},'cmBrowser:setItemDone');
});

window.addEventListener('cmBrowser:getItem', function(event){
	var params = event.detail,
		returnObj = {
			value: kango.storage.getItem(params.key)
		};
	callApp(returnObj,'cmBrowser:setGetDone');
});

window.addEventListener('cmBrowser:removeItem', function(event){
	var params = event.detail;
	kango.storage.removeItem(params.key);
	callApp({},'cmBrowser:removeItemDone');
});

window.addEventListener('cmBrowser:getAllKeys', function(event){
	var returnObj = {
			keys: kango.storage.getKeys()
		};
	callApp(returnObj,'cmBrowser:getAllKeysDone');
});

window.addEventListener('cmBrowser:clear', function(event){
	keys: kango.storage.clear();
	callApp({},'cmBrowser:clearDone');
});
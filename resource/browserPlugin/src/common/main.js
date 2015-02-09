function cameoPlugin() {
    var self = this;
	
	// TODO: catch events from app for friendrequests and new messages
	//kango.ui.browserButton.setBadgeValue(2);
	
    kango.ui.browserButton.addEventListener(kango.ui.browserButton.event.COMMAND, function() {
        self.onBrowserButtonClick();
    });
}

cameoPlugin.prototype = {
    onBrowserButtonClick: function() {
		// TODO: open cameotab
        //kango.browser.tabs.create({url: 'http://kangoextensions.com/'});
		kango.ui.optionsPage.open();
    }
};

var extension = new cameoPlugin();
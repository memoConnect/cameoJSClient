// Load native UI library
var gui = require('nw.gui');

// Create an empty menu
var menu = new gui.Menu();

// Add some items with label
menu.append(new gui.MenuItem({ label: 'Item A' }));
menu.append(new gui.MenuItem({ label: 'Item B' }));
menu.append(new gui.MenuItem({ type: 'separator' }));
menu.append(new gui.MenuItem({ label: 'Item C' }));

// Get the current window
var win = gui.Window.get();

// Create a menubar for window menu
var menubar = new gui.Menu({ type: 'menubar' });

// Create a menuitem
var sub1 = new gui.Menu();

sub1.append(new gui.MenuItem({
    label: 'Test1',
    click: function() {
        var element = document.createElement('div');
        element.appendChild(document.createTextNode('Test 1'));
        document.body.appendChild(element);
    }
}));

// You can have submenu!
menubar.append(new gui.MenuItem({ label: 'Sub1', submenu: sub1}));

//assign the menubar to window menu
win.menu = menubar;

// add a click event to an existing menuItem
menu.items[0].click = function() {
    alert("CLICK");
};
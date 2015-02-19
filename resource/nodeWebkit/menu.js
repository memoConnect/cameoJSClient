// Load native UI library
var gui = require('nw.gui');

// Create an empty menu
var menu = new gui.Menu();

// Get the current window
var win = gui.Window.get();

// Create a menubar for window menu
var menubar = new gui.Menu({ type: 'menubar' });
var nativeMenuBar = new gui.Menu({ type: "menubar" });

// Create a menuitem
var subCameoNet = new gui.Menu();

subCameoNet.append(new gui.MenuItem({
    label: 'Über',
    click: function() {
        //var element = document.createElement('div');
        //element.appendChild(document.createTextNode('Test 1'));
        //document.body.appendChild(element);

    }
}));

subCameoNet.append(new gui.MenuItem({
    label: 'Quit',
    click: function() {
        win.close();

    }
}));


// You can have submenu!
menubar.append(new gui.MenuItem({ label: 'cameoNet', submenu: subCameoNet}));

// Create a menuitem
var subEdit = new gui.Menu();

subEdit.append(new gui.MenuItem({
    label: 'Copy',
    click: function() {
        document.execCommand("copy");

    }
}));

subEdit.append(new gui.MenuItem({
    label: 'Cut',
    click: function() {
        document.execCommand("cut");

    }
}));

subEdit.append(new gui.MenuItem({
    label: 'Paste',
    click: function() {
        document.execCommand("paste");
    }
}));

// You can have submenu!
menubar.append(new gui.MenuItem({ label: 'Edit', submenu: subEdit}));

// Create a menuitem
var subWindow = new gui.Menu();

subWindow.append(new gui.MenuItem({
    label: 'Minimize',
    click: function() {
        //var element = document.createElement('div');
        //element.appendChild(document.createTextNode('Test 1'));
        //document.body.appendChild(element);

    }
}));

subWindow.append(new gui.MenuItem({
    label: 'Zoom',
    click: function() {
        //var element = document.createElement('div');
        //element.appendChild(document.createTextNode('Test 1'));
        //document.body.appendChild(element);

    }
}));

// Create a menuitem
var subHelp = new gui.Menu();

subHelp.append(new gui.MenuItem({
    label: 'Quick Start',
    click: function() {
        //var element = document.createElement('div');
        //element.appendChild(document.createTextNode('Test 1'));
        //document.body.appendChild(element);

    }
}));

subHelp.append(new gui.MenuItem({
    label: 'cameoNet Support',
    click: function() {
        //var element = document.createElement('div');
        //element.appendChild(document.createTextNode('Test 1'));
        //document.body.appendChild(element);

    }
}));

// You can have submenu!
menubar.append(new gui.MenuItem({ label: 'Hilfe', submenu: subHelp}));

//assign the menubar to window menu
try {
    nativeMenuBar.createMacBuiltin("My App");
    win.menu = nativeMenuBar;
} catch (ex) {
    win.menu = menubar;
}

//win.menu = menubar;

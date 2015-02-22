var nodeWebkitCameoConfig = {
    isNodeWebkit: '<%= isNodeWebkit %>',
    '@menu-example': 'https://gentlenode.com/journal/node-webkit-1-complete-cheatsheet/26',
    rootMenu: {
        items: [
            {
                type: 'normal',
                langKey: 'NODEWEBKIT.MENU.LABEL.CAMEONET',
                icon: '',
                items: [
                    {
                        type: 'normal',
                        langKey: 'NODEWEBKIT.MENU.LABEL.QUICKSTART',
                        icon: '',
                        click: 'goto-quickstart',
                        onlyWithAuth: true
                    },
                    {
                        type: 'separator'
                    },
                    {
                        type: 'normal',
                        langKey: 'NODEWEBKIT.MENU.LABEL.ABOUT_US',
                        icon: '',
                        click: 'goto-about-us',
                        onlyWithAuth: true
                    },
                    {
                        type: 'normal',
                        langKey: 'NODEWEBKIT.MENU.LABEL.SUPPORT',
                        icon: '',
                        click: 'open-support',
                        onlyWithAuth: true
                    },
                    {
                        type: 'separator'
                    },
                    {
                        type: 'normal',
                        langKey: 'NODEWEBKIT.MENU.LABEL.QUIT',
                        icon: '',
                        click: 'app-close'
                    }
                ]
            },
            {
                type: 'normal',
                langKey: 'NODEWEBKIT.MENU.LABEL.EDIT',
                icon: '',
                items: [
                    {
                        type: 'normal',
                        langKey: 'NODEWEBKIT.MENU.LABEL.CUT',
                        icon: '',
                        click: function(){
                            document.execCommand("cut");
                        }
                    },
                    {
                        type: 'normal',
                        langKey: 'NODEWEBKIT.MENU.LABEL.COPY',
                        icon: '',
                        click: function(){
                            document.execCommand("copy");
                        }
                    },
                    {
                        type: 'normal',
                        langKey: 'NODEWEBKIT.MENU.LABEL.PASTE',
                        icon: '',
                        click: function(){
                            document.execCommand("paste");
                        }
                    }
                ]
            }
        ]
    }
};
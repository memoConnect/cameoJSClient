var nodeWebkitCameoConfig = {
    isNodeWebkit: '<%= isNodeWebkit %>',
    '@menu-example': 'https://gentlenode.com/journal/node-webkit-1-complete-cheatsheet/26',
    rootMenu: {
        items: [
            {
                type: 'normal',
                label: 'cameoNet',
                icon: '',
                enabled: true,
                items: [
                    {
                        type: 'normal',
                        label: 'Quickstart',
                        icon: '',
                        click: 'goto-quickstart',
                        enabled: false
                    },
                    {
                        type: 'separator'
                    },
                    {
                        type: 'normal',
                        label: 'Über',
                        icon: '',
                        click: 'goto-about-us',
                        enabled: false
                    },
                    {
                        type: 'normal',
                        label: 'Support',
                        icon: '',
                        click: 'open-support',
                        enabled: false
                    },
                    {
                        type: 'separator'
                    },
                    {
                        type: 'normal',
                        label: 'Quit',
                        icon: '',
                        click: 'app-close',
                        enabled: true
                    }
                ]
            },
            {
                type: 'normal',
                label: 'Edit',
                icon: '',
                items: [
                    {
                        type: 'normal',
                        label: 'Copy',
                        icon: '',
                        click: function(){
                            document.execCommand("copy");
                        }
                    },
                    {
                        type: 'normal',
                        label: 'Cut',
                        icon: '',
                        click: function(){
                            document.execCommand("cut");
                        }
                    },
                    {
                        type: 'normal',
                        label: 'Paste',
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
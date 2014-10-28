var emptyFunction = function(){return this},
    elementMock = {
        name:'element',
        appendChild: emptyFunction,
        addEventListener: emptyFunction,
        attachEvent: emptyFunction,
        removeEventListener: emptyFunction,
        detachEvent: emptyFunction,
        style: {webkitBehavior:''},
        setAttribute: emptyFunction,
        pathname: ''
    },
    document = {
        name:'document',
        createElementNS: function(a, b){return elementMock},
        createElement: function(){return elementMock},
        getElementsByTagName: function(){return [elementMock]},
        appendChild: emptyFunction,
        addEventListener: emptyFunction,
        attachEvent: emptyFunction,
        removeEventListener: emptyFunction,
        detachEvent: emptyFunction
    },
    location = {
        name:'location',
        href: ''
    },
    window = {
        name:'window',
        document: document,
        location: location,
        addEventListener: emptyFunction
    },
    ASN1 = emptyFunction,
    angular = {
        $$csp:emptyFunction,
        element:function(){return{find:function(){return{prepend:emptyFunction}}}},
        module:function(){return{
            run:emptyFunction,
            constant:emptyFunction,
            config:emptyFunction,
            provider:emptyFunction,
            service:emptyFunction,
            factory:emptyFunction,
            directive:emptyFunction,
            filter:emptyFunction
        }}
    };

importScripts('../vendor.0.2.6.js');

var crypt = null,
    time = 0;

self.addEventListener('message', function(e) {
    var data = e.data;
    //console.log(JSON.stringify(data))
    switch (data.cmd) {
        case 'start-sync':
            time = -((new Date()).getTime());
            crypt = new JSEncrypt({default_key_size: data.keySize});
            crypt.getKey();
            self.postMessage({
                msg:        'finished',
                timeElapsed:(time + ((new Date()).getTime())),
                privKey:    crypt.key.getPrivateKey()
            });
        break;
        case 'stop-sync':
            if(crypt != null)
                crypt = null;
            self.postMessage({'msg':'worker[0].instance'});
        break;
        case 'start-async':
            time = -((new Date()).getTime());
            crypt = new JSEncrypt({default_key_size: data.keySize});
            crypt.getKey(function(){
                self.postMessage({
                    msg:        'finished',
                    timeElapsed:(time + ((new Date()).getTime())),
                    privKey:    crypt.key.getPrivateKey()
                });
            });
        break;
        case 'stop-async':
            if(crypt != null) {
                crypt.cancelAsync();
                crypt = null;
            }
            self.postMessage({'msg':'worker[0].instance'});
        break;
    }
}, false);
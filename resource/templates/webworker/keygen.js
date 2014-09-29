importScripts('../vendor.0.2.6.js');
importScripts('-mock-vendors.js');

var crypt = null,
    time = 0;

self.addEventListener('message', function(e) {
    var data = e.data;
    //console.log(JSON.stringify(data))
    switch (data.cmd) {
        // case 'start':
        //     time = -((new Date()).getTime());
        //     crypt = new JSEncrypt({default_key_size: data.keySize});
        //     crypt.getKey();
        //     self.postMessage({
        //         msg:        'finished',
        //         timeElapsed:(time + ((new Date()).getTime())),
        //         privKey:    crypt.key.getPrivateKey()
        //     });
        // break;
        // case 'cancel':
        //     if(crypt != null)
        //         crypt = null;
        //     self.postMessage({
        //         msg:'canceled'
        //     });
        // break;
        case 'start':
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
        case 'cancel':
            if(crypt != null) {
                crypt.cancelAsync();
                crypt = null;
            }
            self.postMessage({'msg':'canceled'});
            self.close()
        break;
    }
}, false);
importScripts('-mock-vendor.js');
importScripts('../vendor.<%= currentVersion %>.js');

var crypt = null,
    time = 0;

self.addEventListener('message', function(event) {
    var data = event.data;

    switch (data.cmd) {
        case 'start':
            time = -((new Date()).getTime());
            crypt = new JSEncrypt({default_key_size: data.params.keySize});
            crypt.getKey(function(){
                self.postMessage({
                    msg:        'finished',
                    result:     {
                                    timeElapsed:(time + ((new Date()).getTime())),
                                    privKey:    crypt.key.getPrivateKey()
                                }
                });
            });
        break;
        case 'start-sync':
            time = -((new Date()).getTime());
            crypt = new JSEncrypt({default_key_size: data.params.keySize});
            crypt.getKey();
            self.postMessage({
                msg:        'finished',
                result:     {
                                timeElapsed:    (time + ((new Date()).getTime())),
                                privKey:        crypt.key.getPrivateKey()
                            }
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
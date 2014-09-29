importScripts('../vendor.0.2.6.js');
importScripts('-mock-vendors.js');

var crypt = new JSEncrypt()

self.addEventListener('message', function(event) {
    var data    = event.data

    //console.log(JSON.stringify(data))
    switch (data.cmd) {
        case 'start':
            try {
                crypt.setKey(data.privKey)
                var result = crypt.decrypt(data.encryptedSecret)

                self.postMessage({
                    msg:    result ? 'finished' : 'failed',
                    secret: result
                })

            } catch(e){
                self.postMessage({
                    msg:    'error',
                    error:  e
                })
            }
            
        break;
        case 'cancel':
            if(crypt != null)
                crypt = null;
            self.postMessage({
                msg:'canceled'
            });
        break;
    }
}, false);
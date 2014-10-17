importScripts('-mock-vendor.js');
importScripts('../vendor.<%= currentVersion %>.js');

var crypt = new JSEncrypt()

self.addEventListener('message', function(event) {
    var data    = event.data

    switch (data.cmd) {
        case 'start':
            try {
                crypt.setKey(data.pubKey)

                var result = crypt.encrypt(data.secret)

                self.postMessage({
                    msg:    result ? 'finished' : 'failed',
                    secret: result
                })

            } catch(e){
                self.postMessage({
                    msg:    'error',
                    error:  JSON.stringify(e)
                })
            }
            
        break;
        case 'cancel':
            if(crypt != null)
                crypt = null;
            self.postMessage({
                msg:'canceled'
            });
            self.close()
        break;
    }
}, false);
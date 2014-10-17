importScripts('-mock-vendor.js');
importScripts('../vendor.<%= currentVersion %>.js');


var crypt = new JSEncrypt()

self.addEventListener('message', function(event) {
    var data    = event.data


    //console.log(JSON.stringify(data))
    switch (data.cmd) {
        case 'start':
            try {
                crypt.setKey(data.privKey)

                var signature = crypt.sign(data.data)

                self.postMessage({
                    msg:        signature ? 'finished' : 'failed',
                    signature:  signature
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
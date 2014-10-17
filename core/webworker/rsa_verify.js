importScripts('-mock-vendor.js');
importScripts('../vendor.0.2.6.js');


var crypt = new JSEncrypt()

self.addEventListener('message', function(event) {
    var data    = event.data


    //console.log(JSON.stringify(data))
    switch (data.cmd) {
        case 'start':
            try {
                crypt.setKey(data.pubKey)

                var result = crypt.verify(data.data, data.signature, function(x){ return x })

                self.postMessage({
                    msg:    result ? 'finished' : 'failed',
                    result: result
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
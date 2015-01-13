'use strict';

angular.module('cmRoutes').controller('TestCtrl',
    function ($scope, $rootScope, $q, $timeout, $interval) {

        $rootScope.$broadcast('device:goesToBackground')

        $scope.conversation = {
            getPassphrase: function(){
                return $q.when('123123123123123123')
            }
        };

        function decryptFiles(){

        }

        function isEncrypted(){
            return false;
        }

        function state(state){
            return {
                is: function (_state_) {
                    return state == _state_;
                }
            }
        }

        function on(state){
            var progress = 0;
            return function(eventName, callback) {
                if (eventName == 'progress:chunk' && state == 'progress') {
                    $interval(function(){

                         if(progress>1)
                            progress=0
                         else
                            progress+=0.1

                         callback({},progress);

                    },1000)
                }
            }

        }
        function trigger(){}
        function isEmbed(type){
            return function(_type_){
                if(!type && !_type_)
                    return false;

                return type == _type_ || !_type_ && this.type.indexOf(type) >= 0;
            };
        }

        function createFile(config){
            return {
                id: config.id || 1,
                on: on(config.on),
                trigger: trigger,
                state: state(config.state || ''),
                isEmbed: isEmbed(config.type || ''),
                name: config.name || 'Dark_Machine.jpg',
                type: config.mimeType || 'image/jpeg',
                detectedExtension: config.extension || 'jpg',
                size: config.size || 1024,
                loaded: false,
                url: {
                    src: config.src || 'http://s10.postimg.org/exo8yf6eh/Dark_Machine.jpg'
                }
            }
        }

        //http://player.mixmag.net.s3.amazonaws.com/media/Marek%20Hemmann%20in%20the%20mix.mp3

        $scope.messages = [
            {
                from: {
                    state: state,
                    avatarId: 'eQhldI981mHiZdOyPD2z',
                    getDisplayName:function(){return 'Author'},
                    on: on(),
                    trigger: trigger
                },
                id: 1,
                text: '',
                textOnly: false,
                fileIds: [1],
                files:[createFile({id:1,type:'image',state:'readyForDownload'})],
                state: state(''),
                on: on(),
                trigger: trigger,
                isOwn:function(){return true},
                isEncrypted: isEncrypted,
                decryptFiles: decryptFiles
            },
            {
                id: 3,
                text: '',
                textOnly: false,
                fileIds: [2],
                files:[createFile({id:2,size:(1024*1024)*340,type:'audio',state:'onDownload',name:'AlbumArt_{5FA05D35-A682-4AF6-96F7-0773E42D4D16-123231-312312345234534-dasd asda sdasd asd-asd}_Small.mp3',extension:'mp3',on:'progress'})],
                state: state(''),
                on: on(),
                trigger: trigger,
                isOwn:function(){return true},
                isEncrypted: isEncrypted,
                decryptFiles: decryptFiles
            },
            {
                id: 3,
                text: '',
                textOnly: false,
                fileIds: [2],
                files:[createFile({id:2,type:'image',state:'cached',src:' '})],
                state: state(''),
                on: on(),
                trigger: trigger,
                isOwn:function(){return true},
                isEncrypted: isEncrypted,
                decryptFiles: decryptFiles
            },
            {
                id: 2,
                text: '',
                textOnly: false,
                fileIds: [2],
                files:[createFile({id:3,type:'image',state:'cached'})],
                state: state(''),
                on: on(),
                trigger: trigger,
                isOwn:function(){return true},
                isEncrypted: isEncrypted,
                decryptFiles: decryptFiles
            },
            {
                id: 2,
                text: '',
                textOnly: false,
                fileIds: [2],
                files:[createFile({id:3,type:'image',state:'cached',src:'http://www.egghof.com/NewYork/Bilder/Freiheit.jpg'})],
                state: state(''),
                on: on,
                trigger: trigger,
                isOwn:function(){return true},
                isEncrypted: isEncrypted,
                decryptFiles: decryptFiles
            },
            {
                id: 2,
                text: '',
                textOnly: false,
                fileIds: [2],
                files:[createFile({id:3,type:'video',state:'cached',src:'http://stream.flowplayer.org/bauhaus.mp4',extension:'mp4'})],
                state: state(''),
                on: on,
                trigger: trigger,
                isOwn:function(){return true},
                isEncrypted: isEncrypted,
                decryptFiles: decryptFiles
            },
            {
                id: 2,
                text: '',
                textOnly: false,
                fileIds: [2],
                files:[createFile({id:3,type:'audio',state:'cached',src:'http://thesixteendigital.com.s3.amazonaws.com/testfiles/Hallelujah.mp3',extension:'mp3',name:'supergeil.mp3'})],
                state: state(''),
                on: on,
                trigger: trigger,
                isOwn:function(){return true},
                isEncrypted: isEncrypted,
                decryptFiles: decryptFiles
            },
            {
                id: 2,
                text: '',
                textOnly: false,
                fileIds: [2],
                files:[createFile({id:3,type:'',state:'cached',src:'23wefrwer.pdf',name:'AlbumArt_{5FA05D35-A682-4AF6-96F7-0773E42D4D16-123231-312312345234534-dasd asda sdasd asd-asd}_Small.pdf',extension:'pdf'})],
                state: state(''),
                on: on,
                trigger: trigger,
                isOwn:function(){return true},
                isEncrypted: isEncrypted,
                decryptFiles: decryptFiles
            }
        ];

    }
);
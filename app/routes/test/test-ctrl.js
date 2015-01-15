'use strict';

angular.module('cmRoutes').controller('TestCtrl',
    function ($scope, $rootScope, $q) {

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

        function createFile(config){
            return {
                id: config.id || 1,
                on: on,
                trigger: trigger,
                state: state(config.state || ''),
                isEmbed: isEmbed(config.type || ''),
                name: 'Dark_Machine.jpg',
                type: 'image/jpeg',
                detectedExtension: 'jpg',
                size: 1024,
                url: {
                    src: 'http://s10.postimg.org/exo8yf6eh/Dark_Machine.jpg'
                }
            }
        }

        function on(){}
        function trigger(){}
        function isEmbed(type){
            return function(_type_){
                return type == _type_ || !_type_ && this.type.indexOf(type) >= 0;
            };
        }

        $scope.messages = [
            {
                from: {
                    state: state,
                    avatarId: 'eQhldI981mHiZdOyPD2z',
                    getDisplayName:function(){return 'Author'},
                    on: on,
                    trigger: trigger
                },
                id: 1,
                text: 'huhu',
                textOnly: false,
                files:[createFile({id:1,type:'image',state:'readyForDownload'})],
                state: state(''),
                on: on,
                trigger: trigger,
                isOwn:function(){return false},
                isEncrypted: isEncrypted,
                decryptFiles: decryptFiles
            },
            {
                id: 2,
                text: 'huhu2',
                textOnly: false,
                files:[createFile({id:2,type:'image',state:'cached'})],
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
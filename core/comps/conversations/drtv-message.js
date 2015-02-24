'use strict';

/**
* @ngdoc directive
* @name cmConversations.directive:cmMessage
* @description
* handle all types of message
* text
* image
* video
* audio
* documents
*
* @restrict AE
*
* @example
 <example module="cmDemo">
     <file name="script.js">
         angular
         .module('cmDemo', ['cmUi'])
         .controller('Ctrl', function ($scope){
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
                        files:[createFile({id:3,type:'image',state:'cached',src:'http://i.imgur.com/HuTSmQ0.png'})],
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
                        files:[createFile({id:3,type:'image',state:'cached',src:'blob:http%3A//localhost%3A8000/0515c053-7ef1-40ac-8da0-26ad801a5fcf'})],
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
         });
     </file>
     <file name="index.html">
         <cm-message ng-repeat="message in messages" cm-data="message" cm-data-conversation="conversation"></cm-message>
     </file>
 </example>
*/
angular.module('cmConversations')
.directive('cmMessage', [
    'cmClipboard', 'cmDevice',
    '$filter',
    function (cmClipboard, cmDevice,
              $filter) {
        return {
            restrict: 'AE',
            scope: {
                message: '=cmData',
                conversation: '=cmDataConversation'
            },
            templateUrl: 'comps/conversations/drtv-message.html',

            link: function(scope, element){

                function setFileView(){
                    element.addClass('file-view');
                }

                if(!scope.textOnly) {
                    // add css classes
                    if (scope.message.files.length > 0) {
                        setFileView();
                    }
                    if (scope.message.isOwn()) {
                        element.addClass('right');
                    }
                }

                function handleFiles(){
                    if(scope.message.id == '#new_message' && scope.message.state.is('waitForFiles')){
                        setFileView();
                    }

                    if (!scope.textOnly && scope.message.files.length > 0) {
                        setFileView();

                        scope.conversation.getPassphrase()
                        .then(
                            function(passphrase){
                                scope.message.decryptFiles(passphrase);
                            },
                            function(passphrase){
                                if(!scope.message.isEncrypted())
                                    scope.message.decryptFiles(null)
                            }
                        )
                    }
                }


                if(typeof scope.message == 'object' && typeof scope.message.on == 'function'){
                    //Todo: this should be 'one' not 'on', shouldn't it? Andreas

                    scope.message.on('init:files', function(){
                        handleFiles();
                    });
                }

                handleFiles();

            },

            controller: function ($scope, $element, $attrs) {
                $scope.textOnly = !!$scope.$eval($attrs.textOnly);

                $scope.is_my_own_message = ('isOwn' in $scope.message) ? $scope.message.isOwn() : false;

                $scope.isType = function(expectType){
                    if(typeof $scope.message.files !== 'undefined' && $scope.message.files.length > 0 && typeof $scope.message.files[0].type == 'string'){
                        var mimeType = $scope.message.files[0].type;
                        if(expectType == 'image' && mimeType.search('^image') != -1){
                            return true;
                        } else if(expectType == 'file' && mimeType.search('^image') == -1){
                            return true;
                        }
                    } else if(expectType == 'text')
                        return true;
                };

                $scope.displayEncrypted = function(){
                    if($scope.message.id == undefined){
                        /**
                         * hack for empty messages
                         */                        
                        return false;
                    }

                    if(
                            $scope.message.text != undefined 
                        ||  (
                                    $scope.message.text == undefined 
                                &&  typeof $scope.message.files !== 'undefined' 
                                &&  $scope.message.files.length > 0
                            )
                    ){
                        return false;
                    }
                    return true;
                };
                
                $scope.messageProper = function(){
                    var isInComplete    =   $scope.message.state.is('incomplete'),

                        textAvailable   =       typeof $scope.message.text == 'string'
                                            &&  $scope.message.text.length > 0,

                        encrypted       =       $scope.message.isEncrypted(),

                        filesAvailable  =       typeof $scope.message.fileIds == 'object'
                                            &&  $scope.message.fileIds.length > 0,

                        isSending       =   $scope.message.state.is('sending')

                    if(isInComplete)
                        return false;

                    return filesAvailable || textAvailable || encrypted || isSending;
                };

                $scope.messageToClipboard = function(message){
                    if(cmDevice.isApp() && cmDevice.isiOS()) {
                        cmClipboard.copy(message.text, $filter('cmTranslate')('DRTV.MESSAGE.COPIED'));
                    }
                }
            }
        }
    }
]);
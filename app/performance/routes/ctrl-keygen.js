'use strict';

angular.module('cameoClientPerformance')
.controller('CtrlKeygen',
    function($scope, cmCrypt, cmUtil, $interval){

        var worker = null,
            interval = null,
            startTime;

        $scope.keySize = 2048;
        $scope.isIdle = false;
        $scope.webworkerOn = true;
        $scope.print = cmUtil.prettify;
        $scope.state = 'press start';
        $scope.generationTime = '...';

        $scope.canWebworker = function(){
            return !(window.Worker === undefined) ? 'yes' : 'no';
        };

        $scope.startKeygen = function(async){
            $scope.isIdle = true;
            $scope.state = 'is generating "'+(async?'async':'sync')+'" keep device alive';

            startTime = -(new Date()).getTime();

            if(interval != null)
                $interval.cancel(interval);

            interval = $interval(function(){
                $scope.generationTime = cmUtil.millisecondsToStr(startTime+(new Date()).getTime());
            },1000);

            if($scope.canWebworker() == 'yes' && $scope.webworkerOn) {
                $scope.state += ' [ generation via webworker ]';
                worker = new Worker('webworker/keygen.js');

                worker.addEventListener('message', function (e) {
                    var result = e.data;
                    switch (result.msg) {
                        case 'finished':
                            $interval.cancel(interval);
                            $scope.state = 'generation success';
                            $scope.generationTime = cmUtil.millisecondsToStr(result.timeElapsed);
                            $scope.history.webworker[(async ? 'async' : 'sync')].push(cmUtil.millisecondsToStr(result.timeElapsed));
                            $scope.isIdle = false;
                            $scope.$apply();
                            break;
                    }
                });

                worker.postMessage = worker.webkitPostMessage || worker.postMessage;

                worker.postMessage({
                    'cmd': 'start' + (!async ? '-sync' : ''),
                    'keySize': $scope.keySize
                });
            } else if(async){
                cmCrypt.generateAsyncKeypair(
                    parseInt($scope.keySize)
                ).then(
                    function (result) {
                        $interval.cancel(interval);
                        $scope.state = 'generation success';
                        $scope.generationTime = cmUtil.millisecondsToStr(result.timeElapsed);
                        $scope.history.normal.async.push(cmUtil.millisecondsToStr(result.timeElapsed));

                        $scope.isIdle = false;
                        //$scope.privKey  = result.key.getPrivateKey();
                        //$scope.pubKey   = result.key.getPublicKey();
                    },
                    function () {

                    }
                ).finally(
                    function () {

                    }
                );
            } else {
                cmCrypt.generateSyncKeypair(parseInt($scope.keySize));
                $interval.cancel(interval);
                $scope.state = 'generation success';
                $scope.generationTime = cmUtil.millisecondsToStr(startTime+(new Date()).getTime());
                $scope.history.normal.sync.push(cmUtil.millisecondsToStr(startTime+(new Date()).getTime()));
                $scope.isIdle = false;
            }
        };

        $scope.stopKeygen = function(async){
            $scope.history.stopped.push(cmUtil.millisecondsToStr(startTime+(new Date()).getTime()));

            $interval.cancel(interval);
            /*if(worker != null && $scope.webworkerOn){
                worker.postMessage({
                    cmd:'stop-'+(async?'async':'sync')
                });
            } else {*/
                cmCrypt.cancelGeneration(async);
            //}

            $scope.state = 'generation stopped / press start';
            $scope.isIdle = false;
        };

        $scope.clearHistory = function(){
            $scope.history = {
                webworker: {
                    async:[],
                    sync:[]
                },
                normal: {
                    async:[],
                    sync:[]
                },
                stopped:[]
            };
        };

        $scope.clearHistory();
    }
);
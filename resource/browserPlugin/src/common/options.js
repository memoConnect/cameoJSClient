angular.module('cmOptionsPage',['cmCore','cmPhonegap'])
.controller('cmKeyList', function(cmCrypt, $scope, $timeout){
    $scope.generatedKey = 'not generated yet';
    $scope.storage = 'empty';
    $scope.isIdle = false;

    $scope.generateKey = function(){
        if($scope.isIdle)
            return false;

        $scope.generatedKey = 'on generation...';

        cmCrypt.generateAsyncKeypair(2048)
        .then(
            function(){
                $scope.generatedKey = 'generation success';
                kango.console.log(arguments)
            },
            function(){
                $scope.generatedKey = 'generation failed';
                kango.console.log(arguments)
            }
        )
    };

    // storage handling

    $scope.clear = function(){
        kango.storage.clear();
        $scope.getStorage();
    };

    $scope.setItem = function(){
        if($scope.key && $scope.value) {
            kango.storage.setItem($scope.key, $scope.value);
            $scope.getStorage();
        }
    };

    $scope.removeItem = function(){
        kango.storage.removeItem($scope.key);
        $scope.getStorage();
    };

    $scope.getStorage = function(){
        var storageKeys = kango.storage.getKeys(),
            storage = {};

        storageKeys.forEach(function(key){
            storage[key] = kango.storage.getItem(key);
        });

        $scope.storage = storage;
    };

    $timeout(function(){
        $scope.getStorage();
    },500);
});

KangoAPI.onReady(function() {
    kango.console.log('kango isReady')
    //
});
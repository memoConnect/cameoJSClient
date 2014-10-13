'use strict';

angular.module('cmRouteSettings').directive('cmIdentityKeyCreate', [
    'cmUserModel',
    'cmCrypt',
    'cmUtil',
    'cmLogger',
    'cmNotify',
    'cmKey',
    'cmJob',
    'cmApi',
    'cmDevice',
    '$window',
    '$rootScope',
    '$timeout',
    function(cmUserModel, cmCrypt, cmUtil, cmLogger,
             cmNotify, cmKey, cmJob, cmApi, cmDevice,
             $window, $rootScope, $timeout){
        return {
            restrict: 'E',
            templateUrl: 'comps/user/identity/key/drtv-identity-key-create.html',
            controller: function ($scope) {

//                -----BEGIN RSA PRIVATE KEY-----
//                MIUAAAAEvzANBgkqhkiG9w0BAQEFAAOFAAAABKkAMIIEpAIBAAKCAQEAmePpbMbx
//                6soqgdrZb7xAP0sr7q/pb/yuV1Loac8quMo1abIKn7ofADTNRWKClcxQh4YJ/I0T
//                DWfjrV9BKmsbOPv184yZ1hwK+qYHrsZgL8hVqpwdKz0GgBRZWspIMBqy98sx5TV3
//                hojoQqvQSWR1BtaJrqEUj6uamby3+tHvCuVdXW3sm4im96h1UmjRNbHSJanU150E
//                MBSE8zj9TLVfOtw+Dd3bYx0hG5ihothz6FxWZ4O4DSBulULgmWgk2+ZufgiFzs7v
//                /rqCTOldfa8w5LpeLS2sDHZfRB7lTISjCDTT4vShcTv1zz1at4CWbI657OxxqXPR
//                90eM5qQCMTj8yQIDAQABAoIBAQCJSo+hgAurkBlEKF78FFKtJP9Yvo/gXOmc9lZq
//                r2xJ1/y3AyP/RCkMIg9P64bc5Z6iia63JZTtzNWOgwC8OznaKM9QLQvBvNr+qskH
//                3+tINc5Xm1daj+MQuRbOrNCiOe+YqisldgHggJvVfzsffwP4ycWjigmx80LGDVuF
//                5W0BpdRc2IAgOJWKlQ6I19n5qP6QDvkqp6MPNrj82adDRkg9qOWtP/HEf5llzjUE
//                gv3jZkWNudYFQ/BHM/QiShAHSAY7RQPKHiKpIAJvQZkbmYhXqL2+4fkZaziDnQ6a
//                lXHjegLW5j43eBRc77z5+JaXm6y4NWVXepBkCDb0msGBCViRAoGBAYDz572PibUg
//                Kl9NGs1WSmmqOnRIHscQETMbPaQAO6SHdRgEbATuWkxMfsuWy1f0rXkSgge8SklO
//                EDiAqhlhMJUU3/v+iHHs6DtNHmk2aiy9NqmISkiKAZpTQwilWjY42qQqCcGi39XG
//                ZAx1ZIRAU6Q/RBJXIPb3opaac1JGCh2bAoGAZlbwLGGwJGPxN5qeDwE+xmeD3O/Q
//                2Be4ms7qZRlYhnCQqMkyXy9QCYUAZMXofqZFaNR1JCOJf4xb7BNbIktD3MtGNf7+
//                b+L6R+nCnbPBoKcmlA1t/lE0rXo2jnSIb/VbmEsnRk6jh6RfFe0bqmt7HShDT4Uv
//                LikY1pORtGc0J2sCgYEBQQKj/myDHlqrWvuWXSMXPJQq2KsHl2JrpV2TAn77PZGD
//                8LpHRblp7XRgy+98tGUif/MSIdc/b2+8kRGiRzXH6JoWyjIQoEg5xLHjqUMqORK0
//                UZ2IrIMBIStLnBsfZlX05a70odfrpn4hEk6Wur5VwYLMhirIH4qTt9kmT7Z+Wv8C
//                gYA7ksRAsaUdqegTHDiCN5FZYYzLIfcKs9RMmcKsk3KK4B/1gRmHez02LWwrPWG3
//                yAaDnZmLLfyueQBRjnrwnaulbdczO3rVmuVi01rs/mTqpiK48JBlCNSHX6s+heue
//                cM+e+bClJsXfAfowA1Slgeeq83MraTYrwtSopEKfJ6yefQKBgQDO3mQ+zrQr+FO8
//                w9SlJpQuBGY5cNLDjYPN1a/GzkNyeKuAC/TJve9AHotdctZe6upBjlZtNUrIXrY0
//                E7dwqiRKw2rbYr0Dytyz05RuKXGzPXDoeaxt9s0BfL0PFYIotl8c6z61RUC5boRy
//                UTcBKpHP8WH6jc8tDavmvT8PH0p0zQ==
//                -----END RSA PRIVATE KEY-----


                var newKey = [
                    '-----BEGIN RSA PRIVATE KEY-----',
                    'MIUAAAAEvzANBgkqhkiG9w0BAQEFAAOFAAAABKkAMIIEpAIBAAKCAQEAmePpbMbx',
                    '6soqgdrZb7xAP0sr7q/pb/yuV1Loac8quMo1abIKn7ofADTNRWKClcxQh4YJ/I0T',
                    'DWfjrV9BKmsbOPv184yZ1hwK+qYHrsZgL8hVqpwdKz0GgBRZWspIMBqy98sx5TV3',
                    'hojoQqvQSWR1BtaJrqEUj6uamby3+tHvCuVdXW3sm4im96h1UmjRNbHSJanU150E',
                    'MBSE8zj9TLVfOtw+Dd3bYx0hG5ihothz6FxWZ4O4DSBulULgmWgk2+ZufgiFzs7v',
                    '/rqCTOldfa8w5LpeLS2sDHZfRB7lTISjCDTT4vShcTv1zz1at4CWbI657OxxqXPR',
                    '90eM5qQCMTj8yQIDAQABAoIBAQCJSo+hgAurkBlEKF78FFKtJP9Yvo/gXOmc9lZq',
                    'r2xJ1/y3AyP/RCkMIg9P64bc5Z6iia63JZTtzNWOgwC8OznaKM9QLQvBvNr+qskH',
                    '3+tINc5Xm1daj+MQuRbOrNCiOe+YqisldgHggJvVfzsffwP4ycWjigmx80LGDVuF',
                    '5W0BpdRc2IAgOJWKlQ6I19n5qP6QDvkqp6MPNrj82adDRkg9qOWtP/HEf5llzjUE',
                    'gv3jZkWNudYFQ/BHM/QiShAHSAY7RQPKHiKpIAJvQZkbmYhXqL2+4fkZaziDnQ6a',
                    'lXHjegLW5j43eBRc77z5+JaXm6y4NWVXepBkCDb0msGBCViRAoGBAYDz572PibUg',
                    'Kl9NGs1WSmmqOnRIHscQETMbPaQAO6SHdRgEbATuWkxMfsuWy1f0rXkSgge8SklO',
                    'EDiAqhlhMJUU3/v+iHHs6DtNHmk2aiy9NqmISkiKAZpTQwilWjY42qQqCcGi39XG',
                    'ZAx1ZIRAU6Q/RBJXIPb3opaac1JGCh2bAoGAZlbwLGGwJGPxN5qeDwE+xmeD3O/Q',
                    '2Be4ms7qZRlYhnCQqMkyXy9QCYUAZMXofqZFaNR1JCOJf4xb7BNbIktD3MtGNf7+',
                    'b+L6R+nCnbPBoKcmlA1t/lE0rXo2jnSIb/VbmEsnRk6jh6RfFe0bqmt7HShDT4Uv',
                    'LikY1pORtGc0J2sCgYEBQQKj/myDHlqrWvuWXSMXPJQq2KsHl2JrpV2TAn77PZGD',
                    '8LpHRblp7XRgy+98tGUif/MSIdc/b2+8kRGiRzXH6JoWyjIQoEg5xLHjqUMqORK0',
                    'UZ2IrIMBIStLnBsfZlX05a70odfrpn4hEk6Wur5VwYLMhirIH4qTt9kmT7Z+Wv8C',
                    'gYA7ksRAsaUdqegTHDiCN5FZYYzLIfcKs9RMmcKsk3KK4B/1gRmHez02LWwrPWG3',
                    'yAaDnZmLLfyueQBRjnrwnaulbdczO3rVmuVi01rs/mTqpiK48JBlCNSHX6s+heue',
                    'cM+e+bClJsXfAfowA1Slgeeq83MraTYrwtSopEKfJ6yefQKBgQDO3mQ+zrQr+FO8',
                    'w9SlJpQuBGY5cNLDjYPN1a/GzkNyeKuAC/TJve9AHotdctZe6upBjlZtNUrIXrY0',
                    'E7dwqiRKw2rbYr0Dytyz05RuKXGzPXDoeaxt9s0BfL0PFYIotl8c6z61RUC5boRy',
                    'UTcBKpHP8WH6jc8tDavmvT8PH0p0zQ==',
                    '-----END RSA PRIVATE KEY-----'
                ];

                var ourKey = [
                    '-----BEGIN RSA PRIVATE KEY-----'
                    ,'MIIEpQIBAAKCAQEA6pap8EqXwCyoA1c1m4V4Y60TsBIwCdwYkrZRrSYP6wxUm7Bb'
                    ,'sm7J5cgpe/8W24ZZlAEUA82llsPUTkTlE4mH3k5E6A+0StpGJkXmek/n+xD5KFhx'
                    ,'+xfzh3zRs3VPozVPyDmlxb+OU2aue+k3SNhykjtDK/CHIORDOm6rvM7sWJIlH9Cg'
                    ,'DHLMGYV10YbAH0aqtZDJRRdQPxLjeRbbUhnjbAZgAvpoKZyxKmDvYoi7BD9QMQ/b'
                    ,'x9ARiUj1l+JHepp/+eaHYY1uwaO4n4hixyr1ylz1613GjI6DPUdFnUfyoPpfHFH2'
                    ,'4vv24/CcWucy/QEOuiFt253qDzymHT/u/Fv2pwIDAQABAoIBAQCuAmY6BMq91SIn'
                    ,'oDf2jbG4ljjFYShbF/TuVukM++/Q1YupFM9f8wg2Nxx2isiEvAqUW5xiGdgbllVU'
                    ,'XYxiyqCLCRnZ3VRKNdDVMQJ+delI9dUr1TdvHtwZA0B10q3pDXGJvyE1JxtGyCLj'
                    ,'bSICGfQafnUcEcXaYxdvL4qaeg8cvpeG3man5ipfQ7guMQIpYkZwJ2rQ7UJbFKV7'
                    ,'0VkTuK1wQO3lU3WUHNsbkYRf2+fefpL3S7hXBXH7BXho8LXzNLg/ZRednNU68DhA'
                    ,'jGuRlOnyE9oFk0blH0ccNkc2tirQTdS6fjCjoltyZjURNcnoigCrlH8CdsgUzTvf'
                    ,'ljcyPOZhAoGBAP9c5X6KpX+eOcbAaTjIFMSxbgesjXV3UoWJMHAgvnSaG1ong4nQ'
                    ,'iBjOnhFW3lZK/oMnd7JnPORGC1PzCwLcDN91F8KxNu1D20mc+SSFjyu/Jgn8xG6H'
                    ,'VhlsRS091wiv6MEvR5hu1F5xZ5SJccKjOmW6FJUK5Eas8lN5w4CjDhx3AoGBAOss'
                    ,'f57/BQ9TCTUwa9QDPvr6aPrF7Svho7S5litiIgVvf5KudWJOxGWXV/daNS1b9lCn'
                    ,'QIEd5ZyuEOuNGySk5o2OFbEccAq4qnf4BMFS4k9QBFci/AGzs1U+mpPeJBboAKON'
                    ,'vZwgL+Ds/pqXmzjtwNxxBGxhtOwVmp8pNmNXIPNRAoGBAJiI+gDTerY3YlWpW3Dy'
                    ,'ew1e2tW0qa7v/pgLcaaYuItX/lyk27q3mIQQ73R2CktLcqoPKj2j00ib2mpj9EDa'
                    ,'Bsp33CCM0L17WgKnxF6fdPzxqhwvI3rOVozLEqtKlCb5RLQYtNCF608auH+OdiiI'
                    ,'bfqT43V/0wmwhvN7+V7ehzBTAoGAQSiNG5Jw5nQNQw1tcsqLcqJa39BjDBtybipV'
                    ,'byO7ZWIlKJDpuRk11Sf/mWsG/NBUCLiuaJfN/IFF8t2fvaFqt6G8ZNwKNw4/PQoc'
                    ,'1yuNxIfZDAOHazlM4Lt9vKZ5vVb+hlJJTK6mVV2UlWSX/0fwfaNapGTV6et6ccrL'
                    ,'ZO7JFGECgYEAxkio7YWuk/xjB38iWlhPPQA/Jbwdxr4uQH9YNALZqCdE6D2ycZJn'
                    ,'3PV7nFq8vRWe+vjLhyPTYuVXt3Gut8PHg8BO+MSSUYWRsICsTTGK5L58oUxzpfDE'
                    ,'13bOyHlnS+21aUkXGzpRJ/0zd5HSy7MzvfNmGkfdZC5l2CipcsVuYF4='
                    ,'-----END RSA PRIVATE KEY-----'
                ];

                console.log(newKey.join('\n'))
                console.log(ourKey.join('\n'))

                var key = (new cmKey()).setKey(newKey.join('\n'));

                console.log(key.getPrivateKey())
                console.log(key.getPublicKey())


                // only one privKey!!!
                if(cmUserModel.hasPrivateKey()){
                    $scope.goTo('/settings/identity/key/list', true);
                    return false;
                }

                $scope.identity = cmUserModel.data;

                /**
                 * scope vars for keypair generation
                 * @type {string[]}
                 */
                var detect      = cmDevice.detectOSAndBrowser(),
                    startTime   = undefined,
                    elapsedTime = 0,
                    generationTimeout = null,
                    generationTimeoutMinutes = 10;

                $scope.active = 'choose'; // choose, active, store
                //$scope.keySizes = cmCrypt.getKeySizes();
                $scope.keySize = 2048;
                $scope.keyName = '';

                $scope.showKeySize = false;
                $scope.toggleKeySize = function(){
                    if(!$scope.showKeySize){
                        $scope.showKeySize = true;
                    } else {
                        $scope.showKeySize = false;
                    }
                };

                $scope.keySize = 2048;
                $scope.chooseKeySize = function(size){
                    if(size == '4096'){
                        $scope.keySize = 4096;
                    } else {
                        $scope.keySize = 2048;
                    }
                };

                $scope.getElapsedTime = function(){
                    elapsedTime =   startTime 
                                    ?   Math.max(new Date().getTime() - startTime, 0)
                                    :   elapsedTime;
                    return elapsedTime;
                };

                function reset(){
                    $timeout.cancel(generationTimeout);
                    cmApi.listenToEvents();
                    cmJob.stop();
                }

                /**
                 * generate keypair
                 */
                $scope.generate = function(withoutTimerReset){
                    // generation timeout for very long generation
                    // esspecially for iphone 4/4s ios7 uiwebview
                    $timeout.cancel(generationTimeout);
                    generationTimeout = $timeout(function(){
                        $scope.cancelGeneration();
                        $scope.generate(true);
                    },generationTimeoutMinutes * 60 * 1000);

                    $scope.active = 'generate';
                    cmJob.start('DRTV.CONFIRM.STANDARD', $scope.cancelGeneration);

                    var size = 2048;
                    if($scope.keySize == 4096){
                        size = 4096;
                    }

                    /**
                     * call cmCrypt to generate KeyPair
                     * with keySize and callback for onGeneration
                     * returns a promise
                     */
                    cmApi.stopListeningToEvents();

                    if(!withoutTimerReset) {
                        startTime = new Date().getTime();
                        elapsedTime = 0;
                    }

                    cmCrypt.generateAsyncKeypair(parseInt(size))
                    .then(
                        function(result){
                            $scope.privKey  = result.key.getPrivateKey();
                            $scope.pubKey   = result.key.getPublicKey();
                            $scope.keyName  = detect.os+' / '+detect.browser;

                            $scope.active = 'store';
                        },
                        function(){
                            $scope.active = 'choose';
                        }
                    ).finally(
                        function(){
                            reset();
                            startTime = undefined
                        }
                    );
                };

                $scope.$on('$destroy',function(){
                    reset();
                });

                /**
                 * cancel keypair generation
                 */
                $scope.cancelGeneration = function(){
                    //cmLogger.debug('cancel key generation');
                    cmCrypt.cancelGeneration();
                    reset();
                    startTime = undefined
                };

                $scope.cancel = function(){
//                    cmLogger.debug('cancel');
                    $scope.cancelGeneration();

                    if(typeof $rootScope.generateAutomatic != 'undefined'){
                        /**
                         * @TODO siwtch auch, wenn noch keine Talks vorhanden sind
                         */
                        $scope.goTo('/talks');
                    } else {
                        $scope.goBack();
                    }
                };

                /**
                 * store key pair
                 */
                $scope.store = function(){
                    var error = false;

                    if($scope.privKey == ''){
                        error = true;
                        cmNotify.warn('SETTINGS.PAGES.IDENTITY.KEYS.WARN.CHECK_PRIVKEY');
                    }

                    if($scope.pubKey == ''){
                        error = true;
                        cmNotify.warn('SETTINGS.PAGES.IDENTITY.KEYS.WARN.CHECK_PUBKEY');
                    }

                    if($scope.keyName == ''){
                        error = true;
                        cmNotify.warn('SETTINGS.PAGES.IDENTITY.KEYS.WARN.CHECK_KEYNAME');
                    }

                    if(error !== true){
                        var key = new   cmKey({
                                            name: $scope.keyName,
                                            privKey: $scope.privKey
                                        });

                        cmUserModel
                            .storeKey(key)
                            .syncLocalKeys();


                        cmUserModel
                            .when('key:saved', null, 5000)
                            .then(
                                function(result){
                                    if(cmUserModel.data.identity.keys.some(function(key){
                                        return key.id != result.data.keyId
                                    })){
                                        $scope.goto('/authentication')
                                    } else {
                                        $scope.goTo('/talks');
                                    }
                                }
                            )

                        cmJob.stop();

                    }
                };

                var generateAutomatic = false;
                if(typeof $rootScope.generateAutomatic != 'undefined'){
                    if('generate' in $rootScope.generateAutomatic && $rootScope.generateAutomatic.generate == true){
                        generateAutomatic = true;

                        if('keySize' in $rootScope.generateAutomatic && parseInt($rootScope.generateAutomatic.keySize) == 4096){
                            $scope.keySize = 4096;
                        } else {
                            $scope.keySize = 2048;
                        }

                        $scope.generate();
                    }

                    $rootScope.generateAutomatic = {}
                }
            }
        }
    }
]);
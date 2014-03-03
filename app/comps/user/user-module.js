var cmUser = angular.module('cmUser',[
        'cmAuth', 
        'cmLogger'
    ])

cmUser.service('cmUserModel',[    
    '$q', 
    '$rootScope', 
    '$location',
    'cmAuth', 
    cmUserModel
])


cmUser.directive('cmLogin', [
    '$location',
    '$interval',
    'cmLogger',
    'cmNotify',
    'cmUserModel',
    cmLogin
])



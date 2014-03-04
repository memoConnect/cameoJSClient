var cmUser = angular.module('cmUser',[
        'cmAuth', 
        'cmLogger',
        'cmLocalStorage'
    ])

cmUser.service('cmUserModel',[   
    'cmAuth', 
    'cmLocalStorage',
    '$q', 
    '$rootScope', 
    '$location',
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



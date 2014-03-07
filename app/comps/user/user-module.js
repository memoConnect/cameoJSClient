var cmUser = angular.module('cmUser',[
    'cmAuth',
    'cmUserModel',
    'cmLogger'
])

cmUser.directive('cmLogin', [
    '$location',
    '$interval',
    'cmLogger',
    'cmNotify',
    'cmUserModel',
    cmLogin
])



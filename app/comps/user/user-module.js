'use strict';

var cmUser = angular.module('cmUser',[
    'cmAuth',
    'cmUserModel',
    'cmCrypt',
    'cmLogger'
])

.directive('cmLogin', [
    '$location',
    'cmNotify',
    'cmUserModel',
    'cmCrypt',
    'cmEnv',
    cmLogin
])

.directive('cmKeyPair', [
    'cmUserModel',
    'cmCrypt',
    'cmUtil',
    'cmLogger',
    'cmNotify',
    '$location',
    cmKeyPair
])

.directive('cmUserRights', [
    'cmUserModel',
    'cmEnv',
    cmUserRights
])



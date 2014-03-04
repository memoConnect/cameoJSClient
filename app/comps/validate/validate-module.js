var cmValidate = angular.module('cmValidate', [
    'cmAuth'
])

cmValidate.directive('cmValidateEmail',[
    cmValidateEmail
])

cmValidate.directive('cmPassword', [
    'cmCrypt',
    cmPassword
])

cmValidate.directive('cmValidatePhone',[
    'cmAuth',
    cmValidatePhone
])
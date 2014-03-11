var cmFiles = angular.module('cmFiles',[
        'cmApi',
        'cmUtil',
        'cmLogger',
        'cmCrypt'
    ])

cmFiles.service('cmFilesAdapter', [
    'cmApi',
    cmFilesAdapter
])

cmFiles.factory('cmFile', [
    'cmFilesAdapter',
    'cmLogger',
    'cmCrypt',
    'cmUtil',
    '$q',    
    cmFile
])


cmFiles.directive('cmUpload',[
    'cmFile',
    cmUpload
])

cmFiles.directive('cmFileInput', [
    cmFileInput
])

cmFiles.directive('cmDownload',[    
    'cmFile',
    cmDownload
])

cmFiles.filter('cmFileSize', [
    'cmFilesAdapter',
    cmFileSize
])



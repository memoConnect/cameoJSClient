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

cmFiles.factory('cmChunk', [
    'cmFilesAdapter',
    'cmLogger',
    'cmCrypt',
    '$q',    
    cmChunk
])

cmFiles.factory('cmFile', [
    'cmFilesAdapter',
    'cmLogger',
    'cmChunk',
    'cmCrypt',
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



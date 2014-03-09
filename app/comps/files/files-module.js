var cmFiles = angular.module('cmFiles',[
        'cmApi'
    ])

cmFiles.service('cmFilesAdapter', [
    'cmApi',
    cmFilesAdapter
])

cmFiles.factory('cmFile', [
    'cmFilesAdapter',
    'cmLogger',
    '$q',    
    cmFile
])

cmFiles.controller('SendFileCtrl', [
    '$rootScope', 
    '$scope', 
    'cmFilesAdapter',
    sendCtrl
])




cmFiles.controller('GetFileCtrl', [
    '$scope', 
    'cmFilesAdapter',     
    getFileCtrl
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



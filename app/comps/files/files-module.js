var cmFiles = angular.module('cmFiles',[
        'cmApi'
    ])

cmFiles.service('cmFilesAdapter', [
    'cmApi',
    cmFilesAdapter
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
    'cmFilesAdapter',
    cmUpload
])

cmFiles.directive('cmFileInput', [
    cmFileInput
])

cmFiles.directive('cmDownload',[
    'cmFilesAdapter',
    cmDownload
])

cmFiles.filter('cmFileSize', [
    cmFileSize
])



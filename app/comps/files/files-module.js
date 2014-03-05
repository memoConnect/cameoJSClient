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


cmFiles.directive('cmFileRead', [
    cmFileRead
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



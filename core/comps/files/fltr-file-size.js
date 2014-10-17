'use strict';

angular.module('cmFiles').filter('cmFileSize', [
    'cmFilesAdapter',
    function () {
        return function(bytes, unit) {
            var sizes = ['B', 'KB', 'MB', 'GB', 'TB'],
            units = {
                1000 : ['bytes', 'kb', 'MB', 'GB', 'TB'],
                1024 : ['bytes', 'KiB', 'MiB', 'GiB', 'TiB']
            };

            var base = (unit && unit.toUpperCase().match(/I/gi)) ? 1024 : 1000;

            if (bytes == 0) return 'n/a';
            var i = unit ? sizes.indexOf(unit.toUpperCase().replace(/I/gi)) :-1;

            i = (i == -1) ? parseInt(Math.floor(Math.log(bytes) / Math.log(base))) : i;

            return Math.round(bytes / Math.pow(base, i)*100)/100 + ' ' + units[base][i];
        }
    }
]);
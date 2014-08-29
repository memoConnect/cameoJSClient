'use strict';

angular.module('cmUi').filter('cmEmoji', [
    '$filter',
    'cmSettings',
    function($filter, cmSettings){

        var convertSmileyToEmoji = [
            {matcher: [':\\)','\\(:','\\^\\^'], emoji:'blush'},
            {matcher: [';\\)','\\(;'], emoji:'wink'},
            {matcher: [':D'], emoji:'smile'},
            {matcher: [':\\*','\\*:'], emoji:'kissing_heart'},
            {matcher: ['<3'], emoji:'heart_eyes'},
            {matcher: ['B\\)'], emoji:'sunglasses'},
            {matcher: [':P',':p'], emoji:'stuck_out_tongue'},
            {matcher: [';P',';p'], emoji:'stuck_out_tongue_winking_eye'},
            {matcher: [':\\('], emoji:'worried'},
            {matcher: [':o '], emoji:'open_mouth'},
            {matcher: [":\\'\\("], emoji:'cry'},
            {matcher: ['\\.!\\.'], emoji:'fu'},
            {matcher: ['o_O','O_o','oO','Oo','o\\.O','O\\.o'], emoji:'flushed'},
            {matcher: ['-_-'], emoji:'expressionless'},
            {matcher: ['\\^_\\^'], emoji:'grin'},
            {matcher: ['\\\\o\/'], emoji:'ghost'}
        ];

        return function (input) {
            var str = '';

            // regular emojis
            str = $filter('emoji')(input.toString());

            // smiley to emoji
            if(cmSettings.is('convertEmoji')) {
                convertSmileyToEmoji.forEach(function (smiley) {
                    var rSmiley = new RegExp(smiley.matcher.join("|"), "g");
                    str = str.toString().replace(rSmiley, function () {
                        return '<i class="emoji emoji_' + smiley.emoji + '" title=":' + smiley.emoji + ':">' + smiley.emoji + '</i>';
                    });
                });
            }

            return str;
        };
    }
]);
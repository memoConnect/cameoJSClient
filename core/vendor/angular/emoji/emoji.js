(function () {
    "use strict";

    angular.module("emoji", [])
    .service("emoji",function(){
        return {
            items: {"cameo":{"moep":["cm_rhino","rtfm","wtf"]},"nature":{"misc":["snowman"],"pet":["ant","baby_chick","bear","beetle","cow","dog","hamster","hatched_chick","monkey","mouse","panda_face","pig","pig2","rabbit","snail","tiger","turtle","wolf"],"planets":["full_moon","full_moon_with_face","globe_with_meridians","sun_with_face","sunny"]},"people":{"ape":["hear_no_evil","monkey_face","see_no_evil","speak_no_evil"],"cat":["cat","crying_cat_face","heart_eyes_cat","joy_cat","kissing_cat","pouting_cat","smile_cat","smiley_cat","smirk_cat"],"faces":["baby","boy","cop","man","rage","santa"],"hands":["clap","fist","fu","hand","metal","muscle","ok_hand","open_hands","point_down","point_left","point_right","point_up","point_up_2","pray","punch","facepunch","raised_hand","raised_hands","thumbsdown","\\-1","thumbsup","\\+1","v","wave"],"hearts":["heart","two_hearts"],"smiley":["angry","anguished","astonished","blush","bowtie","cold_sweat","confounded","confused","cry","disappointed","disappointed_relieved","dizzy_face","expressionless","fearful","flushed","frowning","grimacing","grin","grinning","heart_eyes","hushed","imp","innocent","joy","kissing","kissing_closed_eyes","kissing_heart","kissing_smiling_eyes","laughing","mask","neckbeard","neutral_face","no_mouth","pensive","persevere","relaxed","relieved","satisfied","scream","sleeping","sleepy","smile","smiley","smirk","sob","stuck_out_tongue","stuck_out_tongue_closed_eyes","stuck_out_tongue_winking_eye","sunglasses","sweat","sweat_smile","tired_face","tongue","triumph","unamused","weary","wink","worried","yum"],"specials":["alien","eyes","japanese_ogre","octocat","poop","shit","hankey","shipit","squirrel","skull","space_invader","trollface"],"woman":["bikini","couple_with_heart","couplekiss","haircut","massage","nail_care","no_good","ok_woman"],"unsorted":["dancers","two_men_holding_hands","two_women_holding_hands"]},"symbols":{"lock":["closed_lock_with_key","key","lock","lock_with_ink_pen","unlock"],"unsorted":["8ball","anchor","anger","beer","beers","bomb","boom","bust_in_silhouette","busts_in_silhouette","cake","camera","clipboard","exclamation","game_die","gem","ghost","grey_exclamation","grey_question","guitar","gun","mute","smoking","sparkles","speech_balloon","thought_balloon","warning","zzz"]}},
            getRegExp: function(){
                return new RegExp(":(" +this.getAllAsString('|')+ "):", "g");
            },
            getAllAsString: function(delimiter){
                var self = this,
                    arrClear = [];
                // parse all out of categorysation
                Object.keys(self.items).map(function(mainCat) {
                    Object.keys(self.items[mainCat]).map(function(subCat) {
                        arrClear = arrClear.concat(self.items[mainCat][subCat]);
                    });
                });
                return arrClear.join(delimiter||',');
            },
            getFromCategory: function(mainCat, subCat){
                var arrReturn = [];
                if(mainCat != undefined && subCat == undefined){
                    if(Object.keys(this.items).indexOf(mainCat) > -1){
                        arrReturn = this.items[mainCat];
                    }
                } else if(mainCat != undefined && subCat != undefined){
                    if(Object.keys(this.items).indexOf(mainCat) > -1 && Object.keys(this.items[mainCat]).indexOf(subCat) > -1){
                        arrReturn = this.items[mainCat][subCat];
                    }
                }
                return arrReturn;
            }
        }
    })
    .filter("emoji", function (emoji) {
        return function (input) {
            return input.replace(emoji.getRegExp(), function (match, text) {
                return "<i class='emoji emoji_" + text + "' title=':" + text + ":'>" + text + "</i>";
            });
        };
    });

}());

(function () {
    "use strict";

    angular.module("flags", [])
    .service("flags",function(){
        return {
            items: ["ad","ae","af","ag","ai","al","am","an","ao","ar","at","au","aw","az","ba","bb","bd","be","bf","bg","bh","bi","bj","bm","bn","bo","br","bs","bt","bw","by","bz","ca","cd","cf","cg","ch","ci","ck","cl","cm","cn","co","cr","cu","cv","cy","cz","de","dj","dk","dm","do","dz","ec","ee","eg","es","fi","fj","fm","fo","fr","ga","gb","gd","ge","gf","gh","gi","gl","gm","gn","gp","gq","gr","gt","gu","gw","gy","hk","hn","hr","ht","hu","id","ie","il","in","iq","ir","is","it","je","jm","jo","jp","ke","kg","kh","ki","km","kn","kp","kr","kw","kz","la","lb","lc","li","lk","lr","ls","lt","lu","lv","ly","ma","mc","md","me","mg","mk","ml","mm","mn","mo","mq","mr","ms","mt","mu","mv","mw","mx","my","mz","na","nc","ne","ng","ni","nl","no","np","nz","om","pa","pe","pf","pg","ph","pk","pl","pm","pr","ps","pt","py","qa","re","ro","rs","ru","rw","sa","sc","sd","se","sg","si","sk","sl","sm","sn","so","sr","ss","st","sv","sy","sz","tc","td","tg","th","tj","tl","tm","tn","to","tr","tt","tw","tz","ua","ug","us","uy","uz","vc","ve","vg","vi","vn","vu","ws","ye","za","zm","zw"],
            getRegExp: function(){
                return new RegExp(":(" +this.getAllAsString('|')+ "):", "g");
            },
            getAllAsString: function(delimiter){
                return this.items.join(delimiter||',');
            }
        }
    })
    .filter("flags", function (flags) {
        return function (input) {
            return input.replace(flags.getRegExp(), function (match, text) {
                return "<i class='flag flag_" + text + "' title='" + text + "'>" + text + "</i>";
            });
        };
    });

}());
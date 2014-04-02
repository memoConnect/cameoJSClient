'use strict';

function cmDateFormat(){
    return {
        restrict : 'E',
        compile: function($elem, $attrs){
           console.log($elem.text());
        }
    }
}
'use strict';

angular.module('cmUi').directive('cmReactive',[
    function (){
        return {
            restrict: 'A',
            controller: function($scope, $element){
                console.log($element)
                $element.on('click',function(){

                })


            }
        }
    }
]);
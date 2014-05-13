//This Module provides a generic Factory

var cmApi = angular.module('cmFactory', []);


cmFactory.cmFactory('cmFactory',[

    //do dependencies

    var cmFactory = function(data){

        this.model = undefined
        this.adapter = undefined

        this._init = function(config){

        }

        this.get = function(){

        }

        this.register = function(){

        }

        this._init(data)
    }

    return factory
])
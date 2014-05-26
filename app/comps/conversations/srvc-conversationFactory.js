'use strict';

angular.module('cmConversations').service('cmConversationFactory',[

    '$rootScope',
    'cmFactory',
    'cmConversationModel',

    function ($rootScope, cmFactory, cmConversationModel){

        var conversationFactory = new cmFactory(cmConversationModel)

        $rootScope.$on('logout', function(){ conversationFactory.reset() })

        return  conversationFactory
    }
])
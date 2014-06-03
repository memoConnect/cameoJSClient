'use strict';

angular.module('cmConversations').service('cmConversationFactory', [
    'cmConversationsAdapter',
    'cmFactory',
    'cmConversationModel',
    '$rootScope',
    function(cmConversationsAdapter, cmFactory, cmConversationModel, $rootScope) {
        var self = cmFactory(cmConversationModel);

        var _quantity = 0,
            _limit = 10,
            _offset = 0;


        self.getList = function(limit, offset){
            if(typeof limit === 'undefined'){
                limit = _limit;
            }

            if(typeof offset === 'undefined'){
                offset = _offset;
            }

            cmConversationsAdapter.getConversations(limit, offset).then(
                function (data) {
                    _quantity = data.numberOfConversations;

                    data.conversations.forEach(function (conversation_data) {
                        self.create(conversation_data);
                    })
                }
            )
        };

        /**
         * EventHandling
         */
        $rootScope.$on('logout', function(){ self.reset() })

        return self;
    }
]);
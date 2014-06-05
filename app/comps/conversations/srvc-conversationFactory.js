'use strict';

/**
 * @ngdoc object
 * @name cmConversationFactory
 * @description
 * Handles Conversation Instances<br />
 * create new instances and check if instances still exists
 *
 * @requires cmConversationsAdapter
 * @requires cmFactory
 * @requires cmStateManagement
 * @requires cmConversationModel
 * @requires $rootScope
 *
 */
angular.module('cmConversations').service('cmConversationFactory', [
    'cmConversationsAdapter',
    'cmFactory',
    'cmStateManagement',
    'cmConversationModel',
    '$rootScope',
    function(cmConversationsAdapter, cmFactory, cmStateManagement, cmConversationModel, $rootScope) {
        var self = cmFactory(cmConversationModel);

        var _quantity = 0,
            _limit = 10,
            _offset = 0;

        self.state = new cmStateManagement(['loading']);

        self.getList = function(limit, offset){
            self.state.set('loading');

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
            ).finally(
                function(){
                    self.state.unset('loading');
                }
            )
        };

        /**
         * @ngdoc method
         * @methodOf cmConversationFactory
         *
         * @name getQuantity
         * @description
         * Returns Number of all Conversations
         * Quantity is first set in getList()
         *
         * @returns {Number} quantity Number of all Conversations
         */
        self.getQuantity = function(){
            return _quantity;
        }

        /**
         * EventHandling
         */
        $rootScope.$on('logout', function(){ self.reset() });

        return self;
    }
]);
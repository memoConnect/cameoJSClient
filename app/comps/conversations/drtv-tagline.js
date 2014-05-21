'use strict';

angular.module('cmConversations')
.directive('cmTagline', [

    '$filter',

    function($filter){
        
        return { 
            restrict: 'AE',
            scope:  true,           
            template: '{{tagline}}',
            //require: '^cmConversationTag',  

            link: function(scope, element, attr){               
                var latest_message  =   $filter('cmLatestMessage')(scope.conversation)

                function refresh(){
                    scope.tagline       =     scope.conversation.subject
                                            || (latest_message && latest_message.from && latest_message.from.displayName)
                                            || (scope.conversation.recipients.map(function(recipient){ 
                                                return recipient.displayName || 'CONTACT.ERROR.MISSING_DISPLAYNAME' 
                                            }).join(', ') )    
                }

                scope.conversation.on('init', refresh)

                if(latest_message && latest_message.from)
                    latest_message.from.on('init:finish', refresh)

                scope.conversation.recipients.forEach(function(recipient){
                    console.dir(recipient)
                    recipient.on('init:finish', function(){
                        refresh()
                        console.log('FINISH')
                    })
                })

                refresh()
            }
        }
    }
])
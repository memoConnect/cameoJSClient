'use strict';

/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetConversationOverview
 * @description
 * List conversations.
 *
 * @restrict AE
 * @example
 */


angular.module('cmWidgets')
.directive('cmWidgetConversationOverview', [
    function(){
        return {
            restrict:       'AE',
            templateUrl:    '/widgets/drtv-widget-conversations-overview.html',
            controller:     function(){
                                
                            }
        }
    }
]);


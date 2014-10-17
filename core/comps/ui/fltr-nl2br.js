'use strict';
/*

 # Usage in html template:

 "xxx | nl2br"

 <div ng-bind-html=" YourString | nl2br "></div>

 or:

 "xxx | nl2br:Boolean"

 Boolean( true or flase or just keep null) means is xhtml  or not

 if is xhtml, replace with <br/> ; if not , replace with <br>

 <div ng-bind-html=" YourString | nl2br:true "></div>


 -------------------------

 # Example:

 //==Analog data===
 $scope.items = [
 {"message": "test"},
 {"message": "New\nLine"},
 ]
 //=====
 <div class="comment" ng-repeat="item in items">
 <p ng-bind-html=" item.message | nl2br "></p>
 </div>

 -------------------------

 # Output result:

 <div class="comment ng-scope" ng-repeat="item in items">
 <p class="ng-binding" ng-bind-html=" item.message | nl2br ">
 test
 </p>
 </div>
 <div class="comment ng-scope" ng-repeat="item in items">
 <p class="ng-binding" ng-bind-html=" item.message | nl2br ">
 New<br>Line
 </p>
 </div>

 */

angular.module('cmUi')
.filter('nl2br', [
    '$sce',
    function($sce){
        return function(msg, is_xhtml) {
            var is_xhtml = is_xhtml || true;
            var breakTag = (is_xhtml) ? '<br />' : '<br>';
            var msg = (msg + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1'+ breakTag +'$2');
            return $sce.trustAsHtml(msg);
        }
    }
]);
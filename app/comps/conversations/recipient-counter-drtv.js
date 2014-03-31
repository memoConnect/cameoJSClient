function cmRecipientCounter(){
    return {
        restrict : 'AE',
        transclude: true,
        template : '<i class="fa cm-group background"></i><div class="foreground" ng-transclude></div>',
    }
}
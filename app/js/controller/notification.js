//https://github.com/marcorinck/angular-growl

app.controller("demoCtrl", ['$scope', 'growl', function($scope, growl) {
    $scope.addSpecialWarnMessage = function() {
        growl.addWarnMessage("This adds a warn message");
        growl.addInfoMessage("This adds a info message");
        growl.addSuccessMessage("This adds a success message");
        growl.addErrorMessage("This adds a error message");
    }
}]);
var cockpitEdit = angular.module("cockpitEdit", ["ngRoute", "cmApi", "cmLogger"])


cockpitEdit.controller("cockpitEditCtrl", [
    '$scope',
    'cmApi',
    'cmLogger',
    '$routeParams',
    function ($scope, cmApi, cmLogger, $routeParams) {

        $scope.elementName = $routeParams.elementName;
        $scope.elementNameId = $routeParams.id;
        $scope.attributes = [];

        var updatedAttributes = {};
        var initialAttributeData = [];

        $scope.saveSuccess = false;
        $scope.saveFail = false;
        $scope.saveFailText = "request failed";

        cmApi.get({
            url: '/' + $scope.elementName + '/' + $scope.elementNameId
        }).then(
            function (data) {
                if (data.attributes.length > 0) {

                    data.attributes.forEach(function(attribute) {
                       initialAttributeData.push(attribute.data)
                    })

                    $scope.attributes = data.attributes;
                    console.dir($scope.attributes)
                }
            },
            function () {
                cmLogger.error("verdammter Dreckwurschtkram :(")
            }
        );

        /*
         this function is used to store changes back to backend
         */
        $scope.sendElement = function () {

            //get changes from formData
            $scope.attributes.forEach(function(attribute, index) {
                var initial = initialAttributeData[index];
                if (attribute.data !== initial) {
                   updatedAttributes[attribute.name] = attribute.data
                }
            });

            cmApi.put({
                url: '/asdf' + $scope.elementName + '/' + $scope.elementNameId,
                data: updatedAttributes
            }).then(
                function (data) {
                   $scope.saveFail = false
                   $scope.saveSuccess = true
                },
                function (response) {
                    $scope.saveFail = true;
                    $scope.saveSuccess = false;
                    $scope.saveFailText = response.data.error;
                    cmLogger.error("cockpit submit failed: " + response.data.error);
                }
            );

            console.dir(updatedAttributes)
        }
    }
]);
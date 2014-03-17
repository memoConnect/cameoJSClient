var cockpitEdit = angular.module("cockpitEdit", ["ngRoute", "cmApi", "cmLogger"])


cockpitEdit.controller("cockpitEditCtrl", [
    '$scope',
    'cmApi',
    'cmLogger',
    '$routeParams',
    function ($scope, cmApi, cmLogger, $routeParams) {
        $scope.elementName = $routeParams.elementName
        $scope.elementNameId = $routeParams.id
        $scope.elementNameAttributes = {}
        $scope.elementAttributeUpdates = {}
        $scope.formData = {}
        $scope.formDataEditState = {}

        cmApi.get({
            url: '/' + $scope.elementName + '/' + $scope.elementNameId
        }).then(
            function (data) {
                if (data.attributes.length > 0) {
                    $scope.elementNameAttributes = data.attributes
                    angular.forEach($scope.elementNameAttributes, function (elementAttributes) {
                        $scope.formData[elementAttributes.attributeName] = elementAttributes.attributeData
                        $scope.formDataEditState[elementAttributes.attributeName] = elementAttributes.attributeIsEditable
                    })
                }
            },
            function () {
                cmLogger.error("verdammter Dreckwurschtkram :(")
            }
        )

        /*
         this function is used to store changes back to backend
         */
        $scope.sendElement = function () {

            //get changes from formData
            angular.forEach($scope.elementNameAttributes, function (elementAttributes) {
                if (elementAttributes.attributeData != $scope.formData[elementAttributes.attributeName]) {
                    $scope.elementAttributeUpdates[elementAttributes.attributeName] = $scope.formData[elementAttributes.attributeName]
                    cmLogger.debug(elementAttributes.attributeName)
                    cmLogger.debug($scope.elementAttributeUpdates[elementAttributes.attributeName])
                }

            })


//            angular.forEach($scope.elementAttributeUpdates, function (elementAttributeValue, elementAttributeKey) {
//                cmLogger.debug(elementAttributeKey)
//                cmLogger.debug(elementAttributeValue)
//            })


        }
    }
])
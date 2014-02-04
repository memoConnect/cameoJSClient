describe("Hallo world", function(){
    var element, $scope;

    beforeEach(module("cameoClient"))

    beforeEach(inject(function($compile, $rootScope){
        $scope = $rootScope.$new();
        element = angular.element("<div>{{ 2 + 2}}</div>");
        element = $compile(element)($rootScope);
    }))

    it("should equal to 4", function(){
        $scope.$digest();
        expect(element.html()).toBe("4");
    })

    describe("ehSimple", function(){

    });
})
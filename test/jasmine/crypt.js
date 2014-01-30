describe('cmCrypt test', function(){
    var $injector, cmCrypt

    beforeEach(function() {
        $injector = angular.injector([ 'ngMock', 'ng', 'cameoClient' ]);
        cmCrypt = $injector.get( 'cmCrypt' );
    });

    describe('calling hash with a string', function(){
        it('returns a hash', function(){
            expect( cmCrypt.hash("Wumms") ).toEqual("155de1086ab65e6443f52894bda880359e30f19bd44e494e4b74c7615cb3e1da");
        })
    })

    describe('calling hash with empty string', function(){
        it('returns "', function(){
            expect( cmCrypt.hash() ).toEqual("");
        })
    })
});
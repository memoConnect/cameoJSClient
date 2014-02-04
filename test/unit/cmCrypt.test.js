describe ('cmCrypt Test', function(){
    var cmCrypt = null;

    beforeEach(module("cameoClient"))

    it('it should be the same string', function(){
        console.log("hello willy")
        expect(cmCrypt.hash('moepmoep')).toEqual('6fbedb8efa1025ba524c1654d15573d6c486698ce5365c3966ce4ed7c8d3fd4e!');
    });

});
describe('A simpel test suite', function() {
    var testMe;

    beforeEach(function() {
        testMe = true;
    });

    describe("A Stupid Test", function() {
        it("stupid result", function() {
            expect(1 == 1);
        });
    });

    it('contains spec with an expectation', function() {
        expect(true).toBe(true);
    });
});

describe("A spec (with setup and tear-down)", function() {
    var foo;

    beforeEach(function() {
        foo = 0;
        foo += 1;
    });

    afterEach(function() {
        foo = 0;
    });

    it("is just a function, so it can contain any code", function() {
        expect(foo).toEqual(1);
    });

    it("can have more than one expectation", function() {
        expect(foo).toEqual(1);
        expect(true).toEqual(true);
    });
});


var expect = require('chai').expect;

describe('Chapter 6', function() {
  describe('Instantiation', function() {
    context('with a constructor', function() {
      var giles;

      beforeEach(function() {
        function Drummer() { };
        Drummer.prototype.openStroke = function() { return 'open stroke!' };
        giles = new Drummer();
      });

      it('creates a newly allocated object', function() {
        expect(giles).to.be.defined;
      });

      it('attaches the prototype methods to the reference', function() {
        expect(giles.openStroke).to.be.defined
      });

      it('allows prototype methods to be called', function() {
        expect(giles.openStroke()).to.eq('open stroke!');
      });
    });

    context('without a constructor', function() {
      var giles;

      beforeEach(function() {
        function Drummer() { return 'drumming'; };
        Drummer.prototype.openStroke = function() { return 'open stroke!' };
        giles = Drummer();
      });

      it('returns the result of the original function call', function() {
        expect(giles).to.eq('drumming');
      });

      it('never passes the prototype methods to the reference', function() {
        expect(giles.openStroke).to.be.undefined
      });
    });
  });
});

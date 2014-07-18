var expect = require('chai').expect;

describe('Chapter 6', function() {
  describe('Instantiation', function() {
    context('with a constructor', function() {
      var reference;

      beforeEach(function() {
        function Creation() { };
        Creation.prototype.create = function() { return 'create' };
        reference = new Creation();
      });

      it('creates a newly allocated object', function() {
        expect(reference).to.be.defined;
      });

      it('attaches the prototype methods to the reference', function() {
        expect(reference.create).to.not.be.undefined
      });

      it('allows prototype methods to be called', function() {
        expect(reference.create()).to.eq('create');
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

    context('precedence', function() {
      it('favors instance methdods over prototype methods', function() {
        function Drummer() {
          this.openStroke = function() {
            return 'open stroke as instance method!';
          };
        };
        Drummer.prototype.openStroke = function() { return 'open stroke!'; };
        var bobby = new Drummer();

        expect(bobby.openStroke()).to.eq('open stroke as instance method!');
      });
    });

    context('reference reconciliation', function() {
      it('live updates the object prototype once referenced', function() {
        function Drummer() { };
        var bobby = new Drummer();

        Drummer.prototype.openStroke = function() { return 'open stroke!'; };
        expect(bobby.openStroke()).to.eq('open stroke!');
      });

      it('cannot update the prototype if the object has already been referenced', function() {
        function Drummer() { };
        var bobby = new Drummer();

        expect(bobby.doubleStroke).to.be.undefined
        Drummer.prototype.doubleStroke = function() { return 'double stroke'; };
      });

      it('still resolves property references first', function() {
        function Drummer() {
          this.openStroke = function() {
            return 'open stroke as instance method!';
          };
        };
        var bobby = new Drummer();
        Drummer.prototype.openStroke = function() { return 'open stroke!'; };

        expect(bobby.openStroke()).to.eq('open stroke as instance method!');
      });
    });

    context('object typing', function() {
      it('uses instanceOf to find the constructor', function() {
        function Creation() { };
        reference = new Creation();

        expect(reference instanceof Creation).to.eq(true);
      });

      it('objects have a constructor property', function() {
        function Creation() { };
        reference = new Creation();

        expect(reference.constructor).to.eq(Creation);
      });

      it('constructor properties can build objects even when no longer in scope', function() {
        function Creation() { };
        reference = new Creation();
        another_reference = new reference.constructor();

        expect(another_reference instanceof Creation).to.eq(true);
      });
    });
  });
});

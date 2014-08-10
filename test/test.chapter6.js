var expect = require('chai').expect;

describe('Chapter 6', function() {
  var reference;

  describe('Instantiation', function() {
    context('with a constructor', function() {

      beforeEach(function() {
        function Creation() { };
        Creation.prototype.grow = function() { return 'growing' };
        reference = new Creation();
      });

      it('creates a newly allocated object', function() {
        expect(reference).to.be.defined;
      });

      it('attaches the prototype methods to the reference', function() {
        expect(reference.grow).to.exist
      });

      it('allows prototype methods to be called', function() {
        expect(reference.grow()).to.eq('growing');
      });
    });

    context('without a constructor', function() {

      beforeEach(function() {
        function Creation() { return 'created'; };
        Creation.prototype.grow = function() { return 'growing' };
        reference = Creation();
      });

      it('returns the result of the original function call', function() {
        expect(reference).to.eq('created');
      });

      it('never passes the prototype methods to the reference', function() {
        expect(reference.grow).to.be.undefined
      });
    });

    context('precedence', function() {
      it('favors instance methods over prototype methods', function() {
        function Creation() {
          this.grow = function() {
            return 'open stroke as instance method!';
          };
        };
        Creation.prototype.grow = function() { return 'open stroke!'; };
        var reference = new Creation();

        expect(reference.grow()).to.eq('open stroke as instance method!');
      });
    });

    context('reference reconciliation', function() {
      it('live updates the object prototype once referenced', function() {
        function Creation() { };
        var reference = new Creation();

        Creation.prototype.grow = function() { return 'open stroke!'; };
        expect(reference.grow()).to.eq('open stroke!');
      });

      it('cannot update the prototype if the object has already been referenced', function() {
        function Creation() { };
        var reference = new Creation();

        expect(reference.growFaster).to.be.undefined
        Creation.prototype.growFaster = function() { return 'double stroke'; };
      });

      it('still resolves property references first', function() {
        function Creation() {
          this.grow = function() {
            return 'open stroke as instance method!';
          };
        };
        var reference = new Creation();
        Creation.prototype.grow = function() { return 'open stroke!'; };

        expect(reference.grow()).to.eq('open stroke as instance method!');
      });
    });

    context('object typing', function() {
      it('uses instanceOf to find the constructor', function() {
        function Creation() { };
        reference = new Creation();

        expect(reference instanceof Creation).to.be.true;
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

        expect(another_reference instanceof Creation).to.be.true;
      });
    });

    context('prototype chain', function() {

      it('is preserved when the prototype is an instance of the parent', function() {
        function Parent() { };
        function Child() { };

        Child.prototype = new Parent();
        reference = new Child();

        expect(reference).to.be.an.instanceOf(Parent);
      });

      it('is not preserved when the prototype tries to replicate each object method directly', function() {
        function Parent() { };
        Parent.prototype.mad = function() {}

        function Child() { };

        Child.prototype = { mad: Parent.prototype.mad }
        reference = new Child();

        expect(reference).to.not.be.an.instanceOf(Parent);
      });

      it('copies the parent methods for the child', function() {
        function Parent() { };
        Parent.prototype.mad = function() {}

        function Child() { };

        Child.prototype = new Parent();
        reference = new Child();

        expect(reference.mad).to.be.a('function');
      });
    });

    context('the gotchyas', function() {

      it('do not modify Object.prototype', function() {
        Object.prototype.keys = function() {
          var keys = [];
          for (var p in this) keys.push(p);
          return keys
        }

        reference = { a: 1, b: 3 };

        //length will never be accurate, since keys is a key itself
        //in our test, the length is 3 when we would expect 2

        expect(reference.keys().length).to.eq(3);
      });

      it('without a constructor, the reference is undefined', function() {
        function Parent() { };

        reference = Parent();
        expect(reference).to.be.undefined
      });
    });
  });
});

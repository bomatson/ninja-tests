var expect = require('chai').expect,
    Chapter3 = require('../chapter3');

describe('Chapter 3', function() {
  describe('3.1 declaring functions', function() {
    beforeEach( function() {
      test = {};
    })
    it('can be named', function() {
      function named() { return 'named function!' };
      expect(named()).to.equal('named function!');
    })

    it('can be a variable', function() {
      var variableFunction = function() { return 'anon function' };
      expect(variableFunction()).to.equal('anon function');
    })

    it('can be a property', function() {
      test.myFunction = function() { return 'anon function' };
      expect(test.myFunction()).to.equal('anon function');
    })

    it('named functions can be forward referenced', function() {
      expect(named).to.exist;
      function named() { return 'named function!' };
    })

    it('anonymous functions via variable cannot be forward referenced', function() {
      expect(variableFunction).to.be.undefined;
      var variableFunction = function() { return 'anon function!' };
    })

    it('anonymous functions via property cannot be forward referenced', function() {
      expect(test.otherFunction).to.be.undefined;
      test.otherFunction = function() { return 'anon function' };
    })
  })

  describe('3.2 anonymous functions', function() {
    beforeEach( function() {
      rogue = { recurseMe: Chapter3.recurseMe };
    })
    it('can be used recursively', function() {
      expect(Chapter3.recurseMe(3)).to.equal('bobbyyy');
    })

    it('and reused for other objects', function() {
      expect(rogue.recurseMe(4)).to.equal('bobbyyyy');
    })

    it('can reuse functions even after wiping out the original function', function() {
      Chapter3.recurseMe = {}
      expect(rogue.recurseMe(4)).to.equal('bobbyyyy');
    })

    it('can also use the arguments callee instead of the function name', function() {
      expect(Chapter3.recurseWithCallee(4)).to.equal('bobbyyyy');
    })
  })
  describe('3.3 functions as objects', function() {
    before( function() {
      reader = function() {};
    })
    it('can store a function on Chapter3', function() {
      expect(Chapter3.add(reader)).to.be.true;
    })
    it('can keep track of the number of functions stored', function() {
      expect(Chapter3.functionId).to.eq(1);
    })
    it('does not store the same function twice', function() {
      Chapter3.add(reader);
      expect(Chapter3.functionId).to.eq(1);
    })
    it('memoize when set up with a cache', function() {
      expect(Chapter3.cache).to.have.property('0', reader);
    })
  })
  describe('3.4 context', function() {
    it('can use this in a method on an object', function() {
      Chapter3.increment();
      expect(Chapter3.length).to.equal(1);
    })
    it('can use this in a standalone function', function() {
      function alone() { this.lonelyFactor = 1; };
      alone();
      expect(lonelyFactor).to.equal(1);
    })
    //the context of a functionn depends on how it is invoked, not declared!
    it('can use call to change the context of the function call', function() {
      var bobby = {};
      expect(Chapter3.context.call(bobby)).to.equal(bobby);
    })
    it('can use call to change the context of the function call with individual arguments', function() {
      var bobby = { length: 2 };
      expect(Chapter3.incrementBy.call(bobby, 3, 5)).to.equal(10);
    })
    it('can use apply to change the context of the function call with an array of arguments', function() {
      var bobby = { length: 3 };
      expect(Chapter3.incrementBy.apply(bobby, [3, 5])).to.equal(11);
    })
    it('can use call in a function that serves as a callback', function() {
      var newArray = []
      Chapter3.iterate([1,2,3], function(value, n){ newArray.push(value) })
      expect(newArray).to.eql([1,2,3]);
    })
    it('allow simulation of other object properties', function() {
      Chapter3.length = 0
      Chapter3.actuallyIncrement(1);
      expect(Chapter3.length).to.eql(1);
    })
    it('uses prototype to simulate entire function calls', function() {
      expect(Chapter3[0]).to.eql(1);
    })
  })
  describe('3.5 function overloading', function() {
    it('uses the arguments object for overloading', function() {
      expect(Chapter3.overloading('one argument')).to.eq('Only one argument');
    })
    it('supports function overloading with multiple args', function() {
      expect(Chapter3.overloading('so', 'many', 'args')).to.eq(' so many args');
    })
    it('uses length on any function to supply parameter count from declaration', function() {
      expect(Chapter3.include.length).to.eq(2);
    })
    it('can change behavior based on callback length', function() {
      expect(Chapter3.include('bobby', function(){})).to.eq('bobby');
    })
    it('responds to callbacks with multiple args', function() {
      expect(Chapter3.include('bobby', function(multi, args){})).to.eq('more than one callback arg');
    })
  })
  describe('3.6 checking for functions', function() {
    it('uses typeof to determine if the property is a function', function() {
      expect(typeof Chapter3.imaFunction == 'function').to.be.true
    })
  })
})

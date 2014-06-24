var expect = require('chai').expect,
    Chapter4 = require('../chapter4'),
    test, rogue, reader, Construction;

describe('Chapter 4', function() {
  describe('4.2 anonymous functions', function() {
    beforeEach( function() {
      rogue = { recurseMe: Chapter4.recurseMe };
    })
    it('can be used recursively', function() {
      expect(Chapter4.recurseMe(3)).to.equal('bobby-bob-bob-bob');
    })

    it('and reused for other objects', function() {
      expect(rogue.recurseMe(4)).to.equal('bobby-bob-bob-bob-bob');
    })

    it('can reuse functions even after wiping out the original function', function() {
      Chapter4.recurseMe = {}
      expect(rogue.recurseMe(4)).to.equal('bobby-bob-bob-bob-bob');
    })

    it('can use named functions for recursion', function() {
      expect(Chapter4.recurseWithNamed(4)).to.equal('bobbyyyy');
    })

    it('can also use the arguments callee instead of the function name', function() {
      expect(Chapter4.recurseWithCallee(4)).to.equal('bobbyyyy');
    })
  })
  describe('4.3 functions as objects', function() {
    before( function() {
      reader = function() {};
    })
    it('can store a function on Chapter4', function() {
      expect(Chapter4.add(reader)).to.be.true;
    })
    it('can keep track of the number of functions stored', function() {
      expect(Chapter4.functionId).to.eq(1);
    })
    it('does not store the same function twice', function() {
      Chapter4.add(reader);
      expect(Chapter4.functionId).to.eq(1);
    })
    it('memoize when set up with a cache', function() {
      expect(Chapter4.cache).to.have.property('0', reader);
    })
  })
  describe('context', function() {
    it('can use this in a method on an object', function() {
      Chapter4.increment();
      expect(Chapter4.length).to.equal(1);
    })
    it('can use this in a standalone function', function() {
      function alone() { this.lonelyFactor = 1; };
      alone();
      expect(lonelyFactor).to.equal(1);
    })
    //the context of a functionn depends on how it is invoked, not declared!
    it('can use call to change the context of the function call', function() {
      var bobby = {};
      expect(Chapter4.context.call(bobby)).to.equal(bobby);
    })
    it('can use call to change the context of the function call with individual arguments', function() {
      var bobby = { length: 2 };
      expect(Chapter4.incrementBy.call(bobby, 3, 5)).to.equal(10);
    })
    it('can use apply to change the context of the function call with an array of arguments', function() {
      var bobby = { length: 3 };
      expect(Chapter4.incrementBy.apply(bobby, [3, 5])).to.equal(11);
    })
    it('can use call in a function that serves as a callback', function() {
      var newArray = []
      Chapter4.iterate([1,2,3], function(value, n){ newArray.push(value) })
      expect(newArray).to.eql([1,2,3]);
    })
    it('allow simulation of other object properties', function() {
      Chapter4.length = 0
      Chapter4.actuallyIncrement(1);
      expect(Chapter4.length).to.eql(1);
    })
    it('uses prototype to simulate entire function calls', function() {
      expect(Chapter4[0]).to.eql(1);
    })
  })
  describe('4.4 variable length lists and function overloading', function() {
    it('uses the arguments object for overloading', function() {
      expect(Chapter4.overloading('one argument')).to.eq('Only one argument');
    })
    it('supports function overloading with multiple args', function() {
      expect(Chapter4.overloading('so', 'many', 'args')).to.eq(' so many args');
    })
    it('uses length on any function to supply parameter count from declaration', function() {
      expect(Chapter4.include.length).to.eq(2);
    })
    it('can change behavior based on callback length', function() {
      expect(Chapter4.include('bobby', function(){})).to.eq('bobby');
    })
    it('responds to callbacks with multiple args', function() {
      expect(Chapter4.include('bobby', function(multi, args){})).to.eq('more than one callback arg');
    })
  })
  describe('4.5 checking for functions', function() {
    it('uses typeof to determine if the property is a function', function() {
      expect(typeof Chapter4.imaFunction == 'function').to.be.true
    })
  })
})

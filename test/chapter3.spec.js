var expect = require('chai').expect
var Chapter3 = {};
var bobby;

describe('Chapter 3', function() {
  describe('3.1 declaring functions', function() {
    it('can be named', function() {
      function named() { return 'named function!' };
      expect(named()).to.equal('named function!');
    })

    it('can be a variable', function() {
      var variableFunction = function() { return 'anon function' };
      expect(variableFunction()).to.equal('anon function');
    })

    it('can be a property', function() {
      Chapter3.myFunction = function() { return 'anon function' };
      expect(Chapter3.myFunction()).to.equal('anon function');
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
      expect(Chapter3.otherFunction).to.be.undefined;
      Chapter3.otherFunction = function() { return 'anon function' };
    })
  })

  describe('3.2 anonymous functions', function() {
    beforeEach( function() {
      Chapter3 = {
        spit: function(n) {
          return n > 0 ? this.spit(n - 1) + 'y' : 'bobb'
      }};
    })
    it('can be used recursively', function() {
      expect(Chapter3.spit(3)).to.equal('bobbyyy');
    })

    it('and reused for other objects', function() {
      var rogue = { spit: Chapter3.spit };
      expect(rogue.spit(4)).to.equal('bobbyyyy');
    })

    it('can reuse functions even after wiping out the original object', function() {
      var rogue = { spit: Chapter3.spit };
      Chapter3 = {};
      expect(rogue.spit(4)).to.equal('bobbyyyy');
    })

    it('can also use the arguments callee instead of the function name', function() {
      Chapter3 = {
        spit: function(n) {
          return n > 0 ? arguments.callee(n-1) + 'y' : 'bobb'
      }};
      expect(Chapter3.spit(4)).to.equal('bobbyyyy');
    })
  })
  describe('3.3 functions as objects', function() {
    before( function() {
      reader = function() {}
      Chapter3 = {
        cache: {},
        functionId: 0,
        add: function(func) {
          if(func.id == undefined) {
            func.id = this.functionId++;
            return !!(this.cache[func.id] = func);
          }
      }}
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
  })
})

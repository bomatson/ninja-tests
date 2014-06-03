var expect = require('chai').expect
var Chapter3 = {
  spit: function(n) {
    return n > 0 ? this.spit(n - 1) + 'y' : 'bobb'
}}

describe('Chapter 3', function() {
  describe('3.1 declaring functions', function() {
    it('can be named', function() {
      function named() { return 'named function!' }
      expect(named()).to.equal('named function!');
    })

    it('can be a variable', function() {
      var variableFunction = function() { return 'anon function' };
      expect(variableFunction()).to.equal('anon function');
    })

    it('can be a property', function() {
      Chapter3.myFunction = function() { return 'anon function' }
      expect(Chapter3.myFunction()).to.equal('anon function');
    })

    it('named functions can be forward referenced', function() {
      expect(named).to.exist
      function named() { return 'named function!' }
    })

    it('anonymous functions via variable cannot be forward referenced', function() {
      expect(variableFunction).to.be.undefined
      var variableFunction = function() { return 'anon function!' }
    })

    it('anonymous functions via property cannot be forward referenced', function() {
      expect(Chapter3.otherFunction).to.be.undefined
      Chapter3.otherFunction = function() { return 'anon function' }
    })
  })

  describe('3.2 anonymous functions', function() {
    it('can be used recursively', function() {
      expect(Chapter3.spit(3)).to.equal('bobbyyy')
    })

    it('and reused for other objects', function() {
      var rogue = { spit: Chapter3.spit }
      expect(rogue.spit(4)).to.equal('bobbyyyy')
    })

    it('can reuse functions even after wiping out the original object', function() {
      var rogue = { spit: Chapter3.spit }
      Chapter3 = {}
      expect(rogue.spit(4)).to.equal('bobbyyyy')
    })
  })
})

var expect = require('chai').expect;

describe('Chapter 3', function() {
  describe('3.1 what with the functional?', function() {
    it('uses callbacks as function params', function() {
      function gimmeCallback(ring) { return ring() }
      expect(gimmeCallback(function() { return 'ring'})).to.eq('ring');
    });
  });

  describe('3.2 declaring functions', function() {
    beforeEach( function() {
      test = {};
    })

    context('named functions', function() {
      it('can be named', function() {
        function named() { return 'named function!' };
        expect(named()).to.equal('named function!');
      });

      it('are given a name property', function() {
        function named() { return 'named function!' };
        expect(named.name).to.equal('named');
      });

      it('can be a property with a named function', function() {
        test.myFunction = function roberto() { return 'anon function' };
        expect(test.myFunction.name).to.equal('roberto');
      });

      it('can be forward referenced', function() {
        expect(named).to.exist;
        function named() { return 'named function!' };
      });
    });

    context('anonymous functions', function() {
      it('can be a variable', function() {
        var variableFunction = function() { return 'anon function' };
        expect(variableFunction()).to.equal('anon function');
      });

      it('can be a property', function() {
        test.myFunction = function() { return 'anon function' };
        expect(test.myFunction()).to.equal('anon function');
      });

      it('cannot be forward referenced when delcared as variables', function() {
        expect(variableFunction).to.be.undefined;
        var variableFunction = function() { return 'anon function!' };
      });

      it('cannot be forward referenced when declared as properties', function() {
        expect(test.otherFunction).to.be.undefined;
        test.otherFunction = function() { return 'anon function' };
      });
    });

    context('scoping functions', function() {
      it('local variable declaration extends to the end of the function', function() {
        function outside() {
          if (true) {
            var insideConditional = 'declared';
          }
          return insideConditional
        }
        expect(outside()).to.equal('declared')
      });

      it('local named function declarations are forward referenced', function() {
        function outside() {
          return inner()
          function inner() { return 'declared' }
        }
        expect(outside()).to.equal('declared')
      });
    });

    context('invoking functions', function() {
      it('as a function', function() {
        function invokeMe() { return 'invoked' }
        expect(invokeMe()).to.equal('invoked')
      });

      it('as a method', function() {
        function invokeMe() { return 'invoked' }
        test = { invoke: invokeMe }
        expect(test.invoke()).to.equal('invoked')
      });

      context('as a constructor', function() {
        it('a new instance is created', function() {
          function Construction() {
            this.creep = function() {return 'creeping'}
          }
          var skyscraper = new Construction()
          expect(skyscraper).to.be.instanceof(Construction)
        });

        it('context is the new object', function() {
          function Construction() {
            this.creep = function() {return this}
          }
          var skyscraper = new Construction()
          expect(skyscraper.creep()).to.equal(skyscraper)
        });
      });

      context('with apply and call', function() {
        it('uses the context with list of parameters', function() {
          function addThemAll() {
            var change = 0;
            for (var n = 0; n < arguments.length; n++) {
              change += arguments[n]
            }
            this.change = change;
          }
          addThemAll.call(test, 1,2,3)
          expect(test.change).to.equal(6)
        });

        it('uses the context with an array of parameters', function() {
          function addThemAll() {
            var change = 0;
            for (var n = 0; n < arguments.length; n++) {
              change += arguments[n]
            }
            this.change = change;
          }
          addThemAll.apply(test, [1,2,3,4])
          expect(test.change).to.equal(10)
        });
      });
    });
  });
});

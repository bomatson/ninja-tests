var expect = require('chai').expect;

describe('Chapter 5', function() {
  describe('Basic closures', function() {
    var outsideScope;

    it('allow access to scoped variables at declaration', function() {
      function testClosure() {
        var innerVar = 'inner';
        function closure() {
          return innerVar;
        };
        outsideScope = closure;
      }
      testClosure();
      expect(outsideScope()).to.eq('inner');
    });

    it('grant access to parameters in closures', function() {
      function testClosure() {
        var innerVar = 'inner';
        function closureWithParam(myParam) {
          return innerVar + myParam;
        };
        outsideScope = closureWithParam;
      }
      testClosure();
      expect(outsideScope(' param')).to.eq('inner param');
    });

    it('cannot forward reference variable outside the scope', function() {
      function testClosure() {
        function closureTooLate() {
          return tooLate;
        };
        outsideScope = closureTooLate;
      }
      testClosure();
      expect(outsideScope()).to.be.undefined;
      var tooLate = 'wait i am here!';
    });

    it('can be forward referenced before called', function() {
      function testClosure() {
        function closureOnTime() {
          return onTime;
        }
        outsideScope = closureOnTime;
      }
      var onTime = 'wait i am here!';
      testClosure();
      expect(outsideScope()).to.eq('wait i am here!');
    });
  });

  describe('Closures with privates', function() {
    beforeEach( function() {
      function Closure() {
        //this is private
        var privateVars = 0;

        this.increment = function() {
          privateVars++;
        }
        //this is an accessor
        this.count = function() {
          return privateVars;
        }
      }
      closure  = new Closure(); //this is a constructor
      closure.increment();
    });

    it('have access to exposed functions', function() {
      expect(closure.count()).to.eq(1);
    });

    it('do not have access to its privates outside of the closure', function() {
      expect(closure.privateVars).to.be.undefined
    });
  });

  describe('Baking with contexts', function() {
    it('does not give mom the ingredients', function() {
      //define my cake obj
      var cake = {
        ingredients: ['flour', 'sugar', 'candles']
      }

      // another function wants to use my ingredients
      var mom = function() {
        return this.ingredients
      }
      expect(mom()).to.be.undefined;
    });

    it('unless I use bind to give her access to the cake context', function() {
      var cake = {
        ingredients: ['flour', 'sugar', 'candles']
      }

      var mom = function() {
        return this.ingredients
      }

      var baker = mom.bind(cake);
      expect(baker()).to.eql(['flour', 'sugar', 'candles']);
    });

    // bind is especially useful when using functions as callbacks to event handlers
  })
  describe('Partially applying functions', function() {
  })
})

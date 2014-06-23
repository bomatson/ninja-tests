var expect = require('chai').expect,
    Chapter4 = require('../chapter4'),
    outsideScope;

describe('Chapter 4', function() {
  describe('4.1 How Closures Work', function() {
    it('allow access to scoped variables at declaration', function() {
      function testClosure() {
        var innerVar = 'inner';
        function closure() {
          return innerVar
        }
        outsideScope = closure;
      }
      testClosure()
      expect(outsideScope()).to.eq('inner');
    })
    it('grant access to parameters in closures', function() {
      function testClosure() {
        var innerVar = 'inner';
        function closureWithParam(myParam) {
          return innerVar + myParam
        }
        outsideScope = closureWithParam;
      }
      testClosure()
      expect(outsideScope(' param')).to.eq('inner param');
    })
    it('cannot forward reference the variable outside the scope of the closure', function() {
      function testClosure() {
        function closureTooLate() {
          return tooLate
        }
        outsideScope = closureTooLate;
      }
      testClosure()
      expect(outsideScope()).to.be.undefined
      var tooLate = 'wait i am here!'
    })
    it('can be forward referenced before closure is called', function() {
      function testClosure() {
        function closureTooLate() {
          return tooLate
        }
        outsideScope = closureTooLate;
      }
      var tooLate = 'wait i am here!'
      testClosure()
      expect(outsideScope()).to.eq('wait i am here!');
    })
  })
  describe('4.2 Putting Closures to Work', function() {
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
      closure  = new Closure() //this is a constructor
      closure.increment();
    })
    it('has access to the accessor', function() {
      expect(closure.count()).to.eq(1);
    })

    it('does not have access to the private vars', function() {
      expect(closure.privateVars).to.be.undefined
    })
  })
  describe('4.3 Binding Function Contexts', function() {
    //wtf bind
  })
})

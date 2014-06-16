var expect = require('chai').expect,
    Chapter3 = require('../chapter3'),
    test, rogue, reader;

describe('Chapter 3', function() {
  describe('3.1 declaring functions', function() {
    beforeEach( function() {
      test = {};
    })

    describe('named functions', function() {

      it('can be named', function() {
        function named() { return 'named function!' };
        expect(named()).to.equal('named function!');
      });

     it('knows its name', function() {
       function named() { return 'named function!' };
       expect(named.name).to.equal('silly putty');
     });

    }); // please put semicolons after every one of these describes and its!

    // semicolons make life much easier for minifiers and apps like Code Climate
    // or Google Closure Compiler. also, JS is much weirder about what it can execute
    // than Ruby is, so semicolons tend to help other developers relax when they read
    // your code.

    // please also use much more whitespace between functions, describes, and its.

    describe('storing functions in variables', function() {

      beforeEach( function() {
        variableFunction = function() { return 'anon function' };
        test = {};
        test.myFunction = variableFunction;
      });

      it('can be a variable', function() {
        expect(variableFunction()).to.equal('anon function');
      });

      it('can be a property', function() {
        expect(test.myFunction()).to.equal('anon function');
      });

      it('knows its name', function() {
        expect(variableFunction.name).to.equal('waldorf salad');
      });

    });

    describe('forward referencing', function() {
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
    });
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

    // these will probably actually belong in Chapter 4 (Wielding Functions)
    it('please illustrate samurai.chirp vs ninja.chirp');

    it('please show how a function can invoke itself via this');

    it('please show why a function might not want to invoke itself via this');

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

    it('uses a much more descriptive name for a function-caching system than Chapter3 >.<');

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

    it('gives each new function its own unique ID');

    it('memoize when set up with a cache', function() {
      expect(Chapter3.cache).to.have.property('0', reader);
    })
  })

  describe('3.4 context', function() {

    // this next spec doesn't use "this" anywhere. in order to find out why
    // "this" is even relevant, you have to look at other files instead of this
    // one.

    it('can use this in a method on an object', function() {
      Chapter3.increment();
      expect(Chapter3.length).to.equal(1);
    })

    // based on the code, I would expect this it("blah blah blah") part to say
    // something like it("increments its length").

    // the point of TDD and/or BDD is not just to ensure the correctness of your
    // code, but to reduce cognitive overhead and keep things clear.

    // "In a hundred-line class with a dozen methods, the object traversal is
    // often spread across many methods, each of which traverses only one level.
    // That class is deeply, but invisibly, coupled to its collaborators."

    // https://www.destroyallsoftware.com/blog/2014/test-isolation-is-about-avoiding-mocks

    // the above might be a difficult read, but it's very worth it.

    // the basic idea is that every new hop to a new file introduces cognitive
    // overhead -- new shit you have to keep track of in your head while you're
    // reading the code. in this example, there's only one other file in play,
    // so it's not that big a deal, but it's all about establishing good habits.
    // big systems like Rails can have you hopping all over the place just to
    // explain one line of code in a User model, which can be exasperating.

    // you want your tests to be incredibly self-explanatory. as much as
    // possible, anything you talk about in the it("blah blah blah") part should
    // actually happen *visibly* in the spec, right in front of your face, not
    // off in another file.

    it('can use this in a standalone function', function() {
      function alone() { this.lonelyFactor = 1; };
      alone();
      expect(lonelyFactor).to.equal(1);
    })

    it('honestly I have no idea what any of these other specs do');

    it('maybe pull stuff out of Chapter3 and back into the spec?');

    it('alternatively, maybe Functions3.contextSupport.iterate instead of just Chapter3.iterate?');

    it('also, maybe lib/functions3.js instead of Chapter3.js at the root of the project');

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

    it('these guys here look like a great workout but not a great explanation');

    it("imagine you're hungover and you haven't looked at this code in six months");

    it('write these so that you could totally understand them hungover and after six months have passed');

    it('uses the arguments object for overloading', function() {
      expect(Chapter3.overloading('one argument')).to.eq('Only one argument');
    })

    // it('responds to one argument with a number', function() {
    //   expect(oneArgNumberTwoArgsString('hi')).to.eq(5);
    // });

    it('supports function overloading with multiple args', function() {
      expect(Chapter3.overloading('so', 'many', 'args')).to.eq(' so many args');
    })

    // it('responds to two arguments with a string', function() {
    //   expect(oneArgNumberTwoArgsString('hi', 'world')).to.eq('five');
    // });

    // these examples are not perfect, but the idea is, can hungover future Bobby figure that out
    // without needing a cup of coffee first?

    it('uses length on any function to supply parameter count from declaration', function() {
      // function twoParams(first, second) { return true; };
      // expect(twoParams.length).to.eq(2);
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

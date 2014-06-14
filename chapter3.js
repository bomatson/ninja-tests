var Chapter3 = {
  recurseMe: function(n) {
    return n > 0 ? this.recurseMe(n - 1) + 'y' : 'bobb'
  },
  recurseWithCallee: function(n) {
    return n > 0 ? arguments.callee(n-1) + 'y' : 'bobb'
  },
  cache: {},
  functionId: 0,
  add: function(func) {
    if(func.id == undefined) {
      func.id = this.functionId++;
      return !!(this.cache[func.id] = func);
    }
  },
  length: 0,
  increment: function() {
    this.length++;
  },
  context: function() {
    return this;
  },
  incrementBy: function(a, b) {
    return (this.length + a + b);
  },
  iterate: function(array, fn){
    for(i = 0; i < array.length; i++) {
      if (fn.call(array, array[i], i) === false) break;
    }
  },
  actuallyIncrement: function(obj) {
    Array.prototype.push.call(this, obj);
    // similar to increment above, but using protype acutally increments the length prop
    // also, this adds a numbered property to the object, so you can call Chapter3[index]
  },
  overloading: function() {
    if(arguments.length < 2){
      return 'Only ' + arguments[0]
    }
    var sentence = ''
    for(i = 0; i < arguments.length; i++){
      sentence += ' ' + (arguments[i])
    }
    return sentence
  },
  include: function(params, func){
    if(func.length > 1){
      return 'more than one callback arg'
    }
    return params
  },
  imaFunction: function() { }
}
module.exports = Chapter3;

Chapter4 = {
  testClosure: function() {
    var innerVar = 'inner';
    function closure() {
      return innerVar
    }
    outsideScope = closure;
  }
}
module.exports = Chapter4;

(function(){
  if (typeof Asteroids === 'undefined'){
    window.Asteroids = {};
  }

  var Utils = window.Asteroids.Utils = {};

  Utils.inherits = function(child, parent){
    function Surrogate(){}
    Surrogate.prototype = parent.prototype;
    child.prototype = new Surrogate();
    child.prototype.constructor = child;
  };

  Utils.randomVec = function(length){
    var x = Math.random(), y = Math.random();
    var scaler = (length/Math.sqrt((x * x) + (y * y)));
    var randomVec = [x * scaler, y * scaler];
    return randomVec;
  };
})();

var add = function (a, b, callback) {
  setTimeout(function () {
    callback(a + b);
  }, 1000);
};

var sub = function (a, b, callback) {
  setTimeout(function () {
    callback(a - b);
  }, 1000);
};

var div = function (a, b, callback) {
  setTimeout(function () {
    callback(a / b);
  }, 1000);
};

add(10, 25, function (addR) {
  sub(addR, 10, function (subR) {
    div(subR, 2, function (r) {
      console.log(r); // 3초후 나옴
    });
  });
});



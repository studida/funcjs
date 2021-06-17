function test(a, b, c) {
  console.log("a b c: ", a, b, c);
  console.log('this: ', this);
  console.log('arguemnts: ', arguments);
}

test(10);

function test2(a, b) {
  b = 10;
  console.log(arguments);
}
test2(1); // [1]
test2(1, 2); // [1, 10] ??


test.call(undefined, 1, 2, 3);
test.call(null, 1, 2, 3);
test.call(void 0, 1, 2, 3);
// 모두 window로 this가 bind(node면 global obj)

var o1 = { name: 'obj1' };
test.call(o1, 1, 2, 3,); // this는 o1 이 된다

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
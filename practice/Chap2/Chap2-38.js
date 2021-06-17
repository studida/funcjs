// 익명함수에서의 자기 참고
var f1 = function () {
  console.log(f1);
}
f1();

// 의도하지 않은동작이 될 위험성 내포(f1의 변경)
var f2 = f1;
f1 = 'hi~~~~';
f2();

// 위 문제를 해결하지만, arguments.callee 을 써야함(es5의 strict mode에서 사용 불가)
var f1 = function () {
  console.log(arguments.callee);
}
f1(); // func

var f2 = f1;
f1 = 'hi~~~~';
f2(); // func

function flatten(arr) {
  return function f (arr, new_arr) {
    arr.forEach(function (v) {
      Array.isArray(v) ? f(v, new_arr) : new_arr.push(v);
    });
    return new_arr;
  }(arr, []);
}

console.log(flatten([1, [2], [3, 4]]));
console.log(flatten([1, [2], [[3], 4]]));
console.log(flatten([1, [2], [[3], [4, [5]]]]));

// 즉시실행 + 유명함수 기법이 아닌 경우
function flatten2(arr, new_arr) {
  arr.forEach(function(v) {
    Array.isArray(v) ? flatten2(v, new_arr) : new_arr.push(v);
  });
  return new_arr;
}
console.log(flatten2([1, [2], [[3], [4, [5]]]], []));

function flatten3(arr, new_arr) {
  if (!new_arr) return flatten3(arr, []);
  arr.forEach(function(v) {
    Array.isArray(v) ? flatten3(v, new_arr) : new_arr.push(v);
  });
  return new_arr;
}
console.log(flatten3([1, [2], [[3], [4, [5]]]], []));

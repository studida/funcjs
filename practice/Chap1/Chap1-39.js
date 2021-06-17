// 일급 함수

// 함수를 값으로 다룰 수 있다.
function f1 () {};
var a = typeof f1 === 'function' ? f1 : function() {}; // 변수에 할당도 가능

// 함수를 리턴 할 수 있음.
function f2 () {
  return () => {};
};

// 즉시 실행 가능(iife)
console.log(((a, b) => a + b)(10, 5));

// 함수를 인자로 받고, 익명함수도 인자로 넘길 수 있음
const callAndAdd = (a, b) => a() + b();
console.log(
  callAndAdd(() => 10, () => ((c) => c)(20))
);

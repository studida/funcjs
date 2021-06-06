// 함수를 인자로 받아서 대신 실행하는 함수
function callWith10(val, func) {
  return func(10, val);
}
function add(a, b) {
  return a + b;
}
function sub(a, b) {
  return a - b;
}
console.log(
  callWith10(20, add)
);
console.log(
  callWith10(30, sub)
);

// 함수를 리턴하는 함수
function constant(val) {
  return function () {
    return val;
  }
}
var always10 = constant(10);
console.log(always10(30));

// 함수를 대신 실행하는 함수를 리턴하는 함수
function callWith(val1) {
  return function(val2, func) {
    return func(val1, val2);
  }
}
var callWith20 = callWith(20);
var callWith30 = callWith(30);
console.log(
  callWith20(5, add)
);
console.log(
  callWith30(5, add)
);
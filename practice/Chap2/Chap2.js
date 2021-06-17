obj9.a = 1;
obj9.b = 2;
console.log(obj9.a + obj9.b);

function obj9() {};

var obj10 = [];
obj10.a = 1;
console.log(obj10); // [a: 1]
console.log(obj10.length); // 0

var obj11 = [];
obj11[0] = 1;
obj11[1] = 2;
console.log(obj11);
console.log(obj11.length);

var obj12 = [];
obj12.length = 5;
console.log(obj12); // Array[5]

var obj13 = [1, 2];
obj13[5] = 5;
console.log(obj13); // [1,2, 5:5]
console.log(obj13.length); // 6

console.log(Array.apply(null, { length: 3 }));
console.log(Array(5).fill(0));

var obj13 = [1, 3];
console.log(obj13['len' + 'gth']);
obj13['length'] = 10;
console.log(obj13.length);

var obj = { a: 1, b: 2, c: 3 };
delete obj.a;
delete obj['b'];
delete obj['C'.toLowerCase()];
console.log(obj);

/*
delete Array.prototype.push;
var arr1 = [1,2,3];
arr1.push(4); // Error
*/

add1(1, 10);
// 11

// add2(1, 10);
// Err

function add1(a, b) {
  return a + b;
}
var add2 = function (a, b) {
  return a + b;
}

// add3(1, 10);

function add(a, b) {
  return valid() ? a + b : new Error();

  function valid() {
    return Number.isInteger(a) && Number.isInteger(b);
  }
}

console.log(add(10, 5)); // 15
// console.log(add(10, 'a')); // Err

// function () {}

function add2Fn(a) {
  return (function (b) {
    return a + b;
  })(2)
}
console.log(add2Fn(1));

!function(a) { console.log(a) }(1); // 1

true && function(a) { console.log(a) }(1); // 1

1 ? function(a) { console.log(a) }(1) : 5; // 1

0, function(a) { console.log(a) }(1); // 1

var b = function(a) { console.log(a) }(1); // 1

function f2() {};
f2(function(a) { console.log(a) }(1)); // 1

var f3 = function c(a) { console.log(a) }(1); // 1

new function() { console.log(1) }; // 1

//
var a = eval('10 + 5');
console.log(a); // 15

var add = new Function('a, b', 'return a + b');
console.log(add(10, 5)); // 15
function L(str) {
  var splitted = str.split('=>');
  return new Function(splitted[0], `return (${splitted[1]});`);
}

// console.log(L('n => n * 10')(10)); // 100

// 성능
console.time('익명 함수');
for (let i = 0; i < 100000; i+=1) {
  (function (v) { return v; })(i);
}
console.timeEnd('익명 함수');

console.time('new Function 함수');
for (let i = 0; i < 100000; i+=1) {
  L('v => v')(i);
}
console.timeEnd('new Function 함수');

console.time('new Function 함수 개선');
let ll = L('v => v');
for (let i = 0; i < 100000; i+=1) {
  ll(i);
  // console.log(ll(i));
}
console.timeEnd('new Function 함수 개선');
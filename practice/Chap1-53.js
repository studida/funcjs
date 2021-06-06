// bind
function add(a,b) {
  return a + b;
}
var add10 = add.bind(null, 10); // this는 null, a = 10 으로 bind
console.log(
  add10(20), // a는 고정되어 항상 b를 받게됨
  add10(5, 222), // 5만먹음
);
// bind, 인자를 왼쪽부터만 적용 가능
// bind를 실행하여 리턴된 함수(위 add10)은 this변경 불가


// curry
// book - 커링이 js와는 잘 어울리지 않는다고함
// 인자의 수나 형이 명확하게 정해져야 어울림
function curry(f) { // 커링 변환을 하는 curry(f) 함수
  return function(a) {
    return function(b) {
      return f(a, b);
    };
  };
}

// usage
function sum(a, b) {
  return a + b;
}
let curriedSum = curry(sum);
console.log( curriedSum(1)(2) ); // 3


// _.curry 흉내낸거!
const _ = {};
_.curry = function (f) {
  return function(a, c) {
    if (c) return f(a, c);
    return function(b) {
      return f(a, b);
    };
  };
};
carriedSum = _.curry(sum); // lodash 라이브러리의 _.carry 사용
console.log( carriedSum(1, 2) ); // 3, 보통 때 처럼 호출가능
console.log( carriedSum(1)(2) ); // 3, partially 호출되었음


// partial
// 인자를 동적으로 받아서 처리하게 하기, 그중에서도 특정 인자는 고정 가능하게!!
// 하는 함수를 리턴하는 함수가 partial이다.
const addd = (...arguments) => {
  console.log('hwi... ????', arguments);
  let results = 0;
  for (let i = 0, len = arguments.length; i < len; i+=1) {
    if (!arguments[i]) continue;
    results += arguments[i];
  }
  return results;
}
console.log(addd(1,2,3,4,5));

Function.prototype.partial = function () {
  var fn = this, _args = arguments;
  return function() {
    var args = Array.prototype.slice.call(_args);
    console.log('hwi...', args);

    var arg = 0;
    for (let i = 0; i < args.length && arg < arguments.length; i+=1) {
      if (args[i] === undefined) args[i] = arguments[arg++];
    }

    console.log('hwi...', args);

    return fn.apply(this, args);
  }
}
var add3 = addd.partial(undefined, undefined, undefined, 3, undefined);
console.log('add3 > ', add3(1,2,4,5));
console.log('add3 > ', add3(1,2));

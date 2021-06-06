// 고차 함수의, 보조함수(인자로 받는 함수)에 넘겨주는 인자 늘리기
// lodash or underscore 형태로!

const _ = {};
_.map = (list, fnIteratee) => {
  const new_list = [];
  for (let i = 0, len = list.length; i < len; i += 1) {
    new_list.push(fnIteratee(list[i], i, list));
  }
  return new_list;
}

_.filter = (list, fnCheck) => {
  const new_list = [];
  for (let i = 0, len = list.length; i < len; i += 1) {
    if (fnCheck(list[i], i, list)) new_list.push(list[i]);
  }
  return new_list;
}

_.find = (list, fnCheck) => {
  for (let i = 0, len = list.length; i < len; i += 1) {
    if (fnCheck(list[i], i, list)) return list[i];
  }
}

_.findIndex = (list, fnCheck) => {
  for (let i = 0, len = list.length; i < len; i += 1) {
    if (fnCheck(list[i], i, list)) return i;
  }
  return -1;
}

console.log(
  _.filter([1,2,3,4,5], (item, index) => index > 1)
);

_.identity = (d) => d;

// true, false 형태에 응용가능하다!

console.log(
  _.filter([true, 0, 10, 'a', false, NaN, null], _.identity)
);


// 확장하기
_.falsy = (d) => !d;
_.truthy = (d) => !!d;

// some 은 하나라도 true성공하면 true
_.some = (list, fnCheck) => {
  return !!_.find(list, fnCheck);
}
console.log(
  'some',
  _.some([1,2,3,4,5], (item) => item === 3),
  _.some([1,2,3,4,5], (item) => item === 10),
);

// every는 모두 true여야 true
_.every = (list, fnCheck) => {
  return _.filter(list, fnCheck).length === list.length;
}
console.log(
  'every',
  _.every([1,2,3,4,5], (item) => item < 10),
  _.every([1,2,3,4,5], (item) => item > 10),
);

// every의 아쉬운점!!
// fiter을 활용했기 때문의 모든 loop을 다 돈다. 사실 false가 하나라도 있으면, 바로 멈추면 더 좋을텐데?
// 이걸 개선해보자
_.not = (v) => !v;
_.beg = (a) => {
  return (b) => {
    return a === b;
  };
};

// 연산자 ! 이나 === 을 그냥 안쓰고, 작은 함수로 만든 이유는??
// _.filter, _.find등에서 보조 함수로 사용 가능하기 때문!!

_.every2 = (list, fnCheck) => {
  // findIndex는 찾으면 for loop을 곧바로 벋어남.
  // 책에서는 fnCheck부분이 not 으로 고정(하드코딩) 되어 있는데, 실제 every에서 fnCheck에 따라서 구동되게 하려면
  // findIndex 사용시 결국 모든 loop을 돌게됨, 또한 check로직을 반대로 짜야함 (왜냐면 findIndex는 true일때 hit니깐!)
  return _.beg(-1)(_.findIndex(list, fnCheck)); // _.findIndex(list, fnCheck) 가 beg의 b가 됨, 따라서 -1이면 fnCheck을 다 통과했으니 true가 되면됨.
}
console.log(
  'every2',
  _.every2([1,2,3,4,5], (item) => item > 10), // 10보다 모두 작냐를 짤때 반대로 > 10으로 짜야함
  _.every2([1,2,3,4,5], (item) => item < 10), // 10보다 모두 크냐를 짤때 반대로 < 10 으로 짜야함
);

// 책에서는 _.not, _.beg의 조합을 설명하기 위함이고, 실질적으로 every는 아래처럼 실패 케이스에서 return되게 하는게 맞는듯
_.every3 = (list, fnCheck) => {
  for (let i = 0, len = list.length; i < len; i += 1) {
    if (!fnCheck(list[i], i, list)) return false; // 빠르게 실패 캐치
  }
  return true;
}
console.log(
  'every3',
  _.every3([1,2,3,4,5], (item) => item < 10),
  _.every3([1,2,3,4,5], (item) => item > 10),
);

// _.compose 활용
_.compose = (...arguments) => { // es6 arrow fn은 arugments 예약어 안먹음으로 현 형태로 변경 필요함
  const args = arguments;
  const start = args.length - 1; // _.compose는 맨 우측의 함수를 먼저 실행하여, 그 결과를 왼쪽 함수에 전달 하는 형태
  return (...arguments) => {
    let i = start;
    let result = args[start].apply(this, arguments);
    while(i--) result = args[i].call(this, result);
    return result;
  }
};

const greetFn = (name) => `hi: ${name}`;
const exclaim = (statement) => `${statement.toUpperCase()}!`;
const welcome = _.compose(greetFn, exclaim);
console.log(welcome('gseok'));

// book의 _.some, _.every는 별도의 checker함수를 받지 않고, true, false체크용인 형태
// compose의 개념만 이해하고 넘어간다.


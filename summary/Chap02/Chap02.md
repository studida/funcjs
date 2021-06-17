# 02. 함수형 자바스트립트를 위한 문법 다시 보기

### 정리

- 대괄호, 괄호, 익명함수, 유명함수, 클로저, IIFE, 재귀, Arrow Fn  문법을 다시 확인한다.
- "아무 곳에서나 함수 열기, 함수실행을 원하는 시점으로 미뤄서 실행하기"

---

### 객체와 대괄호 다시 보기

**객체와 key**

- 객체의 key와 value는 {}, . , [] 을 통해서 설정 할 수 있다
- {} 와 [] 에서는, 특수문자, 숫자 등을 가리지 않고, 어떤 문자열이든 key로 사용 가능하다.
- {} 와 [] 의 차이는, {}는 코드를 실행 할 수 없고, [] 는 코드를 실행 할 수 있다.
- 코드

    ```jsx
    // 2-1
    var obj = { a: 1, "b": 2 };
    obj.c = 3;
    var e = 'e';
    obj[e] = 5;
    function f() { return 'f' };
    obj[f()] = 6;

    // 2-2 띄어쓰기, 특수 문자, 숫자
    var obj2 = { " a a a ": 1 };
    obj2[' b b b '] = 2;
    obj2['!@#$'] = 3;
    obj2[10] = 4;

    // 2-3 코드 미실행으로 에러
    var obj5 = { (true ? 'a' : 'b' ): 1 };

    // 2-4 코드 실행 가능
    var obj6 = {};
    obj6[(true ? 'a' : 'b')] = 1;
    ```

**함수나 배열도 객체, 따라서 key-value를 넣을 수 있다**

- javascript에서는 함수도 객체이고, 배열도 객체이고, 문자열도 객체이다.
- 즉 객체인 모든곳에는 key-value을 값을 넣거나 지울 수 있다
- 코드

    ```jsx
    // 함수를 객체로
    function obj {};
    obj.a = 1;
    obj.b = 2;

    // 호이스팅도 동일하게됨
    obj9.a = 1;
    obj9.b = 2;
    console.log(obj9.a + obj9.b);

    function obj9() {};

    // 배열에 숫자가 아닌 key 사용
    var obj10 = [];
    obj10.a = 1;
    console.log(obj10); // [a: 1]
    console.log(obj10.length); // 0

    // 배열에 숫자로 key
    var obj11 = [];
    obj11[0] = 1;
    obj11[1] = 2;
    console.log(obj11); // [1, 2]
    console.log(obj11.length); // 2

    // 배열 한번에 length올리기
    var obj12 = [];
    obj12.length = 5;
    console.log(obj12); // Array[5], [ <5 empty items> ]

    var obj13 = [1, 2];
    obj13[5] = 5;
    console.log(obj13); // [1,2, <3 empty items>, 5:5]
    console.log(obj13.length); // 6
    ```

    - 일반적인 상황에서 배열의 length을 한번에 올리는건 권장되지 않는다. 동작에 문제는 없지만 중간이 빈 배열이 된다.
    - 특정한 경우에는 유용할 수도 있다
    - arr.push(1) 보다 arr[i] = 1 이 근소하게 성능이 좋다, 특히 IE에서는 5배 이상 차이가 날수도 있다.
    - 배열의 메소드를 쓰면서 한번에 크기 늘리는 방법도 있다

        ```jsx
        console.log(Array.apply(null, { length: 3 })); // undefined로 생성됨
        console.log(Array(5).fill(0)); // 한번에 length정하면서 초기값까지 주기
        ```

    - 배열의 length도 결국 key-value형태로 참조 및 할당이 가능하다

        ```jsx
        var obj13 = [1, 3];
        console.log(obj13['len' + 'gth']);
        obj13['length'] = 10;
        console.log(obj13.length); // 10
        ```

**delete**

- javascript에서는 기본 객체의 메서드나 프로퍼티도 삭제 가능하다
- 코드

    ```jsx
    var obj = { a: 1, b: 2, c: 3 };
    delete obj.a;
    delete obj['b'];
    delete obj['C'.toLowerCase()];
    console.log(obj);

    delete Array.prototype.push;
    var arr1 = [1,2,3];
    arr1.push(4); // Err

    ```

**코드의 실행 영역**

- [] 로 객체의 키를 참조하면, 코드가 실행 될 수 있다
- 즉 코드의 특정 부분에서 함수를 정의하거나 실행 할 수 있다는 이야기가 된다.

---

### 함수 정의 다시 보기

**기본정의**

```jsx
function abc() {
  return a + b;
}
var add2 = function (a, b) {
  return a + b;
}
var m = {
  add3: function (a, b) {
    return a + b;
  },
};
```

**호이스팅**

- 호이스팅
    - 변수나 함수가 어디서 선언되든 해당 scope의 최상단에 위치하는것처럼 인식되어, 동일 scope상에서 어디서든 참조 가능한 상태가 되는것을 의미한다.
- 코드

    ```jsx
    add1(1, 10);
    // 11

    add2(1, 10);
    // Err (add2 is not a function)

    function add1(a, b) {
      return a + b;
    }
    var add2 = function (a, b) {
      return a + b;
    }

    add3(1, 10);
    // 위 add2와의 에러 차이 보기, add3 is not defined
    ```

    - add2는 호이스팅 된걸까?
        - 된거임 다만 add2가 undefined이고 "초기화가 안된거임"

            ```jsx
            console.log(add1); // function add1(a,b) return a + b;
            console.log(add2); // undefined
            ```

**호이스팅 활용하기**

- 함수 선언 & 실행이 실질적으로 excution context에서 각 phase에 따라 진행 됨으로 (결국 호이스팅), 이런 특성을 활용하여 '코드 가독성' 을 높일 수 있다.
- 이 부분은 각 팀의 코딩 컨벤션이나, 구현 패턴에 따라가면 되고 정답인거 아님.
- 이렇게도 가능한걸 알아두기만 하면 될듯

```jsx
function add(a, b) {
  return valid() ? a + b : new Error();

  function valid() {
    return Number.isInteger(a) && Number.isInteger(b);
  }
}

console.log(add(10, 5)); // 15
console.log(add(10, 'a')); // Error
```

**괄호 없이 즉시 실행하기**

- 코드

    ```jsx
    // 일반적인 IIFE
    (function (a) {
      console.log(a); // 100
    })(100);

    // 에러 syntax, 익명함수 선언 자체가 실패임
    function (a) {
      console.log(1);
    }(100)

    // 익명 함수을 선언만 해도 에러 발생
    // 사실 익명 함수는, "함수 선언식", "함수 표현식" 중에 "함수 표현식"을 쓰는것
    // 이때 이름이 없어도 되는 이유는, 변수에 할당되어 해당 변수이름을 쓰게 되거나, 리턴되거나
    // IIFE 로 즉시 실행되고 사라지는 경우임
    // 그외는 "함수 표현식" 으로 작성시 이름이 필요해짐
    // ref: https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/function 
    function () {}

    // 에러 없는 경우
    function add2Fn(a) {
      return (function (b) {
        return a + b;
      })(2)
    }
    add2Fn(1); // 1 + 2 = 3

    // 즉시 실행 하는 여러가지 방법
    !function(a) { console.log(a) }(1); // 1

    true && function(a) { console.log(a) }(1); // 1

    1 ? function(a) { console.log(a) }(1) : 5; // 1

    0, function(a) { console.log(a) }(1); // 1

    var b = function(a) { console.log(a) }(1); // 1

    function f2() {};
    f2(function(a) { console.log(a) }(1)); // 1

    var f3 = function c(a) { console.log(a) }(1); // 1

    new function() { console.log(1) }; // 1 
    ```

    - 익명함수는, 연산자와 같이 있으면 실행 가능, 함수가 값으로 다루어지는 케이스에서 실행 가능
    - 사실 유명함수도 즉시 실행 가능
    - 함수를 정의 할 수 있는 곳이라면 그곳이 어디든 실행도 가능하다.
    - 연산자의 피연산자가 되거나, return 등과 같이 사용하게 되면, 익명 함수를 선언 할 수 있고, 익명 함수 선언이 가능하면 실행도 가능하다
    - book에서 하고 싶은 말은 → 값으로 함수를 잘 다룬다면 '즉시실행' 도 잘 다룰 수 있어야 한다!

**즉시 실행하면서 this객체 다루기**

```jsx
var a = function (a) {
  console.log(this, a); // [1], 1 this가 [1]로 들어옴 .call이용!
}.call([1], 1);
```

**new Function, eval 을 써도 될까?**

```jsx
var a = eval('10 + 5');
console.log(a); // 15

var add = new Function('a, b', 'return a + b');
console.log(add(10, 5)); // 15
```

- book에서 말하는것 → 써도 된다
    - "서버" 에서 클라이언트가 보낸 값을 이용해서 new Function이나 eval을 하는 경우 → 즉 서버 로직이 구동되는 케이스를 제외하고는 써도 된다는 의견
    - "서버" 에서도 "서버" 코드가 자체적으로 생성한 값으로만 new Function, eval을 하는건 좋다는 의견
    - 즉, 클라 → 서버, 형태로 영향을 주어서 해킹(보안) 위험이 있는 경우가 아니면 써도된다는 의견
    - 이유: 어차피 js는 다 구동 가능, 그럼 FE를 제외하고, FE, BE을 같이 볼때, BE는 어째껀 FE 가 보내는 값을 받아야함 → 따라서 그값을 excution 하지 않게 하는건 서버 롤, 그외 new Function, eval은 써도 된다.
    - 그다음 생각해볼꺼
        - new Function, eval 은 정말 성능에 영향이 있나? → 있음 → 하지만 memo기법등을 잘쓰는 경우나, 특정 조건 환경 속에서는 큰 차이 없음
        - 결론 → 결국 정답이 아니라, 각각의 상황에 맞게 잘 쓰자

**간단 버전의 문자열 화살표 함수와 new Function 성능**

- 코드

    ```jsx
    function L(str) {
      var splitted = str.split('=>');
      return new Function(splitted[0], `return (${splitted[1]});`);
    }

    console.log(L('n => n * 10')(10)); // 100

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

    /* node환경에서 test했을때 ll이 더 빠르게 나오기도 함!
    익명 함수: 4.542ms
    new Function 함수: 89.899ms
    new Function 함수 개선: 1.428ms
    */
    ```

**유명 함수**

- 함수를 값으로 다루면서, 익명이 아닌 이름을 주는 경우 유명함수라고 한다
- 코드

    ```jsx
    var f1 = function f() {
      console.log(f);
    }

    // 익명함수에서의 자기 참고
    var f1 = function () {
      console.log(f1);
    }
    f1();

    // 의도하지 않은동작이 될 위험성 내포(f1의 변경)
    var f2 = f1;
    f1 = 'hi~~~~';
    f2(); // 'hi~~~~'

    // 위 문제를 해결하지만, arguments.callee 을 써야함(es5의 strict mode에서 사용 불가)
    var f1 = function () {
      console.log(arguments.callee);
    }
    f1(); // func

    var f2 = f1;
    f1 = 'hi~~~~';
    f2(); // func
    ```

    - 유명함수의 자기참조

    ```jsx
    var f1 = function f() {
      console.log(f);
    }
    f1(); // func

    var f2 = f1;
    f1 = null;
    f2(); // func

    //----

    var hi = 1;
    var hello = function hi() {
      console.log(hi);
    }
    hello(); // func
    console.log(hi); // 1
    console.log(++hi); // 2
    hello(); // func
    console.log(hello.name === 'hi'); // true

    var z1 = function z() {
      console.log(z, 1);
    };
    var z2 = function z() {
      console.log(z, 2);
    };
    z1(); // func
    z2(); // func
    console.log(z1.name === z2.name); // true
    z; // Error z is not defined
    ```

    - 동일이름의 유명함수 중복되도관계 없음(할당할때), 이름도 로직에서 사용 가능
    - 유명함수를, "함수 표현식" 형태로 사용시, 이름을 크게 걱정하지 않아도 된다.

**유명 함수를 이용한 재귀**

- 유명 함수는 재귀를 만들때도 편리하다.
- 코드

    ```jsx
    // 즉시실행 + 유명함수 조합 기법
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

    // if문이 생생됨
    function flatten3(arr, new_arr) {
      if (!new_arr) return flatten3(arr, []);
      arr.forEach(function(v) {
        Array.isArray(v) ? flatten3(v, new_arr) : new_arr.push(v);
      });
      return new_arr;
    }
    console.log(flatten3([1, [2], [[3], [4, [5]]]], []));
    ```

    - 즉시 실행과 유명함수 조합으로 된 재귀, new_arr부분을 직접 넘겨주거나, if문 체크 없이 구현
    - 사실 Typescript형태에서 new_arr부분에 기본값 처리 하는 형태로도 가능해보임

**javascript에서 재귀의 아쉬움**

- 환경에 따라 다르지만 약 15,000번 이상 재귀 발생시 stack size exceeded에러 발생
- javascript의 재귀는 '꼬리 재귀 최적화' 가 되어 있지 않다.
- 꼬리 재귀 최적화
    - 참고: [https://bozeury.tistory.com/entry/꼬리-재귀-최적화Tail-Recursion](https://bozeury.tistory.com/entry/%EA%BC%AC%EB%A6%AC-%EC%9E%AC%EA%B7%80-%EC%B5%9C%EC%A0%81%ED%99%94Tail-Recursion)

---

### 함수 실행과 인자 그리고 점 다시 보기

**() 다시보기**

- 함수를 실행하는 방법에는 (), call, apply 가 있다
- 함수 내에서는 arguments 객체와 this 키워드를 사용 할 수 있다
- 코드

    ```jsx
    function test(a, b, c) {
      console.log("a b c: ", a, b, c);
      console.log('this: ', this);
      console.log('arguemnts: ', arguments);
    }

    test(10);
    // a b c:  10 undefined undefined
    // object(node환경에서는 obj, win환경에서는 window)
    // arguemnts:  [Arguments] { '0': 10 } (node환경)
    ```

**인자 다시보기**

- 인자가 일반 변수 혹은 객체와 약간 다르게 동작 하는 부분을 알자
- 코드

    ```jsx
    // arguments!
    function test2(a, b) {
      b = 10;
      console.log(arguments);
    }
    test2(1); // [1]
    test2(1, 2); // [1, 10] ??

    // 객체로 보기
    var obj1 = {
      0: 1,
      1: 2,
    };
    console.log(obj1); // { 0: 1, 1: 2 }

    var a = obj[1];
    var b = obj[2];
    b = 10;
    console.log(obj1); // { 0: 1, 1: 2 } - obj유지
    console.lob(b); // 10 <- b는 변경

    // arguments!!
    function test3(a, b) {
      arguemnts[1] = 10;
      console.log(b);
    }
    test3(1,2); // 1, 10

    // 사실 excution context을 생각해보면 당연한것이다.!!!
    // 다만 여기(book)에서 꼭 알아야 하는건, 인자를 코드 내에서 바꾸었을때의 side-effect
    // 을 명확히 알고 써야 한다는게 핵심
    ```

**this 다시보기**

- 함수 내에서, this객체 → 브라우저 (window), node(global object)
- 정리잘된거: [https://samsara1019.tistory.com/75](https://samsara1019.tistory.com/75)
- 코드

    ```jsx
    function test() {
      console.log('this: ', this);
    }
    test(); // this는 브라우저에서 window, node에서 global obj

    var o1 = { name: 'obj1' };
    o1.test = test; // test함수를 o1의 메소드로 할당
    o1.test(); // this 는 object { name: 'obj1' }

    var a1 = [1,2, 3];
    a1.test = test;
    a1.test(); // this 는 Array [1, 2, 3]

    var o1_test = test;
    o1_test(); // this는 다시 window, node에서는 global obj

    (a1.test)(); // this 는 Array
    a1['test'](); // this 는 Array

    // '.' 으로 접근하여 실행하면 . 앞의 객체가 this
    // [ ] 으로 접근하여 실행하면 [ ] 앞의 객체가 this
    // 즉 this와 arguments는 어떻게 실행하였나? 에 따라 달라짐

    console.log(test === o1.test && o1.test === a1.test); // true
    // 모두 같은 함수이다.
    // 선언(정의)은 모두 동일하게 먹는다
    // 선언(정의)는 scope와 closuer에 영향
    // 실행은 this와 arguments에 영향
    ```

**call, apply 다시보기**

- call을 사용하면, call의 첫번째 인자가 this로 bind된다(수동 bind), 만약 null형태의 값을 주면 자동 bind값으로 this가 먹는다
- 코드

    ```jsx
    function test(a, b, c) {
      console.log('this: ', this, a, b, c);
    }

    test.call(undefined, 1, 2, 3);
    test.call(null, 1, 2, 3);
    test.call(void 0, 1, 2, 3);
    // 모두 window로 this가 bind(node면 global obj)

    var o1 = { name: 'obj1' };
    test.call(o1, 1, 2, 3,); // this는 o1 이 된다 
    test.call(1000, 1, 2, 3); // this는 number가 된다
    ```

- apply는 call와 인자 전달 방식이 다르다. 인자를 '유사배열' 형태로 전달 할 수 있다. 물론 진짜 Array는 아니기 때문에 Array의 내장 메소드는 사용 할 수 없다.
- 이를 회피하려면 '유사배열' → '배열' 로 바꾸어서(Array.slice등...)사용하는 기법을 쓰면 된다.
- 코드

    ```jsx
    function test(a, b, c) {
      console.log('this: ', this, a, b, c);
    }
    var o1 = { name: 'obj1' };

    test.apply(o1, [1, 2, 3]); // this는 o1
    test.apply(1000, [1, 2, 3]); // this는 number
    test.apply(undefined, [1, 2, 3]); // window, node면 global
    test.apply([50], [1, 2, 3]); // this는 array

    // 유사배열(apply)을 인자로 받는다는건?
    test.apply(o1, { 0: 1, 1: 2, 3: 3, length: 3 }); // 배열 아니지만 가능
    (function () {
      test.apply(o1, arguments); // arguments도 유사배열이여서 가능
    })(1, 2, 3);

    // 다음과 같은 코드도 가능
    (function () {
      arguments.length--;
      test.apply(o1, arguments); // arguments: [1, 2]
    })(1, 2, 3);
    test.apply(o1, [1].concat([2,3])); // arguments: [1,2,3]
    ```

**call의 실용적 사례**

- 네이티브 코드 활용
- Array.prototype.slice는 키를 숫자로 가지고, length를 갖는(유사배열) 형태의 객체는 모두 call을 통해서 호출 가능하다.
- 코드

    ```jsx
    var slice = Array.prototype.slice;
    function toArray(data) {
      return slice.call(data);
    }
    function rest(data, n) {
      return slice.call(data, n || 1);
    }

    var arr1 = toArray({0: 1, 1: 2, length: 2 });
    arr1.push(3);
    console.log(arr1); // [1, 2, 3]

    rest([1, 2, 3]); // [2, 3]
    rest([1, 2, 3], 2); // [3]
    ```

- call, apply, arguments등을 잘 활용하면 위와 같이 실용적인(성능좋은) 코드의 구성이 가능하다!

---

### if else || && 삼항 연산자 다시 보기

**if의 괄호**

- javascript의 () 내에서는 표현식(expression)을 사용 할 수 있다
- 괄호에서 못하는거
    - 지역함수, 변수 선언
    - 비동기 코드 구성
- 코드

    ```jsx
    if (var a = 0) console.log(a); // 문법 에러

    if (function f1() {}) console.log('hi'); // hi, if구문내에 함수표현 구문디 있어서 true로 판정
    f1(); // 정의 없습 에러 f1이 표현식으로 다루어져서 실제 함수 정의로 인지 안됨

    // if의 괄호 안에서 지역변수, 지역함수 선언 불가
    ```

    ```jsx
    // if 괄호 안에서 구동 가능한거
    // 미리 선언된 변수에 값을 할당하는거 가능
    var a;
    if (a = 5) console.log(a); // 5

    if (a = 0) console.log(1);
    else console.log(a); // 0

    if (!(a = false)) console.log(a); // false

    if (a = 5 - 5);
    else console.log(a); // 0

    // 객체의 key에 값 할당 가능
    var obj = {};
    if (obj.a = 5) console.log(obj.a); // 5

    if (obj.b = false) console.log(obj.b);
    else console.log('hi'); // hi

    var c;
    if (c = obj.c = true) console.log(c); // true

    // 함수 실행도 가능, 실행 결과를 변수에 담기도 가능
    function add(a, b) {
      return a + b;
    }

    if (add(1, 2)) console.log('hi'); // hi

    var a;
    if (a = add(1, 2)) console.log(a); // 3

    if (funciton () { return true; }()) console.log('hi'); // hi
    ```

- 괄호(일반괄호) 안에서 여러 동작이 가능하다 해당 부분을 익혀 두면, 코드를 더 깔끔하게 정ㄹ기하거나, 기능 발전을 시킬 수 있다
- 함수를 실행할때도 괄호를 사용한다. 이때는 일반 괄호보다 좀 더 많은걸 할 수 있다

**||&&**

- 코드

    ```jsx
    var a = 'hi';
    var b = '';

    var v1 = a || b; // hi
    var v2 = b || a; // hi
    var v3 = a && b; // ''
    var v4 = b && a; // ''

    // true, false가 아닌 값이 담긴다.
    // || 와 &&의 조건에 따른 short circuit은 구동됨 
    // 할당문에서 ||, && 는 다음 구문으로 (오른쪽으로) 갈지 말지를 결정하게 된다.

    console.log(0 && 1); // 0
    console.log(1 && 0); // 0
    console.log([] || {}); // []
    console.log([] && {} || 0); // {}
    console.log(0 || 0 || 0 || 1 || null); // 1
    console.log(add(10, -10) || add(10, -10)); // 0
    console.log(add(10, -10) || add(10, 10)); // 20
    console.log(v = add(10, -10) || v++ && 20) // ++ 되기전에 v가 0이라서 &&로 안가고 0
    console.log(v = add(10, -10) || ++v && 20) // ++이 되서 &&넘어가고 20
    ```

    ```jsx
    // if문 줄이기
    function addFriend(u1, u2) {
      if (u1.friends.indexOf(u2) === -1) {
        if (confirm('친구 추가?') {
          u1.friends.push(u2);
          console.log('추가완료');
        }
      } else {
        console.log('이미 친구!');
      }
    }

    function addFriend1(u1, u2) {
      (u1.friends.indexOf(u2) === -1 || console.log('이미 친구!')) &&
      confirm('친구 추가?') && u1.friends.push(u2) && console.log('추가완료');
    }
    ```

- || 와 && 을 잘 활용하면, 불필요한 if-else구문을 줄일 수 있다.
- || 와 && 을 잘 활용하면, 조건에 따른 값 할당을 할 수 있다.

**삼항 연산자**

- 조건이 간단하고 실행코드도 간단할때 많이 사용한다.
- 보통 값을 담을때(assign) 많이 사용한다.
- 코드

    ```jsx
    var c = a ? 10 : function f(arr, v) {
      return arr.length ? f(arr, v + arr.shift()) : v;
    }([1, 2, 3], 0);

    // 1 +2 +3 임 팩토리얼을 재귀로 구현한거.~
    ```

---

### 함수 실행의 괄호

**함수 실행을 통해 생기는 새로운 공간**

- 함수 실행의 괄호는 새로운 excution context를 생성하게 된다. (function context)
- 코드

    ```jsx
    // 일반 괄호
    (5);
    (function(){ return 10; });

    // 함수를 실행하는 괄호
    var add5 = function (a) {
      return a + 5;
    };
    var call = function (f) {
      return f();
    };
    add(5); // 10
    call(function () { return 10; }); // 10
    ```

**기본적인 비동기 상황**

- 함수를 연속적으로 실행하는 것이 비동기 제어의 핵심이다.
- 코드

    ```jsx
    console.log(1);
    setTimeout(function () {
      console.log(3);
    }, 1000);
    console.log(2);

    // 1 -> 2 -> 3(1초뒤에)

    var add = function (a, b, callback) {
      setTimeout(function () {
        callback(a + b);
      }, 1000);
    };
    add(5, 10, function (r) {
      console.log(r); // 15
    });
    ```

**함수 실행 괄호의 마법과 비동기**

- 비동기 실행을 함수 나열로 보면 실행 순서를 파악 할 수 있다
    - add 함수 실행 → setTimeout → setTimeout이 익명 함수 실행 → 익명함수 내에서  callback호출
- 비동기 함수는 기본적으로중첩 실행이 되지 않는데, 함수를 리턴하는 함수를 응용하면 해당 부분을 중첩 가능한 구조로 구현 가능하다
- 코드

    ```jsx
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

    // 중첩형태로는 에러남
    console.log(div(sub(add(10, 25), 10), 2); // Error

    // 함수를 리턴하는 함수 응용
    function wrap(func) {
      return function () {
        return func.apply(null, arguments);
      };
    }

    var add = wrap(function (a, b, callback) {
      setTimeout(function () {
        callback(a + b);
      }, 1000);
    });
    add(5, 10, function (r) {
      console.log(r);
    });
    ```

    ```jsx
    // 실행 이전의 공간에서 비동기 제어와 관련된 일 추가하기

    // 일반적인 callback 쓸꺼면 아래처럼해도됨, 다만 책에서 처럼 커링 형태로 받으려면
    // 그때는 arguements개선 및 _async_cb가 필요해짐.
    /*
    function _async(func) {
      return function () {
        var _callback;
        function _async_cb_receiver(callback) {
          _callback = callback;
        }
        func.apply(null, arguments);

        return _async_cb_receiver;
      };
    }
    var add = _async(function (a, b, callback) {
      setTimeout(function () {
        callback(a + b);
      }, 1000);
    });
    add(5, 10, function(r) { console.log(r); });
    */

    function _async(func) {
      return function () {
        var _callback;
        function _async_cb_receiver(callback) {
          _callback = callback;
        }

        // _async에서 a, b, callback중 callback부분을 여기서 생성해서 넣어주는거임
        // 그럼 원래 사용자가 전달하는 callback이 빠지게 되는데 그걸 커링 형태로 받아서, 아래에 구현한
        // function(result)에서 다시 call 하는 구조
        arguments[arguments.length++] = function(result) {
          _callback(result);
        }
        func.apply(null, arguments);

        return _async_cb_receiver;
      };
    }
    var add = _async(function (a, b, callback) {
      setTimeout(function () {
        callback(a + b);
      }, 1000);
    });
    var sub = _async(function (a, b, callback) {
      setTimeout(function () {
        callback(a - b);
      }, 1000);
    });
    var div = _async(function (a, b, callback) {
      setTimeout(function () {
        callback(a / b);
      }, 1000);
    });
    add(5, 10)(function(addR) { 
      console.log(addR);
      sub(addR, 5)(function(subR) {
        console.log(subR);
        div(subR, 2)(function(r) {
          console.log(r);
        });
      });
    });
    ```

    - callback을 커링처럼 받게 됨으로써, 연산에 필요한 실행과, 결과를 받기위한 실행을 분리하였음
    - 최종 콜 부분은 일반적인 콜백 패턴과 크게 차이 없음

**비동기와 재귀**

- 함수를 실제 실행하는 로직을 개선하여, 함수 호출의 시작과 끝을 좀더 세밀하게 제어 할 수 있다.
- 코드

    ```jsx
    function _async(func) {
        return function () {
          var _callback;
          function _async_cb_receiver(callback) {
            _callback = callback;
          }

          // _async에서 a, b, callback중 callback부분을 여기서 생성해서 넣어주는거임
          // 그럼 원래 사용자가 전달하는 callback이 빠지게 되는데 그걸 커링 형태로 받아서, 아래에 구현한
          // function(result)에서 다시 call 하는 구조
          arguments[arguments.length++] = function(result) {
            if (_callback) _callback(result);
          };

          // func.apply(null, arguments);
          // async함수를 중첩 호출하듯이 하기 위한 수정 부분
          // arguments에 _async_cb_receiver 가 있으면 중첩 형태로 보고 함수를 호출한다
          (function wait(args) {
            console.log('hwi.. inininin', args);

            for (var i = 0; i < args.length; i++) {
              if (args[i] && args[i].name === '_async_cb_receiver') {
                // 앞쪽에서 add(5, 10)(function(addR) { }); 와 같은 부분을 떠올리자
                // 결국 add(5, 10) 의 리턴은 _async_cb_receiver 함수이고
                // 커링처럼 _async_cb_receiver(function(r) { ... }); 형태의 재호출이다.
                // 아래로직이 결국 동일한 구조가 된다.
                console.log('hwi. gogo', args[i]);
                return args[i](function (argInfactResult) {
                  args[i] = argInfactResult;
                  wait(args);
                });
              }
            }
            func.apply(null, args);
          })(arguments);

          return _async_cb_receiver;
        };
      }

      var add = _async(function (a, b, callback) {
        setTimeout(function () {
          callback(a + b);
        }, 1000);
      });
      var sub = _async(function (a, b, callback) {
        setTimeout(function () {
          callback(a - b);
        }, 1000);
      });
      var div = _async(function (a, b, callback) {
        setTimeout(function () {
          callback(a / b);
        }, 1000);
      });

    // 기존코드 버그 있음
    // _async_cb_receiver 를 최소 하나는 넘겨주어야 함....
    div(sub(add(5, 10), 5), 2)(console.log);

    ```

---

### 화살표 함수

**익명 함수와의 문법 비교**

- function 키워드를 생략하고 => 를 추가한 형태이다
- 코드

    ```jsx
    var hi = () => console.log('hi');
    var square = a => a * a;
    ```

**익명 함수와의 기능 비교**

- 화살표 함수의 this와 arguments는 부모 함수의 this와 arguments이다.
- 코드

    ```jsx
    (function () {
      console.log(this, arguments); // [this] { hi: 1 }, [Arguments] { '0': 1, '1': 2, '2': 3 }
      (() => {
        console.log(this, arguments); // [this] { hi: 1 }, [Arguments] { '0': 1, '1': 2, '2': 3 }
        (() => {
          console.log(this, arguments); // [this] { hi: 1 }, [Arguments] { '0': 1, '1': 2, '2': 3 }
        })();
      })();
    }).call({ hi: 1 }, 1, 2, 3);
    ```

**화살표 함수의 실용 사례**

- 화살표 함수는  map, filter, reduce 등의 고차 함수와 함께 사용될 때 특히 매력적이다.
- 코드

    ```jsx
    [1, 2, 3].map(function (v) {
      return v * 2;
    });
    [1, 2, 3].map(v => v *2);
    ```

**화살표 함수 재귀**

- 화살표 함수는 익명 함수이다.
- 이름이 없는 함수지만 변수 선언 없이도 재귀를 만들 수 있다.
- 코드

    ```jsx
    function log(arg) {
      console.log(arg);
    }

    ((a, b) => (f => f(f))(f => log(a) || a++ == b || f(f)))(1, 5);

    // ((a, b) => (f => f(f))(f => log(a) || a++ == b || f(f)))(1, 5);
    // 들여쓰기 및 풀어써야 이해가 빠름
    /*
    ((a, b) => {
      return (f => f(f))(f => log(a) || a++ == b || f(f));
    })(1, 5);
    */

    // 다빼고 보면, 아래처럼 함수를 리턴하는 함수가됨
    /*
    (a, b) => {
      return f => f(f);
    }
    */

    // (1, 5) 로 즉시 실행하면, a = 1, b = 5, (f => f(f))(f => log(a) || a++ == b || f(f)) 형태인데,
    // 리턴의 함수도 즉시 실행 함수
    /*
    ((a, b) => {
      return (f => f(f))(f => log(a) || a++ == b || f(f));
    })(1, 5);
    */

    // 아래처럼 풀어서 구동시 동일한 결과가 나온다.
    /*
    var a = 1, b = 5;
    (f => f(f))(f => log(a) || a++ == b || f(f));
    */

    // 즉시 실행 구문 빼서 보기
    var a = 1, b = 5;
    var logF = f => {
      console.log('logF?', f);
      return log(a)
    };
    var c = f => log(a) || a++ == b || console.log('hihi') || f(f) || console.log('endend'); // end는 안불림, f(f)에서 재귀
    ((f) => {
      console.log('f?', f); // f => log(a) || a++ == b || console.log('hihi') || f(f) || console.log('endend'); <- 한번만 찍힌다
      // return f(f); // 리턴을 빼도 됨
      f(f); // iife내의 c -> f 형태로 들어온게 재귀되는거임
    })(c);

    // 풀어서 다시 보기
    var start = f => {
      f(f)
    };
    var logger = (a, b) => start(kk => console.log('hihi', a, b) || a++ === b || kk(kk)); // start는 트리거고, 사실은 || 와 kk(kk)로 재귀되는거
    // var logger = (a, b) => start(kk => console.log('hihi', a, b) || a++ === b);

    logger(6, 10);
    ```

    ```jsx
    function log(arg) {
      console.log(arg);
    }
    var start = f => f(f);
    var each = (arr, iter, i = 0) => start(f => iter(arr[i]) || ++i < arr.length && f(f));
    each([1,2,3,4,5], log);
    ```
// 클로저
function parent() {
  var a = 5;
  function myfn() {
    console.log(a);
  }
}

function parent2() {
  var a = 5;
  function parent1() {
    function myfn() {
      console.log(a);
    }
  }
}

// 클로저 문제
// Q1, 클로저 아님, 실행하고 끝
var a = 10;
var b = 20;
function f1() {
  return a + b;
}
f1();

// Q2, 클로저 아님 ----
function f2() {
  var a = 10;
  var b = 20;
  function f3(c, d) {
    return c + d;
  }
  return f3;
}
var f4 = f2();
f4(5, 7);

// run time context의 스택을 떠올려보면 말이됨.
// f3에서 상위 scope 변수에 참조가 없기때문에 f2는 gc되고, f3만 f4의 function instance형태로 존재
// 이후 f4실행하고나면 f4변수가 gc되때 f3이 gc
// ----

// Q3, 클로저가 있다가 사라짐!
function f4() {
  var a = 10;
  var b = 20;
  function f5() {
    return a + b;
  }
  return f5();
}
f4();
// 정확하게는 f4에서 리턴구문을 위해서, f5가 실행 될때 -> f5의 run time context가 생성되고
// 이때 f5에서 a, b 초기화시, f5가 아닌 f4의 변수여서 여기서 클로저가 생성
// 하지만 f5가 실행되서 종료 되면 gc가 되고, 최종적으로 f4에서는 클로저가 없는 상태


// Q4. 클로저!
function f6() {
  var a = 10;
  function f7(b) {
    return a + b;
  }
  return f7;
}
var f8 = f6();
f8(20);
f8(10);

// f6은 f7일 리턴하는 함수
// f8이 f6을 호출(call)할때, f6 컨텍스트가 생성
// f6 컨텍스트는 f7을 리턴
// EC(excution context) stack에서 f6을 사라져도, f7은 리턴되서 살아 있음 즉 AO는 살아 있음
// f8을 호출하면, 사실 f7이 호출되고, 이때 b는 arguments로 구성되고, 'a'값이 closer로 살아있게됨
// book - 메모리 관련 내용
// - 메모리가 f7 + a 는 해지 되지 않음
// - 메모리 누수는 아님: 메모리누수는 메모리가 해지되지 않고 계속 생기는건데 여기는, 한번 생기고 유지, 그리고 의도된거임


// Q5. 클로저
function f9() {
  var a = 10;
  var f10 = function (c) {
    return a + b + c;
  }
  var b = 20;
  return f10;
}
var f11 = f9();
f11(30); // 60

// f11을 호출하는 시점에, 클로저는 a, b을 알고 있다.
// 일반적으로 b 이전에 b을 사용하면 undefined여야 하는데, f10의 호출때는 이미, a, b,는 초기화까지 되어 있기 때문
// 실질적으로 EC의 create phase에서, 변수 env설정시 fn -> val순서임.
// 실질적으로 f10 내의 a, b, c는 f10이 실행되는 시점에 결정되는데, 그 시점에 이미 AO(Activation Obeject)의 각 값(a,b)는 이미 init & assinged된 상태임
// book
//  - 책에서는, scope에서 알 수 있고, 때가 길면 알고 있다는 용어 사용


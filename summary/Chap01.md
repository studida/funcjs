# 01. 함수형 자바스크립트 소개

### 정리

- 일급함수, 클로저, 고차 함수, 콜백 함수, 부분 적용에 대해서 알기!
- 함수를 아무때나 정의 하고 사용해보자!

### 함수형 프로그래밍?

- 부수 효과를 멀리하고 '조합성' 을 강조한 프로그래밍 "패러다임"
    - 오류를 줄이고, '조합성', '모듈화' 하기

### **가장 기본적인 함수형 프로그래밍 예제**

- 코드

    ```jsx
    function addMaker(a) {
      return function(b) {
        return a + b;
      }
    }

    addMaker(10)(5); // 15

    const add5 = addMaker(5);
    // add5는 function(b) { return 5 + b }; 와 같음
    add5(3); // 8
    add5(4); // 9

    // 함수도 값으로 사용 될 수 있다.
    // 함수는 함수를 리턴 할 수 있다.
    ```

### **값으로써의 함수 & 클로저**

- addMaker에서 'a'는 부모 scope에서 결정된다.
- 한번 결정된 'a'는 "불변"하며 상수화 된다.

### **함수형 자바스크립트의 실용성**

- 코드

    ```jsx
    const users = [
      { id: 1, name: '일', age: 32 },
      { id: 2, name: '이', age: 25 },
      { id: 3, name: '삼', age: 32 },
      { id: 4, name: '사', age: 28 },
      { id: 5, name: '오', age: 27 },
      { id: 6, name: '육', age: 32 },
      { id: 7, name: '칠', age: 24 },
    ];

    // user 중에 나이가 30 미만인 user만 모아서, length을 출력
    const temp_users = [];
    for (let i = 0, len = users.length; i < len; i += 1) {
      if (users[i].age < 30) temp_users.push(users[i]);
    }
    console.log(temp_users.length);

    // 2번째 인자로 func을 받음
    // filter함수는 fnPredicate함수 내부는 모른다. 다만 해당 함수호출의 결과가 true일때, new_list의 요소를 추가한다.
    // 즉! fnPredicate의 결과에만 의존한다.
    // 또한 기존 list을 변경하지 않고 항상 새로운 new_list을 만든다
    // !!! 이전값을 변경하지 않고, 새로운 값을 만드는 식으로 값을 컨트롤 하는 것은 함수형 프로그래밍의 주요 기법이다. !!!
    const filter = (list, fnPredicate) => {
      const new_list = [];
      for (let i = 0, len = list.length; i < len; i += 1) {
        if (fnPredicate(list[i])) new_list.push(list[i]);
      }
      return new_list;
    }

    // 이제 general한 filter가 만들어졌고, 어떠한 조건은 사용할때! 함수로 결정 할 수 있다.
    const users_under_30 = filter(users, (item) => item.age < 30 );
    const users_over_30 = filter(users, (item) => item.age > 30 );
    console.log(users_over_30, users_under_30)
    ```

### **함수형 프로그래밍 관점의 filter 함수**

- filter 내부에 for, if문 등이 있지만, filter 함수는 항상 동일하게 동작한다.
- 외부, 내부의 상태 변화에 의존적이지 않다
- filter 내부에서는 유일하게 if문에  fnPredicate 함수의 '결과'에만 의존한다.
- 개발 방법적인 관점
    - 절차지향: 위에서 아래로 내려가면서 특정 변수의 값을 변경하거나 컨트롤
    - 객체지향: 객체를 만들고 객체간의 협업을 통해서 로직을 생성, 이벤트 등으로 연결하고 상태를 감지하거나, 상대의 메소드를 호출하여 상태 변경
    - 함수형: "항상 동일하게 동작하는 함수" 를 만들고, '보조함수' 를 조합
        - 내부에서 관리하는 상태를 따로 두지 않음
        - 넘겨받은 인자에만 의존
        - 보조 함수도 인자로 받음
    - 객체 지향, 함수형의 차이는?
        - 객체지향은, 객체를 새로 만들거나, 만든 객체를 다룸
        - 함수형은, 부수 효과를 최소하 하는 형를 목표로 한다
        - 장.단 점의 문제가 아니라 지향점의 차이이고, 함수형에서도 객체를 다루어야함.

    ### **map 함수**

    - 코드

        ```jsx
        // 기존 age, name 값을 꺼내오는 로직
        const ages = [];
        for (let i = 0, len = users.length; i < len; i +=1) {
          if (users[i].age < 30) ages.push(users[i].age);
        }
        console.log(ages);
        const names = [];
        for (let i = 0, len = users.length; i < len; i +=1) {
          if (users[i].age < 30) names.push(users[i].name);
        }
        console.log(names);

        // map 이라는 fn 생성 하여 리펙토링 해보기
        const map = (list, fnIteratee) => {
          const new_list = [];
          for (let i = 0, len = list.length; i < len; i += 1) {
            new_list.push(fnIteratee(list[i]));
          }
          return new_list;
        }
        const users_under_30_ages = map(filter(users, (item) => item.age < 30 ), (item) => item.age);
        const users_under_30_names = map(users_under_30, (item) => item.name);
        console.log('ages', users_under_30_ages, 'names:', users_under_30_names);
        ```

    ### 함수를 값으로 다룬 예제의 실용성

    - 코드

        ```jsx
        // bValue 함수를 만들어서, 어떤 obj에서 특정 key의 value가져오는걸 fn화 하기
        const bValue = (key) => (obj) => obj[key];
        const users_under_30_ages2 = map(filter(users, (item) => item.age < 30 ), bValue('age'));
        const users_under_30_names2 = map(users_under_30, bValue('name'));
        console.log('ages2:', users_under_30_ages2, 'names2:', users_under_30_names2);
        ```

    - bValue함수는 key을 받아서 기억(상수처럼) 하고 있고, 해당 형태의 함수를 리턴하는 함수이다.
        - 즉: key가 'name'이면: (obj) ⇒ obj['name'] 형태의 함수가됨
    - map이 사용할 fnIteratee 함수를, bValue함수로 대체하면, 익명함수 선언을 줄이고 코드 가독성을 높일 수 있다.
    - 함수를 리턴하는 함수나, 아주 작은 단위의 함수 조합(보조함수)을 조합하여 사용하는 예제이다
    - 코드

        ```jsx
        // 코드를 좀더 fn 형태로 쪼개서 간결하게 바꾸어 보기
        // bValue 함수를 만들어서, 어떤 obj에서 특정 key의 value가져오는걸 fn화 하기
        const bValue = (key) => (obj) => obj[key];
        const users_under_30_ages2 = map(filter(users, (item) => item.age < 30 ), bValue('age'));
        const users_under_30_names2 = map(users_under_30, bValue('name'));
        console.log('ages2:', users_under_30_ages2, 'names2:', users_under_30_names2);

        // fn스타일의 보조함수 조합으로, 간결하게 바꾸어보기
        const under_30 = item => item.age < 30;
        const over_30 = item => item.age > 30;

        const fnAges = (list) => map(list, bValue('age'));
        const fnNames = (list) => map(list, bValue('name'));

        const ages3 = fnAges(filter(users, under_30));
        const names3 = fnNames(filter(users, under_30));
        console.log('ages3:', ages3, 'names3:', names3);

        // 조금더 간결하게? (위의 fnAges, fnNames을 bValues로 묶음)
        const bValues = (key) => (list) => map(list, bValue(key));
        const ages4 = bValues('age');
        const names4 = bValues('name');
        console.log('ages4:', ages4, 'names4:', names4);
        console.log('ages4:', ages4(filter(users, under_30)), 'names4:', names4(filter(users, under_30)));
        ```

    ### 함수를 값으로 다룬 예제의 실용성2
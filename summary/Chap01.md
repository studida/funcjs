# 01. 함수형 자바스크립트 소개

### 정리

- 일급함수, 클로저, 고차 함수, 콜백 함수, 부분 적용에 대해서 알기!
    - 고차함수
        - 함수를 인자로 받거나, 함수를 리턴하는 함수를 '고차함수' 라고 한다.
        - 보통 고차함수는 '함수'를 인자로 받아 필요한때 실행하거나, 클로저를 만들어 리턴한다.
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

    const filter = (list, fnPredicate) => {
      const new_list = [];
      for (let i = 0, len = list.length; i < len; i += 1) {
        if (fnPredicate(list[i])) new_list.push(list[i]);
      }
      return new_list;
    }

    // 특정 조건을 만족하는 회원 찾기
    console.log(
      filter(users, (item) => item.id === 2)
    );

    // 원하는 조건에 값을 찾으면 루프를 full로 돌지 않게 하기
    const find1 = () => {
      let find = null;
      for (let i = 0, len = users.length; i < len; i+= 1) {
        if (users[i].id === 3) {
          find = users[i];
          break;
        }
      }
      return find;
    }
    console.log(find1());

    // id조건을 받아서 find해주는 함수
    const findById1 = (list, id) => {
      let find = null;
      for (let i = 0, len = list.length; i < len; i+= 1) {
        if (list[i].id === id) {
          find = list[i];
          break;
        }
      }
      return find;
    }
    console.log(findById1(users, 3));

    // findByName? findByAge?
    // 코드가 중복되고, 함수형 프로그래밍 형태가 아닌 그림..!
    // 함수형 프로그래밍으로 만들어보기
    const findBy1 = (list, key, value) => {
      let find = null;
      for (let i = 0, len = list.length; i < len; i+= 1) {
        if (list[i][key] === value) {
          find = list[i];
          break;
        }
      }
      return find;
    }
    console.log(
      findBy1(users, 'id', 3),
      findBy1(users, 'age', 32),
    );

    // 여기도 문제가 있다. list의 역할을 하는 users객체가 함수(메소드)로 값을 얻어야 하는 형태라면?
    ```


값→ 함수로 (param)을 받는 형태로 변경하기!

- 코드

    ```jsx
    const users_ori = [
      { id: 1, name: '일', age: 32 },
      { id: 2, name: '이', age: 25 },
      { id: 3, name: '삼', age: 32 },
      { id: 4, name: '사', age: 28 },
      { id: 5, name: '오', age: 27 },
      { id: 6, name: '육', age: 32 },
      { id: 7, name: '칠', age: 24 },
    ];

    // 값을 메소드로 얻어야하는 형태의 list라면?
    function User(id, name, age) {
      this.getId = function () {
        return id;
      };
      this.getName = function () {
        return name;
      };
      this.getAge = function () {
        return age;
      };
    }

    const users = [
      new User(1, '1', 32),
      new User(2, '2', 25),
      new User(3, '3', 32),
      new User(4, '4', 28),
      new User(5, '5', 27),
      new User(6, '6', 32),
      new User(7, '7', 24),
    ];

    // 기존 findById로는 안됨
    const findBy1 = (list, key, value) => {
      for (let i = 0, len = list.length; i < len; i+= 1) {
        if (list[i][key] === value) return list[i]; // list에서 실제 key에 해당하는 값을 .getKey형태의 함수를 써야하는데 안되서 항상 null이됨
      }
      return null;
    }
    console.log(
      findBy1(users, 'age', 32)
    );

    // find의 if 조건 부분을 fn으로 받아서 처리 하도록 변경
    const find = (list, fnPredicate) => {
      for (let i = 0, len = list.length; i < len; i+= 1) {
        if (fnPredicate(list[i])) return list[i]; // 사용하는쪽에서 조건을 동적으로 결정 가능
      }
      return null;
    }
    console.log(
      'find의 if 조건 부분을 fn으로 받아서 처리 하도록 변경',
      find(users, (item) => item.getAge() === 32).getAge(),
      '기존 users도 됨',
      find(users_ori, (item) => item.age === 28),
    );
    ```

- 인자를 string, number 대신 → Function 으로 바꾼것이 큰 변경을 만들게 된다.!!
- 각 함수는 들어온 데이터가 무었이든 루프를 돌고, 다만 들어온 함수 조건에 따른 동작을 한다.
- 객체지향이 약속된 이름의 메소드 실행 형태라면 → 함수형 프로그래밍은 '보조함수' 에 동작을 위임하는 형태를 취한다.
    - 이는 매우 높은 수준의 '다형성' & '안정성' 을 보장하게 된다.

함수를 만드는 함수와, find, filter 조합하기!

- 코드

    ```jsx
    // 좀더 개선하기
    const users_ori = [
      { id: 1, name: '일', age: 32 },
      { id: 2, name: '이', age: 25 },
      { id: 3, name: '삼', age: 32 },
      { id: 4, name: '사', age: 28 },
      { id: 5, name: '오', age: 27 },
      { id: 6, name: '육', age: 32 },
      { id: 7, name: '칠', age: 24 },
    ];

    function User(id, name, age) {
      this.getId = function () {
        return id;
      };
      this.getName = function () {
        return name;
      };
      this.getAge = function () {
        return age;
      };
    }

    const users = [
      new User(1, '1', 32),
      new User(2, '2', 25),
      new User(3, '3', 32),
      new User(4, '4', 28),
      new User(5, '5', 27),
      new User(6, '6', 32),
      new User(7, '7', 24),
    ];

    // find의 if 조건 부분을 fn으로 받아서 처리 하도록 변경
    const find = (list, fnPredicate) => {
      for (let i = 0, len = list.length; i < len; i+= 1) {
        if (fnPredicate(list[i])) return list[i]; // 사용하는쪽에서 조건을 동적으로 결정 가능
      }
      return null;
    }
    console.log(
      'find의 if 조건 부분을 fn으로 받아서 처리 하도록 변경',
      find(users, (item) => item.getAge() === 32).getAge(),
      '기존 users도 됨',
      find(users_ori, (item) => item.age === 28),
    );

    // find의 두번째 인자로 들어가는 함수를 -> 공통화된 보조 함수로 만들기
    const bMatch1 = (key, val) => {
      return (obj) => {
        return obj[key] === val;
      }
    }
    console.log(
      find(users_ori, bMatch1('age', 32)), // bMatch1는 고차함수인 find의 2번째 param인 fn을 동적으로 생성해주는 보조함수가 된다
    );

    // bMatch1은 key, val 형태로만 구동하는데, { key: val } 형태의 여러 조건을 받을 수 있도록 해보기
    const objMaker = (key, val) => {
      return { [key]: val };
    }
    const match = (obj, obj2) => {
      for (let key in obj2) {
        if (obj[key] !== obj2[key]) return false;
      }
      return true;
    }
    const bMatch2 = (keyOrObj, val) => {
      const logic1 = () => {
        if (!val) {
          return (obj) => {
            return match(obj, keyOrObj);
          }
        }
        return bMatch1(keyOrObj, val);
      }

      const logic2 = () => {
        return (obj) => {
          return match(obj, !val ? keyOrObj: { [keyOrObj]: val });
        }
      }

      // book
      if (val) keyOrObj = objMaker(keyOrObj, val); // param을 re-assign하는 부분이 맘에 안들어서 위에형태로 다시 해봄
      return (obj) => {
        return match(obj, keyOrObj);
      }
    }
    console.log(
      find(users_ori, bMatch2('age', 24)),
      find(users_ori, bMatch2({ age: 32, id: 3 })),
    );

    // findIndex 만들어보기
    const findIndex = (list, fnPredicate) => {
      for (let i = 0, len = list.length; i < len; i+= 1) {
        if (fnPredicate(list[i])) return i;
      }
      return -1;
    }
    console.log(
      findIndex(users_ori, bMatch2('age', 24)),
      findIndex(users_ori, bMatch2({ age: 32, id: 3 })),
    );
    ```

- 작은 기능을 하는 함수로 쪼개거나 재조합 하는 형태로 코드를 발전시키자

### 고차함수

- 함수를 인자로 받거나, 함수를 리턴하는 함수를 '고차함수' 라고 한다.
- 보통 고차함수는 '함수'를 인자로 받아 필요한때 실행하거나, 클로저를 만들어 리턴한다.
- 코드

    ```jsx
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

    // 고차 함수의 보조함수에 여러 값을 넘겨서, 보조함수가 좀더 유연하게 대응 가능하도록 한 케이스임
    ```

자기 자신을 리턴하는 함수? 어따쓰나?

```jsx
const _ = {};
_.identity = (d) => d;

// true, false 형태에 응용가능하다!

console.log(
  _.filter([true, 0, 10, 'a', false, NaN, null], _.identity)
);
```

아래와 같이 확장 가능하다

- 코드

    ```jsx
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
    ```

- 핵심은 함수를 아주 작은 기능 단위쪼개고!
- 해당 함수를 param(보조함수)으로 사용!
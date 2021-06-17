
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

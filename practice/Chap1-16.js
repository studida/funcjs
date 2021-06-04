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

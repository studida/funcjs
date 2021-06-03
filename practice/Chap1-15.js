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

// map 이라는 fn 생성 하여 리펙토링 해보기
const map = (list, fnIteratee) => {
  const new_list = [];
  for (let i = 0, len = list.length; i < len; i += 1) {
    new_list.push(fnIteratee(list[i]));
  }
  return new_list;
}
// bValue 함수를 만들어서, 어떤 obj에서 특정 key의 value가져오는걸 fn화 하기
const bValue = (key) => (obj) => obj[key];

const under_30 = item => item.age < 30;
const over_30 = item => item.age > 30;

// 조금더 간결하게?
const bValues = (key) => (list) => map(list, bValue(key));
const ages4 = bValues('age');
const names4 = bValues('name');
console.log('ages4:', ages4, 'names4:', names4);
console.log('ages4:', ages4(filter(users, under_30)), 'names4:', names4(filter(users, under_30)));


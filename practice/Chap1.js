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
console.log('ages:', users_under_30_ages, 'names:', users_under_30_names);

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


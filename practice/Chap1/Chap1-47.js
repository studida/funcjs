// 클로저의 흔한 실수

const users = [
  { id: 1, name: '일', age: 32 },
  { id: 2, name: '이', age: 25 },
  { id: 3, name: '삼', age: 32 },
  { id: 4, name: '사', age: 28 },
  { id: 5, name: '오', age: 27 },
  { id: 6, name: '육', age: 32 },
  { id: 7, name: '칠', age: 24 },
];

console.log('-------')
for (let i = 0; i < users.length; i+=1) {
  var user = users[i];
  setTimeout(() => {
    console.log('q1', user.name); // 항상 맨뒤꺼
  });
}

for (let i = 0; i < users.length; i+=1) {
  var user = users[i];
  ((name) => {
    setTimeout(() => {
      console.log('q2', name); // 정상
    });
  })(user.name);
}

users.map(({ name }) => {
  setTimeout(() => {
    console.log('q3', name); // 정상
  });
})
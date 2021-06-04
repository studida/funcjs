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


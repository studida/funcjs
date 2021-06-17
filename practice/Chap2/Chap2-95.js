function log(arg) {
  console.log(arg);
}
var start = f => f(f);
var each = (arr, iter, i = 0) => start(f => iter(arr[i]) || ++i < arr.length && f(f));
each([1,2,3,4,5], log);
// 일반적인 callback 쓸꺼면 아래처럼해도됨, 다만 책에서 처럼 커링 형태로 받으려면
// 그때는 arguements개선 및 _async_cb가 필요해짐.
/*
function _async(func) {
  return function () {
    var _callback;
    function _async_cb_receiver(callback) {
      _callback = callback;
    }
    func.apply(null, arguments);

    return _async_cb_receiver;
  };
}
var add = _async(function (a, b, callback) {
  setTimeout(function () {
    callback(a + b);
  }, 1000);
});
add(5, 10, function(r) { console.log(r); });
*/

function _async(func) {
  return function () {
    var _callback;
    function _async_cb_receiver(callback) {
      _callback = callback;
    }

    // _async에서 a, b, callback중 callback부분을 여기서 생성해서 넣어주는거임
    // 그럼 원래 사용자가 전달하는 callback이 빠지게 되는데 그걸 커링 형태로 받아서, 아래에 구현한
    // function(result)에서 다시 call 하는 구조
    arguments[arguments.length++] = function(result) {
      _callback(result);
    }
    func.apply(null, arguments);

    return _async_cb_receiver;
  };
}
var add = _async(function (a, b, callback) {
  setTimeout(function () {
    callback(a + b);
  }, 1000);
});
var sub = _async(function (a, b, callback) {
  setTimeout(function () {
    callback(a - b);
  }, 1000);
});
var div = _async(function (a, b, callback) {
  setTimeout(function () {
    callback(a / b);
  }, 1000);
});
add(5, 10)(function(addR) {
  console.log(addR);
  sub(addR, 5)(function(subR) {
    console.log(subR);
    div(subR, 2)(function(r) {
      console.log(r);
    });
  });
});


(function () {
  console.log(this, arguments); // [this] { hi: 1 }, [Arguments] { '0': 1, '1': 2, '2': 3 }
  (() => {
    console.log(this, arguments); // [this] { hi: 1 }, [Arguments] { '0': 1, '1': 2, '2': 3 }
    (() => {
      console.log(this, arguments); // [this] { hi: 1 }, [Arguments] { '0': 1, '1': 2, '2': 3 }
    })();
  })();
}).call({ hi: 1 }, 1, 2, 3);
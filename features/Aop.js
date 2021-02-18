exports.around = function (before, original, after) {
  return args => {
    let err;
    try {
      before && before();
    } catch (e) {
      err = new Error(e);
      err.phase = "before";
      original({error: err, args});
    }

    if (err) return;

    original({args});
    if (after && err===undefined) after();
  };
};
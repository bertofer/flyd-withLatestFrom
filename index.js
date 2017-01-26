var flyd = require('flyd')

module.exports = flyd.curryN(2, function (streams, source$) {
  if (streams.constructor !== Array) streams = [streams];
  return flyd.combine(function (source, self) {
    let res = [source()]
    for (var i = 0; i < streams.length; ++i) {
      if (!streams[i].hasVal) return;
      res.push(streams[i]())
    }
    self(res)
  }, [source$])
})

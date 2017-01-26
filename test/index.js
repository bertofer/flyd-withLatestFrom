var flyd = require('flyd')
var withLatestFrom = require('../')
var assert = require('assert')

describe('withLatestFrom', function () {
  var source$, stream1$, stream2$;

  beforeEach(function() {
    source$ = flyd.stream()
    stream1$ = flyd.stream()
    stream2$ = flyd.stream()
  })

  it('Should emit with the values from streams', function() {
    var withLatestFrom$ = withLatestFrom([stream1$, stream2$], source$)
    stream1$(1)
    stream2$(2)
    assert.deepEqual(withLatestFrom$(), undefined)
    source$(3)
    assert.deepEqual(withLatestFrom$(), [3, 1, 2])
  })

  it('Should not emit if all streams have not emitted', function () {
    var withLatestFrom$ = withLatestFrom([stream1$, stream2$], source$)
    stream1$(1)
    assert.deepEqual(withLatestFrom$(), undefined)
    source$(2)
    assert.deepEqual(withLatestFrom$(), undefined)
  })

  it('Works curried', function() {
    var withLatestFrom$ = withLatestFrom([stream1$, stream2$])(source$)
    stream1$(1)
    stream2$(2)
    assert.deepEqual(withLatestFrom$(), undefined)
    source$(3)
    assert.deepEqual(withLatestFrom$(), [3, 1, 2])
  })
})

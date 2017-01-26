# flyd-withLatestFrom
[![Build Status](https://travis-ci.org/bertofer/flyd-withLatestFrom.svg?branch=master)](https://travis-ci.org/bertofer/flyd-withLatestFrom)

withLatestFrom implementation for flyd streams.

Creates a stream that emits when the source emits, with the latest values from other streams. Only emits if the other streams all have value.

The values are emitted in an array where first value is the source value, followed by the other streams values.

`withLatestFrom([...streams], source) -> Stream -> [sourceVal, ...streamsVals]`

## Usage
```javascript
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
```
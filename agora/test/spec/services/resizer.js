'use strict';

describe('Service: resizer', function () {

  // load the service's module
  beforeEach(module('agoraApp'));

  // instantiate service
  var resizer;
  beforeEach(inject(function (_resizer_) {
    resizer = _resizer_;
  }));

  it('should do something', function () {
    expect(!!resizer).toBe(true);
  });

});

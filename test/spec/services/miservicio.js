'use strict';

describe('Service: miservicio', function () {

  // load the service's module
  beforeEach(module('eltiempoApp'));

  // instantiate service
  var miservicio;
  beforeEach(inject(function (_miservicio_) {
    miservicio = _miservicio_;
  }));

  it('should do something', function () {
    expect(!!miservicio).toBe(true);
  });

});

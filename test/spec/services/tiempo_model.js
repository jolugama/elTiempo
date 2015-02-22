'use strict';

describe('Service: tiempoModel', function () {

  // load the service's module
  beforeEach(module('eltiempoApp'));

  // instantiate service
  var tiempoModel;
  beforeEach(inject(function (_tiempoModel_) {
    tiempoModel = _tiempoModel_;
  }));

  it('should do something', function () {
    expect(!!tiempoModel).toBe(true);
  });

});

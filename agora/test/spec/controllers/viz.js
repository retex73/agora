'use strict';

describe('Controller: VizCtrl', function () {

  // load the controller's module
  beforeEach(module('agoraApp'));

  var VizCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    VizCtrl = $controller('VizCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});

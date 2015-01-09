'use strict';

describe('Controller: DialogController', function () {

  // load the controller's module
  beforeEach(module('bandaidApp'));

  var DialogController,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DialogController = $controller('DialogController', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});

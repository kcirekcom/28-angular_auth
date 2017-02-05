'use strict';

describe('Edit Gallery Component', function() {
  beforeEach(() => {
    angular.mock.module('cfgram');
    angular.mock.inject(($rootScope, $componentController, $httpBackEnd) => {
      this.$rootScope = $rootScope;
      this.$componentController = $componentController;
      this.$httpBackEnd = $httpBackEnd;
    });
  });
});

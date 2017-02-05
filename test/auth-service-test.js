'use strict';

describe('Auth Service', function() {
  beforeEach(() => {
    angular.mock.module('cfgram');
    angular.mock.inject(($rootScope, authService, $window, $httpBackend) => {
      this.$window = $window;
      this.$rootScope = $rootScope;
      this.authService = authService;
      this.$httpBackend = $httpBackend;
    });
  });

  describe('authService.getToken()', () => {
    it('should return a token', () => {
      this.authService.token = null;
      this.$window.localStorage.setItem('token', 'test token');

      this.authService.getToken()
      .then(token => {
        expect(token).toEqual('test token');
      });

      this.$rootScope.$apply();
    });
  });

  describe('authService.login()', () => {
    it('should log a user into the app', () => {
      let testUser = {
        username: 'testuser',
        password: '1234abcd'
      };

      let base64 = this.$window.btoa(`${testUser.username}:${testUser.password}`);

      let headers = {
        Accept: 'application/json',
        Authorization: `Basic ${base64}`
      };

      this.$httpBackend.expectGET(`${__API_URL__}/api/login`, headers) //eslint-disable-line
      .respond(200, 'test token');

      this.authService.login(testUser)
      .then(token => {
        expect(token).toEqual('test token');
      });

      this.$httpBackend.flush();
      this.$rootScope.$apply();
    });
  });
});

'use strict';

describe('Gallery Service', function() {
  beforeEach(() => {
    angular.mock.module('cfgram');
    angular.mock.inject(($rootScope, galleryService, $httpBackend) => {
      this.$rootScope = $rootScope;
      this.galleryService = galleryService;
      this.$httpBackend = $httpBackend;
    });
  });

  describe('galleryService.createGallery()', () => {
    it('should create a new gallery', () => {
      let galleryData = {
        name: 'example gallery',
        desc: 'example desc'
      };

      let headers = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer test token'
      };

      this.$httpBackend.expectPOST(`${__API_URL__}/api/gallery`, galleryData, headers) //eslint-disable-line
      .respond(200, {
        _id: '1234',
        username: 'testuser',
        name: galleryData.name,
        desc: galleryData.desc,
        pics: []
      });

      this.galleryService.createGallery(galleryData);
      this.$httpBackend.flush();
      this.$rootScope.$apply();
    });
  });

  describe('galleryService.deleteGallery()', () => {
    it('should delete a gallery', () => {
      let galleryID = 'testid';
      let headers = {
        Accept: 'application/json, text/plain, */*',
        Authorization: 'Bearer test token'
      };

      this.$httpBackend.expectDELETE(`${__API_URL__}/api/gallery/testid`, headers) //eslint-disable-line
      .respond(204);

      this.galleryService.deleteGallery(galleryID);
      this.$httpBackend.flush();
      this.$rootScope.$apply();
    });
  });
});

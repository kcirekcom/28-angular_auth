'use strict';

describe('Gallery Item Component', function() {
  beforeEach(() => {
    angular.mock.module('cfgram');
    angular.mock.inject(($rootScope, $componentController, $httpBackend) => {
      this.$rootScope = $rootScope;
      this.$componentController = $componentController;
      this.$httpBackend = $httpBackend;
    });
  });

  describe('galleryItemCtrl.deleteDone()', () => {
    it('should call deleteDone', () => {
      let mockBindings = {
        gallery: {
          _id: '12121',
          name: 'test name',
          desc: 'test description',
          pics: []
        },
        deleteDone: function(data) {
          expect(data.galleryData._id).toEqual('12121');
        }
      };

      let galleryItemCtrl = this.$componentController('galleryItem', null, mockBindings);
      galleryItemCtrl.deleteDone({galleryData: galleryItemCtrl.gallery});

      this.$rootScope.$apply();
    });

    it('should call deleteDone with a gallery after galleryDelete', () => {
      let url = `${__API_URL__}/api/gallery/12121`; //eslint-disable-line
      let headers = {
        Authorization: 'Bearer test token',
        Accept: 'application/json, text/plain, */*'
      };

      let mockBindings = {
        gallery: {
          _id: '12121',
          name: 'test name',
          desc: 'test description',
          pics: []
        },
        deleteDone: function(data) {
          expect(data.galleryData._id).toEqual(mockBindings.gallery._id);
        }
      };

      this.$httpBackend.expectDELETE(url, headers).respond(204);

      let galleryItemCtrl = this.$componentController('galleryItem', null, mockBindings);
      galleryItemCtrl.deleteGallery();

      this.$httpBackend.flush();
      this.$rootScope.$apply();
    });
  });
});

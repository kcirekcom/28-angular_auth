'use strict';

describe('Edit Gallery Component', function() {
  beforeEach(() => {
    angular.mock.module('cfgram');
    angular.mock.inject(($rootScope, $componentController, $httpBackend) => {
      this.$rootScope = $rootScope;
      this.$componentController = $componentController;
      this.$httpBackend = $httpBackend;
    });
  });

  it('should contain proper component bindings', () => {
    let mockBindings = {
      gallery: {
        name: 'test gallery name',
        desc: 'test gallery description'
      }
    };

    let editGalleryCtrl = this.$componentController('editGallery', null, mockBindings);
    expect(editGalleryCtrl.gallery.name).toEqual(mockBindings.gallery.name);
    expect(editGalleryCtrl.gallery.desc).toEqual(mockBindings.gallery.desc);

    this.$rootScope.$apply();
  });

  describe('editGalleryCtrl.updateGallery()', () => {
    it('should make a valid put request', () => {
      let url = `${__API_URL__}/api/gallery/12121`; //eslint-disable-line
      let headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer test token'
      };

      this.$httpBackend.expectPUT(url, {
        _id: '12121',
        name: 'updated name',
        desc: 'updated description'
      }, headers).respond(200);

      let mockBindings = {
        gallery: {
          _id: '12121',
          name: 'updated name',
          desc: 'updated description'
        }
      };

      let editGalleryCtrl = this.$componentController('editGallery', null, mockBindings);
      editGalleryCtrl.gallery.name = 'updated name';
      editGalleryCtrl.gallery.desc = 'updated description';
      editGalleryCtrl.updateGallery();

      this.$httpBackend.flush();
      this.$rootScope.$apply();
    });
  });
});

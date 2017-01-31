'use strict';

module.exports = ['$log', '$rootScope', 'galleryService', HomeController];

function HomeController($log, $rootScope, galleryService) {
  $log.debug('HomeController');

  this.galleries = [];

  this.fetchGalleries = function() {
    galleryService.fetchGalleries()
    .then(galleries => {
      this.galleries = galleries.reverse();
    });
  };

  this.fetchGalleries();

  $rootScope.$on('locationChangeSuccess', () => {
    this.fetchGalleries();
  });
}

'use strict';

module.exports = {
  template: require('./thumbnail.html'),
  controller: ['$log', 'picService', ThumbnailController],
  controllerAs: 'thumbnailCtrl',
  bindings: {
    pic: '<',
    gallery: '<'
  }
};

function ThumbnailController($log, picService) {
  $log.debug('ThumbnailController');

  this.deletePic = function() {
    $log.debug('thumbnailCtrl.deletePic()');

    picService.deleteGalleryPic(this.gallery, this.pic);
  };
}

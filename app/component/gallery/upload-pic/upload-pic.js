'use strict';

module.exports = {
  template: require('./upload-pic.html'),
  controller: ['$log', 'picService', UploadPicController],
  controllerAs: 'uploadPicCtrl',
  bindings: {
    gallery: '<'
  }
};

function UploadPicController($log, picService) {
  $log.debug('UploadPicController');
  console.log('print gallery', this.gallery);

  this.pic = {};

  this.uploadPic = function() {
    picService.uploadGalleryPic(this.gallery, this.pic)
    .then(() => {
      this.pic.name = null;
      this.pic.desc = null;
      this.pic.file = null;
    });
  };
}

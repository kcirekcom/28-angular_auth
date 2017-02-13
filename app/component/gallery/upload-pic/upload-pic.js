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

  this.pic = {};

  this.uploadPic = function(files) {
    picService.uploadGalleryPic(this.gallery, files)
    .then(() => {
      // this.pic.name = null;
      // this.pic.desc = null;
      this.pic.file = null;
    });
  };
}

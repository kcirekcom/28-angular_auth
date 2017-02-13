'use strict';

module.exports = ['$q', '$log', '$http', 'Upload', 'authService', picService];

function picService($q, $log, $http, Upload, authService) {
  $log.debug('picService');

  let service = {};

  // service.uploadGalleryPic = function(galleryData, picData) {
  //   $log.debug('uploadGalleryPic');
  //   console.log(picData);
  //
  //   return authService.getToken()
  //   .then(token => {
  //     let url = `${__API_URL__}/api/gallery/${galleryData._id}/pic`; //eslint-disable-line
  //     let headers = {
  //       Authorization: `Bearer ${token}`,
  //       Accept: 'application/json'
  //     };
  //
  //     return Upload.upload({
  //       url,
  //       headers,
  //       method: 'POST',
  //       data: {
  //         name: picData.name,
  //         desc: picData.desc,
  //         file: picData.file
  //       }
  //     });
  //   })
  //   .then(res => {
  //     galleryData.pics.unshift(res.data);
  //     return res.data;
  //   })
  //   .catch(err => {
  //     $log.error(err.message);
  //     return $q.reject(err);
  //   });
  // };

  service.uploadGalleryPic = function(galleryData, files) {
    $log.debug('uploadGalleryPic');
    console.log(files);

    return authService.getToken()
    .then(token => {
      let url = `${__API_URL__}/api/gallery/${galleryData._id}/pic`; //eslint-disable-line
      let headers = {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json'
      };

      if (files && files.length) {
        for (var i = 0; i < files.length; i++) {

          return Upload.upload({
            url,
            headers,
            method: 'POST',
            data: {
              file: files[i]
            }
          })
          .then(res => {
            galleryData.pics.unshift(res.data);
            return res.data;
          })
          .then(evt => {
            this.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
          })
          .catch(err => {
            $log.error(err.message);
            return $q.reject(err);
          });
        }
      }
    });
  };

  service.deleteGalleryPic = function(galleryData, picData) {
    $log.debug('picService.deleteGalleryPic');
    console.log(picData);

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/gallery/${galleryData._id}/pic/${picData._id}`; //eslint-disable-line
      let config = {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      };
      return $http.delete(url, config);
    })
    .then(() => {
      for(let i = 0; i < galleryData.pics.length; i++) {
        let current = galleryData.pics[i];
        if(current._id === picData._id) {
          galleryData.pics.splice(i, 1);
          break;
        }
      }
      $log.log('pic deleted');
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  return service;
}

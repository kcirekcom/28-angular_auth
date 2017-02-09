module.exports = {
  template: require('./carousel.html'),
  controller: ['$log', CarouselController],
  controllerAs: 'carouselCtrl'
};


function CarouselController($log){
  $log.debug('CarouselController');

  this.setInterval = 2000;
  this.noWrapSlides = false;
  this.active = 0;
  this.slides = [];

  let currentIndex = 0;

  this.transitionSlide = function(){
    var newWidth = 600 + this.slides.length + 1;
    this.slides.push({
      image: '//lorempixel.com//' + newWidth + '/300',
      id: currentIndex++
    });
  };

  for(let i = 0; i < 5; i++){
    this.transitionSlide();
  }
}

export default class Slider {
  constructor(element) {
    this.cacheDom(element);
  }

  cacheDom = (element) => {
    this.slideElement = document.querySelector(element);
    this.slides = Array.from(this.slideElement.children);
  };

  slideToNext = () => {};
}

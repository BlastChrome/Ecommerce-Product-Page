export default class Slider {
  constructor(element) {
    this.slider = null;
    this.slideTrack = null;
    this.slides = [];
    this.currIndex = null;
    this.prevIndex = null;
    this.nextIndex = null;

    // Initialize the slider if the element is provided
    if (element) {
      this.initializeSlider(element);
      this.initEventListeners();
    } else {
      console.error("No element provided for the slider.");
    }
  }

  // Method to initialize the slider
  initializeSlider = (element) => {
    this.cacheDom(element);
    if (this.slides.length > 0) {
      this.slideTrack = this.createTrack();
      this.slider.appendChild(this.slideTrack);
      this.initializeSlidePositions();
      // this.autoPlay(1000);
      // set the initial current, next, and previous state for the slides
    } else {
      console.error("No slides found in the provided element.");
    }
  };

  // Method to cache DOM elements
  cacheDom = (element) => {
    //tester
    this.testButton = document.querySelector(".add-to-cart-btn");

    this.slider = document.querySelector(element);

    // Check if the slider element exists
    if (!this.slider) {
      console.error(`Element not found: ${element}`);
      return;
    }
    this.slides = this.getSlides();
  };

  initEventListeners = () => {
    this.testButton.addEventListener("click", () => {
      this.slideToNext();
    });
  };

  // Method to create a track for the slides
  createTrack = () => {
    let track = document.createElement("div");
    track.classList.add("sliderTrack");
    this.appendSlides(track);
    return track;
  };

  // Method to append slides to the track
  appendSlides = (parentElement) => {
    this.slides.forEach((slide) => {
      // Ensure parentElement is valid
      if (parentElement) {
        parentElement.appendChild(slide);
      }
    });
  };

  // Method to get slides from the slider element
  getSlides = () => {
    // Return an empty array if this.slider is not valid
    return this.slider ? Array.from(this.slider.children) : [];
  };

  initializeSlidePositions = () => {
    if (this.slides.length > 2) {
      let curr = Math.floor((this.slides.length - 1) / 2);
      let prev = curr - 1;
      let next = curr + 1;

      for (let i = 0; i < this.slides.length; i++) {
        if (i === prev) {
          this.slides[i].classList.add("slide--prev");
          this.prevIndex = i;
        } else if (i === curr) {
          this.slides[i].classList.add("slide--curr");
          this.currIndex = i;
        } else if (i === next) {
          this.slides[i].classList.add("slide--next");
          this.nextIndex = i;
        }
      }
    }
  };

  autoPlay = (time) => {
    setInterval(() => {
      this.slideToNext();
    }, time);
  };

  _slideToNext = () => {
    let curr = this.slides[this.currIndex];
    let next = this.slides[this.nextIndex];
    let prev = this.slides[this.prevIndex];
    let afterNext = this.slides[this.nextIndex + 1];

    this.updateSlideClasses(1);
    this.updateSlideIndex(1);
  };
  get slideToNext() {
    return this._slideToNext;
  }
  set slideToNext(value) {
    this._slideToNext = value;
  }

  updateSlideClasses = (dir) => {
    //gets the curr,next,prev slides
    let curr = this.slides[this.currIndex];
    let next = this.slides[this.nextIndex];
    let prev = this.slides[this.prevIndex];
    let afterNext = this.slides[this.nextIndex + 1];

    // updates classes forwards
    if (dir == 1) {
      // if the next slide is the last slide then....
      if (this.nextIndex == this.slides.length - 1) {
        next.classList.remove("slide--next");
        next.classList.add("slide--curr");
        curr.classList.remove("slide--curr");
        curr.classList.add("slide--prev");
        prev.classList.remove("slide--prev");
        console.log("end");
        curr = this.slides[this.nextIndex];
        next = this.slides[0]; // go back to the first slide;
        prev = this.slides[this.currIndex];

        next.classList.add("slide--next");

        console.log([prev, curr, next]);
        return;
      }

      next.classList.remove("slide--next");
      next.classList.add("slide--curr");
      curr.classList.remove("slide--curr");
      curr.classList.add("slide--prev");
      prev.classList.remove("slide--prev");
      afterNext.classList.add("slide--next");
    }
  };

  updateSlideIndex = (dir) => {
    if (dir == 1) {
      // Update the indexes
      this.prevIndex = this.currIndex;
      this.currIndex = this.nextIndex;
      this.nextIndex = (this.nextIndex + 1) % this.slides.length;
    }
  };

  slideToPrev = () => {};
}

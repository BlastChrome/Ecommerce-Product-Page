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
      this.updateSlideSize();

      //slider is set to autoplay by default
      this.autoPlay(2000);
      // set the initial current, next, and previous state for the slides
    } else {
      console.error("No slides found in the provided element.");
    }
  };

  // Method to cache DOM elements
  cacheDom = (element) => {
    this.slider = document.querySelector(element);
    // Check if the slider element exists
    if (!this.slider) {
      console.error(`Element not found: ${element}`);
      return;
    }
    this.slides = this.getSlides();
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
        slide.classList.add("slide");
        parentElement.appendChild(slide);
      }
    });
  };

  getSlides = () => {
    // Return an empty array if this.slider is not valid
    return this.slider ? Array.from(this.slider.children) : [];
  };

  updateSlideSize = () => {
    this.slideTrack.style.height = this.slides[0].offsetHeight + "px";
    this.slideTrack.style.width = this.slides[0].offsetWidth + "px";
    console.log([this.slides[0].offsetHeight, this.slides[0].offsetWidth]);
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
      this.slideToDirection(1);
    }, time);
  };

  slideToDirection = (dir) => {
    this.updateSlideSize();
    let curr = this.slides[this.currIndex];
    let next = this.slides[this.nextIndex];
    let prev = this.slides[this.prevIndex];
    let afterNext = this.slides[this.nextIndex + 1];

    // if the direction is (+), then move the slide to the right
    if (dir >= 0) {
      // if the next slide is the last slide then the curr
      if (this.nextIndex == this.slides.length - 1) {
        this.updateClass(next, "slide--next", "slide--curr");
        this.updateClass(curr, "slide--curr", "slide--prev");
        this.updateClass(prev, "slide--prev", null);

        curr = this.slides[this.nextIndex];
        next = this.slides[0]; // go back to the first slide;
        prev = this.slides[this.currIndex];

        this.updateClass(next, null, "slide--next");

        this.prevIndex = this.currIndex;
        this.currIndex = this.nextIndex;
        this.nextIndex = (this.nextIndex + 1) % this.slides.length;
        return;
      }

      this.updateClass(next, "slide--next", "slide--curr");
      this.updateClass(curr, "slide--curr", "slide--prev");
      this.updateClass(prev, "slide--prev", null);
      this.updateClass(afterNext, null, "slide--next");

      this.prevIndex = this.currIndex;
      this.currIndex = this.nextIndex;
      this.nextIndex = (this.nextIndex + 1) % this.slides.length;
    }
  };

  updateClass = (element, removeClass, addClass) => {
    if (element) {
      if (addClass != null || removeClass != null) {
        element.classList.remove(removeClass);
        element.classList.add(addClass);
      }
    }
  };
}

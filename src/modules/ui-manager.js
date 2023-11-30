export default class UIManager {
  constructor() {
    this.cacheDom();
    this.initEvents();
    this.activeElements = [];
  }

  cacheDom = () => {
    this.hamburger = document.getElementById("hamburger");
    this.nav = document.getElementById("nav");
    this.overlay = document.getElementById("overlay");
    this.slider_wrapper = document.getElementById("slider-wrapper");
    this.close_slider_btn = document.getElementById("close-slider");
    this.featured_product_trigger = document.getElementById(
      "featured-product--trigger"
    );
    this.featured_product_wrapper = document.getElementById(
      "featured-product-wrapper"
    );
  };

  initEvents = () => {
    this.hamburger.addEventListener("click", this.handleHamburgerClick);
    this.overlay.addEventListener("click", this.handleOverlayClick);
    this.close_slider_btn.addEventListener(
      "click",
      this.handleSliderCloseClick
    );
    this.featured_product_trigger.addEventListener(
      "click",
      this.handleFeaturedClick
    );
  };

  toggle = (elements) => {
    //toggle the active state of the passed in elements
    elements.forEach((item) => {
      item.classList.toggle("active");
      //if those elements have been toggled to 'active' add them to the list of currently active elements
      if (
        item.classList.contains("active") &&
        !this.activeElements.includes(item)
      ) {
        this.addToActive(item);
      } else {
        this.removeActive(item);
      }
    });
  };

  addToActive = (item) => {
    this.activeElements.push(item);
  };

  removeActive = (element) => {
    this.activeElements = this.activeElements.filter((item) => item != element);
  };

  handleHamburgerClick = (e) => {
    e.stopPropagation();
    this.toggle([this.hamburger, this.nav, this.overlay]);
  };

  handleSliderCloseClick = (e) => {
    this.activeElements.forEach((item) => {
      item.classList.remove("active");
      this.removeActive(item);
    });
  };

  handleOverlayClick = (e) => {
    if (e.target == this.overlay && this.overlay.classList.contains("active")) {
      this.activeElements.forEach((item) => {
        item.classList.remove("active");
        this.removeActive(item);
      });
    }
  };

  handleFeaturedClick = (e) => {
    e.stopPropagation();
    this.toggle([this.featured_product_wrapper, this.overlay]);
  };
}

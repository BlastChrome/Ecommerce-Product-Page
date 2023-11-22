export default class MobileNav {
  constructor() {
    this.cacheDom();
    this.initEvents();
  }

  cacheDom = () => {
    this.hamburger = document.getElementById("hamburger");
    this.nav = document.getElementById("nav");
  };

  initEvents = () => {
    this.hamburger.addEventListener("click", this.handleHamburgerClick);
  };

  toggleActive = (element) => {
    element.classList.contains("active")
      ? element.classList.remove("active")
      : element.classList.add("active");
  };

  handleHamburgerClick = (e) => {
    this.toggleActive(this.hamburger);
    this.toggleActive(this.nav);
  };
}

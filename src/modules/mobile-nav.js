export default class MobileNav {
  constructor() {
    this.cacheDom();
    this.initEvents();
  }

  cacheDom = () => {
    this.hamburger = document.getElementById("hamburger");
  };

  initEvents = () => {
    this.hamburger.addEventListener("click", this.handleHamburgerClick);
  };

  handleHamburgerClick = (e) => {
    const clickedElement = e.target;
    clickedElement.classList.contains("active")
      ? clickedElement.classList.remove("active")
      : clickedElement.classList.add("active");
  };
}

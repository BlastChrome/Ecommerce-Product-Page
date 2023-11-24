import "./scss/main.scss";
import MobileNav from "./modules/mobile-nav";
import Slider from "./modules/slider";

const App = (() => {
  const mobile_nav = new MobileNav();
  const slide_1 = new Slider(".featured-product__slider--big");
  // slide_1.slide({
  //   slidesToShow: 1,
  //   speed: 300,
  //   autoPlaySpeed: 500,
  //   infinite: true,
  // });
})();

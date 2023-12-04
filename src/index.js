import "./scss/main.scss";
import UIManager from "./modules/ui-manager";
import Slider from "./modules/slider";
const App = (() => {
  const ui_manager = new UIManager();
  const big_slider = new Slider("#medium-slider");
  const full_slider = new Slider("#active-slider");
})();

//?below is for css configuration using webpack
import "../../styles/styles.scss";

//? below is to make webpack read and refreshes if any changes is made
if (module.hot) {
  module.hot.accept();
}

//? module imports from module folder
import MobileMenu from "./modules/MobileMenu";
import Reveal from "./modules/RevealOnScroll";

new Reveal(document.querySelectorAll(".feature-item"), 75);
new Reveal(document.querySelectorAll(".testimonial"), 60);

let mobilemenu = new MobileMenu();

//?below is for css configuration using webpack
import "../../styles/styles.scss";

//? below is to make webpack read and refreshes if any changes is made
if (module.hot) {
  module.hot.accept();
}

//? module imports from module folder
import MobileMenu from "./modules/MobileMenu";
import Reveal from "./modules/RevealOnScroll";
import StickyHeader from "./modules/sticky-header";

// creating a new variable for sticky header
let stickyHeader = new StickyHeader();

// for reveal-scroll-animation
new Reveal(document.querySelectorAll(".feature-item"), 75);
new Reveal(document.querySelectorAll(".testimonial"), 60);

// for hamburger-meu
let mobilemenu = new MobileMenu();

// modal [below is a piece of javascript to help client save data if they are not going to tab on the button]
let modal;

document.querySelectorAll(".open-modal").forEach(el => {
  el.addEventListener("click", e => {
    e.preventDefault();
    if (typeof modal === "undefined") {
      import(/* webpackChunkName: 'modal' */ "./modules/Modal")
        .then(x => {
          modal = new x.default();
          setTimeout(() => modal.openTheModal(), 20);
        })
        .catch(() => console.log("there was a problem"));
    } else {
      modal.openTheModal();
    }
  });
});

//?below is for css configuration using webpack
import "../../styles/styles.scss";

//? below is to make webpack read and refreshes if any changes is made
if (module.hot) {
  module.hot.accept();
}

//? module imports from module folder
import MobileMenu from "./modules/MobileMenu";
let mobilemenu = new MobileMenu();

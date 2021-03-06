// import scripts
import { greyPastDate, updateUI } from './js/application';

// import styles
import './styles/resets.scss';
import './styles/base.scss';
import './styles/footer.scss';
import './styles/main.scss';
import './styles/header.scss';
import './styles/form.scss';

// import medias
import Paris from './media/Paris.jpeg';
import Logo from './media/logo.png';

// attach the images to the corresponding elements
document.getElementById("dest-imag").src = Paris;
document.getElementById("logo").src = Logo;

// grey out past date for date picker input
greyPastDate();

// test fetch
document.querySelector(".input-holder").addEventListener("submit", updateUI);

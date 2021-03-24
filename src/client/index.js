// import scripts
import { testScript, greyPastDate } from './js/application';


// import styles
import './styles/resets.scss';
import './styles/base.scss';
import './styles/footer.scss';
import './styles/main.scss';
import './styles/header.scss';

// import medias
import Paris from './media/Paris.jpeg';
import Logo from './media/logo.png';

document.getElementById("dest-imag").src = Paris;
document.getElementById("logo").src = Logo;

document.getElementById("svTrip").addEventListener("click", testScript);

// grey out past date for date picker input
greyPastDate()


export {
    testScript
}
// http://api.geonames.org/searchJSON?q=london&maxRows=10&username=demo
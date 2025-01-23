import { hamburgerMenu } from './hamburger-menu'
import {animations} from './animations'
import { header } from './header'
import { auctionGame } from './auction-game'
import '/src/css/reset.css'
import '/src/css/style.css'
import '/src/css/header.css'
import '/src/css/navigation.css'
import '/src/css/intro.css'
import '/src/css/gossip2.css'
import '/src/css/paintings.css'
import '/src/css/hammer.css'
import '/src/css/poster-auction.css'
import '/src/css/contract.css'
import '/src/css/part3.css'
import '/src/css/join-company.css'
import '/src/css/polyglot.css'
import '/src/css/outro.css'
import '/src/css/footer.css'
import '/src/css/auction-game.css'


const $body = document.querySelector('.body');
$body.classList.add("has-js");

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(TextPlugin);

hamburgerMenu();
//header();
//animations();
auctionGame();
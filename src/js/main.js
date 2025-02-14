import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Swiper from 'swiper/bundle'
// import { preloader } from './preloader.js'
import { hamburgerMenu } from './hamburger-menu'
import {animations} from './animations'
import { header } from './header'
import { auctionGame } from './auction-game'
import { joinCompany } from './join-company-game'
import { buttons } from './buttons'
import {nav} from './nav'
import { extraInfo } from './revealExtraInfo.js'

import '/src/css/reset.css'
import '/src/css/style.css'
import '/src/css/preloader.css'
import 'swiper/css/bundle'
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

//--------------------------------------------//
// await preloader();
//------------------------------//

const swiperPaintings = new Swiper('.swiper-paintings-smartphone', {
    // modules: [Navigation, Pagination],
    // Optional parameters
    slidesPerView: "auto",
    loop: true,

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});

const swiperStories = new Swiper('.stories-container', {
    direction: 'horizontal',
    loop: true,
});

// const swiperJoinCompany = new Swiper('.portraits-container', {
//     direction: 'vertical',
//     loop: true,
// });


buttons();
nav();
hamburgerMenu();
header();
animations();
auctionGame();
joinCompany();
extraInfo();
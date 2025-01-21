import { hamburgerMenu } from './hamburger-menu'
import '/src/css/reset.css'
import '/src/css/style.css'
import '/src/css/header.css'
import '/src/css/navigation.css'
import '/src/css/intro.css'
import '/src/css/gossip.css'
import '/src/css/paintings.css'

const $body = document.querySelector('.body');
$body.classList.add("has-js");


hamburgerMenu()
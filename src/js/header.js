// --- HTML elements --- //
//algemeen
const $nav = document.querySelector('.navigation');
const $body = document.querySelector('.body');
const $main = document.querySelector('.main');
const $navItem = document.querySelectorAll('.nav-select-js');

//intro
const $hero = document.querySelector('.hero');
const $intro = document.querySelector('.intro');
const $intro__img = document.querySelector('.intro__img');
let heroCopy = document.createElement('div');

let countBtnClickStart = 0;
let countBtnClickSecond = 0;

let mm = gsap.matchMedia();

const scaleButton = () => {
    const $buttonScale = document.querySelectorAll('.light-switch__button');

    $buttonScale.forEach(button => {
        gsap.set(button, {
            transformOrigin: '50% 63%'
        })

        gsap.to(button, {
            scale: 0.91,
            duration: 0.9,
            yoyo: true,
            repeat: -1, //blijft herhalen
            ease: "power1.inOut",
        });
    });
}

const buttonClick = () => {
    const $button = document.querySelectorAll('.light-switch__button--transparant');
    console.log($button);
    $button.forEach(button => {
        button.addEventListener('click', () => {
            console.log('klik');
            if (countBtnClickStart === 0) {
                console.log('klik1');
                countBtnClickStart++;
                buttonClickStart();
            } else if (countBtnClickSecond === 1) {
                countBtnClickSecond++;
                buttonClickSecond();
            }
        });
    });
}

const clickNav = () => {
    if (countBtnClickStart === 0) {
        console.log('klik1');
        countBtnClickStart++;
        buttonClickStart();
    } else if (countBtnClickSecond === 1) {
        countBtnClickSecond++;
        buttonClickSecond();
    }
}

const buttonClickStart = () => {
    const tlMaster = gsap.timeline({
        onComplete: () => {
            heroCopy.remove();
            $body.classList.remove('no-scroll');
            buttonClick();
            countBtnClickSecond++;
        }
    });

    tlMaster
        .add(animationLightOn())
        .add(animationHandID());
}

const buttonClickSecond = () => {
    const $button = document.querySelectorAll('.light-switch__button--transparant');
    countBtnClickSecond++;

    copyHero();
    console.log('click2dekeer');
    gsap.set(heroCopy, {
        opacity: 1
    });

    gsap.set($intro, {
        opacity: 0
    });

    scrollToIntro();

    gsap.set($intro, {
        opacity: 100
    });

    const tlMaster = gsap.timeline({
        onComplete: () => {
            heroCopy.remove();
            buttonClick();
            countBtnClickSecond = 1;
        }
    });

    tlMaster
        .add(animationLightOn())
        .add(animationHandID());
}

const copyHero = () => {
    heroCopy = document.createElement('div');
    const htmlHero = $hero.innerHTML;
    heroCopy.classList.add('hero');
    heroCopy.classList.add('hero-copy');
    heroCopy.innerHTML = htmlHero;
    $main.appendChild(heroCopy);
    heroCopy.classList.add('position-fixed');
}

const animationHandID = () => {
    const tlHandId = gsap.timeline({});
    tlHandId.from($intro__img, {
        y: - $intro__img.offsetHeight,
        duration: 1,
    })

    return (tlHandId);
}

// const animationHandIDhandID = () => {
//     const $section = document.querySelector('.intro');
//     const $introImg = document.querySelector('.intro__img');
//     const $introText = document.querySelector('.intro__text');

//     const tlIntro = gsap.timeline({
//         scrollTrigger: {
//             trigger: $introImg,
//             start: "top top",
//             end: "bottom 0%",
//             scrub: 1,
//         }
//     });

//     /*desktop*/
//     mm.add("(min-width: 80rem)", () => {
//         console.log('test');

//         tlIntro
//             .to($introText, {
//                 x: 700,
//                 duration: 0.8,
//             })
//             .to($introImg, {
//                 x: - $introImg.offsetWidth,
//                 duration: 0.5,
//             }, "<");
//     });

    
// }

const animationLightOn = () => {
    const tlLightOn = gsap.timeline({});
    tlLightOn
        .to($nav, {
            y: -$nav.offsetHeight - 50,
            duration: 0.2,
            ease: "power1.out",
        })
        .to(heroCopy, {
            opacity: 0,
            duration: 1.5,
            ease: "power1.out",
        }, "<")
        .from($intro, {
            opacity: 0,
            duration: 1.5,
            ease: "power1.out"
        }, "<0.5");

    return (tlLightOn);
}

const scrollToIntro = () => {
    $intro.scrollIntoView({
        behavior: "instant",
    })
}

export function header(element) {
    $body.classList.add('no-scroll');
    scrollToIntro();
    copyHero();
    buttonClick();
    scaleButton();

    $navItem.forEach(item => {
        item.addEventListener('click', () => { clickNav() });
    });

    window.addEventListener('unload', () => { scrollToIntro() });
}
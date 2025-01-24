// --- HTML elements --- //
//algemeen
const $nav = document.querySelector('.navigation');
const $body = document.querySelector('.body');
const $main = document.querySelector('.main');

//outro
const $section = document.querySelector('.outro');
const $outro1 = document.querySelector('.outro__text');
const $outroText = document.querySelector('.outro__content');
const $outro2 = document.querySelector('.outro__img');
const $footer = document.querySelector('.outro--part2');
const $footer2 = document.querySelector('.stories');

let countBtnClick = 0;
let isScroll = true;

//-------------- check scrollPos --------------//
let scrollUp = false;
let scrollPos = document.documentElement.scrollTop;
window.addEventListener('scroll', (e) => {
    // detects new state and compares it with the new one
    if (document.documentElement.scrollTop > scrollPos) {
        // console.log('down');
        scrollUp = false;
    }

    else {
        // console.log('up');
        scrollUp = true;
        scrollPos = scrollPos + 1; //zorgen dat die niet direct wegscrollt als je je vinger een beetje beweegt op het scherm
    }
    scrollPos = document.documentElement.scrollTop;
});

//----------------------------//

const scrollText = () => {
    const tlText = gsap.timeline({
        scrollTrigger: {
            trigger: $outro1,
            start: "top top",
            end: "5% 50%",
            scrub: 1,
            pin: $outro1,
        },

        onComplete: () => {
            scrollToFooter();
            copyButton();
        }
    });

    tlText.to($outroText, {
        opacity: 0,
    });
}

const buttonClick = () => {
    const $button = document.querySelectorAll('.light-switch__button--transparant-end');
    $button.forEach(button => {
        button.addEventListener('click', () => {
            console.log('aangeklikt');
            if (countBtnClick === 0) {
                countBtnClick++;
                buttonClickStart();
            }
        });
    });
}

const buttonClickStart = () => {
    const $outroCopy = document.querySelector('.outro-copy');
    console.log('start animatie');
    $body.classList.add('no-scroll');
    scrollToFooter();
    const tlLightOff = gsap.timeline({
        onComplete: () => {
            $body.classList.remove('no-scroll');
            console.log('eventListner verwijderd');
            window.removeEventListener('scroll', checkScrollTop);
            $outroCopy.remove();
            countBtnClick = 0;
        }
    });

    tlLightOff
        .to($nav, {
            y: -$nav.offsetHeight - 50,
            duration: 0.2,
            ease: "power1.out",
        })
        .to($outroCopy, {
            opacity: 0,
            duration: 1,
            ease: "power1.out",
        })
        .from($footer, {
            opacity: 0,
            duration: 1,
            ease: "power1.out"
        }, "<0.5")
        .from($footer2, {
            opacity: 0,
            duration: 1.5,
            ease: "power1.out"
        }, "<")
}

const checkScrollTop = () => {
    const $footer = document.querySelector('.outro-copy');

    if (scrollUp) {
        console.log('scrolll uppp');
        if (isScroll) {
            toOutro1();
            isScroll = false;
        }
    }
}

const toOutro1 = () => {
    console.log('ik wordt uitgevoerd');

    const $outroCopy = document.querySelector('.outro-copy');
    const $lightSwitch = $outroCopy.querySelector('.light-switch');
    const $lightInstruction = $outroCopy.querySelector('.hero__instruction');

    // $section.scrollIntoView({
    //     behavior: "instant",
    // });

    $body.classList.add('no-scroll');

    //button fade out
    const tlFadeOutButton = gsap.timeline({
        onComplete: () => {
            console.log('complete')
            $outroCopy.remove();
            $body.classList.remove('no-scroll');
        }
    });
    tlFadeOutButton
        .to($lightSwitch, {
            opacity: 0,
            duration: 1,
        })
        .to($lightInstruction, {
            opacity: 0,
            duration: 1,
        }, "<")
        .to($outroText, {
            opacity: 1,
            duration: 1,
        });

    return tlFadeOutButton;

}

const copyButton = () => {
    isScroll = true;
    const buttonCopy = document.createElement('div');

    const htmlButton = $outro2.innerHTML;
    buttonCopy.classList.add('outro__img');
    buttonCopy.classList.add('outro-copy');
    buttonCopy.innerHTML = htmlButton;
    $main.appendChild(buttonCopy);

    const $outroCopy = document.querySelector('.outro-copy');
    $outroCopy.classList.add('position-fixed');

    console.log(buttonCopy);
    const $lightSwitch = buttonCopy.querySelector('.light-switch');
    const $lightInstruction = buttonCopy.querySelector('.hero__instruction');

    scaleButton();

    const tlFadeInButton = gsap.timeline({
        onComplete: () => {
            buttonClick();
            window.addEventListener('scroll', checkScrollTop);
        }
    });

    tlFadeInButton
        .from($lightSwitch, {
            opacity: 0,
            duration: 1,
        })
        .from($lightInstruction, {
            opacity: 0,
            duration: 1,
        }, "<");
}

const scrollToFooter = () => {
    console.log('ik verspring');
    $footer.scrollIntoView({
        behavior: "instant",
    })
}

const scaleButton = () => {
    const $outro = document.querySelector('.outro-copy');
    const $buttonScales = $outro.querySelector('.light-switch__button');

    console.log('ik schaal');
    console.log($buttonScales);

        gsap.set($buttonScales, {
            transformOrigin: '50% 63%'
        })

        gsap.to($buttonScales, {
            scale: 0.85,
            duration: 0.9,
            yoyo: true,
            repeat: -1, //blijft herhalen
            ease: "power1.inOut",
        });
}

export function outro(element) {
    console.log('outro');
    scrollText();
}
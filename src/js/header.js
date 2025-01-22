let mm = gsap.matchMedia();

const scaleButton = () => {
    const $button = document.querySelector('.light-switch__button');
    gsap.set($button, {
        transformOrigin: '50% 63%'
    })

    gsap.to($button, {
        scale: 0.91,
        duration: 0.9,
        yoyo: true,
        repeat: -1, //blijft herhalen
        ease: "power1.inOut",
    });
}

const start = () => {
    const $body = document.querySelector('.body');
    const $button = document.querySelector('.light-switch__button--transparant');
    const $hero = document.querySelector('.hero');
    const $intro = document.querySelector('.intro');
    const $intro__img = document.querySelector('.intro__img');
    const $nav = document.querySelector('.navigation');
    const $introText = document.querySelector('.intro__text');

    /*zorg dat positie altijd boven is */
    window.scrollTo(0, 0);

    /*geen scroll zonder op knop te drukken*/
    $body.classList.add('no-scroll');
    $hero.classList.add('hero--absolute');

    $button.addEventListener('click', (e) => {
        console.log('click');

        $body.classList.remove('no-scroll');

        const tlLightOn = gsap.timeline({});
        tlLightOn
            .to($nav, {
                y: -$nav.offsetHeight - 50, // Move out of view (adjust this value as needed)
                duration: 0.2, // Animation duration
                ease: "power1.out",
            })
            .to($hero, {
                opacity: 0,
                duration: 1.5,
                ease: "power1.out",
            })
            .from($intro, {
                opacity: 0,
                duration: 1.5,
                ease: "power1.out"
            }, "<0.5");

        const tlIntro = gsap.timeline({});
        tlIntro.from($intro__img, {
            y: - $intro__img.offsetHeight,
            duration: 0.5,
        })

        const tlMaster = gsap.timeline({
            onComplete: () => {
                // gsap.set($hero, {
                //     opacity: 100,
                // });
                ;
                // $hero.classList.remove('hero--absolute');
            }
        });
        tlMaster
            .add(tlLightOn)
            .add(tlIntro, "<0.5");

        mm.add("(min-width: 80rem)", () => {
            console.log('test');
            const tlIntroText = gsap.timeline({})

            tlIntroText.from($introText, {
                x: 700,
                duration: 0.8,
            })

            tlMaster.add(tlIntroText, '<');
        });
    });
}

export function header(element) {
    console.log('header');
    gsap.registerPlugin(ScrollTrigger);
    gsap.registerPlugin(TextPlugin);

    start();
    scaleButton();
}
const $body = document.querySelector('.body');
let mm = gsap.matchMedia();

const handID = () => {
    const $section = document.querySelector('.intro');
    const $introImg = document.querySelector('.intro__img');
    const $introText = document.querySelector('.intro__text');

    /*mobile*/
    // gsap.set($introImg, {
    //     zIndex: 5,
    // });

    const tlIntro = gsap.timeline({
        scrollTrigger: {
            trigger: $introImg,
            start: "top top",
            end: "bottom 0%",
            // markers: true,
            // pin: $section,
            scrub: 1,
        }
    });

    // tlIntro
    // .to($intro, {
    //     y: -$introImg.offsetHeight,
    //     opacity: 100,
    // })

    /*desktop*/
    mm.add("(min-width: 80rem)", () => {
        console.log('test');

        tlIntro
            .to($introText, {
                x: 700,
                duration: 0.8,
            })
            .to($introImg, {
                x: - $introImg.offsetWidth,
                duration: 0.5,
            }, "<");
    });
}

const setupMessagesTitles = () => {
    // const $end = document.querySelectorAll('gossip__text--sans-serif.end');
    // const $start = document.querySelectorAll('gossip__text--sans-serif.start');
    // const $deskTl = document.querySelectorAll('.desk-tl');
    // const $deskTr = document.querySelectorAll('.desl-tr');
    // const $deskBl = document.querySelectorAll('.desl-bl');

    // $end.forEach(element => {
    //     gsap.set(element, {
    //         transformOrigin: 'top right',
    //     });
    // });

    // $start.forEach(element => {
    //     gsap.set(element, {
    //         transformOrigin: 'bottom left',
    //     });
    // });

    // /*desktop*/
    // mm.add("(min-width: 50rem) and (orientation: landscape)", () => {
    //     $deskTl.forEach(element => {
    //         gsap.set(element, {
    //             transformOrigin: 'top left',
    //         });
    //     });

    //     $deskTr.forEach(element => {
    //         gsap.set(element, {
    //             transformOrigin: 'top right',
    //         });
    //     });

    //     $deskBl.forEach(element => {
    //         gsap.set(element, {
    //             transformOrigin: 'bottom left',
    //         });
    //     });
    // });
}

const titles = (part) => {
    const $titles = document.querySelector(`.titles-${part}`);
    const $sectionTitle = document.querySelector(`.section__title-${part}`);
    const $sectionSubtitle = document.querySelector(`.section__subtitle-${part}`);
    const $gossipTitle = document.querySelector(`.gossip-title-${part}`);
    const $gossipImg1 = document.querySelector(`.gossip__img--1-${part}`);
    const $gossipImg2 = document.querySelector(`.gossip__img--2-${part}`);
    const $gossipImg3 = document.querySelector(`.gossip__img--3-${part}`);
    const $gossipText = document.querySelectorAll(`.gossip__text-${part}`);

    /* creation timelines */
    const titlesTl = gsap.timeline({
        scrollTrigger: {
            trigger: $titles,
            start: "top 0%",
            end: "bottom 0%",
            pin: $titles,
            scrub: 1,

            // markers: true,
        }
    });

    const tlTitle = gsap.timeline({});
    const tlGossip = gsap.timeline({});
    const tlGossipDesktop = gsap.timeline({});



    /* title tl */
    tlTitle
        .from($sectionTitle, {
            opacity: 30,
            x: -getWitdhScreen() / 2 - $sectionTitle.clientWidth / 2,
            duration: 1,
        })
        .from($sectionSubtitle, {
            opacity: 30,
            x: getWitdhScreen() / 2 + $sectionSubtitle.clientWidth / 2,
            duration: 1,
        }, "<")

        .to($sectionTitle, {
            opacity: 30,
            x: getWitdhScreen() / 2 + $sectionTitle.clientWidth / 2,
            duration: 1,
        }, 2)

        .to($sectionSubtitle, {
            opacity: 30,
            x: -getWitdhScreen() / 2 - $sectionSubtitle.clientWidth / 2,
            duration: 1,
        }, "<");

    /*setup images*/
    gsap.set($gossipImg1, {
        transformOrigin: "top center"
    });

    gsap.set($gossipImg2, {
        transformOrigin: "bottom center"
    })

    gsap.set($gossipImg3, {
        transformOrigin: "bottom center"
    })

    /*setup messages*/
    const $end = document.querySelectorAll('.end');
    const $start = document.querySelectorAll('.start');
    const $deskTl = document.querySelectorAll('.desk-tl');
    const $deskTr = document.querySelectorAll('.desl-tr');
    const $deskBl = document.querySelectorAll('.desl-bl');

    $end.forEach(element => {
        gsap.set(element, {
            transformOrigin: 'top right',
        });
    });

    $start.forEach(element => {
        gsap.set(element, {
            transformOrigin: 'bottom left',
        });
    });

    /*desktop*/
    mm.add("(min-width: 50rem) and (orientation: landscape)", () => {
        $deskTl.forEach(element => {
            gsap.set(element, {
                transformOrigin: 'top left',
            });
        });

        $deskTr.forEach(element => {
            gsap.set(element, {
                transformOrigin: 'top right',
            });
        });

        $deskBl.forEach(element => {
            gsap.set(element, {
                transformOrigin: 'bottom left',
            });
        });
    });

    /* gossip tl */
    tlGossip
        .from($gossipTitle, {
            opacity: 0,
            duration: 1,
        })
        .from($gossipImg1, {
            scaleY: 0,
            opacity: 0
        })
        .from($gossipImg2, {
            scaleY: 0,
            opacity: 0
        })
        .from($gossipImg3, {
            scaleY: 0,
            opacity: 0
        })
        .from($gossipText[0], {
            scale: 0,
            opacity: 0,
        }, "<0.5")
        .from($gossipText[1], {
            scale: 0,
            opacity: 0,
        }, "<0.5")
        .from($gossipText[2], {
            opacity: 0,
        }, "<0.5")
        .from($gossipText[3], {
            opacity: 0,
        }, "<0.5")
        .from($gossipText[4], {
            scale: 0,
            opacity: 0,
        }, "<0.5");

    titlesTl
        .add(tlTitle)
        .add(tlGossip, "<1.3")
        .add(tlGossipDesktop, "<1.3");

    /*desktop*/
    mm.add("(min-width: 50rem) and (orientation: landscape)", () => {
        $gossipText.forEach(text => {
            gsap.set(text, {
                opacity: 1,
                scale: 1
            })
        });

        gsap.set($gossipTitle, {
            opacity: 1,
            scale: 1
        })

        gsap.set($gossipImg1, {
            opacity: 1,
            scaleY: 1,
        })

        gsap.set($gossipImg2, {
            opacity: 1,
            scaleY: 1,
        })

        gsap.set($gossipImg3, {
            opacity: 1,
            scaleY: 1,
        })

        tlGossipDesktop
            .from($gossipTitle, {
                opacity: 0,
            })
            .from($gossipImg3, {
                scaleY: 0,
            }, "<0.5")
            .from($gossipText[0], {
                opacity: 0,
            }, "<0.5")
            .from($gossipImg2, {
                scaleY: 0,
            }, "<0.5")
            .from($gossipText[1], {
                scale: 0,
                opacity: 0,
            }, "<0.5")
            .from($gossipImg1, {
                scaleY: 0,
            }, "<0.5")
            .from($gossipText[2], {
                opacity: 0,
            }, "<0.5")
            .from($gossipText[3], {
                scale: 0,
                opacity: 0,
            }, "<0.5")
            .from($gossipText[4], {
                scale: 0,
                opacity: 0,
            }, "<0.5");

        titlesTl
            .remove(tlGossip)
    });
}

const getWitdhScreen = () => {
    let width = screen.width;

    if (width > 1440) {
        width = 1440
    }

    return width
}

const hammer = () => {
    const $section = document.querySelector('.hammer');
    const $hammer = document.querySelector('.hammer__img');
    const $dwangarbeid = document.querySelector('.dwangarbeid');
    const $ketterij = document.querySelector('.ketterij');

    gsap.set($hammer, {
        transformOrigin: 'left center',
        rotation: -90,
    });


    gsap.set('.dwangarbeid-1', {
        transformOrigin: 'right bottom',
    })

    gsap.set('.dwangarbeid-2', {
        transformOrigin: 'right left',
    })

    gsap.set('.ketterij-1', {
        transformOrigin: 'right bottom',
    })

    gsap.set('.ketterij-2', {
        transformOrigin: 'right left',
    })

    const tlHammer = gsap.timeline({
        scrollTrigger: {
            trigger: $section,
            start: "top 0%",
            end: "bottom 0%",
            pin: $section,
            scrub: 1,

            // markers: true,
        }
    });

    tlHammer
        .from($dwangarbeid, {
            opacity: 0,
            y: 300,
            duration: 1,
        })
        .to($hammer, {
            rotation: 0,
        }, "<0.5")
        .to('.dwangarbeid-1', {
            y: 100,
            rotation: -32,
            opacity: 0
        })
        .to('.dwangarbeid-2', {
            rotation: 32,
            y: 100,
            opacity: 0
        }, "<")
        .to($hammer, {
            rotation: -90,
        }, "<")
        .from($ketterij, {
            opacity: 0,
            y: 300,
            duration: 1,
        })
        .to($hammer, {
            rotation: 0,
        }, "<0.5")
        .to('.ketterij-1', {
            y: 100,
            rotation: -32,
            opacity: 0
        })
        .to('.ketterij-2', {
            rotation: 32,
            y: 100,
            opacity: 0
        }, "<")
        .to($hammer, {
            rotation: -90,
        }, "<")
}

const poster = () => {
    const $section = document.querySelector('.sale');
    const $posterText = document.querySelector('.poster__text');
    const $text = document.querySelector('.sale .text');

    gsap.set($posterText, {
        transformOrigin: "top right",
    })

    const tlPoster = gsap.timeline({
        scrollTrigger: {
            trigger: $section,
            start: "top 0%",
            end: "bottom 0%",
            scrub: 1,
            pin: $section,

            // markers: true,
        }
    });

    tlPoster.to($posterText, {
        rotation: -90,
        duration: 2,
        y: 100,
        x: 20,
    }, 1)
    tlPoster.from($text, {
        opacity: 0,
        duration: 1,
        y: 50,
    }, "<0.5");
}


export function animations(element) {
    gsap.registerPlugin(ScrollTrigger);
    gsap.registerPlugin(TextPlugin);

    handID();
    titles('part1');
    hammer();
    // poster();
}
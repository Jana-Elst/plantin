import { outro } from './outro'

const $body = document.querySelector('.body');
const $navItems = document.querySelectorAll('.nav__item');

let mm = gsap.matchMedia();

// -------------------------- execute titles after use navigation --------------------------//
// const executeHalfTimeLineTitles = (event, item) => {
//     event.preventDefault();
//     const targetId = item.closest('a').getAttribute('href'); //neemt href van link
//     const targetElement = document.getElementById(targetId.substring(1)); //verwijdert #, om volledige element te krijgen
//     const part = targetElement.classList[1]; //krijg corrrecte classlist om te gebruiken in de timelines

//     const tlTitles = gsap.timeline({
//         onComplete: () => {
//             console.log('klaaar');
//             window.location.hash = targetId; // verander URL hash
//             targetElement.scrollIntoView({ behavior: 'instant' });
//         }
//     });
// }

// -------------------------- titles --------------------------//
const titles = (part) => {
    console.log(part);
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

            //markers: true
        }
    });

    const tlTitlePart1 = gsap.timeline({});
    const tlTitlePart2 = gsap.timeline({});
    const tlGossip = gsap.timeline({});
    const tlGossipDesktop = gsap.timeline({});



    /* title tl */
    tlTitlePart1
        .from($sectionTitle, {
            opacity: 30,
            x: -getWitdhScreen() / 2 - $sectionTitle.offsetWidth / 2,
            duration: 1,
        })
        .from($sectionSubtitle, {
            opacity: 30,
            x: getWitdhScreen() / 2 + $sectionSubtitle.offsetWidth / 2,
            duration: 1,
        }, "<");

    tlTitlePart2
        .to($sectionTitle, {
            opacity: 30,
            x: getWitdhScreen() / 2 + $sectionTitle.offsetWidth / 2,
            duration: 1,
        })

        .to($sectionSubtitle, {
            opacity: 30,
            x: -getWitdhScreen() / 2 - $sectionSubtitle.offsetWidth / 2,
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
        .add(tlTitlePart1)
        .add(tlTitlePart2, "2")
        .add(tlGossip, "<2")
        .add(tlGossipDesktop, "<2");

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

const handID = () => {
    const $section = document.querySelector('.intro');
    const $introImg = document.querySelector('.intro__img');
    const $introText = document.querySelector('.intro__text');

    const tlIntro = gsap.timeline({
        scrollTrigger: {
            trigger: $introImg,
            start: "top top",
            end: "bottom 0%",
            scrub: 1,
        }
    });

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


// -------------------------- Hammer --------------------------//
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

// -------------------------- poster --------------------------//
const poster = () => {
    const $section = document.querySelector('.sale');
    const $posterText = document.querySelector('.container__poster-text');
    const $text = document.querySelector('.sale .text');

    let xVar = 50;
    let yVar = 100;
    let rotVar = -90;

    gsap.set($posterText, {
        transformOrigin: "top right",
    })

    const tlPoster = gsap.timeline({
        scrollTrigger: {
            trigger: $section,
            start: "top 0%",
            end: "bottom 0%",
            scrub: 0.5,
            pin: $section,

            //markers: true,
        }
    });

    mm.add("(min-width: 33rem)", () => {
        gsap.set($posterText, {
            transformOrigin: "bottom left",
        })

        rotVar = 90;
        xVar = 300;
        yVar = 400;
    });

    tlPoster.to($posterText, {
        rotation: rotVar,
        duration: 2,
        y: yVar,
        x: xVar,
    }, 1)
    tlPoster.from($text, {
        opacity: 0,
        duration: 1,
        y: 50,
    }, "<0.5");
}

const newCompany = () => {
    // const $contract = document.querySelector('.contract__container');
    const $handContract = document.querySelector('.hand--contract');
    const $section = document.querySelector('.new-start');
    //const $sectionPrev = document.querySelector('.titles-part3');
    const $bible = document.querySelector('.bible');
    const $contractLeft = document.querySelector('.contract__container.left');
    const $contractRight = document.querySelector('.contract-right');
    const $textHebrewBible = document.querySelector('.hebrew-bible');
    const $frame = document.querySelector('.join-company');
    const $textNewCompany = document.querySelector('.text__new-company ');

    mm.add("(max-width: 61rem)", () => {
        const newCompanySPTl = gsap.timeline({
            scrollTrigger: {
                trigger: $section,
                start: "top 0%",
                end: "bottom 0%",
                scrub: 1,
                pin: $section,
            }
        });

        gsap.set($contractRight, {
            y: (-(screen.height - $contractRight.offsetHeight) / 2),
        });

        gsap.set($textNewCompany, {
            y: (-(screen.height - $textNewCompany.offsetHeight) / 2) + ($contractRight.offsetHeight - $textNewCompany.offsetHeight) - 10,
        })

        gsap.set($bible, {
            y: (-(screen.height - $frame.offsetHeight) / 2)
        })

        gsap.set($textHebrewBible, {
            y: (-(screen.height - $frame.offsetHeight) / 2)
        })


        newCompanySPTl
            .from($contractRight, {
                duration: 1,
                y: -($contractRight.offsetHeight - screen.height) - $contractRight.offsetHeight,
                opacity: 0,
                ease: "power1.out",
            })
            .from($textNewCompany, {
                duration: 1,
                opacity: 0,
                ease: "power1.out",
            })
            .to($contractRight, {
                duration: 1,
                y: (-(screen.height - $contractRight.offsetHeight) / 2) - $textNewCompany.offsetHeight - 30,
                opacity: 1,
                ease: "power1.out",
            }, "<")
            .to($contractRight, {
                duration: 1,
                y: ((-(screen.height - $contractRight.offsetHeight) / 2) - $textNewCompany.offsetHeight - 30) - $textNewCompany.offsetHeight,
                opacity: 1,
                ease: "power1.out",
            })
            .to($textNewCompany, {
                duration: 1,
                y: 0,
                ease: "power1.out",
            }, "<")
            .to($textNewCompany, {
                duration: 1,
                opacity: 0,
                y: -(screen.height - $textNewCompany.offsetHeight) / 2,
                ease: "power1.out",
            }, "<0.9")
            .from($frame, {
                opacity: 0,
                y: 100,
                duration: 1,
            }, "<0.9")
            .to($frame, {
                opacity: 0,
                y: -100,
                duration: 1,
            }, "<0.9")
            .from($bible, {
                opacity: 0,
                y: 100,
            }, "<0.9")
    });



    mm.add("(min-width: 61rem)", () => {
        console.log('test');
        gsap.set($contractLeft, {
            y: -($contractLeft.offsetHeight - screen.height)
        });

        const newCompanyTl = gsap.timeline({
            scrollTrigger: {
                trigger: $section,
                start: "top 0%",
                end: "bottom -200%",
                scrub: 1,
                pin: $section,
            }
        });

        newCompanyTl
            .from($contractRight, {
                duration: 5,
                x: $contractRight.offsetWidth,
                ease: "power1.out",
            })
            .to($contractRight, {
                duration: 5,
                y: -$contractRight.offsetHeight - 120,
                opacity: 0,
                ease: "power1.out",
            },)
            .from($frame, {
                duration: 5,
                y: $contractRight.offsetHeight + 120,
                opacity: 0,
                ease: "power1.out",
            }, "<")
            .to($textNewCompany, {
                duration: 5,
                y: $contractLeft.offsetHeight - 200,
                opacity: 0,
                ease: "power1.out"
            })
            .from($contractLeft, {
                duration: 5,
                y: -$contractLeft.offsetHeight + 200,
                opacity: 0,
                ease: "power1.out",
            }, "<")
            .from($textHebrewBible, {
                duration: 5,
                y: $contractLeft.offsetHeight - 200,
                opacity: 0,
                ease: "power1.out",
            })
            .to($frame, {
                duration: 5,
                y: -$contractLeft.offsetHeight + 200,
                opacity: 0,
                ease: "power1.out"
            }, "<")
            .to($contractLeft, {
                duration: 5,
                y: -$contractLeft.offsetHeight + 200,
                opacity: 0,
                ease: "power1.out",
            })
            .from($bible, {
                duration: 5,
                y: $contractLeft.offsetHeight - 200,
                opacity: 0,
                ease: "power1.out",
            }, "<")


    });
}

const handContract = () => {
    const $contract = document.querySelector('.contract__container');
    const $handContract = document.querySelector('.hand--contract');
    const $section = document.querySelector('.new-start');
    const $sectionPrev = document.querySelector('.titles-part3');

    const handContractTl = gsap.timeline({
        scrollTrigger: {
            trigger: $sectionPrev,
            start: "bottom 100%",
            end: "bottom -100%",
            scrub: 0.5,
            markers: true,
        }
    });

    handContractTl
        .from($contract, {
            y: -$handContract.offsetHeight + 40,

        })
        .to($contract, {
            y: -$handContract.offsetHeight + 40,
        })
}

// -------------------------- algemene functies --------------------------//
const getWitdhScreen = () => {
    let width = screen.width;

    if (width > 1440) {
        width = 1440
    }

    return width
}

// -------------------------- export functie --------------------------//
export function animations(element) {
    $navItems.forEach(item => {
        item.addEventListener("click", (event) => { executeHalfTimeLineTitles(event, item) })
    });

    handID();
    titles('part1');
    hammer();
    titles('part2');
    poster();
    titles('part3');
    newCompany();
    titles('part4');
    titles('part5');
    outro();
}
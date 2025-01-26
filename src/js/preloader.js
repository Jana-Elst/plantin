/**
 * Show some progress in the preloader
 * Make sure to test with network throttling in your devtools
 */

// const appleImagePaths = new Array(13).fill(0).map((_, i) => {
//     const index = `${i + 1}`.padStart(3, "0");
//     return `./images/apple-webp-sequence/apple_${index}.webp`;
// });
import delay from "./utils/delay";
import loadImageAsync from "./utils/loadImageAsync";
import gsap from "gsap";

const $images = document.querySelectorAll('img');
const imagePaths = new Array($images.length).fill(0).map((_, i) => {
    // const index = `${i + 1}`.padStart(3, "0");
    // console.log($images[i].src);
    if ($images[i].src) {
        return $images[i].src;
    }
});

let images = [];
let numImagesLoaded = 0;
const $preloaderPercentage = document.querySelector(".preloader__percentage");
const $preloaderVisual = document.querySelector(".preloader__visual");

const onProgress = () => {
    console.log("progress");
    const relativeProgress = numImagesLoaded / imagePaths.length;
    const progressPercentage = Math.round(relativeProgress * 100);
    console.log(
        numImagesLoaded,
        imagePaths.length,
        relativeProgress,
        progressPercentage
    );
    $preloaderPercentage.textContent = `${progressPercentage}%`;
    $preloaderVisual.style.transform = `scale3d(1, ${relativeProgress}, 1)`;
};

const preloadComplete = () => {
    //await delay(350); // add some extra time for the preload visual css transition to finish
    document.querySelector("body").classList.remove("overflow-y-hidden");
    gsap.to(".preloader", {
        duration: 0.5,
        autoAlpha: 0,
        onComplete: () => {
            document.documentElement.classList.remove("is-loading");
        },
    });
};

const init = async () => {
    // preload the images
    $preloaderVisual.classList.add("preloader__visual--has-transition");
    onProgress();
    document.documentElement.classList.add("is-loading");
    document.querySelector("body").classList.add("overflow-y-hidden");
    images = await Promise.all(
        imagePaths.map(async (path) => {
            const image = await loadImageAsync(path);
            numImagesLoaded++;
            onProgress();
            console.log(image);
            return image;
        })
    );
    preloadComplete();
}

init();

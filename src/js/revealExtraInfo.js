const $extraInfos = document.querySelectorAll('.extra-info');
const $aside__texts = document.querySelectorAll('.aside__text');
const $aside__titlesside = document.querySelectorAll('.aside__titleside');

let clickOutside = 0;

const openInfo = (title) => {
    console.log('open');
    title.removeEventListener('click', (e) => { openInfo(title) });
    title.addEventListener('click', (e) => { closeInfo(title) });

    const $text = title.nextElementSibling;
    $text.classList.remove('hidden');

    //verander header//
    const $title = title.querySelector('p');
    const $img = title.querySelector('img');
    $title.textContent = "sluit";
    $img.src = "/plantin/public/close-btn.svg";

    title.style.flexDirection = "row-reverse";
    $title.style.textDecoration = "underline";
    title.style.borderRadius = "var(--nrnn)";
    title.style.boxShadow = "none";

    // window.addEventListener('click', (event) => {
    //     checkOutside(event, $text, title)
    // });
}

// const checkOutside = (event, $text, title) => {
//     console.log('ik check nog!');
//     if (!$text.contains(event.target)) {
//         clickOutside ++;
//         if(clickOutside === 2) {
//             closeInfo(title);
//         }
//     }
// }

const closeInfo = (title) => {
    // window.removeEventListener('click', (event) => {checkOutside(event, $text, title)})

    title.removeEventListener('click', (e) => { closeInfo(title) });
    title.addEventListener('click', (e) => { openInfo(title) });

    const $text = title.nextElementSibling;
    $text.classList.add('hidden');


    title.removeAttribute('style');
    const $title = title.querySelector('p');
    const $img = title.querySelector('img');
    $title.textContent = "extra historische info";
    $img.src = "/plantin/src/assets/book.svg";
    $title.style.textDecoration = "none";

    clickOutside = 0;
}

export function extraInfo(element) {
    $extraInfos.forEach(extraInfo => {
        extraInfo.classList.remove('hidden');
    });

    $aside__texts.forEach(asideText => {
        asideText.classList.add('hidden');
    });

    $aside__titlesside.forEach(asideTitleside => {
        asideTitleside.addEventListener('click', (e) => { openInfo(asideTitleside) });
    });
}
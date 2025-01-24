const $buttons = document.querySelectorAll('.button');

const shrinkButton = (button) => {
    console.log('ik verklein');
    gsap.to(button, {
        scale: 0.95
    });
}

const growkButton = (button) => {
    console.log('ik vergroot');
    gsap.to(button, {
        scale: 1
    });
}

const shrinkGrow = (button) => {
    const tl = gsap.timeline();
    tl
        .shrinkButton(button)
        .growkButton(button);
}


export function buttons(element) {
    console.log('setup buttons');
    $buttons.forEach(button => {
        button.addEventListener("mouseover", () => { shrinkButton(button); });
        button.addEventListener("mouseleave", () => { growkButton(button); });
    });
}
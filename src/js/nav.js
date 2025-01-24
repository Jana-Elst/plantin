let mm = gsap.matchMedia();
const $parts = document.querySelectorAll('.part');
const $navItem = document.querySelectorAll('.nav__item');

// -------------------------- check id van sectie + change active state btn --------------------------//
const sectionInView = (sectionId) => {
    console.log(`Entered ${sectionId}`);
    $navItem.forEach(item => {
        item.classList.remove('nav__item--active');
        const $activeDescription = item.querySelector('.nav__item--description');

        mm.add("(min-width: 90rem)", () => {
            $activeDescription.style.display = 'none';
        });
    });

    const $active = document.querySelector(`.nav-${sectionId}`);
    $active.classList.add('nav__item--active');
    const $activeDescription = $active.querySelector('.nav__item--description');
    mm.add("(min-width: 90rem)", () => {
        $activeDescription.style.display = 'block';
    });
};

// Create the Intersection Observer
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Call the function with the section's ID
            sectionInView(entry.target.id);
        }
    });
});

// -------------------------- zorgt dat er altijd maar 1 textje in de header zichtbaar is --------------------------//
const removeTextActive = (item) => {
    if (item.classList.contains('nav__item--active') === false) {
        const $activeItem = document.querySelector('.nav__item--active');
        const $activeDescription = $activeItem.querySelector('.nav__item--description');
        $activeDescription.style.display = 'none';
    }

    const itemDescription = item.querySelector('.nav__item--description');
    itemDescription.style.display = 'block';
}

const showTextActive = (item) => {
    const $activeItem = document.querySelector('.nav__item--active');
    const $activeDescription = $activeItem.querySelector('.nav__item--description');
    $activeDescription.style.display = 'block';

    const itemDescription = item.querySelector('.nav__item--description');
    itemDescription.style.display = 'none';
}

export function nav(element) {
    $parts.forEach(part => {
        observer.observe(part);
    });


    mm.add("(min-width: 90rem)", () => {
        $navItem.forEach(item => {
            item.addEventListener("mouseover", () => { removeTextActive(item) });
            item.addEventListener("mouseleave", () => { showTextActive(item) });
        });
    });
}
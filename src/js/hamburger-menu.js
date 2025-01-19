export function hamburgerMenu(element) {
  const $navButton = document.querySelector('.nav__button');
  const $navList = document.querySelector('.nav__open');
  const $btnTickets = document.querySelector('.button--nav')
  const $iconLink = document.querySelector('#iconlink');
  const listItems = $navList.querySelectorAll("li a");

  $navButton.classList.remove('hidden');
  $navList.classList.add("hidden-nav");
  $btnTickets.classList.add("hidden-nav");

  const openNavigation = () => {
    $navButton.setAttribute("aria-expanded", "true");
    $iconLink.setAttribute("xlink:href", "#close");
    $navList.classList.remove("hidden-nav");
    $btnTickets.classList.remove("hidden-nav");
  }

  const closeNavigation = () => {
    $navButton.setAttribute("aria-expanded", "false");
    $iconLink.setAttribute("xlink:href", "#navicon");
    $navList.classList.add("hidden-nav");
    $btnTickets.classList.add("hidden-nav");
  }

  const toggleNavigation = () => {
    const open = $navButton.getAttribute("aria-expanded");
    open === "false" ? openNavigation() : closeNavigation();
  }


  const handleBlur = () => {
    //if (!event.relatedTarget || !$navList.contains(event.relatedTarget)) {
    closeNavigation();
    //}
  }

  $navButton.addEventListener("click", toggleNavigation);

  // add event to the last item in the nav list to trigger the disclosure to close if the user tabs out of the disclosure
  // listItems[listItems.length - 1].addEventListener("blur", handleBlur);

  // Close the disclosure if a user presses the escape key
  window.addEventListener("keyup", (e) => {
    if (e.key === "Escape") {
      $navButton.focus();
      closeNavigation();
    }
  });
}

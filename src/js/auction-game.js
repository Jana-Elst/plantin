/* ------------------ VARIABLES ------------------*/
//--- html selections ---//
const $nav = document.querySelector('.navigation');
const $overlayClose = document.querySelector('.display-auction-close');
const $price = document.querySelectorAll('.article__price span');
const $totalMoney = document.querySelector('.total-money__content');
const $boards = document.querySelectorAll('.board--computer');
const $boardUser = document.querySelector('.board--user');
const $game = document.querySelector('.game');
const $computerHands = document.querySelectorAll('.computer-hand');
const $userHand = document.querySelector('.user-hand');
const $body = document.querySelector('.body');
const $articles = document.querySelectorAll('.article');

//--- buttons ---//
const $btnStart = document.querySelector('.poster__btn');
const $btnClose = document.querySelectorAll('.close-btn');
const $btnCloseOverlay = document.querySelector('.close-btn--overlay');
const $btnConfirmClose = document.querySelector('.confirm-btn--overlay-close');
// const $btnInfo = document.querySelectorAll('.info-btn');
const $btnIntro = document.querySelector('.start-btn');
const $btnBid = document.querySelector('.auction-btn');
const $btnAgain = document.querySelector('.again-btn');
const $btnCloseEnd = document.querySelector('.close-end-btn');


//--- states ---//
const STATE_start = "start-auction";
const STATE_intro = "intro-auction";
const STATE_auction = "auction-auction";
const STATE_end = "end-auction";

const ALL_STATES = [
    STATE_start,
    STATE_intro,
    STATE_auction,
    STATE_end,
];

//--- variable game ---//
//vars computermensen
let bids = []; //aangemaakte biedingen door de computer
let timeInBetweenBids = []; //tijd tussen de =! biedingen van de computer
let totalBids = 0; //het aantal biedingen van de computer, check waar in de array je zit
let currentBoard = -1; //bordje van de computer dat getoond wordt

//vars om het spel te runnen
let currentBid = 0; //prijs van de bieding op dit moment
let currentPrice = 0; //prijs die gevraagd wordt voor object (altijd 15 hoger dan laatste bieding);
let currentItem = 0;

//vars user
let money = 900; //totaal aantal geld user
let bidUser; //laatste bieding van de user

//time
let currentWidthCanvas = 0;

//--- saveScrollPos ---//
let scrollPos = 0;

//--- setup ---//
let state = STATE_start;
let prevState;

/* ---------------------------------- SHOW CORRECT STATE ----------------------------------*/
// show correct state
const setState = (value) => {
    console.log('setState', value);
    prevState = state;
    state = value;

    if (prevState) {
        document.documentElement.classList.remove(prevState);
    }

    document.documentElement.classList.add(state);
};

/* ---------------------------------- FUNCTION / STATE ----------------------------------*/
const intro = () => {
    setState(STATE_intro);

    scrollPos = document.documentElement.scrollTop;

    document.documentElement.classList.add('no-scroll');
    $nav.classList.add('hide-nav');
    $game.classList.remove('hidden');
}

const auction = () => {
    setState(STATE_auction);
    auctionSetup();
}

const setEnd = () => {
    setState(STATE_end);
}

/* ---------------------------------- EXTRA FUNCTIONS STATE AUCTION ----------------------------------*/
const auctionSetup = () => {
    bids = []; //aangemaakte biedingen door de computer
    timeInBetweenBids = []; //tijd tussen de =! biedingen van de computer
    totalBids = 0; //het aantal biedingen van de computer, check waar in de array je zit
    currentBoard = -1; //bordje van de computer dat getoond wordt

    //vars om het spel te runnen
    currentBid = 0; //prijs van de bieding op dit moment
    currentPrice = 0; //prijs die gevraagd wordt voor object (altijd 15 hoger dan laatste bieding);

    //vars user
    bidUser; //laatste bieding van de user

    const participants = getRandomInt(3, 15);
    createBids(participants);
    setCurrentPrice();
    totalMoney();
    showNextBid();
    draw();
}

const createBids = (participants) => {
    for (let i = 0; i < participants; i++) {
        let bid = getRandomInt(1, 20) * 15; //gaat met stappen van 15
        while (bids.includes(bid)) {
            bid = getRandomInt(1, 20) * 15; //gaat met stappen van 15
        }

        const time = getRandomInt(1, 5);
        bids.push(bid);
        timeInBetweenBids.push(time);
    }

    bids.sort((a, b) => a - b);

}

const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const setCurrentPrice = () => {
    currentPrice = currentBid + 15;
    $price[currentItem].innerText = `${currentPrice} gulden`;
}

const totalMoney = () => {
    $totalMoney.innerText = money;
}

const showNextBid = () => {
    if (totalBids < bids.length) {
        currentBid = bids[totalBids];

        if (currentBid < currentPrice) {
            totalBids++;
            showNextBid();
        } else {
            chooseBoard(currentBid);
            totalBids++;

            setCurrentPrice();
            currentWidthCanvas = 0;
            setTimeout((showNextBid), timeInBetweenBids[totalBids - 1] * 1000);
        }
    } else {
        checkHighstBid();
    }
}

const chooseBoard = (currentBid) => {
    let newBoard = getRandomInt(0, 2);
    while (newBoard === currentBoard) {
        newBoard = getRandomInt(0, 2);
    }

    $computerHands[newBoard].classList.remove('hidden');
    $boards[newBoard].innerText = currentBid;

    if (currentBoard > -1) {
        $computerHands[currentBoard].classList.add('hidden');
    }

    $userHand.classList.add('hidden');

    currentBoard = newBoard;
}

const checkHighstBid = () => {
    if (bidUser > currentBid) {
        money = money - bidUser;
        totalMoney();
        addAankoop();
    }
}

const bied = () => {
    bidUser = currentPrice;
    currentBid = currentPrice;
    $boardUser.innerText = bidUser;
    $userHand.classList.remove('hidden');

    if (currentBoard > -1) {
        $computerHands[currentBoard].classList.add('hidden');
    }

    currentWidthCanvas = 0;
    setCurrentPrice();
    totalMoney();
}

const verkocht = () => {
    if (bidUser === currentBid && bidUser < money) {
        console.log('IK KOOP!');
        addAankoop();
    }

    $userHand.classList.add('hidden');
    nextItem();
    auctionSetup();
}

const nextItem = () => {
    if (currentItem < $articles.length - 1) {
        console.log('next item');
        $articles[currentItem].classList.add('hidden');
        $articles[currentItem + 1].classList.remove('hidden');
        currentItem++;
    } else {
        setEnd();
    }
}

const getInfoLot = () => {
    const article = $articles[currentItem];
    const title = article.querySelector('.article__title').textContent;
    const price = article.querySelector('.article__price span').textContent;
    const imgSrc = article.querySelector('.article__img').src;

    return {
        title, price, imgSrc
    }
}

const addAankoop = () => {
    console.log('ik word toegevoegd');
    const info = getInfoLot();

    const listItem = document.createElement('li');
    listItem.className = 'container';

    const aankoopItem = document.createElement('div');
    aankoopItem.className = 'aankoop__item';

    const aankoopName = document.createElement('p');
    aankoopName.className = 'aankoop__name';
    aankoopName.textContent = info.name;


    const aankoopPrice = document.createElement('p');
    aankoopPrice.className = 'aankoop__price';
    aankoopPrice.textContent = info.price;

    const aankoopImg = document.createElement('img');
    aankoopImg.className = 'aankoop__img';
    aankoopImg.src = info.imgSrc;
    aankoopImg.alt = '';

    aankoopItem.appendChild(aankoopName);
    aankoopItem.appendChild(aankoopPrice);
    aankoopItem.appendChild(aankoopImg);

    listItem.appendChild(aankoopItem);
}

//--- progresbar ---//
const $canvas = document.querySelector('.progressBar');
const ctx = $canvas.getContext('2d');

$canvas.width = $body.offsetWidth + 16;
$canvas.height = 8;

const duration = 10; // tijd in seconds
const totalWidth = $canvas.width;
const increment = totalWidth / (duration * 60); // Calculate increment per frame (approx 60 FPS)

const draw = () => {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, $canvas.width, $canvas.height);

    ctx.fillStyle = "blue"; // Color of the filling rectangle
    ctx.fillRect(0, 0, currentWidthCanvas, $canvas.height);

    //Update the current width
    if (currentWidthCanvas < totalWidth) {
        currentWidthCanvas += increment; // Increase the width

        requestAnimationFrame(draw);
    } else {
        currentWidthCanvas = 0;
        verkocht();
    }
}

/* ---------------------------------- OVERLAYS ----------------------------------*/
const openOverlayClose = () => {
    $overlayClose.classList.remove('hidden');
}

const closeOverlayClose = () => {
    $overlayClose.classList.add('hidden');
}

const backToStart = () => {
    $overlayClose.classList.add('hidden');
    $nav.classList.remove('hide-nav');
    document.documentElement.classList.remove('no-scroll');
    // document.documentElement.scrollTop = scrollPos;
    document.documentElement.scrollTo({ top: scrollPos, behavior: "instant" });
    $game.classList.add('hidden');
    setState(STATE_start);
}

/* ------------------------------------------------------------------------*/
export function auctionGame(element) {
    $btnStart.addEventListener('click', () => { intro() });


    $btnClose.forEach(btn => {
        btn.addEventListener('click', () => { openOverlayClose() });
    });

    $btnCloseOverlay.addEventListener('click', () => { closeOverlayClose() });
    $btnConfirmClose.addEventListener('click', () => { backToStart() });
    $btnIntro.addEventListener('click', () => { auction() });
    $btnBid.addEventListener('click', () => { bied() });

    // $btnInfo.addEventListener('click', event);
    $btnAgain.addEventListener('click', () => { auction() });
    $btnCloseEnd.addEventListener('click', () => { backToStart() });

    setState(state);
}
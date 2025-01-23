/* ------------------ VARIABLES ------------------*/
//--- html selections ---//
const $nav = document.querySelector('.navigation');
const $overlayClose = document.querySelector('.display-auction-close');
const $price = document.querySelector('.article__price');
const $totalMoney = document.querySelector('.total-money__content');
const $boards = document.querySelectorAll('.board--computer');
const $boardUser = document.querySelectorAll('.board--user');

//--- buttons ---//
const $btnStart = document.querySelector('.poster__btn');
const $btnClose = document.querySelectorAll('.close-btn');
const $btnCloseOverlay = document.querySelector('.close-btn--overlay');
const $btnConfirmClose = document.querySelector('.confirm-btn--overlay-close');
// const $btnInfo = document.querySelectorAll('.info-btn');
const $btnIntro = document.querySelector('.start-btn');
const $btnBid = document.querySelector('.auction-btn');
// const $btnAgain = document.querySelector('.again-btn');
// const $btnCloseEnd = document.querySelector('.close-end-btn');


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
let bids = [];
let timeInBetweenBids = [];
let totalBids = 0;
let currentBid;
let price;

let currentPrice = 0;
let money = 900;
let bidUser;

//--- setup ---//
let state = STATE_start;
let prevState;

// const auction = () => {}
// const end = () => {}

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
    document.documentElement.classList.add('no-scroll');
    $nav.classList.add('hide-nav');
}

const auction = () => {
    setState(STATE_auction);
    auctionSetup();
}

/* ---------------------------------- EXTRA FUNCTIONS STATE AUCTION ----------------------------------*/
const auctionSetup = () => {
    const participants = getRandomInt(3, 15);
    createBids(participants);
    console.log(bids);
    setCurrentPrice();
    totalMoney();
    showNextBid();
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
    price = currentBid + 15;
    $price.innerText = `biedprijs: ${price} gulden`;
}

const totalMoney = () => {
    $totalMoney.innerText = money;
}

const showNextBid = () => {
    if (totalBids < bids.length) {
        currentBid = bids[totalBids];

        if (currentBid < price) {
            totalBids++;
            showNextBid();
        } else {
            console.log(currentBid); // Display the current bid
            $boards[0].innerText = currentBid;
            totalBids++;

            setCurrentPrice();
            setTimeout((showNextBid), timeInBetweenBids[totalBids - 1] * 1000);
        }
    } else {
        checkHighstBid();
    }
}

const checkHighstBid = () => {
    if (bidUser > currentBid) {
        money = money - bidUser;
        totalMoney();
        addAankoop();
    }
}

const bied = () => {
    console.log('bied');
    $boards[0].innerText = price;
    bidUser = price;
    setCurrentPrice();
    totalMoney();
}

const getInfoLot = () => {
    
}

const addAankoop = () => {
    const listItem = document.createElement('li');
    listItem.className = 'container';

    const aankoopItem = document.createElement('div');
    aankoopItem.className = 'aankoop__item';

    const aankoopName = document.createElement('p');
    aankoopName.className = 'aankoop__name';


    const aankoopPrice = document.createElement('p');
    aankoopPrice.className = 'aankoop__price';

    const aankoopImg = document.createElement('img');
    aankoopImg.className = 'aankoop__img';
    aankoopImg.src = imgSrc;
    aankoopImg.alt = '';

    aankoopItem.appendChild(aankoopName);
    aankoopItem.appendChild(aankoopPrice);
    aankoopItem.appendChild(aankoopImg);

    listItem.appendChild(aankoopItem);
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
    // $btnInfo.addEventListener('click', event);
    $btnIntro.addEventListener('click', () => { auction() });
    $btnBid.addEventListener('click', () => { bied() });
    // $btnAgain.addEventListener('click', event);
    // $btnCloseEnd.addEventListener('click', event);

    setState(state);
}
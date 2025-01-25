/* ------------------ VARIABLES ------------------*/
//--- html selections ---//
const $nav = document.querySelector('.navigation');
const $overlayClose = document.querySelector('.display-auction-close');
const $overlayInfo = document.querySelector('.display-auction-info');
const $price = document.querySelectorAll('.article__price span');
const $totalMoney = document.querySelector('.total-money__content');
const $boards = document.querySelectorAll('.board--computer');
const $boardUser = document.querySelector('.board--user');
const $game = document.querySelector('.game');
const $computerHands = document.querySelectorAll('.computer-hand');
const $userHand = document.querySelector('.user-hand');
const $body = document.querySelector('.body');
const $articles = document.querySelectorAll('.article');
const $aankopen = document.querySelectorAll('.aankopen__list');

//--- buttons ---//
const $btnStart = document.querySelector('.poster__btn');
const $btnClose = document.querySelectorAll('.close-btn');
const $btnCloseOverlay = document.querySelector('.close-btn--overlay');
const $btnConfirmClose = document.querySelector('.confirm-btn--overlay-close');
const $btnInfo = document.querySelectorAll('.info-btn');
const $btnIntro = document.querySelector('.start-btn');
const $btnBid = document.querySelector('.auction-btn');
const $btnAgain = document.querySelector('.again-btn');
const $btnCloseEnd = document.querySelector('.close-end-btn');
const $btnConfirmInfo = document.querySelector('.confirm-btn--overlay-info');


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
let currentItem = -1;

//vars user
let money = 900; //totaal aantal geld user
let bidUser; //laatste bieding van de user

//time
let currentWidthCanvas = 0;
let progressBarRunning = false;

//--- saveScrollPos ---//
let scrollPos = 0;

//--- setup ---//
let state = STATE_start;

/* ---------------------------------- SHOW CORRECT STATE ----------------------------------*/
// show correct state
const setState = (value) => {
    console.log('setState', value);
    state = value;
    // $state.textContent = state;
    document.documentElement.classList.remove(...ALL_STATES);
    document.documentElement.classList.add(state);
};

/* ---------------------------------- FUNCTION / STATE ----------------------------------*/
const backToStart = () => {
    $overlayClose.classList.add('hidden');
    $nav.classList.remove('hide-nav');
    document.documentElement.classList.remove('no-scroll');
    // document.documentElement.scrollTop = scrollPos;
    document.documentElement.scrollTo({ top: scrollPos, behavior: "instant" });
    $game.classList.add('hidden');
    setState(STATE_start);
}

const intro = () => {
    setState(STATE_intro);

    scrollPos = document.documentElement.scrollTop;

    document.documentElement.classList.add('no-scroll');
    $nav.classList.add('hide-nav');
    $game.classList.remove('hidden');
}

const auctionStart = () => {
    $aankopen.forEach(aankoop => {
        aankoop.innerHTML = '';
    });

    money = 900;
    currentItem = 0;

    $articles.forEach(article => {
        article.classList.add('hidden');
    });

    $articles[currentItem].classList.remove('hidden');

    console.log(currentItem);
    setState(STATE_auction);

    auction();
}

const auction = () => {
    bids = []; //aangemaakte biedingen door de computer
    timeInBetweenBids = []; //tijd tussen de =! biedingen van de computer
    totalBids = 0; //het aantal biedingen van de computer, check waar in de array je zit
    currentBoard = -1; //bordje van de computer dat getoond wordt
    console.log(timeInBetweenBids);
    //vars om het spel te runnen
    currentBid = 0; //prijs van de bieding op dit moment
    currentPrice = 0; //prijs die gevraagd wordt voor object (altijd 15 hoger dan laatste bieding);

    $computerHands.forEach(computerHand => {
        computerHand.classList.add('hidden');
    });

    //vars user
    bidUser = 0; //laatste bieding van de user

    const participants = getRandomInt(3, 15);
    createBids(participants);
    setCurrentPrice();
    totalMoney();
    showNextBid();
    progressBarRunning = true;
}

const setEnd = () => {
    setState(STATE_end);
}

/* ---------------------------------- EXTRA FUNCTIONS STATE AUCTION ----------------------------------*/
//--- progresbar ---//
const $canvas = document.querySelector('.progressBar');
const ctx = $canvas.getContext('2d');

$canvas.width = $body.offsetWidth + 16;
$canvas.height = 8;

const duration = 6; // tijd in seconds
const totalWidth = $canvas.width;
const increment = totalWidth / (duration * 60); // Calculate increment per frame (approx 60 FPS)

const draw = () => {
    ctx.fillStyle = "#FFFEF7";
    ctx.fillRect(0, 0, $canvas.width, $canvas.height);

    ctx.fillStyle = "#E73D00"; // Color of the filling rectangle
    ctx.fillRect(0, 0, currentWidthCanvas, $canvas.height);

    if (state === 'auction-auction') {
        console.log(totalWidth);
        //Update the current width
        if (currentWidthCanvas < totalWidth && progressBarRunning) {
            currentWidthCanvas += increment; // Increase the width
        } else {
            currentWidthCanvas = 0;
            verkocht();
        }
    }

    requestAnimationFrame(draw);
}

const createBids = (participants) => {
    for (let i = 0; i < participants; i++) {
        let bid = getRandomInt(1, 20) * 15; //gaat met stappen van 15
        while (bids.includes(bid)) {
            bid = getRandomInt(1, 20) * 15; //gaat met stappen van 15
        }

        const time = getRandomInt(2, 5);
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
    console.log('totaal aantal bids');
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

            console.log(bids.length);
            console.log(totalBids);
            if (totalBids === bids.length-1) {
                console.log('nieuwe timeOut');
                setTimeout((showNextBid), 6 * 1000);
            } else {
                setTimeout((showNextBid), timeInBetweenBids[totalBids - 1] * 1000);
            }
        }
    } else {
        //verkocht();
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

const verkocht = () => {
    if (bidUser === currentBid && bidUser < money) {
        console.log('IK KOOP!');
        money = money - bidUser;
        addAankoop();
    }

    $userHand.classList.add('hidden');
    nextItem();
    auction();
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
    const price = currentBid;
    const imgSrc = article.querySelector('.article__img').src;

    return {
        title, price, imgSrc
    }
}

const addAankoop = () => {
    console.log('ik word toegevoegd');
    const info = getInfoLot();
    console.log(info);

    $aankopen.forEach(aankopen => {
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

        aankopen.appendChild(aankoopItem);
    });
}

/* ---------------------------------- OVERLAYS ----------------------------------*/
const openOverlayClose = () => {
    $overlayClose.classList.remove('hidden');
}

const openOverlayInfo = () => {
    console.log('open');
    $overlayInfo.classList.remove('hidden');
}

const closeOverlayInfo = () => {
    $overlayInfo.classList.add('hidden');
}

const closeOverlayClose = () => {
    $overlayClose.classList.add('hidden');
}

/* ------------------------------------------------------------------------*/
export function auctionGame(element) {
    $btnStart.addEventListener('click', () => { intro() });


    $btnClose.forEach(btn => {
        btn.addEventListener('click', () => { openOverlayClose() });
    });

    $btnInfo.forEach(btn => {
        btn.addEventListener('click', () => { openOverlayInfo() });
    });

    $btnCloseOverlay.addEventListener('click', () => { closeOverlayClose() });
    $btnConfirmClose.addEventListener('click', () => { backToStart() });
    $btnConfirmInfo.addEventListener('click', () => { closeOverlayInfo() });
    $btnIntro.addEventListener('click', () => { auctionStart() });
    $btnBid.addEventListener('click', () => { bied() });

    // $btnInfo.addEventListener('click', event);
    $btnAgain.addEventListener('click', () => { auctionStart() });
    $btnCloseEnd.addEventListener('click', () => { backToStart() });

    setState(state);
    draw();
}
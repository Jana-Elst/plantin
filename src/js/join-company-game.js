//--- html selections ---//
const $inputName = document.querySelector('.input-name');
const $portrets = document.querySelectorAll('.join-company__portret');
const $frame4 = document.querySelector('.frame-4 div');
const $frame = document.querySelector('.join-company__frame--background');
const $name = document.querySelectorAll('.input__name');
const $money = document.querySelectorAll('.input__money');
const $moneyIMGS = document.querySelector('.frame-4__money');
const $nameF6 = document.querySelector('.input__name--frame-6');
const $moneyF6 = document.querySelector('.input__money--frame-6');

//--- btns ---//
const $btnStart = document.querySelector('.join-company__btn');
const $btnNext = document.querySelector('.join-company__btn-next');
const $btnAgain = document.querySelector('.join-company__btn-again');
const $btnBack = document.querySelector('.join-company__btn-back');

//--- states ---//
const STATE_1 = "join-company__game-1";
const STATE_2 = "join-company__game-2";
const STATE_3 = "join-company__game-3";
const STATE_4 = "join-company__game-4";
const STATE_5 = "join-company__game-5";
const STATE_6 = "join-company__game-6";

let frame = 1;

//--- variablen ---//
const contractBG = 'llala';
const whiteBG = 'var(--bg-white-20)';

let name;
let portretImg; //url
let money = 0;

const ALL_STATES = [
    STATE_1,
    STATE_2,
    STATE_3,
    STATE_4,
    STATE_5,
    STATE_6
];

//--- setup ---//
let state = STATE_1;

/* ---------------------------------- SHOW CORRECT STATE ----------------------------------*/
// show correct state
const setState = (value) => {
    console.log('setState', value);
    state = value;
    // $state.textContent = state;
    document.documentElement.classList.remove(...ALL_STATES);
    document.documentElement.classList.add(state);
};

/* ---------------------------------- SHOW CORRECT STATE ----------------------------------*/
const nextframe = () => {
    frame++;
    const functions = [frame1, frame2, frame3, frame4, frame5, frame6];
    functions[frame - 1]();
}

const prevframe = () => {
    frame--;
    const functions = [frame1, frame2, frame3, frame4, frame5, frame6];
    functions[frame - 1]();
}

const removeEventNext = () => {
    console.log('ik ga weg');
    $btnNext.removeEventListener('click', nextframe);
    $btnNext.style.backgroundImage = "none";
    $btnNext.style.backgroundColor = "#EF8156";
    $frame.removeAttribute('style');
}

const addEventNext = () => {
    console.log('ik ben er');
    $btnNext.addEventListener('click', nextframe);
    $btnNext.removeAttribute('style');
    $frame.removeAttribute('style');
}

const frame1 = () => {
    frame = 1;
    setState(STATE_1);
    $frame.removeAttribute('style');
}

const frame2 = () => {
    setState(STATE_2);
    frame = 2;

    $inputName.value = '';

    removeEventNext();

    $inputName.addEventListener('input', (event) => {
        name = event.target.value;
        $name.forEach(element => {
            element.textContent = name;
        });

        console.log(name);
        if (name.length > 0) {
            addEventNext();
        }
    });

    $inputName.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            submitName(); // Call the submit function if Enter is pressed
        }
    });
}

const submitName = () => {
    name = $inputName.value;
    console.log(name);
    frame3();
}

const frame3 = () => {
    setState(STATE_3);
    frame = 3;
    removeEventNext();

    $portrets.forEach(portret => {
        portret.addEventListener('click', () => { choosePortret(portret) });
    });
}

const choosePortret = (portret) => {
    const img = portret.querySelector('img');
    portretImg = img.src;
    console.log('Image Source:', portretImg);
    addEventNext();
    frame4();
}

const frame4 = () => {
    setState(STATE_4);
    frame = 4;

    money = 0;
    $moneyIMGS.innerHTML = '';
    $money.forEach(element => {
        element.textContent = `${money} gulden`;
    });

    $frame.style.backgroundImage = `url(${portretImg})`;
    $frame4.addEventListener('click', (event) => { chooseMoney(event) });
    $frame.style.opacity = 0.5;
}

const chooseMoney = (event) => {
    money = money + 100;
    console.log('Money:', money);

    const moneyIMG = document.createElement('img');
    moneyIMG.src = '/plantin/src/assets/geld.png';
    moneyIMG.style.position = 'fixed';
    moneyIMG.style.top = `${event.clientY}px`;
    moneyIMG.style.left = `${event.clientX}px`;

    $moneyIMGS.appendChild(moneyIMG);

    $money.forEach(element => {
        element.textContent = `${money} gulden`;
    });
}

const frame5 = () => {
    setState(STATE_5);
    frame = 5;
    $frame.removeAttribute('style');

    setTimeout(() => {
        frame6();
    }, 3000);
}

const frame6 = () => {
    setState(STATE_6);
    frame = 6;
    $frame.style.backgroundImage = `url(${portretImg})`;
    $btnAgain.addEventListener('click', frame1);

    $nameF6.textContent = `vennoot: ${name}`;
    $moneyF6.textContent = `inbreng: ${money} gulden`;
}

/* ------------------------------------------------------------------------*/
export function joinCompany(element) {
    $btnStart.addEventListener('click', frame2);
    $btnNext.addEventListener('click', nextframe);
    $btnBack.addEventListener('click', prevframe);
    setState(state);
}
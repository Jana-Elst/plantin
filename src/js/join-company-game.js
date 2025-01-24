//--- html selections ---//
const $inputName = document.querySelector('.input_name');
const $portrets = document.querySelectorAll('.join-company__portret');
const $frame4 = document.querySelector('.frame-4 div');
const $frame = document.querySelector('.join-company__frame');
const $frame7Name = document.querySelector('.frame-7__name');

//--- btns ---//
const $btnStart = document.querySelector('.join-company__btn');
const $btnNext = document.querySelector('.join-company__btn-next');
const $btnAgain = document.querySelector('.join-company-again');

//--- states ---//
const STATE_1 = "join-company__game-1";
const STATE_2 = "join-company__game-2";
const STATE_3 = "join-company__game-3";
const STATE_4 = "join-company__game-4";
const STATE_5 = "join-company__game-5";
const STATE_6 = "join-company__game-6";
const STATE_7 = "join-company__game-7";

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
    STATE_6,
    STATE_7,
];

//--- setup ---//
let state = STATE_1;
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

/* ---------------------------------- SHOW CORRECT STATE ----------------------------------*/
const nextframe = () => {
    frame++;
    const functions = [frame1, frame2, frame3, frame4, frame5, frame6, frame7];
    functions[frame - 1]();
}

const frame1 = () => {
    frame = 1;
    setState(STATE_1);
    $frame.style.backgroundImage = whiteBG;
}

const frame2 = () => {
    setState(STATE_2);
    frame = 2;

    $inputName.addEventListener('input', (event) => {
        name = event.target.value;
    });

    $inputName.addEventListener('blur', () => { submitName() });
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

    $portrets.forEach(portret => {
        portret.addEventListener('click', () => { choosePortret(portret) });
    });
}

const choosePortret = (portret) => {
    const img = portret.querySelector('img');
    portretImg = img.src;
    console.log('Image Source:', portretImg);

    frame4();
}

const frame4 = () => {
    setState(STATE_4);
    frame = 4;
    $frame.style.backgroundImage = `url(${portretImg})`;
    $frame4.addEventListener('click', () => { chooseMoney() });
}

const chooseMoney = () => {
    money = money + 100;
    console.log('Money:', money);
}

const frame5 = () => {
    setState(STATE_5);
    frame = 5;

    $frame.style.backgroundImage = `url(${contractBG})`;

}

const frame6 = () => {
    setState(STATE_6);
    frame = 6;
    $frame.style.backgroundImage = whiteBG;

    setTimeout(() => {
        frame7();
    }, 5000);
}

const frame7 = () => {
    setState(STATE_7);
    frame = 7;
    $frame.style.backgroundImage = `url(${portretImg})`;
    $frame7Name.textContent = name;

    $btnAgain.addEventListener('click', () => { frame1() });
}


/* ------------------------------------------------------------------------*/
export function joinCompany(element) {
    $btnStart.addEventListener('click', () => { frame2() });
    $btnNext.addEventListener('click', () => { nextframe() });
    setState(state);
}
//--- states ---//
const STATE_1 = "join-company__game-1";
const STATE_2 = "join-company__game-2";
const STATE_3 = "join-company__game-3";
const STATE_4 = "join-company__game-4";
const STATE_5 = "join-company__game-5";
const STATE_6 = "join-company__game-6";
const STATE_7 = "join-company__game-7";

const ALL_STATES = [
    STATE_state1,
    STATE_state2,
    STATE_state3,
    STATE_state4,
    STATE_state5,
    STATE_state6,
    STATE_state7,
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

/* ------------------------------------------------------------------------*/
export function joinCompany(element) {
    setState(state);
}
const BOARD_ROWS = 5;
const BOARD_COLS = 5;

document.querySelector("#generate").addEventListener("click", generateCards);
let errors=[];
const printBtn = document.querySelector('#print');
printBtn.addEventListener('click', () => window.print());

document.querySelector("#clearAll").addEventListener("click", () => {
    for (let col = 0; col < BOARD_COLS; col++) {
        document.getElementById(`valuesColumn${col}`).value = "";
        document.getElementById(`column${col}Label`).value = "";
    }

    const cardTextColor = document.getElementById("cardTextColor");
    cardTextColor.value = cardTextColor.defaultValue;

    const borderColor = document.getElementById("borderColor");
    borderColor.value = borderColor.defaultValue;

    const evenBgColor = document.getElementById("evenCellColor");
    evenBgColor.value = evenBgColor.defaultValue;

    const oddBgColor = document.getElementById("oddCellColor");
    oddBgColor.value = oddBgColor.defaultValue;
});

function generateCards(evt) {
    errors=[];

    const numCards = parseInt(document.querySelector('#numCards').value);
    const startNum = parseInt(document.querySelector('#startNum').value);
    const cardTitleField = document.querySelector('#cardTitle');
    const cardTitle = cardTitleField.value.length > 0 ? cardTitleField.value : 'Bingo';

    if (isNaN(startNum)) {
        errors.push('"Start numbering" must contain a number');
    }
    if (isNaN(numCards)) {
        errors.push('"Number of Cards" must contain a number');
    }
    if(numCards < 1) {
        errors.push("You must have at least 1 card");
    }

    if(errors.length>0) {
        document.querySelector('#validation').innerHTML = errors.map(e=> `<li>${e}</li>`).join('');
        return;
    }

    let data = [];
    for (let card = 0; card < numCards; card++) {
        let cardRows = [];

        let columns = [];
        for (let col = 0; col < BOARD_COLS; col++) {
            let colValues = document.getElementById(`valuesColumn${col}`).value.trim().split('\n').map(s=>s.trim());
            colValues.sort(_ => Math.random() - 0.5);
            columns.push(colValues)
        }

        for (let row = 0; row < BOARD_ROWS; row++) {
            for (let col = 0; col < BOARD_COLS; col++) {
                cardRows.push(columns[col][row]);
            }
        }

        cardRows[12] = "FREE";
        
        data.push(cardRows);
    }

    renderCards(data, cardTitle, startNum);
}

function renderCards(data, title, n) {
    let template = ``;

    const cardTextColor = document.getElementById("cardTextColor").value;
    const borderColor = document.getElementById("borderColor").value;
    const evenBgColor = document.getElementById("evenCellColor").value;
    const oddBgColor = document.getElementById("oddCellColor").value;

    for (let i=0;i<data.length;i++) {
        template += `<div class="page"><section class="card" style="color: ${cardTextColor}; border-color: ${borderColor} !important;">
            <header>
                <h1>Bingo</h1>
                <span class="no">Card No: ${n+i}</span>
            </header>
            <main>
            `
        for (let col = 0; col < BOARD_COLS; col++) {
            template += `<div class="titleCell">
                <h2>
                ${document.getElementById(`column${col}Label`).value.trim()}
                </h2>
            </div>`
        }
        for (let j=0; j<data[i].length; j++) {
            template += `<div class="cell" style="background-color: ${j % 2 == 0 ? evenBgColor : oddBgColor}">${ data[i][j] }</div>`
        }
        template += `</main></section></div>`;
    }
    document.querySelector('#print').disabled = false;
    document.querySelector('#cards').innerHTML = template;
    // console.log(data)
}
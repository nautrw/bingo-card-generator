document.querySelector("#generate").addEventListener("click", generateCards);
let errors=[];
const printBtn = document.querySelector('#print');
printBtn.addEventListener('click', e => window.print());

function generateCards(evt) {
    errors=[];
    const boardRows = 5;
    const boardCols = 5;

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
        for (let col = 0; col < boardCols; col++) {
            let colValues = document.getElementById(`valuesColumn${col}`).value.trim().split('\n').map(s=>s.trim());
            colValues.sort(_ => Math.random() - 0.5);
            columns.push(colValues)
        }

        for (let row = 0; row < boardRows; row++) {
            for (let col = 0; col < boardCols; col++) {
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
    for (let i=0;i<data.length;i++) {
        template += `<div class="page"><section class="card">
                <header>
                    <h1>${ title }</h1> 
                    <span class="no">Card No: ${n+i}</span>
                </header>
            <main>`
        for (let j=0; j<data[i].length; j++) {
            template += `<div class="cell">${ data[i][j] }</div>`
        }
        template += `</main></section></div>`;
    }
    document.querySelector('#print').disabled = false;
    document.querySelector('#cards').innerHTML = template;
    // console.log(data)
}
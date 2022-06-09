doStatement();

function menuShow() {
    document.querySelector('.nav-menu').style.display = 'flex';
}
                                                                    // show/hide mobile menu
function menuHide() {
    document.querySelector('.nav-menu').style.display = 'none';
}

function pasteCheck(e) {    // apply the mask to the value field in case of ctrl+v
    if (e.key === 'v' && e.ctrlKey) {
        maskMoney(e);
    }
}

function maskMoney(e) {    // in real time BRL money mask and validation

    e.preventDefault();
    
    if ((/[0-9]+/g).test(e.key)) {
        e.target.value += e.key;
    }

    let formattedInput = Number(e.target.value.replace(/[^0-9]+/g, ''));
    formattedInput /= 100;

    e.target.value = formatMoney(formattedInput);

}

function dealSubmit(e) {    // captures the input values and calls the function responsible for displaying them

    e.preventDefault();

    var dealType = document.querySelector('.deal-type').value;
    var dealName = document.getElementById('major').value;
    var dealValue = document.getElementById('value').value;

    var deal = JSON.parse(localStorage.getItem('deal') || '[]');

    deal.push({
        dealType: dealType,
        dealName: dealName,
        dealValue: dealValue
    });

    localStorage.setItem('deal', JSON.stringify(deal));

    doStatement();

}

function doStatement() {    // show statement label and calls calls the function responsible for calc the total

    deal = JSON.parse(localStorage.getItem('deal'));

    if (deal != null) {
        document.querySelector('.statement-label').innerHTML = deal.map((item) => {
            return `<div class="statement-line">
                <p>${item.dealType == 'Compra' ? '-' : '+'}</p>
                <div>
                    <p class="merchandise">${item.dealName}</p>
                    <p>${item.dealValue}</p>
                </div>
            </div>`
        }).join('');
        document.getElementById('stat-info').innerHTML = 'Total';

        totalAmount();
    }
    
}

function totalAmount() {   // calc total and calls the function which will display them

    deal = JSON.parse(localStorage.getItem('deal'));

    var total = 0;
    let purchase = [];
    let purchaseTotal = 0;
    let sell = [];
    let sellTotal = 0;

    for (let i = 0; i < deal.length; i++) {

        if (deal[i].dealType === 'Compra') {
            purchase = deal[i].dealValue.replace(/\D/g, '');
            purchaseTotal += Number.parseFloat(purchase);
        }

        if (deal[i].dealType === 'Venda') {
            sell = deal[i].dealValue.replace(/\D/g, '');
            sellTotal += Number.parseFloat(sell);
        }

    }

    total = sellTotal - purchaseTotal;
    total /= 100;

    showTotal(total);

}

function showTotal(total) {   // show total and if there was profit or loss

    document.getElementById('total-value').innerHTML = formatMoney(total);

    if (total > 0) document.getElementById('profit').innerHTML = '[LUCRO]';
    else if (total < 0) document.getElementById('profit').innerHTML = '[PREJUÍZO]';
    else document.getElementById('profit').innerHTML = '';

}

function formatMoney(total) {    // convert number to BRL
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(total);
}

function dataClear() {    // erase all data from localStorage

    if (window.confirm('Todos os dados serão excluídos! Deseja prosseguir?')) {
        localStorage.clear('deal');
        statementClear();
    }
}

function statementClear() {    //clean statement table without reload the page

    document.querySelector('.statement-label').innerHTML =
        `<div class="statement-line">
            <p></p>
            <div>
                <p class="merchandise">Nenhuma transação cadastrada.</p>
                <p></p>
            </div>
        </div>`

    document.querySelector('.statement-total').innerHTML = '';

}

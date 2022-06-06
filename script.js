function menuShow() {                                                
    document.querySelector('.nav-menu').style.display = 'flex';     
}                                                                  
                                                                  // show/hide mobile menu
function menuHide() {                                            
    document.querySelector('.nav-menu').style.display = 'none'; 
}                                                              

doStatement();

$(document).ready(function () {    // in real time BRL input conversion
    $('#value').maskMoney({
      prefix: 'R$ ',
      allowNegative: false,
      thousands: '.',
      decimal: ',',
      affixesStay: true,
    });
});


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
            purchase = deal[i].dealValue.replace('R$ ', '');
            purchaseTotal += Number.parseFloat(purchase.replace(',', '.'));
        }

        if (deal[i].dealType === 'Venda') {
            sell = deal[i].dealValue.replace('R$ ', '');
            sellTotal += Number.parseFloat(sell.replace(',', '.'));
        }

    }

    total = sellTotal - purchaseTotal;

    showTotal(total);

}

function showTotal(total) {   // show total and if there was profit or loss

    document.getElementById('total-value').innerHTML = formatMoney(total);

    if (total > 0) document.getElementById('profit').innerHTML = '[LUCRO]';
    else if (total < 0) document.getElementById('profit').innerHTML = '[PREJUÍZO]';
    else document.getElementById('profit').innerHTML = '';

}

function formatMoney(total) {    // convert total to BRL
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(total);
}

function dataClear() {    // clear all data from localStorage

    if (window.confirm('Todos os dados serão excluídos! Deseja prosseguir?')) {
       localStorage.clear('deal'); 
       location.reload();
    }
    
}


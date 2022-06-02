function menuShow() {
    document.querySelector('.nav-menu').style.display = 'flex';
}

function menuHide() {
    document.querySelector('.nav-menu').style.display = 'none';
}

$(document).ready(function () {
    $("#value").maskMoney({
      prefix: "R$ ",
      allowNegative: true,
      thousands: ".",
      decimal: ",",
      affixesStay: true,
    });
});
// Variáveis
var order = [];
var idElement = document.getElementById('order-id');
var dateElement = document.getElementById('date');
var codList = document.getElementById('cod-list');
var nameList = document.getElementById('name-list');
var priceList = document.getElementById('price-list');
var soma = 0;
var redit = parseInt(localStorage.redit);
var local = order.length - 1;
const money = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL'
}).format(10000.90 + 20000.60);
console.log(Number(money) + 30);

// Funções

function upload() {
  if (localStorage.order) {
    order = JSON.parse(localStorage.order);
    console.log('uploadiei');
  }

  if (redit != 0) {
    idElement.innerHTML = 'Pedido: ' + order[localStorage.redit - 1].id;
    dateElement.innerHTML = order[localStorage.redit - 1].dateCreate;
    document.getElementById('status').value = order[localStorage.redit - 1].stats;
    document.getElementById('channel').value = order[localStorage.redit - 1].selling;
    document.getElementById('divulgation').value = order[localStorage.redit - 1].marketing;
    document.getElementById('delliver').value = order[localStorage.redit - 1].delliver;
    document.getElementById('previous-date').value = order[localStorage.redit - 1].previousDate;
    document.getElementById('cep').value = order[localStorage.redit - 1].clientCep;
    document.getElementById('client-datas').value = order[localStorage.redit - 1].clientDatas;
    document.getElementById('promotion').checked = order[localStorage.redit - 1].promotion;
    document.getElementById('payment').value = order[localStorage.redit - 1].payment;
    document.getElementById('discount').value = order[localStorage.redit - 1].discount;
    document.getElementById('soma').value = order[localStorage.redit - 1].soma;
    document.getElementById('frete').value = order[localStorage.redit - 1].frete;
    document.getElementById('start-payday').value = order[localStorage.redit - 1].sPayDay;
    document.getElementById('start-pay-value').value = order[localStorage.redit - 1].sPayValue;
    document.getElementById('start-pay').value = order[localStorage.redit - 1].sPay;
    document.getElementById('final-payday').value = order[localStorage.redit - 1].fPayDay;
    document.getElementById('final-pay-value').value = order[localStorage.redit - 1].fPayValue;
    document.getElementById('final-pay').value = order[localStorage.redit - 1].fPay;

    for (let ch = 0; ch < order[localStorage.redit - 1].product.length; ch++) {
      codList.innerHTML += '<li><input type="number" id="code' + ch +'"></li>';
      nameList.innerHTML += '<li><input type="text" id="description' + ch + '"></li>';
      priceList.innerHTML += '<li><input type="number" id="price' + ch +'"></li>';
    }

    for (let ch = 0; ch < order[localStorage.redit - 1].product.length; ch++) {
      document.getElementById('code' + ch).value = order[localStorage.redit - 1].product[ch].code;
      document.getElementById('description' + ch).value = order[localStorage.redit - 1].product[ch].description;
      document.getElementById('price' + ch).value = order[localStorage.redit - 1].product[ch].price;
    }
    console.log('dsasdf');
  }
}
upload();

function saveOrder() {
  order[local].stats = document.getElementById('status').value;
  order[local].selling = document.getElementById('channel').value;
  order[local].marketing = document.getElementById('divulgation').value;
  order[local].delliver = document.getElementById('delliver').value;
  order[local].previousDate = document.getElementById('previous-date').value;
  order[local].clientDatas = document.getElementById('client-datas').value;
  order[local].clientCep = document.getElementById('cep').value;
  order[local].promotion = document.getElementById('promotion').checked;
  order[local].payment = document.getElementById('payment').value;
  order[local].notes = document.getElementById('notes').value;
  order[local].discount = document.getElementById('discount').value;
  order[local].frete = document.getElementById('frete').value;
  order[local].sPayDay = document.getElementById('start-payday').value;
  order[local].sPayValue = document.getElementById('start-pay-value').value;
  order[local].sPay = document.getElementById('start-pay').checked;
  order[local].fPayDay = document.getElementById('final-payday').value;
  order[local].fPayValue = document.getElementById('final-pay-value').value;
  order[local].fPay = document.getElementById('final-pay').checked;

  for (let ch = 0; ch < order[local].product.length; ch++) {
    order[local].product[ch].code = document.getElementById('code' + ch).value;
    order[local].product[ch].description = document.getElementById('description' + ch).value;
    order[local].product[ch].price = document.getElementById('price' + ch).value;
  }

  autoSoma();
  localStorage.order = JSON.stringify(order);
}

function writeDate(day, month, year) {
  dateElement.innerHTML = day + '/' + month + '/' + year;
}

function addProduct() {
  order[order.length - 1].product.push({code: 0, description: '', price: 0});
  codList.innerHTML += '<li><input type="number" id="code' + (order[order.length - 1].product.length - 1) +'"></li>';
  nameList.innerHTML += '<li><input type="text" id="description' + (order[order.length - 1].product.length - 1) + '"></li>';
  priceList.innerHTML += '<li><input type="number" id="price' + (order[order.length - 1].product.length - 1) +'"></li>';
  for (let ch = 0; ch < order[local].product.length; ch++) {
    document.getElementById('code' + ch).value = order[local].product[ch].code;
    document.getElementById('description' + ch).value = order[local].product[ch].description;
    document.getElementById('price' + ch).value = order[local].product[ch].price;
  }
  saveOrder();
}

function autoSoma() {
  order[local].total = 0;
  order[local].soma = 0;

  for (let ch = 0; ch < order[local].product.length; ch++) {
    order[local].soma += Number(order[local].product[ch].price);
    document.getElementById('soma').innerText = 'R$' + order[local].soma;
    order[local].total = order[local].soma;
  }

  order[local].total -= Number(order[local].discount);
  order[local].total += Number(order[local].frete);
  document.getElementById('total').innerText = order[local].total;
  document.getElementById('discount-text').innerHTML = 'Desc: 5% = (' + order[local].soma / 100 * 5 +')';
}

if (localStorage.redit == 0) {
  order.push({
    id: order.length + 1,
    dateCreate: '',
    stats: '',
    selling: '',
    marketing: '',
    delliver: '',
    previousDate: '',
    clientDatas: '',
    clientCep: '',
    product: [],
    promotion: false,
    payment: '',
    notes: '',
    soma: 0,
    discount: 0,
    frete: 0,
    total: 0,
    sPayDay: '',
    sPayValue: '',
    sPay: false,
    fPayDay: '',
    fPayValue: '',
    fPay: false
  });

  const currentDate = new Date();
  order[order.length - 1].dateCreate = currentDate.toLocaleDateString();

  idElement.innerText = 'Pedido: ' + order[order.length - 1].id;
  local = order.length - 1;
} else {
  local = redit - 1;
  console.log(0);
}

console.log(order);

autoSoma();
addEventListener('change',  saveOrder);
document.getElementById('client-datas').addEventListener('keyup', e => {
  let scHeight = e.target.scrollHeight;
  console.log(scHeight);  
  document.getElementById('client-datas').style.height = scHeight + 'px';
})


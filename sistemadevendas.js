//Variáveis

var order = []
var orderList = document.getElementById('order-list')

// Funções
function renderList() {
	for(let ch = 0; ch < order.length; ch++) {
		orderList.innerHTML += '<a id="' + order[ch].id + '" value="order[ch].id" onclick="indentfy(id)" href="fill_order.html" class="order-link"><li><div>' + order[ch].id +'</div><p>' + order[ch].clientDatas + '</p></li></a>'
	}
}

function indentfy(indenfyer) {
	console.log(indenfyer)
	localStorage.redit = indenfyer
}

localStorage.redit = 0

// importar todos os arquivos salvos
if(localStorage.order) {
	order = JSON.parse(localStorage.order)
	console.log(order)
}

renderList()

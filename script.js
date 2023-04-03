// Por padrão, o botão de finalizar pedido deve vir desabilitado. Ao clicar no botão nesse estado, nada deve acontecer.

let selectedDish;
let selectedDrink;
let selectedDessert;

// Função que pega no HTML o nome e o preço de cada produto e ativa a seleção com borda verde

function selectDish(dish) {
    selectedDish = {
        name: dish.querySelector('h2').innerHTML,
        price: dish.querySelector('span').innerHTML.replace("R$", '')
    };

    const dishes = document.querySelectorAll('.dishes article');
    dishes.forEach((dish) => dish.classList.remove('selected'));

    dish.classList.add('selected');

    unlockedOrderBtn();
}

function selectDrink(drink) {
    selectedDrink = {
        name: drink.querySelector('h2').innerHTML,
        price: drink.querySelector('span').innerHTML.replace("R$", '')
    };

    const drinks = document.querySelectorAll('.drinks article');
    drinks.forEach((drink) => drink.classList.remove('selected'));

    drink.classList.add('selected');

    unlockedOrderBtn();
}

function selectDessert(dessert) {
    selectedDessert = {
        name: dessert.querySelector('h2').innerHTML,
        price: dessert.querySelector('span').innerHTML.replace("R$", '')
    };

    const desserts = document.querySelectorAll('.desserts article');
    desserts.forEach((dessert) => dessert.classList.remove('selected'));

    dessert.classList.add('selected');

    unlockedOrderBtn();
}

// Funções que definem o desbloqueio do botaão de baixo mudando ele de bloqueado para desbloqueado quando selecionamos as 3 classes

function unlockedOrderBtn() {
    if (selectedDish !== undefined && selectedDrink !== undefined && selectedDessert !== undefined) {
        const unlockedOrderBtn = document.querySelector('.unlocked-order-btn');
        const lockedOrderBtn = document.querySelector('.locked-order-btn');

        lockedOrderBtn.classList.add('display-none');
        unlockedOrderBtn.classList.remove('display-none');
    }
}

function orderBtn() {
    renderConfirmOrder();

    const containerConfirmOrder = document.querySelector('.container-confirm-order');
    containerConfirmOrder.classList.toggle('display-none');
}

// Função para fazer a soma do valor total dos produtos do pedido usando o toFixed

function totalPrice() {
    let total = 0;
    const priceList = [selectedDish.price, selectedDrink.price, selectedDessert.price];

    priceList.forEach(price => total += Number(price.replace(',', '.')));

    return total.toFixed(2)
}

// Função que renderiza o pedido e mostra ao cliente o nome do produto escolhido, valor de cada e a soma total

function renderConfirmOrder() {
    const confirmOrderString = `<li>
    <h2>${selectedDish.name}</h2>
    <span>R$${selectedDish.price}</span>
    </li>
<li>
    <h2>${selectedDrink.name}</h2>
    <span>R$${selectedDrink.price}</span>
</li>
<li>
    <h2>${selectedDessert.name}</h2>
    <span>R$${selectedDessert.price}</span>
</li>
<li>
    <h2>TOTAL</h2>
    <span>R$${totalPrice().replace('.', ',')}</span>
</li>`

    const confirmOrderUl = document.querySelector('.confirm-order ul');
    confirmOrderUl.innerHTML = confirmOrderString;
}

// Função do prompt de dados pessoais, coloquei uma condição de loop em caso o cliente não preencha as informações e que o promp avance apenas se tiver algo escrito dentro dele

function whatsappNumber() {
    let customerName = prompt('Insira seu nome');
    while (customerName.trim() === "") {
        customerName = prompt('Insira seu nome');
    }
    let customerAddress = prompt('Insira seu endereço');
    while (customerAddress.trim() === "") {
        customerAddress = prompt('Insira seu endereço');
    }

    // Link do meu número de whatsApp e mensagem que puxa os dados do pedido (produtos, preço e preço total + informações inseridas no prompt)

    const whatsappNumberString = `
    Olá, gostaria de fazer o pedido:
    - Prato: ${selectedDish.name}
    - Bebida: ${selectedDrink.name}
    - Sobremesa: ${selectedDessert.name}
    Total: R$ ${totalPrice()}
    
    Nome: ${customerName}
    Endereço: ${customerAddress}
    `;

    const whatappLink = `https://wa.me/5531972633539?text=${encodeURIComponent(whatsappNumberString)}`

    window.open(whatappLink)
}
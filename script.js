let selectedDish;
let selectedDrink;
let selectedDessert;

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

function totalPrice() {
    let total = 0;
    const priceList = [selectedDish.price, selectedDrink.price, selectedDessert.price];

    priceList.forEach(price => total += Number(price.replace(',', '.')));

    return total.toFixed(2)
}

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

function whatsappNumber() {
    let customerName = prompt('Insira seu nome');
    while (customerName.trim() === "") {
    customerName = prompt('Insira seu nome');
}
    let customerAddress = prompt('Insira seu endereço');
    while (customerAddress.trim() === "") {
    customerAddress = prompt('Insira seu endereço');
}

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
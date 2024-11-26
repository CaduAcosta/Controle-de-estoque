// Recupera os dados armazenados no localStorage, ou um array vazio caso não haja
let productList = JSON.parse(localStorage.getItem('products')) || [];

const productNameInput = document.getElementById('productName');
const productQuantityInput = document.getElementById('productQuantity');
const productListElement = document.getElementById('productList');
const addButton = document.getElementById('addButton');
const removeButton = document.getElementById('removeButton');

// Função para atualizar a lista de produtos na interface
function updateProductList() {
    productListElement.innerHTML = '';
    productList.forEach((product, index) => {
        const li = document.createElement('li');
        li.textContent = `${product.name} - Quantidade: ${product.quantity}`;
        productListElement.appendChild(li);
    });
}

// Função para adicionar um produto
function addProduct() {
    const name = productNameInput.value.trim();
    const quantity = parseInt(productQuantityInput.value.trim());

    if (name && quantity > 0) {
        const existingProduct = productList.find(product => product.name === name);
        if (existingProduct) {
            existingProduct.quantity += quantity;  // Incrementa a quantidade se o produto já existir
        } else {
            productList.push({ name, quantity });
        }
        localStorage.setItem('products', JSON.stringify(productList)); // Salva no localStorage
        productNameInput.value = '';
        productQuantityInput.value = '';
        updateProductList();
    } else {
        alert('Preencha todos os campos corretamente!');
    }
}

// Função para remover um produto
function removeProduct() {
    const name = productNameInput.value.trim();
    const quantity = parseInt(productQuantityInput.value.trim());

    if (name && quantity > 0) {
        const productIndex = productList.findIndex(product => product.name === name);
        if (productIndex !== -1) {
            const product = productList[productIndex];
            if (product.quantity >= quantity) {
                product.quantity -= quantity;
                if (product.quantity === 0) {
                    productList.splice(productIndex, 1); 
                }
                localStorage.setItem('products', JSON.stringify(productList));
                productNameInput.value = '';
                productQuantityInput.value = '';
                updateProductList();
            } else {
                alert('Quantidade insuficiente!');
            }
        } else {
            alert('Produto não encontrado!');
        }
    } else {
        alert('Preencha todos os campos corretamente!');
    }
}

// Inicializa a lista de produtos ao carregar a página
updateProductList();

// Adiciona os eventos aos botões
addButton.addEventListener('click', addProduct);
removeButton.addEventListener('click', removeProduct);

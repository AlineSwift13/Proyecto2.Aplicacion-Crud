productName = document.getElementById("productName");
productPrice = document.getElementById("productPrice");
productDescription = document.getElementById("productDescription");


var allProducts; 

var theRow = '';

if (localStorage.getItem("productsList") == null) {
    allProducts = [];

} else {
    allProducts = JSON.parse(localStorage.getItem("productsList"));

    displayProducts();
}

function mainBtnBehavior() {
    if (mainBtn.innerHTML == "Agregar") {
    addProduct();
    }
    else if (mainBtn.innerHTML == "Editar") {
    Editar(theRow);
    }
    else {
        alert("no function set")
    }
}



function addProduct() {

    if (notEmpty() == true) {

        var product = {
            name: productName.value,
            price: productPrice.value,
            description: productDescription.value
        };
     

        allProducts.push(product);
        
        localStorage.setItem("productsList", JSON.stringify(allProducts));



        displayProducts()

        clearForm();

    } else {
        alert("¡Llenar todos los campos antes de Guardar!");
    }

}


function clearForm() {
    productName.value = "";
    productPrice.value = "";
    productDescription.value = "";
}



function displayProducts() {
    var productRow = ``;

    for (i = 0; i < allProducts.length; i++){

        productRow += `
            <tr>
                <td> ${i} </td>
                <td> ${allProducts[i].name} </td>
                <td> ${allProducts[i].price} </td>
                <td> ${allProducts[i].description} </td>
                <td> <button onclick="setFormForEditar(${i})"><i class="fa-regular fa-pen-to-square"></i> Editar </button> </td>
                <td> <button onclick="EliminarProduct(${i})" ><i class="fa-solid fa-trash"></i> Eliminar </button> </td>
            </tr>`;

    }

    document.getElementById("tableBody").innerHTML = productRow;

}


function notEmpty() {
    if (productName.value != "" && productPrice != "" && productDescription != "") {
        return true;
    } else {
        return false;
    }
}


function EliminarProduct(index) {

    allProducts.splice(index, 1);

    localStorage.setItem("productsList", JSON.stringify(allProducts));

    displayProducts();
}


function searchProduct(searchTerm) {

    var searchedProduct = ``;

    for (i = 0; i < allProducts.length; i++){
        if (allProducts[i].name.toLowerCase().includes(searchTerm.toLowerCase()) == true) {
            searchedProduct += `
            <tr>
                <td> ${i} </td>
                <td> ${allProducts[i].name} </td>
                <td> ${allProducts[i].price} </td>
                <td> ${allProducts[i].description} </td>
                <td> <button> Editar </button> </td>
                <td> <button onclick="EliminarProduct(${i})" > Eliminar </button> </td>
            </tr>`;

        }
    }

    document.getElementById("tableBody").innerHTML = searchedProduct;


}


var mainBtn = document.getElementById("mainBtn");

function setFormForEditar(productIndex) {
    productName.value = allProducts[productIndex].name;
    productPrice.value = allProducts[productIndex].price;
    productDescription.value = allProducts[productIndex].description;
    theRow = productIndex;
    mainBtn.innerHTML = "Editar";

}


function Editar(productIndex) {

    allProducts[productIndex].name = productName.value;
    allProducts[productIndex].price = productPrice.value;
    allProducts[productIndex].description = productDescription.value;

    mainBtn.innerHTML = "Agregar";

    localStorage.setItem("productsList", JSON.stringify(allProducts));

    displayProducts()

    clearForm();

}

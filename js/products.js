async function loadData() {
    let response = await sendRequest("product/all", "GET", "");
    let table = document.getElementById("products-table");
    table.innerHTML = "";
    let data = await response.json();
    data.data.forEach((element, index) => {
        table.innerHTML += `
                <tr>
                    <th>${element.id}</th>
                    <td>${element.name}</td>
                    <td>${element.price}</td>
                    <td>${element.createdAt}</td>
                    <td>${element.updateAt ?  element.updateAt : ""}</td>
                    <td>
                        <button type="button" class="btn btn-primary" onclick='window.location = "form_products.html?id=${element.id}"'>Editar</button>
                        <button type="button" class="btn btn-danger" onclick='deleteProducto(${element.id})'>Eliminar</button>
                    </td>
                </tr>

                `;
    });
    if (!response.ok) {
        table.innerHTML = `
    <tr>
        <td colspan="6">Error al recuperar los datos.</td>
    </tr>
`;
    }
}

async function loadProducto(idProducto) {
    let response = await sendRequest("product/" + idProducto, "GET", "");
    let name = document.getElementById("product-name");
    let price = document.getElementById("product-price");
    let id = document.getElementById("product-id");

    let data = await response.json();
    let product = data.data
    id.value = product.id;
    name.value = product.name;
    price.value = product.price;
    
}

async function deleteProducto(idProducto) {
    let response = await sendRequest("product/" + idProducto + "/remove", "DELETE", "");
    if (response.ok) {
        loadData();
    }
}

async function saveProducto() {
    let name = document.getElementById("product-name").value;
    let sale = document.getElementById("product-price").value;
    let id = document.getElementById("product-id").value;
    let data = {
        id: id,
        name: name,
        price: sale,
    };
    let response = id
        ? await sendRequest("product/" + id, "PUT", data)
        : await sendRequest("product", "POST", data);

    if (response.ok) {
        window.location = "products.html";
    }

}

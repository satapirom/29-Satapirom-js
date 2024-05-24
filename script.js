let imageUpload = [];
let id = 0;



document.getElementById('form').addEventListener('submit', function (event) {
    event.preventDefault();

    const productName = document.getElementById('productName').value;
    const price = document.getElementById('price').value;
    const imageUrl = document.getElementById('imageUrl').value;
    const errorMesagePrice = document.getElementById('errorMesagePrice');
    const errorMesageImg = document.getElementById('errorMesageImg');

    if (isNaN(price) || price <= 0) {
        return errorMesagePrice.textContent = "Please enter a valid number"
    }
    if (!isImgUrl(imageUrl)) {
        return errorMesageImg.textContent = "Please upload files in .jpg, .png or .gif format only";
    }


    let newImageUpload = {
        id: ++id,
        product: productName,
        price: price,
        image: imageUrl,
        check: false
    }

    imageUpload.push(newImageUpload);
    displayProduct(newImageUpload);

    document.getElementById('form').reset()

})

function displayProduct(newImageUpload) {
    const productDashboard = document.getElementById('productDashboard');
    const ShowProduct = document.createElement('div');

    ShowProduct.className = " flex m-6"

    ShowProduct.innerHTML = `
    <input data-id="${newImageUpload.id}" onchange="productSelector(event)" type="checkbox" class="mr-6 w-[24px] ">
    <img src="${newImageUpload.image}" alt "" class="w-[150px] h-[150px] my-6 bg-cover bg-center">
    <div class="mx-6 content-center">
        <h2 class="text-xl font-semibold mb-2">${newImageUpload.product}</h2>
        <p class="text-lg">$ ${newImageUpload.price}</p>
    </div>
    `;
    productDashboard.appendChild(ShowProduct);

}

function productSelector(event) {
    const checkbox = event.target;
    const checkboxId = parseInt(checkbox.getAttribute("data-id"))
    const product = imageUpload.find((newImageUpload) => newImageUpload.id === checkboxId)

    if (checkbox.checked) {
        product.check = true

    }
    else {
        product.check = false
    }

}

document.getElementById('bntAddToCart').addEventListener("click", () => {
    cart = imageUpload.filter((product) => product.check)
    displayCart(cart)
})

function displayCart(item) {
    const cartDashboard = document.getElementById('cartDashboard');
    cartDashboard.innerHTML = ""
    item.forEach(cart => {

        const ShowProduct = document.createElement('div');

        ShowProduct.className = " flex m-6"

        ShowProduct.innerHTML = `
        <input data-id="${cart.id}" onchange="productSelector(event)" type="checkbox" class="mr-6 w-[24px] ">
        <img src="${cart.image}" alt "" class="w-[150px] h-[150px] my-6 bg-cover bg-center">
        <div class="mx-6 content-center">
        <h2 class="text-xl font-semibold mb-2">${cart.product}</h2>
        <p class="text-lg">$ ${cart.price}</p>
        </div>
        `;
        cartDashboard.appendChild(ShowProduct);
    });
}

function isImgUrl(imageURL) {
    try {
        const url = new URL(imageURL);
        return /\.(jpg|jpeg|png|gif)$/.test(url.pathname);
    } catch {
        return false;
    }
}





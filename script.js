let imageUpload = [];
let idCounter = 0;


document.getElementById('form').addEventListener('submit', function (event) {
    event.preventDefault();

    const productName = document.getElementById('productName').value;
    const price = document.getElementById('price').value;
    const imageUrl = document.getElementById('imageUrl').value;
    const errorMesagePrice = document.getElementById('errorMesagePrice');
    const errorMesageImg = document.getElementById('errorMesageImg');

    if(isNaN(price) || price <=0){
        return errorMesagePrice.textContent = "Please enter a valid number"
    }
    if(!imageUrl(image)){
        return errorMesageImg.textContent ="Please upload files in .jpg, .png or .gif format only"
    }

    let newImageUpload = {
        idCounter: idCounter++,
        product: productName,
        price: price,
        image: imageUrl
    }

    imageUpload.push(newImageUpload);
    displayProduct(newImageUpload);

    document.getElementById('form').reset()

})

function displayProduct(imageUpload) {
    const productDashboard = document.getElementById('productDashboard');
    const ShowProduct = document.createElement('div');

    ShowProduct.className = " flex m-6"

    ShowProduct.innerHTML = `
    <input type="checkbox" class="mr-6 w-[24px] ">
    <img src="${imageUpload.image}" alt "" class="w-[150px] h-[150px] my-6 bg-cover bg-center">
    <div class="mx-6 content-center">
        <h2 class="text-xl font-semibold mb-2">${imageUpload.product}</h2>
        <p class="text-lg">$ ${imageUpload.price}</p>
    </div>
    `;
    productDashboard.appendChild(ShowProduct);

}

function isImgUrl(imageURL) {
    try {
        const url = new URL(imageURL);
        return /\.(jpg|jpeg|png|gif)$/.test(url.pathname);
    } catch {
        return false;
    }
}





products = [
	{
	   "id": 1,
	   "image_front": "static/imgs_for_product/darkanjo_frente.png",
       "image_back": "static/imgs_for_product/darkanjo_costa.png",
       "url": "/tshirt-darkangel-white",
	   "name": "Camiseta Anjo Caído",
	   "price": "R$84.00",
	   "inventory": 4,
	   "productCode": "K203",
       "color": "white"
	},
	{
        "id": 2,
        "image_front": "static/imgs_for_product/anjo_frente.png",
        "image_back": "static/imgs_for_product/anjo_costa.png",
        "url": "/tshirt-darkangel",
        "name": "Camiseta Anjo",
        "price": "R$84.00",
        "inventory": 4,
        "productCode": "K203",
        "color": "black"
	},
	{
        "id": 3,
        "image_front": "static/imgs_for_product/girassolW_frente.png",
        "image_back": "static/imgs_for_product/girassolW_costa.png",
        "url": "/tshirt-girassol-white",
        "name": "Camiseta Girassol White",
        "price": "R$84.00",
        "inventory": 4,
        "productCode": "K203",
        "color": "white"
	},
	{
        "id": 4,
        "image_front": "static/imgs_for_product/girassolB_frente.png",
        "image_back": "static/imgs_for_product/girassolB_costa.png",
        "url": "/tshirt-girassol-black",
        "name": "Camiseta Girassol Black",
        "price": "R$84.00",
        "inventory": 4,
        "productCode": "K203",
        "color": "black"
	},
	{
        "id": 5,
        "image_front": "static/imgs_for_product/serafim_frente.png",
        "image_back": "static/imgs_for_product/serafim_costa.png",
        "url": "/tshirt-serafim-black",
        "name": "Camiseta Serafim",
        "price": "R$84.00",
        "inventory": 4,
        "productCode": "K203",
        "color": "black"
	},
	{
        "id": 6,
        "image_front": "static/imgs_for_product/querubim_frente.png",
        "image_back": "static/imgs_for_product/querubim_costa.png",
        "url": "/tshirt-querubim-black",
        "name": "Camiseta Querubim",
        "price": "R$84.00",
        "inventory": 4,
        "productCode": "K203",
        "color": "black"
	},
    {
        "id": 7,
        "image_front": "static/imgs_for_product/metraton_frente.png",
        "image_back": "static/imgs_for_product/metraton_costa.png",
        "url": "/tshirt-metraton-black",
        "name": "Camiseta Metraton",
        "price": "R$84.00",
        "inventory": 4,
        "productCode": "K203",
        "color": "black"
	},
    {
        "id": 8,
        "image_front": "static/imgs_for_product/arcanjo_frente.png",
        "image_back": "static/imgs_for_product/arcanjo_costa.png",
        "url": "/tshirt-arcanjo-black",
        "name": "Camiseta Arcanjo",
        "price": "R$84.00",
        "inventory": 4,
        "productCode": "K203",
        "color": "black"
	}
 ]


jsonFile = JSON.parse(JSON.stringify(products));

function products_all(){
    fetch(jsonFile)
    jsonFile.map((products) => {
        const { name, price, image_front, image_back, url, color } = products;
        document.getElementsByClassName("container-p")[0].innerHTML += `
        <div id="produtos">
            <a class="produto" href="${url}">
                <img src="${image_front}" class="img_hover">
                <img src="${image_back}">
                <div class="title">
                    <p class="tl">${name}&nbsp</p>
                    <p class="color">${color}</p>
                </div>
                <span class="price">${price}</span>
                <hr id="lv">
            </a>
        </div>
    `;

    })
}
function products_white(){
    fetch(jsonFile)
    jsonFile.map((products) => {
        const { name, price, image_front, image_back, url, color } = products;
        if(color == "white"){
            document.getElementsByClassName("container-p")[0].innerHTML += `
            <div id="produtos">
                <a class="produto" href="${url}">
                    <img src="${image_front}" class="img_hover">
                    <img src="${image_back}">
                    <div class="title">
                        <p class="tl">${name}&nbsp</p>
                        <p class="color">${color}</p>
                    </div>
                    <span class="price">${price}</span>
                    <hr id="lv">
                </a>
            </div>
        `;
        }
})
}

function products_black(){
    fetch(jsonFile)
    jsonFile.map((products) => {
        const { name, price, image_front, image_back, url, color } = products;
        if(color == "black"){
            document.getElementsByClassName("container-p")[0].innerHTML += `
            <div id="produtos">
                <a class="produto" href="${url}">
                    <img src="${image_front}" class="img_hover">
                    <img src="${image_back}">
                    <div class="title">
                        <p class="tl">${name}&nbsp</p>
                        <p class="color">${color}</p>
                    </div>
                    <span class="price">${price}</span>
                    <hr id="lv">
                </a>
            </div>
        `;
        }
})
}

// ------------
function products_vertical(){
    fetch(jsonFile)
    jsonFile.map((products) => {
        const { name, price, image_front, image_back, url, color } = products;
        if(color == "white"){
            document.getElementsByClassName("container-view")[0].innerHTML += `
            <div id="produtos">
                <a class="produto-view" href="${url}">
                    <img src="${image_front}" class="img_hover">
                    <img src="${image_back}">
                    <div class="title">
                        <p class="tl">${name}&nbsp</p>
                        <p class="color">${color}</p>
                    </div>
                    <span class="price">${price}</span>
                    <hr id="lv">
                </a>
            </div>
        `;
        }
})
}
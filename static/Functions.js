
const box = JSON.parse(localStorage.getItem('cart'));
document.getElementById("count").innerHTML = box.length

// ----------------- html all
// function login_menu(){
//     angel = sessionStorage.getItem("data");
//     if (angel != null){
//         document.getElementById("nome").innerHTML =`<p id='nome'>Olá, &nbsp${angel}</p>`.replace(/"/g, '')
//         document.getElementsByClassName('mn')[0].innerHTML=
//         `<div>
//             <a href="/myperfil" class="mn">Meu perfil</a>
//             <a href="/myperfil" class="mn">Meus pedidos</a>
//             <a href="/" class="mn" onclick="clear_session()">Sair</a>
//         </div>` 
// }
// }


function insertbutton(){
    if (JSON.parse(localStorage.getItem('cart')) != ''){
        tbody = document.getElementsByClassName("cart_menu")[0]
        div = document.createElement("div")
        insert_element =`<div class="total"><p>Subtotal: </p><p id="subtotal"></p></div><div class="total"><a href="/cart" class="finally_button">FINALIZAR COMPRA</a></div>`
        div.innerHTML = insert_element
        tbody.append(div)
    }
}

function clear_session(){
    sessionStorage.clear()
}

function hover_cart(){
    document.getElementsByClassName("cart_menu")[0].style.display = "block"
    document.getElementsByClassName("total_amount")[0].style.display = "block"
}
function hover_out_cart(){
    document.getElementsByClassName("cart_menu")[0].style.display = "none"
    document.getElementsByClassName("total_amount")[0].style.display = "none"
    
}
// ---------------- html view
function AddToCarItem(){
    let car = []
    storage = JSON.parse(localStorage.getItem('cart'))
    title = document.getElementsByClassName("title")[0].innerHTML
    price = document.getElementsByClassName("amount")[0].innerHTML
    img = document.getElementsByClassName("img_p")[0].src;
    img_s = img.slice(21,60)
    // console.log(img_s)

    const radioButtons = document.querySelectorAll('input[name="ra"]');
    for (const radioButton of radioButtons) {
        if (radioButton.checked){
            selectedSize = radioButton.value;
            document.getElementsByClassName("avisos")[0].style.display="none";
            document.getElementsByClassName("opacity")[0].style.display="block"
            const tbody = document.getElementsByClassName("cart_menu")[0]
            tbody.style.display = 'grid'
            div = document.createElement("div")  
            
            insert_element =`
                    <div class="avisos">
                        <svg class="pos" viewBox="0 0 20 20">
                            <path d="M7.629,14.566c0.125,0.125,0.291,0.188,0.456,0.188c0.164,0,0.329-0.062,0.456-0.188l8.219-8.221c0.252-0.252,0.252-0.659,0-0.911c-0.252-0.252-0.659-0.252-0.911,0l-7.764,7.763L4.152,9.267c-0.252-0.251-0.66-0.251-0.911,0c-0.252,0.252-0.252,0.66,0,0.911L7.629,14.566z"></path>
                        </svg>
                        <span id="pos">Item adicionado ao carrinho</span>
                    </div>
                    <div class="image-box">
                        <img id="img-menu" src="${img}.jpg" width="30" height="30"/>
                    </div>
                    <div class="about">
                        <h1 class="title_box_cart">${title}</h1>
                        <h1 id="size-menu">tamanho:${selectedSize}</h1>
                    </div>
                    <div class="prices">
                        <div class="amount-menu" id="RS">${price}</div>
                    </div>
                    <div class="box_botton">   
                        <a href="/cart" class="button">Ver Carrinho</a>
                    </div>
                    `
            tbody.innerHTML = insert_element
        }
        else{
            document.getElementsByClassName("avisos")[0].style.display="flex";
        }}
    const newItem = {
        title: title,
        image: img_s,
        size: selectedSize,
        price: price,
        quant: 1
    }
    car.push(newItem) 

    if(storage == null){
        localStorage.setItem('cart', JSON.stringify(car))
    }

    alf = storage.concat(car);
    localStorage.setItem('cart', JSON.stringify(alf))

    for(let i = 0; i < storage.length; i++){
        if(storage[i].size === newItem.size && storage[i].title === newItem.title){
            storage[i].quant ++
            localStorage.setItem('cart', JSON.stringify(storage))
        }}
    


    
    document.getElementById("count").innerHTML = storage.length
    setTimeout(time_cart_menu, 3500);
}
            
         

function time_cart_menu(){
    document.getElementsByClassName("opacity")[0].style.display="none"
    document.getElementsByClassName("cart_menu")[0].style.display="none"
    window.location.reload(true);
}
function renderCar(){
    const box = JSON.parse(localStorage.getItem('cart'));
    const tbody = document.getElementsByClassName("cart_menu")[0]
    document.getElementById("count").innerHTML = box.length
    box.map(item => {
        div = document.createElement("div")   
        div.classList.add('itemCar')
        insert_element =`
            <div class="Cart-Items" id="cart">
                <div class="image-box">
                    <img id="img-r" src="${item.image}e.png" width="30" height="30"/>
                </div>
                <div class="about">
                    <h1 class="title_box_cart">${item.title}</h1>
                    <h1 id="size" class="sizee">tamanho:${item.size}</h1>
                </div>
                <div class="prices">
                    <div class="amount" id="RS">${item.price}</div>
                    <div><u class="remove">Remover</u></div>
                </div>
            `
    
        div.innerHTML = insert_element
        tbody.append(div)

        div.querySelector(".remove").addEventListener('click', removeCarItem)
    })
}

function addLocalStorage(){
    storage = JSON.parse(localStorage.getItem('cart'))
    if(storage == null){
        localStorage.setItem('cart', JSON.stringify(car))
    }
    else{
        alf = storage.concat(car);
        localStorage.setItem('cart', JSON.stringify(alf))
    }
    window.location.reload(true);
}


//-------------------- html search_product
function select_white(){
    document.getElementsByClassName("container-p")[0].innerText = "";
    document.getElementById('black').disabled = false;
    let checkbox = document.getElementById('white');
    if(checkbox.checked) {
        document.getElementById('black').checked = false;
        document.getElementById('white').disabled = true;
        products_white()
    }

}
function select_black(){
    document.getElementsByClassName("container-p")[0].innerText = "";
    document.getElementById('white').disabled = false;
    let checkbox = document.getElementById('black');
    if(checkbox.checked){
        document.getElementById('white').checked = false;
        document.getElementById('black').disabled = true;
        products_black()
    }
}



// ------------------  html cart
function cart(){
    const storage = JSON.parse(localStorage.getItem('cart'));
    const tbody = document.getElementsByClassName("container_cart")[0]

    if (storage == null){
        document.getElementsByClassName("text_total")[0].innerHTML= ""
        document.getElementsByClassName("button")[0].style.display = 'none'
    }

    if (storage.length == 0){
        document.getElementsByClassName("text_total")[0].innerHTML= ""
        document.getElementsByClassName("button")[0].style.display = 'none'
    }
    else{
        document.getElementById("on").style.display = 'none'
        storage.map(item => {
            div = document.createElement("div")   
            div.classList.add('itemCar')
            insert_element =`
            <div class="Cart-Items" id="cart">
                <div class="image-box">
                    <img id="img-r" src="${item.image}" width="40" height="40"/>
                </div>
                <div class="about">
                    <h1 class="title_box_cart">${item.title}</h1>
                    <h1 id="size" class="sizee">tamanho:${item.size}</h1>
                </div>
                <div class="counter">
                    <button onclick="this.parentNode.querySelector('input[type=number]')" class="minus">-</button>
                    <input type='number' min='1' class="count" disabled value=${item.quant}>
                    <button onclick="this.parentNode.querySelector('input[type=number]')" class="plus">+</button>
                </div>
                <div class="prices">
                    <div class="amount" id="RS">${item.price}</div>
                    <div class="remove"><u>Remover</u></div>
                </div>
            </div>
            <div class="total_amount"></div>`
            div.innerHTML = insert_element
            tbody.append(div)

            div.querySelector(".remove").addEventListener('click', removeCarItem)
            div.querySelector(".minus").addEventListener('click', modQuantSub)
            div.querySelector(".plus").addEventListener('click', modQuantAdd)
            CarTotal()
        })
    }
}   
function modQuantSub(e) {
    let storage = JSON.parse(localStorage.getItem('cart')) || []; // Garantir que storage não seja null
    const modInput = e.target;

    const div = modInput.closest(".itemCar");
    const title = div.querySelector('.title_box_cart').textContent;
    const size = div.querySelector('.sizee').textContent.replace('tamanho:', '').trim();

    let updatedCart = storage.map(item => {
        if (item.title === title && item.size === size) {
            if (item.quant > 1) {
                item.quant--; // Diminui a quantidade se for maior que 1
            }
        }
        return item;
    });

    localStorage.setItem('cart', JSON.stringify(updatedCart)); // Atualiza o localStorage

    let countInput = div.querySelector('.count');
    if (countInput.value > 1) {
        countInput.value--; // Atualiza o input diretamente no HTML
    }

    CarTotal(); // Atualiza o total do carrinho
}

function modQuantAdd(e) {
    let storage = JSON.parse(localStorage.getItem('cart')) || []; // Garantir que storage não seja null
    const modInput = e.target;

    const div = modInput.closest(".itemCar");
    const title = div.querySelector('.title_box_cart').textContent;
    const size = div.querySelector('.sizee').textContent.replace('tamanho:', '').trim();

    let updatedCart = storage.map(item => {
        if (item.title === title && item.size === size) {
            item.quant++; // Aumenta a quantidade do item
        }
        return item;
    });

    localStorage.setItem('cart', JSON.stringify(updatedCart)); // Atualiza o localStorage

    div.querySelector('.count').value++; // Atualiza o input diretamente

    CarTotal(); // Atualiza o total do carrinho
}


function CarTotal(){
    let total = 0;
    storage = JSON.parse(localStorage.getItem('cart'))
    const itemCarTotal = document.getElementById("subtotal")
    if (itemCarTotal != null){
        storage.forEach((item) => {
            price = item.price.replace("R$", '').replace(",", '.')
            total = total + price*item.quant

        })
    
    itemCarTotal.innerHTML = `R$${total}`.replace(".", ',')
    }     
}
        
function removeCarItem(e){
    const box = JSON.parse(localStorage.getItem('cart'));
    const buttonDelete = e.target 
    const div = buttonDelete.closest(".itemCar")
    const title = div.querySelector('.title_box_cart').textContent;
    const size = div.querySelector('.sizee').textContent;
    sizee = size.replace('tamanho:', '')
    for(let i=0; i<box.length; i++){
        if(box[i].title === title && box[i].size === sizee){
            box.splice(i, 1)
            div.remove()
        }
    }
    localStorage.setItem('cart', JSON.stringify(box))
    window.location.reload(true);
}
// ----------- media
function media_logo(x){
    if (document.getElementsByClassName('logo_btn')[0] == null){
        if (x.matches){
        div = document.createElement("div")
        media = document.getElementById("media")
        insert_element_1 =
            `<div class="logo_btn">
                <a href="/"><img id="logo"src="{{ url_for('static', filename='asalogob.png') }}"></a>
            </div>`
        div.innerHTML = insert_element_1
        media.append(div)
        }
    }
    }
    const mmObj = window.matchMedia("(max-width: 800px)")
    myFunction(mmObj);
    mmObj.addListener(myFunction);

// =================== logout
var clickCounter = 0;
function check(){
    clickCounter++;
    if (clickCounter == 1){
    document.getElementsByClassName("progress-bar")[0].style.display="none";
    }
    if (clickCounter == 2) {
        document.getElementsByClassName("progress-bar")[0].style.display="flex";
        clickCounter = 0;
    }
   
}

for (let element of document.getElementsByClassName("block")){
    element.readOnly = true;
}
function desblock(){
    for (let element of document.getElementsByClassName("block")){
        element.style.border="1px solid black"
        element.readOnly = false;
    }
    document.getElementById("label_block").style.display="none";
    document.getElementById("bt_block").style.display="block";
}

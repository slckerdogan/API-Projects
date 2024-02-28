const cartBtn = document.querySelector(".cart-btn");
const clearCartBtn = document.querySelector(".btn-clear");
const cartItems = document.querySelector(".cart-items");
const cartTotal = document.querySelector(".total-value");
const cartContent = document.querySelector(".cart-list");
const productsDOM = document.querySelector("#products-dom");

let buttonsDOM=[];
let cart=[];

//?ÜÇ SINIF VAR. Birinicisi apiyle iletişim kurduğumuz ürünler sınıfı, ikincisi apiden aldığımızdan verileri sitede görüntülediğimiz alan, üçüncüsüyse local storageda verileri kaydetmemizi sağlayan sınıf

class Products{
    async getProducts(){
        try{
            let result= await fetch("https://65ad34c1adbd5aa31be05964.mockapi.io/products"); //*verileri çektik
            let data=await result.json(); //*verileri aktardık
            let products=data;  //*verileri tuttuk
            return products; //*verileri başka yerlerde kullanabilmek adına döndürdük
        }
        catch(error){
            console.log(error);
        }
    }
}

class UI{
    displayProducts(products){ //*apiyle aldığımız ürünleri buraya parametre olarak aktarıp, forEach ile her bir parametreyi oluşturduğumuz değişken aracılığıyla ürünler listesinin olduğu alana aktardık
        let result="";
        products.forEach(item => {
            result+=
            `
            <div class="col-lg-4 col-md-6">
                    <div class="product">
                        <div class="product-image">
                            <img src="${item.image}" alt="product">
                        </div>
                        <div class="product-hover">
                            <span class="product-title">${item.title}</span>
                            <span class="product-price">${item.price}$</span>
                            <button class="btn-add-to-cart" data-id=${item.id}>
                                <i class="fas fa-cart-shopping"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `
        });
        productsDOM.innerHTML=result;
        // https://mockapi.io/projects/65ad34c1adbd5aa31be05965 linke git ürünler için
    }

    getBagButtons(){
        const buttons=[...document.querySelectorAll(".btn-add-to-cart")];
        buttonsDOM=buttons;
        buttons.forEach(button=>{
            let id=button.dataset.id;  //ürünlerin buton id'lerine ulaştık
            let inCart=cart.find(item=>item.id===id);
            if(inCart){
                button.setAttribute("disabled","disabled");
                button.style.opacity=".3";
            }
            else{
                button.addEventListener("click",event=>{
                    event.target.disabled=true;
                    event.target.style.opacity = ".3";

                    //* get product from products
                    let cartItem = { ...Storage.getProduct(id), amount: 1 };
                    //* add procuct to the cart
                    cart = [...cart, cartItem];
                    //* save cart in local storage
                    Storage.saveCart(cart);
                    //* save cart values
                    this.saveCartValues(cart);
                    //* display cart item
                    this.addCartItem(cartItem)
                    //* show the cart
                    this.showCart();
                })
            }
        })
    }

    saveCartValues(cart) { //*eklenen kartları alışveriş listesine eklerken toplam fiyat bilgisini kullanıcıya göstermek için tuttuk
        let tempTotal = 0;
        let itemsTotal = 0;
        cart.map(item => {
            tempTotal += item.price * item.amount;
            itemsTotal += item.amount;
        });

        cartTotal.innerText = parseFloat(tempTotal.toFixed(2));
        cartItems.innerText = itemsTotal;
    }

    addCartItem(item) { //*eklenen kartları sepet kısmında ürün adedi, fiyat bilgisi ve adıyla göstermek için tuttuk
        const li = document.createElement("li");
        li.classList.add("cart-list-item");
        li.innerHTML = `
            <div class="cart-left">
                <div class="cart-left-image">
                    <img src="${item.image}" alt="product" class="img-fluid" />
                </div>
                <div class="cart-left-info">
                    <a class="cart-left-info-title" href="#">${item.title}</a>
                    <span class="cart-left-info-price">$ ${item.price}</span>
                </div>
            </div>
            <div class="cart-right">
                <div class="cart-right-quantity">
                    <button class="quantity-minus" data-id=${item.id}>
                        <i class="fas fa-minus"></i>
                    </button>
                    <span class="quantity">${item.amount}</span>
                    <button class="quantity-plus" data-id=${item.id}>
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
                <div class="cart-right-remove">
                    <button class="cart-remove-btn" data-id=${item.id}>
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
        cartContent.appendChild(li);
    }

    showCart() { //*alışveriş listesine eklenen kartları kullanıcıya gösterdik
        cartBtn.click();
    }

    setupAPP(){
        cart=Storage.getCart(); //*alışveriş sepetine aktarıldıktan sonra orada ve haliyle storageda bulunan o anki ürünü getireceğiz
        this.saveCartValues(cart);
        this.populateCart(cart);
    }

    populateCart(cart){
        cart.forEach(item=>this.addCartItem(item));
    }

    cartLogic(){
        clearCartBtn.addEventListener("click",()=>{
            this.clearCart();
        })

        cartContent.addEventListener("click", event => {  //* alışveriş sepetinde bulunan ürünü siler,artırır veya azaltır
            if (event.target.classList.contains("cart-remove-btn")) {
                let removeItem = event.target;
                let id = removeItem.dataset.id;
                removeItem.parentElement.parentElement.parentElement.remove();
                this.removeItem(id);
            } else if (event.target.classList.contains("quantity-minus")) {
                let lowerAmount = event.target;
                let id = lowerAmount.dataset.id;
                let tempItem = cart.find(item => item.id === id);
                tempItem.amount = tempItem.amount - 1;
                if (tempItem.amount > 0) {
                    Storage.saveCart(cart);
                    this.saveCartValues(cart);
                    lowerAmount.nextElementSibling.innerText = tempItem.amount;
                } else {
                    lowerAmount.parentElement.parentElement.parentElement.remove();
                    this.removeItem(id);
                }
            } else if (event.target.classList.contains("quantity-plus")) {
                let addAmount = event.target;
                let id = addAmount.dataset.id;
                let tempItem = cart.find(item => item.id === id);
                tempItem.amount = tempItem.amount + 1;
                Storage.saveCart(cart);
                this.saveCartValues(cart);
                addAmount.previousElementSibling.innerText = tempItem.amount;
            }
        })
    }

    clearCart(){  //*clear butonu
        let cartItems=cart.map(item=>item.id);
        cartItems.forEach(id=>this.removeItem(id));
        while (cartContent.children.length > 0) {
            cartContent.removeChild(cartContent.children[0])
        }
    }

    removeItem(id){
        cart=cart.filter(item=>item.id !==id);
        this.saveCartValues(cart);
        Storage.saveCart(cart);
        let button = this.getSinleButton(id);
        button.disabled = false;
        button.style.opacity = "1";
    }

    getSinleButton(id) {
        return buttonsDOM.find(button => button.dataset.id === id);
    }

}

class Storage{
    static saveProducts(products) {
        localStorage.setItem("products", JSON.stringify(products));
    }

    static getProduct(id) {
        let products = JSON.parse(localStorage.getItem("products"));
        return products.find(product => product.id === id);
    }

    static saveCart(cart) {
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    static getCart() {
        return localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];
    }

    static getCart(){
        return localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart"))  : [];
    }
}

document.addEventListener("DOMContentLoaded",()=>{
    const ui=new UI(); //*kullanıcı arayüzü sınıfı için nesne oluşturduk

    const products = new Products();  //*ürünler sınıfı için nesne oluşturduk

    ui.setupAPP();

    products.getProducts().then(products=>{
        ui.displayProducts(products);
        Storage.saveProducts(products); //*storage'a verileri aktardık ürün listemiz kayıtlı olsun diye shopping sitemiz açılır açılmaz
    }).then(()=>{
        ui.getBagButtons();
        ui.cartLogic();
    });

//*oluşturduğumuz ürünler sınıfı nesnesiyle ilk önce ürünlerin listesini çektik, ardından çektiğimiz bu ürün listesini kullanıcı arayüzüne göstermek için her birini ui nesnesindeki displayProducts(); fonksiyonuna parametre olarak gönderdik. ui nesnesine gönderilme sebebiyse, apiden aldığımızdan verileri sitede görüntülediğimiz alana hitap eden sınıftan oluşan nesne olmasındandır. Akabindeyse her ürün butonlarını aktifleştirebilsin diye, ui nesnesindeki getBagButtons(); fonksiyonunu ürün listesi ekranda gözüktükten sonra devreye sokarakk butonları işler hale getirdik.

});
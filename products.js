//* Fetch Address Functionality
let userLocation = document.getElementById("location");
userLocation.addEventListener("click",()=>{
    userLocation.innerHTML = "Fetching Location..";
    navigator.geolocation.getCurrentPosition((position)=>{
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        let locationApi = ` https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=jsonv2 `;
        let fetchingArea = async() => {
            let respose = await fetch(locationApi)
            let{address:{suburb,city}} = await respose.json()
            userLocation.innerHTML = `<i class="fa-solid fa-location-dot"></i> ${suburb} ${city}`
        }
        fetchingArea();
    })
})

//* Displaying All Products
let allProducts = []
async function displayingProducts() {
  let response = await fetch("https://dummyjson.com/products?limit=194")
  let { products } = await response.json()
  allProducts = products
  renderProducts(allProducts)
  let searchBar = document.querySelector("#products-section-1>input")
  searchBar.addEventListener("input", (e) => {
    let searchValue = e.target.value.trim().toLowerCase()
    let filteredProducts = allProducts.filter((item) => {
      return item.title.trim().toLowerCase().includes(searchValue)
    })
    renderProducts(filteredProducts)
  })
}
displayingProducts()

function renderProducts(products) {
  let productsSection = document.getElementById("products-section-2")
  productsSection.innerHTML=""
  products.forEach((item) => {
    let finalPrice = Math.ceil(item.price - (item.price * item.discountPercentage / 100))
    let quantity = getProductQuantity(item.id)
    productsSection.innerHTML += `
    <article class="product-cards">
        <div class="product-card-one">
          <p class="discount-percentage">${item.discountPercentage}% Off</p>
          <img src=${item.thumbnail} alt=${item.title}>
          <p class="wishlist"><i class="fa-solid fa-heart"></i></p>
        </div>
        <div class="product-card-two">
          <p class="delivery-time">⚡ ${Math.floor(Math.random() * (10 - 5 + 1)) + 5}Mins</p>
          <p class="product-title">${item.title}</p>
          <p class="product-brand">${item.brand || "Imported"}</p>
          <div class="product-price">
            <p class="discount-price">$${finalPrice}</p>
            <p class="actual-price">$${item.price}</p>
            ${quantity == 0}` ? `<button class="addBtn" data-id=${item.id} data-title=${item.title} data-price = ${finalPrice} data-img=${item.thumbnail}>Add</button>`
            : `
              <div class="addBtnQtyContainer">
                <button class="decrementBtn" data-id=${item.id}>-</button>
                <span>${quantity}</span>
                <button class="incrementBtn" data-id=${item.id}>+</button>
              </div>            `
         `
          </div>
          <p class="ratings"><i class="fa-solid fa-star"></i> ${item.rating} (${item.stock})</p>
        </div>
      </article>
    `
  })
  wishlistIcons()
}

//* Wishlist
function wishlistIcons() {
  let wishListIcons = document.querySelectorAll(".wishlist>i")
  wishListIcons.forEach((item) => {
    console.log(item)
    item.addEventListener("click", () => {
      item.classList.toggle("clicked")
    })
  })
}

//* Add Button Events
function addButtonEvents(){
  let addBtn = document.querySelectorAll(".addBtn")
  addBtn.forEach(btn => {
    console.dir(btn)
    btn.addEventListener("click",() =>{
      let product = {
        id:btn.dataset.id,
        title:btn.dataset.title,
        price:Number(btn.dataset.price),
        img:btn.dataset.img
      }
      addToCart(product)
      renderProducts(allProducts)
    })
  })
}
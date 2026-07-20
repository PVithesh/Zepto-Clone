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

//* Fetching Categories
// let fetchCategories = async()=>{
//     let respose = await fetch("https://dummyjson.com/products/categories");
//     let categories = await respose.json();
//     console.log(categories);
//     let categoryItem = document.getElementById("category-items");
//     categories.forEach((category)=>{
//         categoryItem.innerHTML += `
//         <div class="category-card">
//                 <div class="category-img">🤍</div>
//                 <p class="category-name">${category.name}</p>
//         </div>`        
//     })
// }
// fetchCategories();

// //* Fetch Categories and their Thumbnail Images

// let fetchCategories = async () => {
//     //^ Fetch Categories
//     let categoryResponse = await fetch("https://dummyjson.com/products/categories");
//     let categories = await categoryResponse.json();
//     //^ Fetch All Products
//     let productResponse = await fetch("https://dummyjson.com/products?limit=0");
//     let productData = await productResponse.json();
//     let categoryItems = document.getElementById("category-items");
//     categories.forEach((category) => {
//         //^ Find the first product of this category
//         let product = productData.products.find(
//             (p) => p.category === category.slug
//         );
//         categoryItems.innerHTML += `
//             <div class="category-card" >
//                 <img src="${product.thumbnail}" alt="${category.slug}" class="category-img">
//                 <p class="category-name">${category.name}</p>
//             </div>
//         `;
//     });
// };
// fetchCategories();

// //* Individual Category
// let categoryCards = document.querySelectorAll(".category-card")
// console.log(categoryCards)

// categoryCards.forEach((card) =>{
//     console.log(card)
//     card.addEventListener("click", ()=>{
//         let categoryName = card.querySelector("img").alt;
//         console.log(categoryName)
//         sessionStorage.setItem("clickedCategory",categoryName);
//         fetchingIndidualCategoryData();
//     })
// })

// async function fetchingIndidualCategoryData() {
//     let categoryName = sessionStorage.getItem("clickedCategory");
//     let respose = await fetch(`https://dummyjson.com/products/category/${categoryName}`);
//     let {products} = await respose.json()
//     localStorage.setItem("clickedCategoryData",JSON.stringify(products))
// }


//* Fetch Categories and their Thumbnail Images

let fetchCategories = async () => {
    //^ Fetch Categories
    let categoryResponse = await fetch("https://dummyjson.com/products/categories");
    let categories = await categoryResponse.json();

    //^ Fetch All Products
    let productResponse = await fetch("https://dummyjson.com/products?limit=0");
    let productData = await productResponse.json();
    let categoryItems = document.getElementById("category-items");
    categories.forEach((category) => {

        //^ Find the first product of this category
        let product = productData.products.find(
            (p) => p.category === category.slug
        );
        categoryItems.innerHTML += `
            <div class="category-card">
                <img src="${product.thumbnail}" alt="${category.slug}" class="category-img">
                <p class="category-name">${category.name}</p>
            </div>
        `;
    });
    //* Individual Category Cards
    let categoryCards = document.querySelectorAll(".category-card");
    console.log(categoryCards);
    categoryCards.forEach((card) => {
        card.addEventListener("click", () => {
            let categoryName = card.querySelector("img").alt;
            console.log(categoryName);
            sessionStorage.setItem("clickedCategory", categoryName);
            fetchingIndidualCategoryData();
        });
    });
};
fetchCategories();


//* Individual Category

async function fetchingIndidualCategoryData() {
    let categoryName = sessionStorage.getItem("clickedCategory");
    let response = await fetch(`https://dummyjson.com/products/category/${categoryName}`);
    let {products} = await response.json();
    console.log(products);
    localStorage.setItem("clickedCategoryData", JSON.stringify(products));
}
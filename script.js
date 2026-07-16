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
let fetchCategories = async()=>{
    let respose = await fetch("https://dummyjson.com/products/categories");
    let categories = await respose.json();
    console.log(categories);
    let categoryItem = document.getElementById("category-items");
    categories.forEach((category)=>{
        categoryItem.innerHTML += `
        <div class="category-card">
                <div class="category-img">🤍</div>
                <p class="category-name">${category.name}</p>
        </div>`        
    })
}
fetchCategories();
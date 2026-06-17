document.addEventListener("DOMContentLoaded",()=>{
  setupInitialCategory();
  setupShopFilters();
  applyFilters();
});

const grid=document.getElementById("shopProducts");
const count=document.getElementById("productCount");
const search=document.getElementById("shopSearch");
const sort=document.getElementById("sortProducts");
const filters=document.querySelectorAll(".shop-filter");

let activeCategory="all";

function setupInitialCategory(){
  const params=new URLSearchParams(window.location.search);
  const category=params.get("category");

  if(category){
    activeCategory=category;

    filters.forEach(btn=>{
      btn.classList.toggle(
        "active",
        btn.dataset.category===activeCategory
      );
    });
  }
}

function renderShopProducts(list){
  if(!grid) return;

  grid.innerHTML=list.map(product=>`
    <article class="product-card">

      <button class="wishlist-btn" data-id="${product.id}">
        ♡
      </button>

      <a href="product.html?id=${product.id}" class="product-image">
        <img src="${product.image}" alt="${product.name}">
      </a>

      <div class="product-content">

        <span class="product-category">
          ${formatCategory(product.category)}
        </span>

        <h3 class="product-name">
          <a href="product.html?id=${product.id}">
            ${product.name}
          </a>
        </h3>

        <p class="product-price">
          ₹${product.price.toLocaleString("en-IN")}
        </p>

        <a href="product.html?id=${product.id}" class="add-cart-btn">
          View Details
        </a>

      </div>

    </article>
  `).join("");

  count.textContent=`Showing ${list.length} products`;
}

function setupShopFilters(){
  filters.forEach(btn=>{
    btn.addEventListener("click",()=>{
      filters.forEach(item=>item.classList.remove("active"));
      btn.classList.add("active");
      activeCategory=btn.dataset.category;
      applyFilters();
    });
  });

  search.addEventListener("input",applyFilters);
  sort.addEventListener("change",applyFilters);
}

function applyFilters(){
  let filtered=[...products];

  if(activeCategory!=="all"){
    filtered=filtered.filter(product=>product.category===activeCategory);
  }

  const keyword=search.value.toLowerCase().trim();

  if(keyword){
    filtered=filtered.filter(product=>
      product.name.toLowerCase().includes(keyword) ||
      product.category.toLowerCase().includes(keyword)
    );
  }

  if(sort.value==="low-high"){
    filtered.sort((a,b)=>a.price-b.price);
  }

  if(sort.value==="high-low"){
    filtered.sort((a,b)=>b.price-a.price);
  }

  if(sort.value==="name"){
    filtered.sort((a,b)=>a.name.localeCompare(b.name));
  }

  renderShopProducts(filtered);
}

function formatCategory(category){
  return category
    .split("-")
    .map(word=>word.charAt(0).toUpperCase()+word.slice(1))
    .join(" ");
}
document.addEventListener("DOMContentLoaded",()=>{
  renderProductDetails();
});

function renderProductDetails(){
  const productId=getProductIdFromUrl();
  const product=products.find(item=>item.id===productId);
  const container=document.getElementById("productDetail");
  const breadcrumb=document.getElementById("breadcrumbProduct");

  if(!container) return;

  if(!product){
    container.innerHTML=`
      <div class="product-not-found">
        <h2>Product Not Found</h2>
        <p>Please open this page from the Shop page.</p>
        <a href="shop.html" class="btn btn-primary">Back To Shop</a>
      </div>
    `;
    return;
  }

  document.title=`${product.name} | SCENTIORA`;

  if(breadcrumb){
    breadcrumb.textContent=product.name;
  }

  container.innerHTML=`
    <div class="product-detail-image">
      <img src="${product.image}" alt="${product.name}">
    </div>

    <div class="product-detail-content">

      <span class="product-detail-category">
        ${formatCategory(product.category)}
      </span>

      <h1>${product.name}</h1>

      <div class="product-detail-badge">
        ${product.badge}
      </div>

      <p class="product-detail-desc">
        A carefully curated fragrance from the ${formatCategory(product.category)} collection,
        selected for elegance, character and signature appeal.
      </p>

      <div class="product-detail-price">
        ₹${product.price.toLocaleString("en-IN")}
      </div>

      <div class="product-detail-actions">
        <button class="btn btn-primary" data-id="${product.id}">
          Add To Cart
        </button>

        <button class="btn btn-secondary" data-id="${product.id}">
          Add To Wishlist
        </button>
      </div>

      <div class="product-info-grid">

        <div>
          <strong>Collection</strong>
          <span>${formatCategory(product.category)}</span>
        </div>

        <div>
          <strong>Authenticity</strong>
          <span>100% Genuine</span>
        </div>

        <div>
          <strong>Packaging</strong>
          <span>Premium Luxury Box</span>
        </div>

      </div>

    </div>
  `;

  renderRelatedProducts(product);
}

function renderRelatedProducts(currentProduct){
  const relatedContainer=document.getElementById("relatedProducts");

  if(!relatedContainer) return;

  const related=products
    .filter(product=>
      product.category===currentProduct.category &&
      product.id!==currentProduct.id
    )
    .slice(0,4);

  relatedContainer.innerHTML=related.map(product=>`
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
}

function getProductIdFromUrl(){
  const params=new URLSearchParams(window.location.search);
  return Number(params.get("id"));
}

function formatCategory(category){
  return category
    .split("-")
    .map(word=>word.charAt(0).toUpperCase()+word.slice(1))
    .join(" ");
}
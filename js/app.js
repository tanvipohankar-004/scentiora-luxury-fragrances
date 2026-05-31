/* =============================
   SCENTIORA HOMEPAGE
============================= */

document.addEventListener("DOMContentLoaded", () => {
  renderFeaturedProducts();
});

/* =============================
   FEATURED PRODUCTS
============================= */

function renderFeaturedProducts() {

  const container =
    document.getElementById("featured-products");

  if (!container) return;

  const featuredProducts =
  products
    .filter(product => product.featured)
    .slice(0,4);

    
  container.innerHTML =
    featuredProducts.map(createProductCard).join("");
}

/* =============================
   PRODUCT CARD
============================= */

function createProductCard(product) {

  return `

    <article class="product-card">

      <button
        class="wishlist-btn"
        aria-label="Add to Wishlist"
      >
        ♡
      </button>

      <div class="product-image">

        <img
          src="${product.image}"
          alt="${product.name}"
        >

      </div>

      <div class="product-content">

        <span class="product-category">
          ${formatCategory(product.category)}
        </span>

        <h3 class="product-name">
          ${product.name}
        </h3>

        <p class="product-price">
          ₹${product.price.toLocaleString("en-IN")}
        </p>

        <button
          class="add-cart-btn"
          data-id="${product.id}"
        >
          Add To Cart
        </button>

      </div>

    </article>

  `;
}

/* =============================
   HELPERS
============================= */

function formatCategory(category) {

  switch(category) {

    case "arabian":
      return "Arabian";

    case "attars":
      return "Attars";

    case "designer":
      return "Designer";

    case "ultra-luxury":
      return "Ultra Luxury";

    default:
      return category;
  }
}
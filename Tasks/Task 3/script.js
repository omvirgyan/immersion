let allProducts = [];

async function fetchProducts() {
  try {
    const res = await fetch('https://dummyjson.com/products');
    const data = await res.json();
    allProducts = data.products;
    displayProducts(allProducts);
  } catch (err) {
    console.error("Error fetching products:", err);
  }
}

function displayProducts(products) {
  const container = document.getElementById('productContainer');
  container.innerHTML = '';

  if (products.length === 0) {
    container.innerHTML = '<p>No products found.</p>';
    return;
  }

  products.forEach(({ id, title, price, brand, images }) => {
    const productCard = document.createElement('div');
    productCard.className = 'product';
    productCard.innerHTML = `
      <img src="${images[0]}" alt="${title}">
      <h3>${title}</h3>
      <p><strong>Brand:</strong> ${brand}</p>
      <p><strong>Price:</strong> $${price}</p>
    `;
    container.appendChild(productCard);
  });
}

function handleSearch() {
  const query = document.getElementById('searchInput').value.toLowerCase().trim();

  if (query === "") {
    displayProducts(allProducts);
    return;
  }

  const filtered = allProducts.filter(p =>
    p.title.toLowerCase().includes(query)
  );

  displayProducts(filtered);
}

fetchProducts();

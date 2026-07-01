import { useState } from "react";
import ProductCard from "./components/ProductCard";
import { products } from "./data/products";

function App() {
  const [count, setCount] = useState(0);

  const [skincareInput, setSkincareInput] = useState({
    productName: "",
    productBrand: "",
  });

  const handleSkincareInput = (e) => {
    setSkincareInput({
      ...skincareInput,
      [e.target.name]: e.target.value,
    });
  };

  const increase = () => {
    if (count < 10) setCount(count + 1);
  };

  const decrease = () => {
    if (count > 0) setCount(count - 1);
  };

  // FIXED FILTER LOGIC (brand issue corrected)
  const filteredProducts = products.filter((item) => {
    const matchName = item.productName
      .toLowerCase()
      .includes(skincareInput.productName.toLowerCase());

    const matchBrand = item.productDesc
      .toLowerCase()
      .includes(skincareInput.productBrand.toLowerCase());

    return matchName && matchBrand;
  });

  return (
    <div className="app-container">
      <h1 className="title">Skincare Product Listing</h1>

      {/* SEARCH */}
      <div className="search-box">
        <h2>Find Your Product</h2>

        <div className="inputs">
          <input
            type="text"
            name="productName"
            placeholder="Product Name"
            value={skincareInput.productName}
            onChange={handleSkincareInput}
          />

          <input
            type="text"
            name="productBrand"
            placeholder="Brand / Keyword"
            value={skincareInput.productBrand}
            onChange={handleSkincareInput}
          />
        </div>
      </div>

      {/* PRODUCTS */}
      <div className="product-grid">
        {filteredProducts.map((item) => (
          <ProductCard
            key={item.id}
            image={item.productImage}
            name={item.productName}
            price={item.productPrice}
            desc={item.productDesc}
            count={count}
            increase={increase}
            decrease={decrease}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
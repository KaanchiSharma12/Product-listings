import "./App.css";
import ProductCard from "./components/ProductCard";
import { products } from "./data/products";
import { useState } from "react";

function App() {

  const [count, setCount] = useState(0);

  const [skincareInput, setSkincareInput] = useState({
    productName: "",
    productBrand: "",
  });

  const handleSkincareInput = (e) => {
    setSkincareInput({
      ...skincareInput,
      [e.target.name]: e.target.value
    });
  };


  const dynamicFilteredProducts = products.filter((item) => {
    const matchName = item.productName.toLowerCase().includes(skincareInput.productName.toLowerCase());
    const matchBrand = item.productDesc.toLowerCase().includes(skincareInput.productBrand.toLowerCase());

    return matchName && matchBrand;
  });

  const increase = () => {
    if (count < 10) {
      setCount(count + 1);
    }
  };

  const decrease = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  function showAll() {
    console.log(products);
  }

  function price300() {
    console.log(products.filter(item => item.productPrice <= 300));
  }

  function price500() {
    console.log(products.filter(item =>
      item.productPrice > 300 && item.productPrice <= 500
    ));
  }

  function price800() {
    console.log(products.filter(item => item.productPrice > 500));
  }

  return (
    <div className="app">

      <h1 className="heading">
        Skincare Product Listing
      </h1>

      {/* FILTER BUTTONS */}
      <div className="buttons">
        <button onClick={showAll}>All</button>
        <button onClick={price300}>Rs 0 - 300</button>
        <button onClick={price500}>Rs 301 - 500</button>
        <button onClick={price800}>Rs 500+</button>
      </div>

      <div className="search-box">
        <h3 style={{ margin: "0 0 10px 0", fontSize: "18px", color: "#333" }}>Find Your Product</h3>
        <input
          type="text"
          name="productName"
          placeholder="Product name"
          value={skincareInput.productName}
          onChange={handleSkincareInput}
          style={{ padding: "10px", borderRadius: "4px", border: "1px solid #8e8d8d" }}
        />
        <input
          type="text"
          name="productBrand"
          placeholder="Brand name"
          value={skincareInput.productBrand}
          onChange={handleSkincareInput}
          style={{ marginLeft: "10px", padding: "10px", borderRadius: "4px", border: "1px solid #8e8d8d" }}
        />
      </div>

      <div className="product-container">

        {dynamicFilteredProducts.map((item) => (

          <ProductCard
            key={item.id}
            name={item.productName}
            price={item.productPrice}
            image={item.productImage}
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
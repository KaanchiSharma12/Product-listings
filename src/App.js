import { useState, useEffect } from "react";
import "./App.css";
import ProductCard from "./components/ProductCard";
import { products } from "./data/products";

function App() {

  // Load count from localStorage when app starts
  const [count, setCount] = useState(() => {
    const savedCount = localStorage.getItem("count");
    return savedCount ? Number(savedCount) : 0;
  });

  const [skincareInput, setSkincareInput] = useState({
    productName: "",
    productBrand: "",
  });

  const [priceFilter, setPriceFilter] = useState("all");

  // Save count whenever it changes
  useEffect(() => {
    localStorage.setItem("count", count);
  }, [count]);

  const handleSkincareInput = (e) => {
    setSkincareInput({
      ...skincareInput,
      [e.target.name]: e.target.value,
    });
  };

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

  // removeItem()
  const removeCount = () => {
    localStorage.removeItem("count");
    setCount(0);
    alert("Count removed from Local Storage");
  };

  // clear()
  const clearStorage = () => {
    localStorage.clear();
    setCount(0);
    alert("Local Storage Cleared");
  };

  const filterByPrice = (item) => {
    if (priceFilter === "0-300") {
      return item.productPrice <= 300;
    }

    if (priceFilter === "300-500") {
      return item.productPrice > 300 && item.productPrice <= 500;
    }

    if (priceFilter === "500+") {
      return item.productPrice > 500;
    }

    return true;
  };

  const filteredProducts = products
    .filter((item) => {
      const matchName = item.productName
        .toLowerCase()
        .includes(skincareInput.productName.toLowerCase());

      const matchBrand = item.productDesc
        .toLowerCase()
        .includes(skincareInput.productBrand.toLowerCase());

      return matchName && matchBrand;
    })
    .filter(filterByPrice);

  const handlePriceClick = (range) => {
    setPriceFilter(range);

    const result = products.filter((item) => {

      if (range === "0-300") {
        return item.productPrice <= 300;
      }

      if (range === "300-500") {
        return item.productPrice > 300 && item.productPrice <= 500;
      }

      if (range === "500+") {
        return item.productPrice > 500;
      }

      return true;

    });

    console.log("Filtered Products :", result);
  };

  return (
    <div className="app-container">

      <h1 className="title">
        Skincare Product Listing
      </h1>

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

        <div className="price-buttons">

          <button onClick={() => handlePriceClick("all")}>
            All
          </button>

          <button onClick={() => handlePriceClick("0-300")}>
            ₹0 - ₹300
          </button>

          <button onClick={() => handlePriceClick("300-500")}>
            ₹300 - ₹500
          </button>

          <button onClick={() => handlePriceClick("500+")}>
            ₹500+
          </button>

        </div>

        <div className="storage-buttons">

          <button onClick={removeCount}>
            Remove Count
          </button>

          <button onClick={clearStorage}>
            Clear Storage
          </button>

        </div>

      </div>

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
import { useState, useEffect } from "react";
import "./App.css";
import ProductCard from "./components/ProductCard";
import { products } from "./data/products";

function App() {

  // =========================
  // LOCAL STORAGE (getItem)
  // =========================

  const [count, setCount] = useState(() => {
    const savedCount = localStorage.getItem("count");
    return savedCount ? Number(savedCount) : 0;
  });

  const [skincareInput, setSkincareInput] = useState(() => {
    const savedSearch = localStorage.getItem("search");

    return savedSearch
      ? JSON.parse(savedSearch)
      : {
          productName: "",
          productBrand: "",
        };
  });

  const [priceFilter, setPriceFilter] = useState(() => {
    return localStorage.getItem("priceFilter") || "all";
  });

  // =========================
  // LOCAL STORAGE (setItem)
  // =========================

  useEffect(() => {
    localStorage.setItem("count", count);
  }, [count]);

  useEffect(() => {
    localStorage.setItem(
      "search",
      JSON.stringify(skincareInput)
    );
  }, [skincareInput]);

  useEffect(() => {
    localStorage.setItem(
      "priceFilter",
      priceFilter
    );
  }, [priceFilter]);

  // =========================
  // SEARCH INPUT
  // =========================

  const handleSkincareInput = (e) => {

    setSkincareInput({

      ...skincareInput,

      [e.target.name]: e.target.value,

    });

  };

  // =========================
  // COUNTER
  // =========================

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

  // =========================
  // PRICE BUTTON
  // =========================

  const handlePriceClick = (range) => {

    setPriceFilter(range);

  };

  // =========================
  // PRICE FILTER
  // =========================

  const filterByPrice = (item) => {

    switch (priceFilter) {

      case "0-300":
        return item.productPrice <= 300;

      case "300-500":
        return (
          item.productPrice > 300 &&
          item.productPrice <= 500
        );

      case "500+":
        return item.productPrice > 500;

      default:
        return true;

    }

  };

  // =========================
  // SEARCH FILTER
  // =========================

  const filteredProducts = products

    .filter((item) => {

      const searchName = item.productName

        .toLowerCase()

        .includes(

          skincareInput.productName.toLowerCase()

        );

      const searchDesc = item.productDesc

        .toLowerCase()

        .includes(

          skincareInput.productBrand.toLowerCase()

        );

      return searchName && searchDesc;

    })

    .filter(filterByPrice);

  // =========================
  // removeItem()
  // =========================

  const resetSearch = () => {

    localStorage.removeItem("search");

    setSkincareInput({

      productName: "",

      productBrand: "",

    });

    alert("Search has been reset.");

  };

  // =========================
  // clear()
  // =========================

  const resetApp = () => {

    localStorage.clear();

    setCount(0);

    setPriceFilter("all");

    setSkincareInput({

      productName: "",

      productBrand: "",

    });

    alert("Application has been reset.");

  };

  return (

    <div className="app-container">

      <h1 className="title">

        Skincare Product Listing

      </h1>

      <div className="search-box">

        <h2>

          Find Your Product

        </h2>

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

        {/* PRICE BUTTONS */}

        <div className="price-buttons">


          <button

            className={priceFilter === "0-300" ? "active-btn" : ""}

            onClick={() => handlePriceClick("0-300")}

          >

            ₹0 - ₹300

          </button>

          <button

            className={priceFilter === "300-500" ? "active-btn" : ""}

            onClick={() => handlePriceClick("300-500")}

          >

            ₹300 - ₹500

          </button>

          <button

            className={priceFilter === "500+" ? "active-btn" : ""}

            onClick={() => handlePriceClick("500+")}

          >

            ₹500+

          </button>

        </div>

        {/* LOCAL STORAGE */}

        <div className="storage-buttons">

          <button

            onClick={resetSearch}

          >

            Reset Search

          </button>

          <button

            onClick={resetApp}

          >

            Reset App

          </button>

        </div>

      </div>

      {/* PRODUCTS */}

      <div className="product-grid">

        {

          filteredProducts.map((item) => (

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

          ))

        }

      </div>

    </div>

  );

}

export default App;
import "./App.css";
import ProductCard from "./components/ProductCard";
import { products } from "./data/products";
import { useState } from "react";

function App() {

  const [count, setCount] = useState(0);

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

      {/* filtyer buttons */}
      <div className="buttons">
        <button onClick={showAll}>All</button>
        <button onClick={price300}>Rs 0 - 300</button>
        <button onClick={price500}>Rs 301 - 500</button>
        <button onClick={price800}>Rs 500+</button>
      </div>

      {/* products */}
      <div className="product-container">

        {products.map((item) => (

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
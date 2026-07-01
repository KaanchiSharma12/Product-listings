import "./App.css";
import ProductCard from "./components/ProductCard";
import { products } from "./data/products";
import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  const increase = () => {
    if (count < 10) setCount(count + 1);
  };

  const decrease = () => {
    if (count > 0) setCount(count - 1);
  };

  return (
    <div className="app">

      <h1 className="heading">
        Skincare Product Listing
      </h1>

      {/* COUNTER CONTROL (GLOBAL) */}
      <div className="buttons">
        <button onClick={decrease}>− Decrease</button>

        <span className="count-box">{count}</span>

        <button onClick={increase}>+ Increase</button>
      </div>

      {/* PRODUCTS */}
      <div className="product-container">

        {products.map((item) => (

          <ProductCard
            key={item.id}
            name={item.productName}
            price={item.productPrice}
            image={item.productImage}
            desc={item.productDesc}
            count={count}
          />

        ))}

      </div>
    </div>
  );
}

export default App;
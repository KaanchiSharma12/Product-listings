import { useNavigate } from "react-router-dom";

function ProductCard({

  product,

  count,

  increase,

  decrease,

}) {

  const navigate = useNavigate();

  const openProduct = () => {

    navigate("/product", {

      state: product,

    });

  };

  return (

    <div
      className="card"
      onClick={openProduct}
      style={{ cursor: "pointer" }}
    >

      <img
        src={product.productImage}
        alt={product.productName}
        onClick={openProduct}
        style={{ cursor: "pointer" }}
      />

      <div className="card-body">

        <h2
          onClick={openProduct}
          style={{ cursor: "pointer" }}
        >
          {product.productName}
        </h2>

        <h3 className="price">
          ₹ {product.productPrice}
        </h3>

        <p>
          {product.productDesc}
        </p>

        <h3 className="total">
          Total Amount : ₹ {product.productPrice * count}
        </h3>

        <div className="counter">

          <button onClick={decrease}>
            -
          </button>

          <span>
            {count}
          </span>

          <button onClick={increase}>
            +
          </button>

        </div>

      </div>

    </div>

  );

}

export default ProductCard;
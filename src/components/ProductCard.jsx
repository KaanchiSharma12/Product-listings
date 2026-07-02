function ProductCard({
  image,
  name,
  price,
  desc,
  count,
  increase,
  decrease,
}) {

  return (

    <div className="card">

      <img
        src={image}
        alt={name}
      />

      <div className="card-body">

        <h2>
          {name}
        </h2>

        <h3 className="price">
          ₹ {price}
        </h3>

        <p>
          {desc}
        </p>

        <h3 className="total">
          Total Amount : ₹ {price * count}
        </h3>

        <div className="counter">

          <button
            onClick={decrease}
          >
            -
          </button>

          <span>
            {count}
          </span>

          <button
            onClick={increase}
          >
            +
          </button>

        </div>

      </div>

    </div>

  );

}

export default ProductCard;
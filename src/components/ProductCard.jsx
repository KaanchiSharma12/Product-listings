function ProductCard(props) {
  return (
    <div className="card">

      <img
        src={props.image}
        alt={props.name}
        className="card-image"
      />

      <div className="card-content">

        <h2>{props.name}</h2>

        <h3>Price : ₹ {props.price}</h3>

        <p>{props.desc}</p>

        {/* TOTAL (GLOBAL COUNT APPLY) */}
        <h3 className="total">
          Total: ₹ {props.price * props.count}
        </h3>

      </div>

    </div>
  );
}

export default ProductCard;
function ProductCard(props) {
  return (
    <div className="card">
      <img src={props.image} alt={props.name} />

      <div className="card-body">
        <h2>{props.name}</h2>

        <h3 className="price">
          ₹ {props.price}
        </h3>

        <p>{props.desc}</p>

        <h3 className="total">
          Total Amount : ₹ {props.price * props.count}
        </h3>

        <div className="counter">
          <button onClick={props.decrease}>-</button>

          <span>{props.count}</span>

          <button onClick={props.increase}>+</button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
import { useNavigate } from "react-router-dom";

function ProductCard({ product }) {

  const navigate = useNavigate();

  const title =
    product.attributes?.title || "Product Name";

  const description =
    product.attributes?.field_description || "No description available";

  const price =
    Number(product.attributes?.field_price || 0);

  // Image extract from Drupal HTML
  const processed =
    product.attributes?.field_content?.processed || "";

  const match = processed.match(/<img[^>]+src="([^"]+)"/);

  const image = match
    ? `http://localhost:8888${match[1]}`
    : null;

    console.log(title, image);
  return (

    <div className="product-card">

      {image ? (
        <img
          src={image}
          alt={title}
          className="product-image"
        />
      ) : (
        <div className="product-image">
          No Image
        </div>
      )}

      <div className="product-info">

        <h3>{title}</h3>

        <p className="description">
          {description}
        </p>

        <h4>Rs.{price}</h4>

        <button
          onClick={() => navigate(`/product/${product.id}`)}
        >
          View Details
        </button>

      </div>

    </div>

  );

}

export default ProductCard;
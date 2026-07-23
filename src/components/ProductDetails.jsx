import { useNavigate, useParams } from "react-router-dom";
import { getProducts } from "../data/products";
import { useState, useEffect } from "react";


function ProductDetails() {


  const { id } = useParams();


  const navigate = useNavigate();


  const [products, setProducts] = useState([]);



  useEffect(() => {


    async function loadProducts(){


      const data = await getProducts();


      setProducts(data);


    }


    loadProducts();


  }, []);




  const product = products.find(

    (item) => item.id === Number(id)

  );




  if (!product) {


    return (

      <h2 style={{ textAlign: "center", marginTop: "50px" }}>

        Product Not Found

      </h2>

    );


  }





  return (


    <div className="product-details">


      <img

        src={product.productImage}

        alt={product.productName}

      />



      <div className="details-content">


        <h1>

          {product.productName}

        </h1>



        <h2>

          ₹ {product.productPrice}

        </h2>



        <p>

          {product.productDesc}

        </p>




        <h3>

          Benefits

        </h3>




        <ul>


          <li>
            Suitable for all skin types
          </li>


          <li>
            Dermatologically Tested
          </li>


          <li>
            Paraben Free
          </li>


          <li>
            Daily Use Product
          </li>


        </ul>




        <button onClick={() => navigate(-1)}>

          Back

        </button>



      </div>


    </div>


  );


}


export default ProductDetails;
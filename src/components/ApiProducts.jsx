import { useEffect, useState } from "react";

function ApiProducts() {

  const [apiProducts, setApiProducts] = useState([]);

  const [loading, setLoading] = useState(true);


  useEffect(() => {

    const fetchProducts = async () => {

      try {

        const response = await fetch(
          "https://dummyjson.com/products"
        );

        const data = await response.json();
 
        setApiProducts(data.products);

      }
      catch(error){

        console.log(error);

      }
      finally{

        setLoading(false);

      }

    };


    fetchProducts();

  },[]);



  return (

    <div>

      <h1 className="title">

        DummyJSON Products

      </h1>


      {
        loading ?

        <h2 style={{textAlign:"center"}}>
          Loading Products...
        </h2>

        :

        <div className="product-grid">


          {
            apiProducts.map((item)=>(

              <div className="card" key={item.id}>


                <img
                  src={item.thumbnail}
                  alt={item.title}
                />


                <div className="card-body">

                  <h2>
                    {item.title}
                  </h2>


                  <h3 className="price">
                    ₹ {item.price}
                  </h3>


                  <p>
                    {item.description}
                  </p>


                </div>


              </div>


            ))
          }


        </div>
      }


    </div>

  );

}


export default ApiProducts;
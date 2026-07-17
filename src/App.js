import { useState, useEffect } from "react";
import "./App.css";
import ProductCard from "./components/ProductCard";
import { products } from "./data/products";
import Signup from "./components/Signup";

import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useSearchParams
} from "react-router-dom";

import ApiProducts from "./components/ApiProducts";
import Users from "./components/Users";
import Posts from "./components/Posts";
import Carts from "./components/Carts";
import ProductDetails from "./components/ProductDetails";


function Home() {

  const [searchParams, setSearchParams] = useSearchParams(); 
  const [count, setCount] = useState(() => {

    const savedCount = localStorage.getItem("count");

    return savedCount ? Number(savedCount) : 0;

  });



  const [skincareInput, setSkincareInput] = useState({

    productName: searchParams.get("name") || "",

    productBrand: searchParams.get("brand") || ""

  });



  const [priceFilter, setPriceFilter] = useState(

    searchParams.get("price") || "all"

  );



  useEffect(() => {

    localStorage.setItem(
      "count",
      count
    );

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




  const handleSkincareInput = (e) => {

    const updated = {

      ...skincareInput,

      [e.target.name]: e.target.value

    };

    setSkincareInput(updated);

    setSearchParams({

      name: updated.productName,

      brand: updated.productBrand,

      price: priceFilter

    });

  };




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




  const handlePriceClick = (range) => {

    setPriceFilter(range);

    setSearchParams({

      name: skincareInput.productName,

      brand: skincareInput.productBrand,

      price: range

    });

  };




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




  const filteredProducts = products

    .filter((item) => {


      const searchName =
        item.productName
          .toLowerCase()
          .includes(
            skincareInput.productName.toLowerCase()
          );



      const searchDesc =
        item.productDesc
          .toLowerCase()
          .includes(
            skincareInput.productBrand.toLowerCase()
          );



      return searchName && searchDesc;


    })


    .filter(filterByPrice);




  const resetSearch = () => {

    setSkincareInput({

      productName: "",

      productBrand: ""

    });

    setSearchParams({

      price: priceFilter

    });

  };




  const resetApp = () => {

    setCount(0);

    setPriceFilter("all");

    setSkincareInput({

      productName: "",

      productBrand: ""

    });

    setSearchParams({});
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
        <div className="price-buttons">


          <button

            className={
              priceFilter === "0-300"
                ?
                "active-btn"
                :
                ""
            }

            onClick={() => handlePriceClick("0-300")}

          >

            ₹0 - ₹300

          </button>



          <button

            className={
              priceFilter === "300-500"
                ?
                "active-btn"
                :
                ""
            }

            onClick={() => handlePriceClick("300-500")}

          >

            ₹300 - ₹500

          </button>



          <button

            className={
              priceFilter === "500+"
                ?
                "active-btn"
                :
                ""
            }

            onClick={() => handlePriceClick("500+")}

          >

            ₹500+

          </button>



        </div>




        <div className="storage-buttons">


          <button onClick={resetSearch}>

            Reset Search

          </button>



          <button onClick={resetApp}>

            Reset App

          </button>



        </div>



      </div>




      <div className="product-grid">


        {

          filteredProducts.map((item) => (

            <ProductCard

              key={item.id}

              product={item}

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





function App() {


  return (


    <BrowserRouter>


      {/* NAVBAR */}

      <nav className="navbar">


        <Link to="/">

          Home

        </Link>



        <Link to="/products">

          Products API

        </Link>


        <Link to="/users">

          Users

        </Link>



        <Link to="/posts">

          Posts

        </Link>



        <Link to="/carts">

          Carts

        </Link>


        <Link to="/signup">

          Signup

        </Link>


        <Link to="/login">

          Login

        </Link>



      </nav>





      <Routes>


        <Route

          path="/"

          element={<Home />}

        />



        <Route

          path="/products"

          element={<ApiProducts />}

        />



        <Route

          path="/users"

          element={<Users />}

        />



        <Route

          path="/posts"

          element={<Posts />}

        />



        <Route

          path="/carts"

          element={<Carts />}

        />

        <Route

          path="/signup"

          element={<Signup />}

        />

<Route
  path="/product/:id"
  element={<ProductDetails />}
/>



      </Routes>



    </BrowserRouter>


  );


}



export default App;
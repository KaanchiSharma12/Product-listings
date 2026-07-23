import { useState, useEffect } from "react";
import { getProducts } from "../data/products";


function Carts() {


    const [products, setProducts] = useState([]);


    const [cart, setCart] = useState([]);



    useEffect(() => {


        async function loadProducts(){


            const data = await getProducts();


            setProducts(data);



            setCart(

                data.slice(0, 8).map((item) => ({

                    ...item,

                    quantity: 1,

                }))

            );


        }



        loadProducts();



    }, []);




    const increase = (id) => {


        setCart(

            cart.map((item) =>


                item.id === id

                    ?

                    {

                        ...item,

                        quantity: item.quantity + 1

                    }


                    :

                    item


            )

        );


    };




    const decrease = (id) => {


        setCart(

            cart.map((item) =>


                item.id === id && item.quantity > 1

                    ?

                    {

                        ...item,

                        quantity: item.quantity - 1

                    }


                    :

                    item


            )

        );


    };




    const removeItem = (id) => {


        setCart(

            cart.filter((item) => item.id !== id)

        );


    };





    const total = cart.reduce(

        (sum, item) =>

            sum + item.productPrice * item.quantity,

        0

    );




    const discount = total * 0.10;



    const grandTotal = total - discount;





    return (


        <div className="cart-container">


            <h1 className="title">

                My Cart

            </h1>




            {cart.length === 0 ? (


                <h2 className="empty-cart">

                    Your Cart is Empty

                </h2>


            ) : (


                <>


                    {

                        cart.map((item) => (


                            <div

                                className="cart-card"

                                key={item.id}

                            >



                                <img

                                    src={item.productImage}

                                    alt={item.productName}

                                />



                                <div className="cart-info">


                                    <h2>

                                        {item.productName}

                                    </h2>




                                    <p>

                                        {item.productDesc}

                                    </p>




                                    <h3 className="price">

                                        ₹ {item.productPrice}

                                    </h3>





                                    <div className="counter">


                                        <button

                                            onClick={() => decrease(item.id)}

                                        >

                                            -

                                        </button>



                                        <span>

                                            {item.quantity}

                                        </span>




                                        <button

                                            onClick={() => increase(item.id)}

                                        >

                                            +

                                        </button>



                                    </div>





                                    <h3>

                                        Total : ₹ {item.productPrice * item.quantity}

                                    </h3>





                                    <button

                                        className="remove-btn"

                                        onClick={() => removeItem(item.id)}

                                    >

                                        Remove

                                    </button>



                                </div>



                            </div>


                        ))

                    }





                    <div className="cart-summary">


                        <h2>

                            Subtotal : ₹ {total}

                        </h2>




                        <h3 className="discount">

                            Discount (10%) : - ₹ {discount.toFixed(0)}

                        </h3>




                        <hr />





                        <h2>

                            Grand Total : ₹ {grandTotal.toFixed(0)}

                        </h2>





                        <button className="checkout-btn">

                            Proceed To Checkout

                        </button>




                    </div>



                </>


            )}



        </div>


    );


}


export default Carts;
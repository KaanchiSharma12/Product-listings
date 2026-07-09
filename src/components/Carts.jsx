import { useState } from "react";
import { products } from "../data/products";


function Carts(){


const [cart,setCart]=useState(products.slice(0,8).map((item)=>({

...item,

quantity:1

})));



const increase=(id)=>{


setCart(

cart.map((item)=>

item.id===id

?

{

...item,

quantity:item.quantity+1

}

:

item

)

);


};




const decrease=(id)=>{


setCart(

cart.map((item)=>

item.id===id && item.quantity>1

?

{

...item,

quantity:item.quantity-1

}

:

item

)

);


};




const removeItem=(id)=>{


setCart(

cart.filter(

(item)=>item.id!==id

)

);


};




const totalAmount = cart.reduce(

(sum,item)=>

sum + (item.productPrice * item.quantity),

0

);




return(


<div className="cart-container">


<h1 className="title">

My Cart

</h1>




{

cart.length===0 ?


<h2 className="empty-cart">

Your Cart is Empty

</h2>


:


<div className="cart-items">


{

cart.map((item)=>(


<div className="cart-card" key={item.id}>


<img

src={item.productImage}

alt={item.productName}

/>



<div className="cart-details">


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

onClick={()=>decrease(item.id)}

>

-

</button>



<span>

{item.quantity}

</span>



<button

onClick={()=>increase(item.id)}

>

+

</button>


</div>



<h3>

Total :
₹ {item.productPrice*item.quantity}

</h3>



<button

className="remove-btn"

onClick={()=>removeItem(item.id)}

>

Remove

</button>



</div>



</div>



))


}



<div className="cart-total">


<h4>

Subtotal : ₹ {totalAmount}

</h4>

<br></br>

<h3>

Shipping : Free

</h3>

<br></br>

<h4>

Total : ₹ {totalAmount}

</h4>


<button className="checkout-btn">

Proceed To Checkout

</button>


</div>



</div>


}



</div>


)


}


export default Carts;
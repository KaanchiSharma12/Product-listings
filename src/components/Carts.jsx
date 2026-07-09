import {useEffect,useState} from "react";


function Carts(){


const [carts,setCarts]=useState([]);



useEffect(()=>{


const fetchCarts=async()=>{


const response=await fetch(
"https://dummyjson.com/carts"
);


const data=await response.json();


setCarts(data.carts);


};


fetchCarts();


},[]);



return(

<div>


<h1 className="title">
Carts
</h1>


<div className="product-grid">


{

carts.map((cart)=>(


<div className="card" key={cart.id}>


<div className="card-body">


<h2>
Cart ID : {cart.id}
</h2>


<p>
Total Products : {cart.totalProducts}
</p>


<p>
Total Amount : ₹ {cart.total}
</p>


</div>


</div>


))


}


</div>


</div>


);


}


export default Carts;
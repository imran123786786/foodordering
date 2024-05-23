import { useStore } from "../store/store";
import Layout from "../components/Layout";
import css from "../styles/Cart.module.css"
import Image from "next/image";
import { urlFor } from "../lib/client";
import toast , {Toaster} from "react-hot-toast";
import { useState } from "react";
import OrderModal from "../components/OrderModal";
import { useRouter } from "next/router";
export default function Cart(){
    const Cartdata = useStore((state)=>state.cart)
    const removePizza = useStore((state)=>state.removePizza)
    const [PaymentMethod, setPaymentMethod] = useState(null)
    const [Order, setOrder] = useState(
        typeof window !== 'undefined' && localStorage.getItem('order')
    )
    const handleRemove = (i) =>{
        removePizza(i);
        toast.error('Item removed');
    };
    const router = useRouter();
    const total = ()=>Cartdata.pizzas.reduce((a,b)=>a+b.quantity * b.Price, 0)
    
    const handleOnDelivery = ()=>{
           setPaymentMethod(0);
          typeof window !== 'undefined' && localStorage.setItem('total', total())
    }
    const handleCheckout = async ()=>{
          typeof window !== 'undefined' && localStorage.setItem('total', total())
          setPaymentMethod(1);
          const response = await fetch('api/stripe', {
            method: "POST",
            headers:{
                'Content-Type': "application/json",
            },
            body: JSON.stringify(Cartdata.pizzas),
          });

          if(response.status === 500) return;
          const data = await response.json();
          toast.loading("Redirecting...");
          router.push(data.url)
        
    }
    return(
        <Layout>

            <div className={css.container}>
                <div className={css.details}>
                    <table className={css.table}>
                        <thead>
                            <th>Pizza</th>
                            <th>Name</th>
                            <th>Size</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                      
                        </thead>
                        <tbody className={css.tbody}>
                         {Cartdata.pizzas.length > 0 &&
                         Cartdata.pizzas.map((pizza, i)=>{
                            const src = urlFor(pizza.image).url()
                            return(
                            <tr key={i}>
                                <td  className={css.imageTd}>
                                    <Image loader={()=> src}
                                    src={src}
                                    alt=""
                                    objectFit="cover"
                                    width={85}
                                    height={85}
                                    />
                                </td>
                                <td>
                                    {pizza.name}
                                </td>
                                <td>
                                    {
                                        pizza.size === 0 ?
                                        "Small" :
                                        pizza.size === 1 ?
                                        "Medium" :
                                        "Large"
                                    }
                                </td>
                                <td>
                                    {pizza.Price}
                                </td>
                                <td>{pizza.quantity}</td>
                                <td>{pizza.Price * pizza.quantity}</td>
                                <td
                                style={{
                                    color: "var(--themeRed)",
                                    cursor: 'pointer'
                                }}
                                onClick={()=>handleRemove(i)}
                                >x</td>
                            </tr>
                         )})
                         }
                        </tbody>
                    </table>
                </div>
                <div className={css.cart}>
                    <span>Cart</span>
                    <div className={css.CartDetails}>
                        <div>
                            <span>Items</span>
                            <span>{Cartdata.pizzas.length}</span>
                        </div>
                        <div>
                            <span>Total</span>
                            <span>${total()}</span>
                        </div>
                    </div>

                    
                    <div className={css.buttons}>
                        <button className="btn" onClick={handleOnDelivery} >Pay on Delivery</button>
                        <button className="btn" onClick={handleCheckout} >Pay Now</button>
                    </div>
                    
                </div>
            </div>
            <Toaster/>

           <OrderModal 
           opened={PaymentMethod === 0}
           setOpened = {setPaymentMethod}
           PaymentMethod = {PaymentMethod} />
           
        </Layout>
    )
}

// import 'bootstrap/dist/css/bootstrap.css'
import Layout from "@/components/layout"
import ProductsItems from "@/components/productitems"
import { Store } from "@/utils/Store"
import { useRouter } from "next/router"
import { useContext } from "react"
import Product from "../models/Product"
import data from "../utils/data"
import db from "../utils/db"
import axios from "axios"
import { toast } from "react-toastify"
export default function Home({products}) {
   const {state,dispatch}=useContext(Store)
   const router=useRouter()
   const {cart}=state;
   const addToCart = async(product) => {
      const existItem=cart.cartItems.find((x)=>x.slug===product.slug);
      const quantity=existItem?existItem.quantity+1:1;
      const { data } = await axios.get(`/api/products/${product._id}`);
      if(data.countInStock<quantity){
        toast.error('sorry product out of stock')
        return
      }
      dispatch({ type: "ADD_ITEM", payload: { ...product, quantity} });
      toast.success('product added to the cart')
    };
  return (
    
     <Layout title="Home Page">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
         {products.map((product)=>(
            <ProductsItems product={product}
            addToCart={addToCart}
            key={product.slug}
            ></ProductsItems>
         ))}
        </div>
     </Layout>
    
  )
}
export async function getServerSideProps(){
   await db.connect();
   const products = await Product.find().lean();
   return{
      props:{
         products:products.map(db.convertDocToObj),
      }
   }
}

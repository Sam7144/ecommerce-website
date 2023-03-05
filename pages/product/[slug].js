import Layout from "../../components/layout";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { useContext } from "react";
import { Store } from "../../utils/Store";
import db from "../../utils/db";
import Product from "../../models/Product";
import axios from "axios";
import { toast } from "react-toastify";
export default function SingleProduct(props) {
  const{product}=props;
  const { state, dispatch } = useContext(Store);
  const router=useRouter()
  //const product = products.find((pt) => pt.slug === slug);
  if (!product) {
    return <Layout title="product not found">
      <div>Product not found</div>
      </Layout>
  }
  const addToCart = async() => {
    const existItem=state.cart.cartItems.find((x)=>x.slug===product.slug);
    const quantity=existItem?existItem.quantity+1:1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if(data.countInStock<quantity){
    toast.error('sorry product out of stock')
      return
    }
    dispatch({ type: "ADD_ITEM", payload: { ...product, quantity} });
    router.push('/cart')
  };
  return (
    <Layout title={product.name}>
      <div className="py-2">
        <Link href="/">go back to products</Link>
      </div>
      <div className="grid md:grid-cols-4 md:gap-3">
        <div className="md:col-span-2">
          <Image
            src={product.image}
            alt={product.title}
            width={640}
            height={640}
            // layout learn responsive
          ></Image>
        </div>
        <div>
          <ul>
            <li>
              <h1 className="text-lg">{product.name}</h1>
            </li>
            <li>Category:{product.category}</li>
            <li>Brand:{product.brand}</li>
            <li>
              {product.rating} of {product.numReviews}
            </li>
            <li>Description:{product.description}</li>
          </ul>
        </div>
        <div className="card p-5">
          <div className="mb-2 flex justify-between">
            <div>price</div>
            <div>${product.price}</div>
          </div>
          <div className="mb-2 flex justify-between">
            <div>status</div>
            <div>{product.countInStock > 0 ? "inStock" : "outOfStock"}</div>
          </div>
          <button className="primary-button w-full" onClick={addToCart}>
            add to cart
          </button>
        </div>
      </div>
    </Layout>
  );
}
export async function getServerSideProps(context){
  const {params}=context;
  const {slug}=params;
  await db.connect();
  const product=await Product.findOne({slug}).lean();
  await db.disconnect();
  return{
    props:{
      product:product?db.convertDocToObj(product):null
    }
  }

}
import { Store } from "../utils/Store";
import { useContext } from "react";
import Layout from "../components/layout";
import Link from "next/link";
import Image from "next/image";
import { XCircleIcon } from "@heroicons/react/solid";
import dynamic from 'next/dynamic'
import {useRouter} from 'next/router'
import axios from "axios";
import { toast } from "react-toastify";
function cartScreen() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router=useRouter()
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  const removeItemHandler = (item) => {
    dispatch({ type: "REMOVE_ITEM", payload: item });
  };
  const updateCartHandler=async(item,qty)=>{
    const quantity=Number(qty);
    const { data } = await axios.get(`/api/products/${item._id}`);
    if(data.countInStock<quantity){
      toast.error('sorry product out of stock')
      return
    }
    dispatch({type:'ADD_ITEM',payload:{...item,quantity}})
    toast.success('product updated in the cart')
  }
  return (
    <Layout title="shopping-cart">
      <h1 className="mb-4 text-xl">shooping cart</h1>
      {cartItems.length === 0 ? (
        <div>
          cart is empty <Link href="/">go shopping</Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
            <table className="min-w-full">
              <thead className="border-b">
                <tr>
                  <th className="px-5 text-left">item</th>
                  <th className="px-5 text-right">quantity</th>
                  <th className="px-5 text-right">price</th>
                  <th className="px-5 ">action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.slug} className="border-b">
                    <td>
                      <Link
                        href={`/product/${item.slug}`}
                        passHref
                        legacyBehavior
                      >
                        <a className="flex items-center">
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={50}
                            height={50}
                          ></Image>
                          <br />
                          {item.name}
                        </a>
                      </Link>
                    </td>
                    <td className="p-5 text-right">
                      <select
                        value={item.quantity}
                        onChange={(e) =>
                          updateCartHandler(item, e.target.value)
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>{x+1}</option>
                        ))}
                      </select>
                    </td>
                    <td className="p-5 text-right">{item.price}</td>
                    <td className="p-5 text-center">
                      <button onClick={() => removeItemHandler(item)}>
                        <XCircleIcon className="h-5 w-5"></XCircleIcon>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="card p-5">
            <ul>
              <li>
                <div className="pb-3 text-xl">
                  subtotal({cartItems.reduce((a, c) => a + c.quantity, 0)}){""}:
                  {cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}
                </div>
              </li>
              <li>
                <button
                  className="primary-button w-full"
                  onClick={() => router.push("login?redirect=/shipping")}
                >
                  check out
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </Layout>
  );
}
export default dynamic(()=>Promise.resolve(cartScreen),{ssr:false})

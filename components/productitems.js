import Link from "next/link";

export default function ProductsItems({ product,addToCart }) {
  return (
    <div className="card">
      <Link href={`/product/${product.slug}`} passHref legacyBehavior>
        <a>
          <img
            alt={product.title}
            src={product.image}
            className="rounded shadow"
          />
        </a>
      </Link>
      <div className="flex flex-col items-center justify-center p-5">
        <Link href={`/product/${product.slug}`} passHref legacyBehavior>
            <a>
                <h2 className="text-lg">{product.title}</h2>
            </a>
        </Link>
        <p className="mb-2">{product.brand}</p>
        <p>${product.price}</p>
        <button className="primary-button" type="submit" onClick={()=>addToCart(product)
        }>
            add to cart
        </button>
      </div>
    </div>
  );
}

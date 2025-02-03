import { useCart } from "../../context/CartContext";

function Cart() {
    const { cart, removeFromCart, reduceQuantity } = useCart();
  return (
    <div>
        <h1>🛒 Cart</h1>
        {cart.length === 0 && <p>Your cart is empty.</p>}
        <ul>
            {cart.map((product) => (
            <div key={product.id} >
              <img src={product.images[0]} alt={product.title} />
              <h3>{product.title}</h3>
              <p>Price: ${product.price}</p>
              <p>Quantity: {product.quantity}</p>
              <button onClick={() => removeFromCart(product.id)}>
                ❌ Remove 
              </button>
              <button onClick={() => reduceQuantity(product.id)}>
                - Reduce
              </button>
            </div>
            ))}
        </ul>
    </div>
  )
}

export default Cart
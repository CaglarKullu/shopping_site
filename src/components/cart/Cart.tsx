import { useCart } from "../../context/CartContext";

function Cart() {
    const { cart, removeFromCart, reduceQuantity } = useCart();
  return (
    <div>
        <h1>🛒 Cart</h1>
        {cart.length === 0 && <p>Your cart is empty.</p>}
        <ul>
            {cart.map((product) => (
            <div key={product.id} style={{ border: "1px solid #ddd", padding: "10px", marginBottom: "10px" }}>
              <img src={product.images[0]} alt={product.title} style={{ width: "100px", height: "100px", objectFit: "cover" }} />
              <h3>{product.title}</h3>
              <p>Price: ${product.price}</p>
              <p>Quantity: {product.quantity}</p>
              <button onClick={() => removeFromCart(product.id)} style={{ padding: "5px", cursor: "pointer" }}>
                ❌ Remove
              </button>
              <button onClick={() => reduceQuantity(product.id)} style={{ padding: "5px", cursor: "pointer" }}>
                - Reduce
              </button>
            </div>
            ))}
        </ul>
    </div>
  )
}

export default Cart
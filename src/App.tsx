import { Route, Link } from "wouter";
import { CartProvider } from "./context/CartContext";
import Cart from "./components/cart/Cart";
import Home from "./components/home/Home";
import ProductDetail from "./components/product_details/ProductDetail";
import Shop from "./components/shop/Shop";
import NavBar from "./components/navbar/NavBar";


export default function App() {
  return (
    <CartProvider>
      <div >
        <NavBar />

        <div>
          <Route path="/" component={Home} />
          <Route path="/shop" component={Shop} />
          <Route path="/shop/:id" component={ProductDetail} />
          <Route path="/cart" component={Cart} />
        </div>
      </div>
    </CartProvider>
  );
}

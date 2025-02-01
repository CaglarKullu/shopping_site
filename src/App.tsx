import { Router, Route, Link } from "wouter";
import Home from "./components/home/Home";
import Shop from "./components/shop/Shop";
import ProductDetail from "./components/product_details/ProductDetail";


export default function App() {
  return (
    <Router>
      <nav style={{ padding: "10px", borderBottom: "2px solid #ddd" }}>
        <Link href="/">🏠 Home</Link> | <Link href="/shop">🛒 Shop</Link>
      </nav>
      <Route path="/" component={Home} />
      <Route path="/shop" component={Shop} />
      <Route path="/shop/:id" component={ProductDetail} />
    </Router>
  );
}

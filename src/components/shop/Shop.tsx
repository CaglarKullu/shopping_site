import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "wouter";
import { useCart } from "../../context/CartContext";

// Define a Product type
interface Product {
  id: number;
  title: string;
  price: number;
  images: string[];
}

export default function Shop() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get<Product[]>("https://api.escuelajs.co/api/v1/products");
        setProducts(response.data.slice(0, 12)); // Limit to 12 products
      } catch (err) {
        setError("Failed to fetch products. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <h2>Loading products...</h2>;
  if (error) return <h2 style={{ color: "red" }}>{error}</h2>;

  return (
    <div >
      <h1>🛒 Shop Page</h1>
      <div>
        {products.map((product) => (
          <div className="card">
          <Link href={`/shop/${product.id}`}>
          <div key={product.id} >
              <img
                src={product.images[0]}
                alt={product.title}
                style={{ width: "100%", height: "20rem", objectFit: "cover", cursor: "pointer" }}
              />
            <h3>{product.title}</h3>
            <p>${product.price}</p>
          </div>
          </Link>
          <button onClick={() => addToCart({ id: product.id, title: product.title, price: product.price, images: product.images, quantity: 1 })} style={{ marginTop: "10px" }}>🛒 Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

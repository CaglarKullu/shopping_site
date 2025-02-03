import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Product } from "../../interfaces/product_interface";
import { fetchAllProducts } from "../../services/product_service";
import { textEllipsis } from "../../utils/text_ellipsis";
import { randomizeList } from "../../utils/randomize_list";


export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRandomProducts = async () => {
      // Fetch 4 random products
      try {
        setLoading(true);
        const response  = await fetchAllProducts();
        let randomList = randomizeList(response.products);
        const randomProducts = randomList.slice(0, 4);
        setFeaturedProducts(randomProducts);
        setLoading(false);
      } catch (error) {
        setError(`Error fetching random products. ${error}`);
        console.error("Error fetching random products:", error);
      }
    };

    fetchRandomProducts();
  }, []);

  if (isLoading) return <h2>Loading products...</h2>;
  if (error) return <h2 style={{ color: "red" }}>{error}</h2>;
  return (
    <div style={{ textAlign: "center", padding: "40px" }}>
 
      {/* Hero Banner */}
      
      <div className="hero">
      <p style={{ fontSize: "2.5rem" }}>🛍️ Discover Amazing Products! </p>
      <p style={{ fontSize: "1.2rem", marginTop: "20px" }}>
        Get the best deals on top-quality products. Shop now!
      </p>

      <Link href="/shop">
        <button className="button">
          🛒 Start Shopping
        </button>
      </Link>

      </div>


      {/* Featured Products Section */}
      <h2 style={{ marginTop: "50px" }}>🔥 Featured Products</h2>
      <div className="featured-products">
        {featuredProducts.map((product) => (
          <div>
          <Link key={product.id} href={`/shop/${product.id}`}>
            <div className="product-card">
              <img src={product.image} alt={product.title} style={{ width: "100%", height: "150px", objectFit: "cover" }} />
              <h3>{textEllipsis(product.title, 55)}</h3>
              <p>${product.price}</p>
            </div>
          </Link>
          </div>
        ))}
      </div>
      {/* Testimonials Section */}
      <h2 style={{ marginTop: "50px" }}>💬 What Our Customers Say</h2>
      <p>⭐⭐⭐⭐⭐ "Best online store! Fast delivery & amazing products!" - Jane D.</p>
      <p>⭐⭐⭐⭐⭐ "Superb quality and customer service. Will shop again!" - Mark R.</p>

      {/* Newsletter Signup */}
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>📩 Join Our Newsletter</h2>
        <p>Get exclusive discounts & updates!</p>
        <input type="email" placeholder="Enter your email" style={{ padding: "10px", width: "250px" }} />
        <button style={{ padding: "10px", marginLeft: "10px", cursor: "pointer" }}>Subscribe</button>
      </div>

    </div>
  );
}

import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Product } from "../../interfaces/product_interface";
import { fetchAllProducts } from "../../services/product_service";
import { textEllipsis } from "../../utils/text_ellipsis";
import { randomizeList } from "../../utils/randomize_list";
import TestimonialsCarousel from "../testimonials/TestimonialsCarousel";


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
      <h2> Featured Products</h2>
      <div className="featured-products">
        {featuredProducts.map((product) => (
          <div>
          <Link key={product.id} href={`/shop/${product.id}`}>
            <div className="product-card">
              <img src={product.image} alt={product.title} style={{ width: "100%", height: "15rem", objectFit: "cover" }} />
              <h3>{textEllipsis(product.title, 55)}</h3>
              <p>${product.price}</p>
            </div>
          </Link>
          </div>
        ))}
      </div>
      {/* Testimonials Section */}
      <TestimonialsCarousel />

      {/* Newsletter Signup */}
      <div className="newsletter-container">
  <h2 className="newsletter-heading">📩 Join Our Newsletter</h2>
  <p className="newsletter-text">Get exclusive discounts & updates!</p>
  <div className="newsletter-form">
    <input
      type="email"
      placeholder="Enter your email"
      className="newsletter-input"
    />
    <button className="newsletter-button">Subscribe</button>
  </div>
</div>
    </div>
  );
}

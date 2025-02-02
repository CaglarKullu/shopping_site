import { useState, useEffect } from "react";
import { useParams } from "wouter";
import axios from "axios";

// Define a Product type
interface Product {
  id: number;
  title: string;
  price: number;
  images: string[];
  description: string;
}

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get<Product>(`https://api.escuelajs.co/api/v1/products/${id}`);
        setProduct(response.data);
      } catch (err) {
        setError("Product not found.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <h2>Loading product...</h2>;
  if (error) return <h2 style={{ color: "red" }}>{error}</h2>;

  return (
    <div style={{ textAlign: "center" }}>
      <h1>{product?.title}</h1>
      <img src={product?.images[0]} alt={product?.title} style={{ width: "300px", height: "300px", objectFit: "cover" }} />
      <p>{product?.description}</p>
      <h3>Price: ${product?.price}</h3>
    </div>
  );
}

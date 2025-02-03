import React, { useEffect, useState } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { fetchUsers } from '../../services/user_service';
import { User } from '../../interfaces/user_response_interface';
import { randomizeList } from '../../utils/randomize_list';
import Slider from 'react-slick';
import './TestimonialsCarousel.css'; 


const testimonialMessages = [
  "Best online store! Fast delivery & amazing products!",
  "Superb quality and customer service. Will shop again!",
  "Fantastic experience, highly recommended!",
  "I love this store! Great selection and unbeatable prices!",
  "Customer service was exceptional and the product quality is top-notch!",
  "A seamless shopping experience from start to finish!",
  "My go-to store for all my needs!",
  "Incredible deals and outstanding support!",
  "Shopping here is always a pleasure!",
  "Quality products and a friendly staff!",
  "Never disappointed, always impressed!",
  "Efficient service and great product variety!",
  "Five stars for speed and reliability!",
  "An amazing online shopping destination!",
  "Top-notch quality and fantastic delivery times!",
  "I couldn't be happier with my purchase!",
  "Exceptional value for money!",
  "This store never fails to amaze me!",
  "Reliable, fast, and great products!",
  "A truly outstanding shopping experience!",
];

// Helper function to select a random testimonial message
const getRandomMessage = (): string => {
  const index = Math.floor(Math.random() * testimonialMessages.length);
  return testimonialMessages[index];
};

const TestimonialsCarousel: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers()
      .then((data) => {
        // Randomize the list of users
        const randomizedUsers = randomizeList(data.users);
        setUsers(randomizedUsers);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching users:', err);
        setError('Error fetching testimonials');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading testimonials...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  // Use the first 20 randomized users for testimonials
  const testimonialsToShow = users.slice(0, 20).map((user) => ({
    id: user.id,
    message: getRandomMessage(),
    name: `${user.name.firstname} ${user.name.lastname}`,
  }));

  // react-slick slider settings (you can customize these as needed)
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1, // Adjust to show more slides at once if desired
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    pauseOnHover: true,
  };

  return (
    <div className="testimonials-container">
      <h2>What Our Customers Say</h2>
      <Slider {...settings}>
        {testimonialsToShow.map((testimonial) => (
          <div key={testimonial.id} className="testimonial-slide">
            <p className="message">"{testimonial.message}"</p>
            <p className="author">- {testimonial.name}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default TestimonialsCarousel;

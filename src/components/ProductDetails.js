import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProductDetails = ({ addToCart }) => {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Fetch product details from API using the id from the URL
    axios.get(`https://fakestoreapi.com/products/${id}`)
      .then(res => {
        setProduct(res.data);
      })
      .catch(err => console.error(err));
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);  // Add product to cart
    }
  };

  return (
    <div>
      {product ? (
        <div>
          <div className='left-detail'>
            <h1>{product.title}</h1>
            <img src={product.image} alt={product.title} />
          </div>
          <div className='right-detail'>
            <p>{product.description}</p>
            <p className='price'>${product.price}</p>
            <button onClick={handleAddToCart}>Add to Cart</button>
          </div>
        </div>
      ) : (
        <p>Loading product details...</p>
      )}
    </div>
  );
};

export default ProductDetails;

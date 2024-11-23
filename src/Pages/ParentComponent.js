import React, { useState } from 'react';
import ProductDetails from '../components/ProductDetails';

const ParentComponent = () => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  return (
    <div>
      <ProductDetails addToCart={addToCart} />
      {/* Other components */}
    </div>
  );
};

export default ParentComponent;

// HomePage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    // Fetch the product list
    axios.get('https://fakestoreapi.com/products')
      .then(res => {
        setProducts(res.data);
        // Extract categories from the products
        const categories = [...new Set(res.data.map(product => product.category))];
        setCategories(categories);
      })
      .catch(err => console.error(err));
  }, []);

  // Filter products based on selected categories
  const filteredProducts = products.filter(product => 
    selectedCategories.length === 0 || selectedCategories.includes(product.category)
  );

  // Sort products based on price
  const sortedProducts = filteredProducts.sort((a, b) => {
    return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
  });

  return (
    <div>
      <h1>Product List</h1>

      <div>
        {/* Filter by categories */}
        <h3>Filter by Categories</h3>
        {categories.map(category => (
          <label key={category}>
            <input
              type="checkbox"
              value={category}
              onChange={() => {
                setSelectedCategories(prevState => 
                  prevState.includes(category)
                    ? prevState.filter(c => c !== category)
                    : [...prevState, category]
                );
              }}
            />
            {category}
          </label>
        ))}
      </div>

      {/* Sorting */}
      <div>
        <h3>Sort by Price</h3>
        <button onClick={() => setSortOrder('asc')}>Low to High</button>
        <button onClick={() => setSortOrder('desc')}>High to Low</button>
      </div>

      {/* Product Grid */}
      <div className="product-grid">
        {sortedProducts.map(product => (
          <div key={product.id} className="product-card">
            <Link to={`/product/${product.id}`}>
              <img src={product.image} alt={product.title} />
              <h4>{product.title}</h4>
              <p>${product.price}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;

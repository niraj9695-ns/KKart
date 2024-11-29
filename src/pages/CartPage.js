import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Import useParams
import axios from "axios";
import "./CartPage.css";

const CartPage = () => {
  const { userId } = useParams(); // Retrieve userId from route
  // const userId = localStorage.getItem("userId"); // Retrieve userId from localStorage

  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/cart/${userId}`
        );
        setCartItems(response.data.items);
        calculateTotal(response.data.items);
      } catch (error) {
        console.error("Error fetching cart data", error);
      }
    };
    fetchCart();
  }, [userId]);

  const calculateTotal = (items) => {
    const total = items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotalPrice(total.toFixed(2));
  };

  const handleQuantityChange = (itemId, delta) => {
    const updatedItems = cartItems.map((item) =>
      item.id === itemId
        ? { ...item, quantity: Math.max(item.quantity + delta, 1) }
        : item
    );
    setCartItems(updatedItems);
    calculateTotal(updatedItems);
  };

  const handleRemoveItem = (itemId) => {
    const updatedItems = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedItems);
    calculateTotal(updatedItems);
  };

  return (
    <div className="cart-page">
      <h2>Shopping Cart</h2>
      <div className="cart-container">
        {/* Cart Items Section */}
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="cart-item-details">
                <img
                  src={item.image}
                  alt={item.name}
                  className="cart-item-image"
                />
                <div>
                  <h4>{item.name}</h4>
                  <p>
                    {item.price.toFixed(2)} * {item.quantity}
                  </p>
                  <p className="cart-item-total">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
              <div className="cart-item-actions">
                <button
                  onClick={() => handleQuantityChange(item.id, 1)}
                  className="quantity-btn"
                >
                  +
                </button>
                <button
                  onClick={() => handleQuantityChange(item.id, -1)}
                  className="quantity-btn"
                >
                  -
                </button>
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="remove-btn"
                >
                  X
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Cart Summary Section */}
        <div className="cart-summary">
          <h3>Cart Summary</h3>
          <hr />
          <p>
            Total Price: <span className="cart-total">${totalPrice}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartPage;

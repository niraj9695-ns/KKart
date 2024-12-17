// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import "./CartPage.css";

// const CartPage = () => {
//   const { userId } = useParams(); // Retrieve userId from the route

//   const [cartItems, setCartItems] = useState([]);
//   const [totalPrice, setTotalPrice] = useState(0);

//   useEffect(() => {
//     const fetchCart = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:8080/api/carts/${userId}`
//         );
//         setCartItems(response.data.items);
//         calculateTotal(response.data.items);
//       } catch (error) {
//         console.error("Error fetching cart data", error);
//       }
//     };
//     fetchCart();
//   }, [userId]);

//   const calculateTotal = (items) => {
//     const total = items.reduce(
//       (acc, item) =>
//         acc + item.productVariant.price * item.productVariant.quantity,
//       0
//     );
//     setTotalPrice(total.toFixed(2));
//   };

//   const handleQuantityChange = (itemId, delta) => {
//     const updatedItems = cartItems.map((item) =>
//       item.id === itemId
//         ? {
//             ...item,
//             productVariant: {
//               ...item.productVariant,
//               quantity: Math.max(item.productVariant.quantity + delta, 1),
//             },
//           }
//         : item
//     );
//     setCartItems(updatedItems);
//     calculateTotal(updatedItems);
//   };

//   const handleRemoveItem = (itemId) => {
//     const updatedItems = cartItems.filter((item) => item.id !== itemId);
//     setCartItems(updatedItems);
//     calculateTotal(updatedItems);
//   };

//   return (
//     <div className="cart-page">
//       <h2>Shopping Cart</h2>
//       <div className="cart-container">
//         {/* Cart Items Section */}
//         <div className="cart-items">
//           {cartItems.map((item) => (
//             <div key={item.id} className="cart-item">
//               <div className="cart-item-details">
//                 <img
//                   src={item.productVariant.images[0]} // Use the first image from the array
//                   alt={item.productVariant.description}
//                   className="cart-item-image"
//                 />
//                 <div>
//                   <h4>{item.productVariant.description}</h4>
//                   <p>
//                     ${item.productVariant.price.toFixed(2)} x{" "}
//                     {item.productVariant.quantity}
//                   </p>
//                   <p className="cart-item-total">
//                     $
//                     {(
//                       item.productVariant.price * item.productVariant.quantity
//                     ).toFixed(2)}
//                   </p>
//                 </div>
//               </div>
//               <div className="cart-item-actions">
//                 <button
//                   onClick={() => handleQuantityChange(item.id, 1)}
//                   className="quantity-btn"
//                 >
//                   +
//                 </button>
//                 <button
//                   onClick={() => handleQuantityChange(item.id, -1)}
//                   className="quantity-btn"
//                 >
//                   -
//                 </button>
//                 <button
//                   onClick={() => handleRemoveItem(item.id)}
//                   className="remove-btn"
//                 >
//                   X
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Cart Summary Section */}
//         <div className="cart-summary">
//           <h3>Cart Summary</h3>
//           <hr />
//           <p>
//             Total Price: <span className="cart-total">${totalPrice}</span>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CartPage;

//dec 6

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "./CartPage.css";

// const CartPage = () => {
//   const { userId } = useParams(); // Retrieve userId from the route
//   const [cartItems, setCartItems] = useState([]);
//   const [totalPrice, setTotalPrice] = useState(0);

//-------------logic to redirect on checkout page

//   const navigate = useNavigate(); // Initialize useNavigate

//   const handlePlaceOrder = () => {
//     const userRegion = localStorage.getItem("userRegion"); // Retrieve user region from local storage
//     if (!userRegion) {
//       alert("User region not found. Please ensure you are logged in.");
//       return;
//     }

//     // Redirect to the checkout page with userId, cartTotal, and userRegion
//     navigate(`/checkout/${userId}`, {
//       state: {
//         cartTotal: totalPrice,
//         userRegion,
//       },
//     });
//   };
//   useEffect(() => {
//     const fetchCart = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:8080/api/carts/${userId}`
//         );
//         setCartItems(response.data.items);
//         calculateTotal(response.data.items);
//       } catch (error) {
//         console.error("Error fetching cart data", error);
//       }
//     };
//     fetchCart();
//   }, [userId]);

//   const calculateTotal = (items) => {
//     const total = items.reduce(
//       (acc, item) =>
//         acc + item.productVariant.price * item.productVariant.quantity,
//       0
//     );
//     setTotalPrice(total.toFixed(2));
//   };

//   const handleQuantityChange = (itemId, delta) => {
//     const updatedItems = cartItems.map((item) =>
//       item.id === itemId
//         ? {
//             ...item,
//             productVariant: {
//               ...item.productVariant,
//               quantity: Math.max(item.productVariant.quantity + delta, 1),
//             },
//           }
//         : item
//     );
//     setCartItems(updatedItems);
//     calculateTotal(updatedItems);
//   };

//   const handleRemoveItem = (itemId) => {
//     const updatedItems = cartItems.filter((item) => item.id !== itemId);
//     setCartItems(updatedItems);
//     calculateTotal(updatedItems);
//   };

//   return (
//     <div className="cart-page">
//       <h2 className="page-title">Shopping Cart</h2>
//       <div className="cart-container">
//         {/* Cart Items Section */}
//         <div className="cart-items">
//           {cartItems.map((item) => (
//             <div key={item.id} className="cart-item">
//               <div className="cart-item-details">
//                 {/* Display images in base64 format */}
//                 {item.productVariant.images.length > 0 ? (
//                   item.productVariant.images.map((image, index) => (
//                     <img
//                       key={index}
//                       src={`data:image/jpeg;base64,${image}`}
//                       alt={item.productVariant.description}
//                       className="cart-item-image"
//                     />
//                   ))
//                 ) : (
//                   <img
//                     src="https://via.placeholder.com/150" // Placeholder for missing images
//                     alt="Product placeholder"
//                     className="cart-item-image"
//                   />
//                 )}
//                 <div className="cart-item-info">
//                   <h4 className="item-title">
//                     {item.productVariant.description}
//                   </h4>
//                   <p className="item-price">
//                     ₹{item.productVariant.price.toFixed(2)} x{" "}
//                     {item.productVariant.quantity}
//                   </p>
//                   <p className="cart-item-total">
//                     ₹
//                     {(
//                       item.productVariant.price * item.productVariant.quantity
//                     ).toFixed(2)}
//                   </p>
//                 </div>
//               </div>
//               <div className="cart-item-actions">
//                 <button
//                   onClick={() => handleQuantityChange(item.id, 1)}
//                   className="quantity-btn increment"
//                 >
//                   +
//                 </button>
//                 <button
//                   onClick={() => handleQuantityChange(item.id, -1)}
//                   className="quantity-btn decrement"
//                 >
//                   -
//                 </button>
//                 <button
//                   onClick={() => handleRemoveItem(item.id)}
//                   className="remove-btn"
//                 >
//                   Remove
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//       <div className="cart-footer">
//         <p className="cart-total">Total Amount: ₹{totalPrice}</p>
//         <button className="place-order-btn" onClick={handlePlaceOrder}>
//           Place Order
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CartPage;

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./CartPage.css";

const CartPage = () => {
  const { userId } = useParams(); // Retrieve userId from the route
  const navigate = useNavigate(); // Initialize useNavigate

  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  // Redirect to the Checkout Page
  const handlePlaceOrder = () => {
    const userRegion = localStorage.getItem("userRegion"); // Retrieve user region from local storage
    if (!userRegion) {
      alert("User region not found. Please ensure you are logged in.");
      return;
    }

    // Pass cartItems, cartTotal, and userRegion to the Checkout Page
    navigate(`/checkout/${userId}`, {
      state: {
        cartItems, // Pass cartItems array
        cartTotal: totalPrice, // Pass total price
        userRegion, // Pass user region
      },
    });
  };

  // Fetch cart items from the server
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/carts/${userId}`
        );
        setCartItems(response.data.items);
        calculateTotal(response.data.items);
      } catch (error) {
        console.error("Error fetching cart data", error);
      }
    };
    fetchCart();
  }, [userId]);

  // Calculate the total price of the cart
  const calculateTotal = (items) => {
    const total = items.reduce(
      (acc, item) =>
        acc + item.productVariant.price * item.productVariant.quantity,
      0
    );
    setTotalPrice(total.toFixed(2));
  };

  // Handle quantity changes
  const handleQuantityChange = (itemId, delta) => {
    const updatedItems = cartItems.map((item) =>
      item.id === itemId
        ? {
            ...item,
            productVariant: {
              ...item.productVariant,
              quantity: Math.max(item.productVariant.quantity + delta, 1),
            },
          }
        : item
    );
    setCartItems(updatedItems);
    calculateTotal(updatedItems);
  };

  // Handle item removal
  const handleRemoveItem = (itemId) => {
    const updatedItems = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedItems);
    calculateTotal(updatedItems);
  };

  return (
    <div className="cart-page">
      <h2 className="page-title">Shopping Cart</h2>
      <div className="cart-container">
        {/* Cart Items Section */}
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="cart-item-details">
                {/* Display images in base64 format */}
                {item.productVariant.images.length > 0 ? (
                  item.productVariant.images.map((image, index) => (
                    <img
                      key={index}
                      src={`data:image/jpeg;base64,${image}`}
                      alt={item.productVariant.description}
                      className="cart-item-image"
                    />
                  ))
                ) : (
                  <img
                    src="https://via.placeholder.com/150" // Placeholder for missing images
                    alt="Product placeholder"
                    className="cart-item-image"
                  />
                )}
                <div className="cart-item-info">
                  <h4 className="item-title">
                    {item.productVariant.description}
                  </h4>
                  <p className="item-price">
                    ₹{item.productVariant.price.toFixed(2)} x{" "}
                    {item.productVariant.quantity}
                  </p>
                  <p className="cart-item-total">
                    ₹
                    {(
                      item.productVariant.price * item.productVariant.quantity
                    ).toFixed(2)}
                  </p>
                </div>
              </div>
              <div className="cart-item-actions">
                <button
                  onClick={() => handleQuantityChange(item.id, 1)}
                  className="quantity-btn increment"
                >
                  +
                </button>
                <button
                  onClick={() => handleQuantityChange(item.id, -1)}
                  className="quantity-btn decrement"
                >
                  -
                </button>
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="remove-btn"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="cart-footer">
        <p className="cart-total">Total Amount: ₹{totalPrice}</p>
        <button className="place-order-btn" onClick={handlePlaceOrder}>
          Place Order
        </button>
      </div>
    </div>
  );
};

export default CartPage;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "./CheckoutPage.css";

const CheckoutPage = () => {
  const location = useLocation();
  const { cartItems = [], cartTotal, userRegion } = location.state || {}; // Provide default values
  const [shippingCharges, setShippingCharges] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchShippingCharges = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/shipping/calculate`,
          {
            params: {
              region: userRegion,
              cartTotal,
            },
          }
        );
        setShippingCharges(response.data);
        setTotalAmount(
          (parseFloat(cartTotal) + parseFloat(response.data)).toFixed(2)
        );
      } catch (error) {
        console.error("Error fetching shipping charges:", error);
      }
    };

    fetchShippingCharges();
  }, [cartTotal, userRegion]);

  const handleConfirmOrder = async () => {
    try {
      // Step 1: Create a preliminary order in the backend
      const response = await axios.post(
        "http://localhost:8080/api/orders/checkout",
        {
          userId: 1, // Replace with the actual logged-in user's ID
          totalAmount,
        }
      );

      const { orderId, amount, currency } = response.data;

      // Step 2: Trigger Razorpay for payment
      const options = {
        key: "YOUR_RAZORPAY_KEY", // Replace with your Razorpay key
        amount: amount,
        currency: currency,
        name: "Your Store Name",
        description: "Test Transaction",
        order_id: orderId,
        handler: async function (paymentResponse) {
          // Step 3: Confirm the payment in the backend
          await axios.post("http://localhost:8080/api/orders/confirm-payment", {
            orderId: response.data.orderDatabaseId,
            paymentId: paymentResponse.razorpay_payment_id,
          });

          // Step 4: Navigate to order success page
          navigate("/order-success", {
            state: { orderId: response.data.orderDatabaseId },
          });
        },
        prefill: {
          name: "Test User",
          email: "test@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Payment failed. Please try again.");
    }
  };

  if (!cartItems || cartItems.length === 0) {
    return <div>No items in the cart to checkout!</div>;
  }

  return (
    <div className="checkout-page">
      <h2 className="checkout-title">Checkout</h2>
      <div className="checkout-details">
        <div className="cart-items">
          <h3>Your Order</h3>
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="cart-item-details">
                <img
                  src={`data:image/jpeg;base64,${item.productVariant.images[0]}`}
                  alt={item.productVariant.description}
                  className="item-image"
                />
                <div className="item-info">
                  <h4>{item.productVariant.description}</h4>
                  <p>Quantity: {item.productVariant.quantity}</p>
                  <p>Price: ₹{item.productVariant.price.toFixed(2)}</p>
                  <p>
                    Subtotal: ₹
                    {(
                      item.productVariant.price * item.productVariant.quantity
                    ).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="summary">
          <h3>Order Summary</h3>
          <p>Cart Total: ₹{cartTotal}</p>
          <p>Shipping Charges: ₹{shippingCharges}</p>
          <p className="total-amount">Total Amount: ₹{totalAmount}</p>
        </div>
      </div>
      <div className="checkout-footer">
        <button className="confirm-order-btn" onClick={handleConfirmOrder}>
          Confirm Order
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;

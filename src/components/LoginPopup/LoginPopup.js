// //-----------------------------------------------------------------------------------

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom"; // Importing useNavigate for navigation
// import "./LoginPopup.css";

// const LoginPopup = ({ onClose, onLogin }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate(); // Initialize the navigate hook

//   const handleRegisterClick = () => {
//     navigate("/user-registration"); // Navigate to the UserRegistration page
//     onClose(); // Close the popup
//   };

//   return (
//     <div className="login-popup-overlay">
//       <div className="login-popup">
//         <button className="close-btn" onClick={onClose}>
//           X
//         </button>
//         <h3>Login</h3>
//         <p>Access your orders, wishlist, and recommendations</p>
//         <input
//           type="email"
//           placeholder="Enter your email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Enter your password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <button onClick={() => onLogin(email, password)}>Login</button>
//         <p>
//           New to KitchenaryKart?{" "}
//           <span className="register-link" onClick={handleRegisterClick}>
//             Create an account
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default LoginPopup;

//-----------------------------------------------code with functionality to store user id for the session

import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importing useNavigate for navigation
import "./LoginPopup.css";

const LoginPopup = ({ onClose, onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    console.log("Login initiated with:", { email, password }); // Debug email/password input

    fetch("http://localhost:8080/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => {
        console.log("Response status:", res.status); // Log HTTP status for debugging
        return res.json();
      })
      .then((data) => {
        console.log("API response:", data); // Log full API response

        if (data.data && data.data.id) {
          setMessage("Login successful!");
          setMessageType("success");

          const userId = data.data.id; // Extract userId (id field from API response)
          const userName = data.data.username; // Extract username

          // Store userId and userName in local storage
          localStorage.setItem("userId", userId);
          console.log(
            "userId stored in localStorage:",
            localStorage.getItem("userId")
          );

          localStorage.setItem("userName", userName);
          console.log(
            "userName stored in localStorage:",
            localStorage.getItem("userName")
          );

          onLogin(userId, userName); // Call the parent component's onLogin callback

          // Clear message and close the popup after a delay
          setTimeout(() => {
            setMessage("");
            onClose();
          }, 1500);
        } else {
          console.log("Login failed: Missing userId in response.");
          setMessage(data.message || "Invalid email or password.");
          setMessageType("error");
        }
      })
      .catch((error) => {
        console.error("Error during login:", error); // Log any network or code errors
        setMessage("Something went wrong. Please try again later.");
        setMessageType("error");
      });
  };

  const handleRegisterClick = () => {
    navigate("/user-registration"); // Redirect to the registration page
    onClose(); // Close the login popup
  };

  return (
    <div className="login-popup-overlay">
      <div className="login-popup">
        <button className="close-btn" onClick={onClose}>
          X
        </button>
        <h3>Login</h3>
        <p>Access your orders, wishlist, and recommendations</p>
        {message && <p className={`message ${messageType}`}>{message}</p>}
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
        <p>
          New to KitchenaryKart?{" "}
          <span className="register-link" onClick={handleRegisterClick}>
            Create an account
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPopup;

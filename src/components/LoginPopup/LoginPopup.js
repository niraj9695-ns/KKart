// //----------------------------6 th dec

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import "./LoginPopup.css";

// const LoginPopup = ({ onClose, onLogin }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");
//   const [messageType, setMessageType] = useState("");

//   const handleLogin = () => {
//     const payload = { email, password };
//     console.log("Sending login payload:", payload);

//     fetch("http://localhost:8080/user/login", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(payload),
//     })
//       .then((res) => {
//         if (!res.ok) {
//           throw new Error(`HTTP error! Status: ${res.status}`);
//         }
//         return res.json();
//       })
//       .then((data) => {
//         console.log("Received login response:", data);
//         if (data.data && data.data.id) {
//           const userId = data.data.id;
//           const userName = data.data.username;
//           localStorage.setItem("userId", userId);
//           localStorage.setItem("userName", userName);
//           localStorage.setItem("userEmail", email);
//           onLogin(userId, userName);
//           setMessage("Login successful!");
//           setMessageType("success");
//           setTimeout(() => {
//             setMessage("");
//             onClose();
//           }, 1500);
//         } else {
//           setMessage(data.message || "Invalid email or password.");
//           setMessageType("error");
//         }
//       })
//       .catch((error) => {
//         console.error("Login error:", error);
//         setMessage("Something went wrong. Please try again later.");
//         setMessageType("error");
//       });
//   };

//   return (
//     <div className="login-popup-overlay">
//       <div className="login-popup">
//         <button className="close-btn" onClick={onClose}>
//           X
//         </button>
//         <h3>Login</h3>
//         {message && <p className={`message ${messageType}`}>{message}</p>}
//         <div>
//           <input
//             type="email"
//             placeholder="Enter your email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <input
//             type="password"
//             placeholder="Enter your password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <button onClick={handleLogin}>Login</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPopup;

// ---------------------- 11 th decstoring region on login

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPopup.css";

const LoginPopup = ({ onClose, onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleLogin = () => {
    const payload = { email, password };
    console.log("Sending login payload:", payload);

    fetch("http://localhost:8080/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Received login response:", data);
        if (data.data && data.data.id) {
          const userId = data.data.id;
          const userName = data.data.username;

          // Store basic user information in localStorage
          localStorage.setItem("userId", userId);
          localStorage.setItem("userName", userName);
          localStorage.setItem("userEmail", email);

          // Fetch user details to get the region (state)
          fetch(`http://localhost:8080/user/${userId}`)
            .then((res) => {
              if (!res.ok) {
                throw new Error(
                  `Failed to fetch user details! Status: ${res.status}`
                );
              }
              return res.json();
            })
            .then((userDetails) => {
              console.log("User details:", userDetails);

              // Extract and store the region (state) in localStorage
              const userRegion = userDetails.state;
              if (userRegion) {
                localStorage.setItem("userRegion", userRegion);
              }
            })
            .catch((error) => {
              console.error("Error fetching user details:", error);
            });

          // Proceed with login flow
          onLogin(userId, userName);
          setMessage("Login successful!");
          setMessageType("success");
          setTimeout(() => {
            setMessage("");
            onClose();
          }, 1500);
        } else {
          setMessage(data.message || "Invalid email or password.");
          setMessageType("error");
        }
      })
      .catch((error) => {
        console.error("Login error:", error);
        setMessage("Something went wrong. Please try again later.");
        setMessageType("error");
      });
  };

  return (
    <div className="login-popup-overlay">
      <div className="login-popup">
        <button className="close-btn" onClick={onClose}>
          X
        </button>
        <h3>Login</h3>
        {message && <p className={`message ${messageType}`}>{message}</p>}
        <div>
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
        </div>
      </div>
    </div>
  );
};

export default LoginPopup;

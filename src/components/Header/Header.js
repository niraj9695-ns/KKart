// // //----------------------------------------------------------------------------------------------------

// import React, { useState } from "react";
// import "./Header.css";
// import LoginPopup from "../LoginPopup/LoginPopup";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faBars,
//   faCartShopping,
//   faSearch,
//   faHeart,
// } from "@fortawesome/free-solid-svg-icons";
// import { useNavigate } from "react-router-dom";

// const Header = () => {
//   const [showLoginPopup, setShowLoginPopup] = useState(false);
//   const [userName, setUserName] = useState("");

//   const handleLoginClick = () => setShowLoginPopup(true);

//   const handleLogin = (email, password) => {
//     fetch("http://localhost:8080/user/login", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email, password }),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         if (data.success) {
//           localStorage.setItem("authToken", data.token);
//           setUserName(data.userName); // Assume backend sends userName
//           setShowLoginPopup(false);
//         } else {
//           alert(data.message);
//         }
//       })
//       .catch((err) => console.error("Login Error:", err));
//   };

//   const handleClosePopup = () => setShowLoginPopup(false);

//   return (
//     <header className="header">
//       <div className="header-top">
//         <div className="header-left">
//           <FontAwesomeIcon icon={faBars} className="menu-icon" />
//           <img
//             src="https://www.kitchenarykart.com/wp-content/uploads/2024/07/Yellow-and-Black-Modern-Minimalist-Online-Shop-Logo-180-x-60-px.png"
//             alt="Amazon Logo"
//             className="logo"
//           />
//         </div>

//         <div className="header-center">
//           <select className="dropdown">
//             <option>All</option>
//             <option>Electronics</option>
//             <option>Fashion</option>
//             <option>Home</option>
//           </select>
//           <input
//             type="text"
//             placeholder="Search Amazon.in"
//             className="search-input"
//           />
//           <button className="search-button">
//             <FontAwesomeIcon icon={faSearch} />
//           </button>
//         </div>

//         <div className="header-right">
//           {userName ? (
//             <span>Hello, {userName}</span>
//           ) : (
//             <span onClick={handleLoginClick} style={{ cursor: "pointer" }}>
//               Hello, sign in
//             </span>
//           )}
//           <FontAwesomeIcon icon={faHeart} className="wishlist-icon" />
//           <FontAwesomeIcon icon={faCartShopping} className="cart-icon" />
//           <span className="cart-count">0</span>
//         </div>
//       </div>

//       <nav className="header-bottom">
//         <a href="#">Hot Equipments</a>
//         <a href="#">Cold Equipments</a>
//         <a href="#">House Keeping</a>
//       </nav>

//       {showLoginPopup && (
//         <LoginPopup
//           onClose={handleClosePopup}
//           onRegisterClick={() => (window.location.href = "/register")}
//           onLogin={handleLogin}
//         />
//       )}
//     </header>
//   );
// };

// export default Header;

//-----------------------------------------------------today
// import React, { useState, useEffect } from "react";
// import "./Header.css";
// import LoginPopup from "../LoginPopup/LoginPopup";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faBars,
//   faCartShopping,
//   faSearch,
//   faHeart,
// } from "@fortawesome/free-solid-svg-icons";
// import { useNavigate } from "react-router-dom";

// const Header = () => {
//   const [showLoginPopup, setShowLoginPopup] = useState(false);
//   const [userName, setUserName] = useState("");
//   const [userId, setUserId] = useState(null); // Add userId state
//   const navigate = useNavigate();

//   // Sync userName and userId from localStorage on mount
//   useEffect(() => {
//     const storedUserName = localStorage.getItem("userName");
//     const storedUserId = localStorage.getItem("userId");
//     if (storedUserName && storedUserId) {
//       setUserName(storedUserName);
//       setUserId(storedUserId);
//     }
//   }, []);

//   const handleLoginClick = () => setShowLoginPopup(true);

//   const handleLogin = (loggedInUserId, loggedInUserName) => {
//     setUserName(loggedInUserName);
//     setUserId(loggedInUserId);
//     localStorage.setItem("userId", loggedInUserId);
//     localStorage.setItem("userName", loggedInUserName);
//   };

//   const handleCartClick = () => {
//     if (userId) {
//       navigate(`/cart/${userId}`);
//     } else {
//       alert("Please log in to view your cart.");
//     }
//   };

//   const handleLogout = () => {
//     localStorage.clear();
//     setUserName("");
//     setUserId(null);
//   };

//   return (
//     <header className="header">
//       <div className="header-top">
//         <div className="header-left">
//           <FontAwesomeIcon icon={faBars} className="menu-icon" />
//           <img
//             src="https://www.kitchenarykart.com/wp-content/uploads/2024/07/Yellow-and-Black-Modern-Minimalist-Online-Shop-Logo-180-x-60-px.png"
//             alt="KitchenaryKart Logo"
//             className="logo"
//           />
//         </div>

//         <div className="header-center">
//           <select className="dropdown">
//             <option>All</option>
//             <option>Electronics</option>
//             <option>Fashion</option>
//             <option>Home</option>
//           </select>
//           <input
//             type="text"
//             placeholder="Search KitchenaryKart"
//             className="search-input"
//           />
//           <button className="search-button">
//             <FontAwesomeIcon icon={faSearch} />
//           </button>
//         </div>

//         <div className="header-right">
//           {userName ? (
//             <>
//               <span>Hello, {userName}</span>
//               <button onClick={handleLogout} className="logout-button">
//                 Logout
//               </button>
//             </>
//           ) : (
//             <span onClick={handleLoginClick} style={{ cursor: "pointer" }}>
//               Hello, sign in
//             </span>
//           )}
//           <FontAwesomeIcon icon={faHeart} className="wishlist-icon" />
//           <FontAwesomeIcon
//             icon={faCartShopping}
//             className="cart-icon"
//             onClick={handleCartClick}
//             style={{ cursor: "pointer" }}
//           />
//           <span className="cart-count">0</span>
//         </div>
//       </div>

//       <nav className="header-bottom">
//         <a href="#">Hot Equipments</a>
//         <a href="#">Cold Equipments</a>
//         <a href="#">House Keeping</a>
//       </nav>

//       {showLoginPopup && (
//         <LoginPopup
//           onClose={() => setShowLoginPopup(false)}
//           onLogin={handleLogin}
//         />
//       )}
//     </header>
//   );
// };

// export default Header;

//-----------------------------------------------27,2

import React, { useState, useEffect } from "react";
import "./Header.css";
import LoginPopup from "../LoginPopup/LoginPopup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faCartShopping,
  faSearch,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState(null); // Add userId state
  const [cartCount, setCartCount] = useState(0); // State to store cart item count
  const navigate = useNavigate();

  // Sync userName and userId from localStorage on mount
  useEffect(() => {
    const storedUserName = localStorage.getItem("userName");
    const storedUserId = localStorage.getItem("userId");
    if (storedUserName && storedUserId) {
      setUserName(storedUserName);
      setUserId(storedUserId);
    }
  }, []);

  // Fetch cart count whenever userId changes
  useEffect(() => {
    if (userId) {
      fetch(`http://localhost:8080/cart/${userId}`)
        .then((res) => res.json())
        .then((data) => {
          console.log("Cart data:", data);
          if (data.success && data.cartItems) {
            setCartCount(data.cartItems.length); // Update cart count
          } else {
            setCartCount(0); // Reset cart count if no items
          }
        })
        .catch((error) => {
          console.error("Failed to fetch cart data:", error);
          setCartCount(0); // Reset cart count on error
        });
    }
  }, [userId]);

  const handleLoginClick = () => setShowLoginPopup(true);

  const handleLogin = (loggedInUserId, loggedInUserName) => {
    setUserName(loggedInUserName);
    setUserId(loggedInUserId);
    localStorage.setItem("userId", loggedInUserId);
    localStorage.setItem("userName", loggedInUserName);
  };

  const handleCartClick = () => {
    if (userId) {
      navigate(`/cart/${userId}`);
    } else {
      alert("Please log in to view your cart.");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    setUserName("");
    setUserId(null);
    setCartCount(0); // Reset cart count on logout
  };

  return (
    <header className="header">
      <div className="header-top">
        <div className="header-left">
          <FontAwesomeIcon icon={faBars} className="menu-icon" />
          <img
            src="https://www.kitchenarykart.com/wp-content/uploads/2024/07/Yellow-and-Black-Modern-Minimalist-Online-Shop-Logo-180-x-60-px.png"
            alt="KitchenaryKart Logo"
            className="logo"
          />
        </div>

        <div className="header-center">
          <select className="dropdown">
            <option>All</option>
            <option>Electronics</option>
            <option>Fashion</option>
            <option>Home</option>
          </select>
          <input
            type="text"
            placeholder="Search KitchenaryKart"
            className="search-input"
          />
          <button className="search-button">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>

        <div className="header-right">
          {userName ? (
            <>
              <span>Hello, {userName}</span>
              <button onClick={handleLogout} className="logout-button">
                Logout
              </button>
            </>
          ) : (
            <span onClick={handleLoginClick} style={{ cursor: "pointer" }}>
              Hello, sign in
            </span>
          )}
          <FontAwesomeIcon icon={faHeart} className="wishlist-icon" />
          <FontAwesomeIcon
            icon={faCartShopping}
            className="cart-icon"
            onClick={handleCartClick}
            style={{ cursor: "pointer" }}
          />
          <span className="cart-count">{cartCount}</span>
        </div>
      </div>

      <nav className="header-bottom">
        <a href="#">Hot Equipments</a>
        <a href="#">Cold Equipments</a>
        <a href="#">House Keeping</a>
      </nav>

      {showLoginPopup && (
        <LoginPopup
          onClose={() => setShowLoginPopup(false)}
          onLogin={handleLogin}
        />
      )}
    </header>
  );
};

export default Header;

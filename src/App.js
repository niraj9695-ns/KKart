// // import React, { useState, useEffect } from "react";
// import LoginPopup from "./components/LoginPopup/LoginPopup";
// import HomePage from "./pages/HomePage";
// import React, { useState, useEffect } from "react";

// function App() {
//   const [showLoginPopup, setShowLoginPopup] = useState(false);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setShowLoginPopup(true);
//     }, 5000); // Show popup after 5 seconds

//     return () => clearTimeout(timer);
//   }, []);

//   const handleLogin = (email, password) => {
//     // Call backend login API here
//     fetch("http://localhost:8080/user/login", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email, password }),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         if (data.success) {
//           localStorage.setItem("authToken", data.token);
//           setShowLoginPopup(false);
//         } else {
//           alert(data.message);
//         }
//       })
//       .catch((err) => console.error("Login Error:", err));
//   };

//   const handleRegisterClick = () => {
//     window.location.href = "/register"; // Redirect to register page
//   };

//   const handleClosePopup = () => setShowLoginPopup(false);

//   return (
//     <div className="App">
//       <HomePage />
//       {showLoginPopup && (
//         <LoginPopup
//           onClose={handleClosePopup}
//           onRegisterClick={handleRegisterClick}
//           onLogin={handleLogin}
//         />
//       )}
//     </div>
//   );
// }

// export default App;

//-------------------------------------main 2--------------------------------------------------------
// import React from "react";
// import Header from "./components/Header/Header";
// import HomePage from "./pages/HomePage";
// import Footer from "./components/Footer/Footer";

// function App() {
//   return (
//     <div className="App">
//       <Header />
//       <HomePage />
//       <Footer />
//     </div>
//   );
// }

// export default App;

//--------------------------------------------------------------

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import UserRegistration from "./pages/UserRegistration";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import ProductDetails from "./pages/ProductDetails";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/user-registration" element={<UserRegistration />} />
          <Route path="/login" element={<LoginPopup />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart/:userId" element={<CartPage />} />
          <Route path="/checkout/:userId" element={<CheckoutPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

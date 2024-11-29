// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// // import "bootstrap/dist/css/bootstrap.min.css";

// const CustomerProductList = () => {
//   const [products, setProducts] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const navigate = useNavigate();
//   const { categoryId, subcategoryId, subsubcategoryId } = useParams();

//   useEffect(() => {
//     fetchProducts();
//   }, [subcategoryId, subsubcategoryId]); // Re-fetch products when subsubcategoryId or subcategoryId changes

//   const fetchProducts = async () => {
//     try {
//       const params = {};
//       if (subcategoryId) params.subcategoryId = subcategoryId;
//       if (subsubcategoryId) params.subsubcategoryId = subsubcategoryId;

//       const response = await axios.get(
//         "http://localhost:8080/api/products/filter",
//         { params }
//       );
//       console.log("Fetched products:", response.data);
//       setProducts(response.data);
//     } catch (error) {
//       console.error("Error fetching products:", error);
//     }
//   };

//   // Filter products based on search term
//   const filteredProducts = products.filter((product) =>
//     product.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const handleProductClick = (productId) => {
//     navigate(`/product/${productId}`);
//   };

//   return (
//     <div
//       className="container my-5"
//       style={{ backgroundColor: "white", color: "white", minHeight: "100vh" }}
//     >
//       <button onClick={() => navigate(-1)} className="btn btn-secondary mb-3">
//         &larr; Back
//       </button>

//       <h2 className="mb-4">Available Products</h2>

//       <div className="mb-4">
//         <input
//           type="text"
//           placeholder="Search products..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           className="form-control"
//         />
//       </div>

//       {/* Removed spacing between rows and columns */}
//       <div className="row row-cols-2 row-cols-md-4 gx-0 gy-0">
//         {" "}
//         {/* gx-0 and gy-0 remove all gaps */}
//         {filteredProducts.length > 0 ? (
//           filteredProducts.map((product) => {
//             const firstVariant = product.variants && product.variants[0];

//             return (
//               <div key={product.id} className="col">
//                 <div
//                   className="card shadow-sm h-100"
//                   onClick={() => handleProductClick(product.id)}
//                   style={{
//                     cursor: "pointer",
//                     margin:
//                       "0" /* Ensure no additional space around the card */,
//                     borderRadius: "0",
//                   }}
//                 >
//                   <p
//                     className="card-text"
//                     style={{ fontSize: "0.875rem", marginBottom: "1rem" }}
//                   >
//                     {product.subcategory ? product.subcategory.name : "N/A"}
//                   </p>
//                   {firstVariant &&
//                     firstVariant.images &&
//                     firstVariant.images.length > 0 && (
//                       <div className="image-container1">
//                         <img
//                           src={`data:image/jpeg;base64,${firstVariant.images[0]}`}
//                           alt={firstVariant.name}
//                           className="card-img-top"
//                           style={{
//                             objectFit: "contain",
//                             height: "150px",
//                             width:
//                               "100%" /* Ensure the image spans the card width */,
//                           }}
//                         />
//                       </div>
//                     )}
//                   <div className="card-body" style={{ padding: "0.75rem" }}>
//                     <h5
//                       className="card-title"
//                       style={{ fontSize: "1rem", marginBottom: "0.5rem" }}
//                     >
//                       {product.name}
//                     </h5>

//                     <div className="product-details">
//                       <span
//                         className="product-price"
//                         style={{
//                           fontSize: "0.95rem",
//                           display: "block",
//                           marginBottom: "1rem",
//                         }}
//                       >
//                         ₹{firstVariant ? firstVariant.price : "N/A"}
//                       </span>
//                       <div
//                         className="buttons-container"
//                         style={{ display: "flex", flexDirection: "row" }}
//                       >
//                         <button
//                           className="btn btn-outline-primary btn-sm mb-2"
//                           style={{
//                             fontSize: "0.6rem",
//                             padding: "0.25rem 0.5rem",
//                             marginRight: "0.6rem",
//                           }}
//                         >
//                           Wishlist
//                         </button>
//                         <button
//                           className="btn btn-outline-secondary btn-sm"
//                           style={{
//                             fontSize: "0.6rem",
//                             padding: "0.25rem 0.5rem",
//                             height: "1.6rem",
//                           }}
//                         >
//                           Compare
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             );
//           })
//         ) : (
//           <div className="col-12">
//             <p>No products found for this category.</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CustomerProductList;

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./CustomerProductList.css"; // Import the separate CSS file

const CustomerProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { categoryId, subcategoryId, subsubcategoryId } = useParams();

  useEffect(() => {
    fetchProducts();
  }, [subcategoryId, subsubcategoryId]);

  const fetchProducts = async () => {
    try {
      const params = {};
      if (subcategoryId) params.subcategoryId = subcategoryId;
      if (subsubcategoryId) params.subsubcategoryId = subsubcategoryId;

      const response = await axios.get(
        "http://localhost:8080/api/products/filter",
        { params }
      );
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="product-list-container">
      <button onClick={() => navigate(-1)} className="back-button">
        &larr; Back
      </button>

      <h2 className="title">Available Products</h2>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="product-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => {
            const firstVariant = product.variants && product.variants[0];

            return (
              <div key={product.id} className="product-card">
                <div
                  className="product-card-content"
                  onClick={() => handleProductClick(product.id)}
                >
                  {firstVariant &&
                    firstVariant.images &&
                    firstVariant.images.length > 0 && (
                      <img
                        src={`data:image/jpeg;base64,${firstVariant.images[0]}`}
                        alt={product.name}
                        className="product-image"
                      />
                    )}
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-price">
                    ₹{firstVariant ? firstVariant.price : "N/A"}
                  </p>
                  <div className="action-buttons">
                    <button className="wishlist-button">Wishlist</button>
                    <button className="compare-button">Compare</button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p className="no-products">No products found for this category.</p>
        )}
      </div>
    </div>
  );
};

export default CustomerProductList;

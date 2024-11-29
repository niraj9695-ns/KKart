// import React, { useEffect, useState, useRef } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./ProductDetails.css";

// const ProductDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [currentVariant, setCurrentVariant] = useState(null);
//   const [variantImages, setVariantImages] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [dimensions, setDimensions] = useState([]);
//   const sliderRef = useRef();
//   const [variants, setVariants] = useState([]);
//   const [quantity, setQuantity] = useState(1); // Default quantity for the cart

//   // Fetch the userId from localStorage or JWT token
//   const getUserId = () => {
//     const userId = localStorage.getItem("userId"); // Fetch userId from localStorage
//     if (!userId) {
//       alert("You need to log in to perform this action.");
//       navigate("/login"); // Redirect to login if user is not logged in
//     }
//     return userId;
//   };

//   const userId = getUserId(); // Retrieve userId dynamically

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const productResponse = await axios.get(
//           `http://localhost:8080/api/products/${id}`
//         );
//         setProduct(productResponse.data);

//         const variantResponse = await axios.get(
//           `http://localhost:8080/api/products/${id}/variants`
//         );
//         const fetchedVariants = variantResponse.data;
//         setVariants(fetchedVariants);

//         if (fetchedVariants.length > 0) {
//           setCurrentVariant(fetchedVariants[0]);
//           setVariantImages(getFirstImagePerColor(fetchedVariants));
//           setDimensions(
//             getUniqueDimensionsForVariant(fetchedVariants, fetchedVariants[0])
//           );
//         }

//         setLoading(false);
//       } catch (error) {
//         setError("Error fetching product details");
//         setLoading(false);
//       }
//     };

//     fetchProduct();
//   }, [id]);

//   const getUniqueDimensionsForVariant = (variants, selectedVariant) => {
//     const filteredVariants = variants.filter(
//       (variant) => variant.color === selectedVariant.color
//     );
//     return [...new Set(filteredVariants.map((variant) => variant.dimensions))];
//   };

//   const getFirstImagePerColor = (variants) => {
//     const seenColors = new Set();
//     const uniqueImages = [];

//     variants.forEach((variant) => {
//       if (!seenColors.has(variant.color)) {
//         seenColors.add(variant.color);
//         uniqueImages.push(variant.images[0]);
//       }
//     });

//     return uniqueImages;
//   };

//   const handleDotClick = (index) => {
//     setCurrentIndex(index);
//     const scrollTo = sliderRef.current.clientWidth * index;
//     sliderRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
//   };

//   const handleVariantClick = (selectedVariant) => {
//     setCurrentVariant(selectedVariant);
//     setDimensions(getUniqueDimensionsForVariant(variants, selectedVariant));
//   };

//   const handleVariantMouseOver = (selectedVariant) => {
//     setCurrentVariant(selectedVariant);
//     setDimensions(getUniqueDimensionsForVariant(variants, selectedVariant));
//   };

//   const handleDimensionChange = (event) => {
//     const selectedDimension = event.target.value;
//     handleVariantClick(
//       variants.find(
//         (v) =>
//           v.color === currentVariant.color && v.dimensions === selectedDimension
//       )
//     );
//   };

//   const handleScroll = () => {
//     const slider = sliderRef.current;
//     const imageWidth = slider.clientWidth;
//     const newIndex = Math.round(slider.scrollLeft / imageWidth);
//     setCurrentIndex(newIndex);
//   };

//   const handleAddToCart = async () => {
//     if (!currentVariant) {
//       alert("Please select a variant to add to the cart.");
//       return;
//     }

//     try {
//       const response = await axios.post(
//         "http://localhost:8080/api/cart/add",
//         null,
//         {
//           params: {
//             userId: userId, // Dynamically fetch the userId
//             productId: product.id,
//             variantId: currentVariant.id,
//             quantity: quantity,
//           },
//         }
//       );

//       alert("Product added to cart successfully!");
//     } catch (error) {
//       console.error("Error adding product to cart:", error);
//       alert("Failed to add product to cart.");
//     }
//   };

//   useEffect(() => {
//     const slider = sliderRef.current;
//     if (slider) {
//       slider.addEventListener("scroll", handleScroll);
//       return () => slider.removeEventListener("scroll", handleScroll);
//     }
//   }, []);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;
//   if (!product) return <div>Product not found</div>;

//   return (
//     <div className="product-detail-container">
//       <div className="slider-wrapper">
//         <div className="slider-container" ref={sliderRef}>
//           {currentVariant &&
//             currentVariant.images.map((image, index) => (
//               <img
//                 key={index}
//                 src={`data:image/jpeg;base64,${image}`}
//                 alt={`Variant Image ${index}`}
//                 className={`large-image ${
//                   currentIndex === index ? "active" : ""
//                 }`}
//               />
//             ))}
//         </div>

//         <div className="dot-container">
//           {currentVariant &&
//             currentVariant.images.map((_, index) => (
//               <span
//                 key={index}
//                 className={`dot ${currentIndex === index ? "active" : ""}`}
//                 onClick={() => handleDotClick(index)}
//               ></span>
//             ))}
//         </div>
//       </div>

//       <div className="right-section">
//         <h2>{product.name}</h2>
//         <p className="price">
//           ₹{currentVariant ? currentVariant.price.toFixed(2) : "0.00"}
//         </p>
//         <p
//           className={
//             currentVariant && currentVariant.stock > 0
//               ? "in-stock"
//               : "out-of-stock"
//           }
//         >
//           {currentVariant && currentVariant.stock > 0
//             ? "In Stock"
//             : "Out of Stock"}
//         </p>

//         {/* Color Options */}
//         <div className="color-buttons">
//           <h3>Color Options:</h3>
//           <div className="variant-images">
//             {variantImages.length > 0 ? (
//               variantImages.map((image, index) => (
//                 <div
//                   key={index}
//                   onMouseOver={() => handleVariantMouseOver(variants[index])}
//                   className={`variant-image ${
//                     currentVariant?.color === variants[index].color
//                       ? "active"
//                       : ""
//                   }`}
//                 >
//                   <img
//                     src={`data:image/jpeg;base64,${image}`}
//                     alt={`Variant ${index + 1}`}
//                   />
//                 </div>
//               ))
//             ) : (
//               <p>No color options available.</p>
//             )}
//           </div>

//           <div>
//             {currentVariant ? (
//               <p>
//                 <strong>Color:</strong> {currentVariant.color}
//               </p>
//             ) : (
//               <p>No variant selected.</p>
//             )}
//           </div>
//         </div>

//         {/* Dimension Dropdown */}
//         {currentVariant && (
//           <div className="dimension-dropdown">
//             <h3>Select Dimensions:</h3>
//             <select
//               onChange={handleDimensionChange}
//               value={currentVariant?.dimensions || ""}
//             >
//               {dimensions.map((dimension, index) => (
//                 <option key={index} value={dimension}>
//                   {dimension}
//                 </option>
//               ))}
//             </select>
//           </div>
//         )}

//         {/* Add to Cart Button */}
//         <div className="cart-buttons">
//           <button className="btn btn-primary" onClick={handleAddToCart}>
//             Add to Cart
//           </button>
//         </div>

//         {/* Description */}
//         <p>
//           <strong>Description:</strong>{" "}
//           {currentVariant ? currentVariant.description : product?.description}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default ProductDetails;
import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./ProductDetails.css";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentVariant, setCurrentVariant] = useState(null);
  const [variantImages, setVariantImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dimensions, setDimensions] = useState([]);
  const sliderRef = useRef();
  const [variants, setVariants] = useState([]);
  const [quantity, setQuantity] = useState(1); // Default quantity for the cart

  useEffect(() => {
    const fetchProduct = async () => {
      console.log("Fetching product details for ID:", id); // Debugging log
      try {
        const productResponse = await axios.get(
          `http://localhost:8080/api/products/${id}`
        );
        console.log("Product fetched successfully:", productResponse.data); // Debugging log
        setProduct(productResponse.data);

        const variantResponse = await axios.get(
          `http://localhost:8080/api/products/${id}/variants`
        );
        const fetchedVariants = variantResponse.data;
        console.log("Variants fetched successfully:", fetchedVariants); // Debugging log
        setVariants(fetchedVariants);

        if (fetchedVariants.length > 0) {
          setCurrentVariant(fetchedVariants[0]);
          setVariantImages(getFirstImagePerColor(fetchedVariants));
          setDimensions(
            getUniqueDimensionsForVariant(fetchedVariants, fetchedVariants[0])
          );
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching product details:", error); // Debugging log
        setError("Error fetching product details");
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const getUniqueDimensionsForVariant = (variants, selectedVariant) => {
    const filteredVariants = variants.filter(
      (variant) => variant.color === selectedVariant.color
    );
    return [...new Set(filteredVariants.map((variant) => variant.dimensions))];
  };

  const getFirstImagePerColor = (variants) => {
    const seenColors = new Set();
    const uniqueImages = [];

    variants.forEach((variant) => {
      if (!seenColors.has(variant.color)) {
        seenColors.add(variant.color);
        uniqueImages.push(variant.images[0]);
      }
    });

    return uniqueImages;
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index);
    const scrollTo = sliderRef.current.clientWidth * index;
    sliderRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
  };

  const handleVariantClick = (selectedVariant) => {
    setCurrentVariant(selectedVariant);
    setDimensions(getUniqueDimensionsForVariant(variants, selectedVariant));
  };

  const handleVariantMouseOver = (selectedVariant) => {
    setCurrentVariant(selectedVariant);
    setDimensions(getUniqueDimensionsForVariant(variants, selectedVariant));
  };

  const handleDimensionChange = (event) => {
    const selectedDimension = event.target.value;
    handleVariantClick(
      variants.find(
        (v) =>
          v.color === currentVariant.color && v.dimensions === selectedDimension
      )
    );
  };

  const handleScroll = () => {
    const slider = sliderRef.current;
    const imageWidth = slider.clientWidth;
    const newIndex = Math.round(slider.scrollLeft / imageWidth);
    setCurrentIndex(newIndex);
  };

  const handleAddToCart = async () => {
    // Check if user is logged in only during add-to-cart action
    const userId = localStorage.getItem("userId");

    if (!userId) {
      alert("You need to log in to perform this action.");
      navigate("/login"); // Redirect to login if user is not logged in
      return;
    }

    if (!currentVariant) {
      alert("Please select a variant to add to the cart.");
      return;
    }

    const requestData = {
      userId: userId,
      productId: product.id,
      variantId: currentVariant.id,
      quantity: quantity,
    };

    console.log("Attempting to add to cart with data:", requestData); // Debugging log

    try {
      const response = await axios.post(
        "http://localhost:8080/api/cart/add",
        {}, // Send an empty object instead of `null`
        {
          params: requestData,
        }
      );
      console.log("Add to cart response:", response.data); // Debugging log
      alert("Product added to cart successfully!");
    } catch (error) {
      console.error("Error adding product to cart:", error.response || error); // Debugging log
      alert(
        `Failed to add product to cart. ${
          error.response?.data?.message || "Please try again later."
        }`
      );
    }
  };

  useEffect(() => {
    const slider = sliderRef.current;
    if (slider) {
      slider.addEventListener("scroll", handleScroll);
      return () => slider.removeEventListener("scroll", handleScroll);
    }
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="product-detail-container">
      <div className="slider-wrapper">
        <div className="slider-container" ref={sliderRef}>
          {currentVariant &&
            currentVariant.images.map((image, index) => (
              <img
                key={index}
                src={`data:image/jpeg;base64,${image}`}
                alt={`Variant Image ${index}`}
                className={`large-image ${
                  currentIndex === index ? "active" : ""
                }`}
              />
            ))}
        </div>

        <div className="dot-container">
          {currentVariant &&
            currentVariant.images.map((_, index) => (
              <span
                key={index}
                className={`dot ${currentIndex === index ? "active" : ""}`}
                onClick={() => handleDotClick(index)}
              ></span>
            ))}
        </div>
      </div>

      <div className="right-section">
        <h2>{product.name}</h2>
        <p className="price">
          ₹{currentVariant ? currentVariant.price.toFixed(2) : "0.00"}
        </p>
        <p
          className={
            currentVariant && currentVariant.stock > 0
              ? "in-stock"
              : "out-of-stock"
          }
        >
          {currentVariant && currentVariant.stock > 0
            ? "In Stock"
            : "Out of Stock"}
        </p>

        <div className="color-buttons">
          <h3>Color Options:</h3>
          <div className="variant-images">
            {variantImages.length > 0 ? (
              variantImages.map((image, index) => (
                <div
                  key={index}
                  onMouseOver={() => handleVariantMouseOver(variants[index])}
                  className={`variant-image ${
                    currentVariant?.color === variants[index].color
                      ? "active"
                      : ""
                  }`}
                >
                  <img
                    src={`data:image/jpeg;base64,${image}`}
                    alt={`Variant ${index + 1}`}
                  />
                </div>
              ))
            ) : (
              <p>No color options available.</p>
            )}
          </div>

          <div>
            {currentVariant ? (
              <p>
                <strong>Color:</strong> {currentVariant.color}
              </p>
            ) : (
              <p>No variant selected.</p>
            )}
          </div>
        </div>

        {currentVariant && (
          <div className="dimension-dropdown">
            <h3>Select Dimensions:</h3>
            <select
              onChange={handleDimensionChange}
              value={currentVariant?.dimensions || ""}
            >
              {dimensions.map((dimension, index) => (
                <option key={index} value={dimension}>
                  {dimension}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="cart-buttons">
          <button className="btn btn-primary" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>

        <p>
          <strong>Description:</strong>{" "}
          {currentVariant ? currentVariant.description : product?.description}
        </p>
      </div>
    </div>
  );
};

export default ProductDetails;

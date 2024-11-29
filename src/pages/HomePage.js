import React from "react";
import Header from "../components/Header/Header";
import Banner from "../components/Banner/Banner";
import Categories from "../components/Categories/Categories";
import Categories2 from "../components/Categories2/Categories2";
import Footer from "../components/Footer/Footer";
import CustomerProductList from "../components/Product/CustomerProductList";

// Import other components like Banner, Categories, FeaturedProducts, etc., when ready

const HomePage = () => {
  return (
    <div className="homepage">
      {/* <Header /> */}
      <Banner />
      <Categories />
      <Categories2 />
      <CustomerProductList />
      {/* <Footer /> */}
      {/* Add other components here */}
      {/* <div className="banner">Banner/Slider Section (Coming Soon)</div> */}
      {/* <div className="categories">Top Categories Section (Coming Soon)</div>
      <div className="featured-products">
        Featured Products Section (Coming Soon)
      </div>
      <div className="product-cards">Product Cards Section (Coming Soon)</div>
      <div className="services">Our Services Section (Coming Soon)</div>
      <footer className="footer">Footer Section (Coming Soon)</footer> */}
    </div>
  );
};

export default HomePage;

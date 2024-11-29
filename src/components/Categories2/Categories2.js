import React from "react";
import "./Categories2.css";

const categories = [
  { id: 1, name: "Display, Instructions & Direction Boards", link: "/display" },
  { id: 2, name: "Hangers", link: "/hangers" },
  { id: 3, name: "Queue Managers", link: "/queue-managers" },
  { id: 4, name: "Spare Parts", link: "/spare-parts" },
  { id: 5, name: "Tissue Paper & Soap Dispenser", link: "/tissue-paper" },
  { id: 6, name: "Trash Can Bin & Waste Bins", link: "/trash-can" },
  { id: 7, name: "Trolley", link: "/trolley" },
  { id: 8, name: "Others", link: "/others" },
];

const Categories2 = () => {
  const scrollLeft = () => {
    document
      .getElementById("category-slider")
      .scrollBy({ left: -250, behavior: "smooth" });
  };

  const scrollRight = () => {
    document
      .getElementById("category-slider")
      .scrollBy({ left: 250, behavior: "smooth" });
  };

  return (
    <div className="categories2-container">
      <div className="categories2-slider-wrapper">
        <div className="categories2-header">
          <span>Unique Products from Stores Nearby</span>
          <a href="/products" className="see-all-products">
            See All Products
          </a>
        </div>
        <div className="categories2-content">
          <button className="arrow-btn left" onClick={scrollLeft}>
            {"<"}
          </button>
          <div id="category-slider" className="categories2-slider">
            {categories.map((category) => (
              <div key={category.id} className="category-card">
                <a href={category.link}>
                  <div className="image-container">
                    <img
                      src={require(`../../images/bimg.jpg`)}
                      alt={category.name}
                    />
                  </div>
                </a>
                <a href={category.link} className="category-name">
                  {category.name}
                </a>
              </div>
            ))}
          </div>
          <button className="arrow-btn right" onClick={scrollRight}>
            {">"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Categories2;

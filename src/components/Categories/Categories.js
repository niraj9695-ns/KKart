// import React from "react";
// import "./Categories.css";
// import aug1 from "../../images/aug1.jpg";
// import aug4 from "../../images/aug4.jpg";

// const Categories = () => {
//   const categories = [
//     {
//       title: "Winter Essentials",
//       items: [
//         {
//           name: "Men's Jackets",
//           image: aug1,
//           discount: "Min. 50% Off",
//           link: "/jackets",
//         },
//         {
//           name: "Men's Sweaters",
//           image: aug1,
//           discount: "Min. 50% Off",
//           link: "/sweaters",
//         },
//         {
//           name: "Men's Sweatshirts",
//           image: aug1,
//           discount: "New Range",
//           link: "/sweatshirts",
//         },
//         {
//           name: "Men's Mufflers",
//           image: aug1,
//           discount: "Min. 50% Off",
//           link: "/mufflers",
//         },
//       ],
//     },
//     {
//       title: "Best Gadgets & Appliances",
//       items: [
//         {
//           name: "Mobiles",
//           image: aug4,
//           discount: "Min. 50% Off",
//           link: "/mobiles",
//         },
//         {
//           name: "Air Conditioners",
//           image: aug4,
//           discount: "Min. 50% Off",
//           link: "/air-conditioners",
//         },
//         {
//           name: "Televisions",
//           image: aug4,
//           discount: "Min. 30% Off",
//           link: "/televisions",
//         },
//         {
//           name: "Tablets",
//           image: aug4,
//           discount: "Min. 40% Off",
//           link: "/tablets",
//         },
//       ],
//     },
//     {
//       title: "Fashion's Top Deals",
//       items: [
//         {
//           name: "Women's Sarees",
//           image: aug4,
//           discount: "Min. 50% Off",
//           link: "/sarees",
//         },
//         {
//           name: "Women's Ethnic Sets",
//           image: aug4,
//           discount: "Top Deals",
//           link: "/ethnic-sets",
//         },
//         {
//           name: "Women's Kurtas",
//           image: aug4,
//           discount: "Min. 50% Off",
//           link: "/kurtas",
//         },
//         {
//           name: "Women's Formal Suit Fabric",
//           image: aug4,
//           discount: "Min. 50% Off",
//           link: "/formal-suits",
//         },
//       ],
//     },
//   ];

//   return (
//     <div className="categories-container">
//       {categories.map((category, index) => (
//         <div className="category-block" key={index}>
//           <h2>{category.title}</h2>
//           <div className="category-items">
//             {category.items.map((item, idx) => (
//               <a href={item.link} key={idx} className="category-item">
//                 <img src={item.image} alt={item.name} />
//                 <p>{item.name}</p>
//                 <span>{item.discount}</span>
//               </a>
//             ))}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Categories;

import React from "react";
import "./Categories.css";
import aug1 from "../../images/aug1.jpg";
import aug4 from "../../images/aug4.jpg";

const Categories = () => {
  const categories = [
    {
      title: "Hot Equipments",
      items: [
        {
          name: "Men's Jackets",
          image: aug1,
          discount: "Min. 50% Off",
          link: "/jackets",
        },
        {
          name: "Men's Sweaters",
          image: aug1,
          discount: "Min. 50% Off",
          link: "/sweaters",
        },
        {
          name: "Men's Sweatshirts",
          image: aug1,
          discount: "New Range",
          link: "/sweatshirts",
        },
        {
          name: "Men's Mufflers",
          image: aug1,
          discount: "Min. 50% Off",
          link: "/mufflers",
        },
      ],
    },
    {
      title: "Cold Equipments",
      items: [
        {
          name: "Mobiles",
          image: aug4,
          discount: "Min. 50% Off",
          link: "/mobiles",
        },
        {
          name: "Air Conditioners",
          image: aug4,
          discount: "Min. 50% Off",
          link: "/air-conditioners",
        },
        {
          name: "Televisions",
          image: aug4,
          discount: "Min. 30% Off",
          link: "/televisions",
        },
        {
          name: "Tablets",
          image: aug4,
          discount: "Min. 40% Off",
          link: "/tablets",
        },
      ],
    },
    {
      title: "Accessories",
      items: [
        {
          name: "Women's Sarees",
          image: aug4,
          discount: "Min. 50% Off",
          link: "/sarees",
        },
        {
          name: "Women's Ethnic Sets",
          image: aug4,
          discount: "Top Deals",
          link: "/ethnic-sets",
        },
        {
          name: "Women's Kurtas",
          image: aug4,
          discount: "Min. 50% Off",
          link: "/kurtas",
        },
        {
          name: "Women's Formal Suit Fabric",
          image: aug4,
          discount: "Min. 50% Off",
          link: "/formal-suits",
        },
      ],
    },
  ];

  return (
    <div className="categories-container">
      {categories.map((category, index) => (
        <div className="category-block" key={index}>
          <div className="block-header">
            <h2>{category.title}</h2>
            <button className="arrow-button">→</button>
          </div>
          <div className="category-items">
            {category.items.map((item, idx) => (
              <a href={item.link} key={idx} className="category-item">
                <img src={item.image} alt={item.name} />
                <div className="item-details">
                  <p className="item-name">{item.name}</p>
                  <p className="item-discount">{item.discount}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Categories;

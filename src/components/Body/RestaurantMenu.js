import React from "react";
import { useParams , useLocation } from "react-router-dom";
import mockMenuData from "../../utils/mockMenuData";

const RestaurantMenu = () => {
  const { resId } = useParams();
  const location = useLocation();

  const restaurantName = location.state?.restaurantName;

  const restaurant = mockMenuData[resId];

  if (!restaurant) {
    return <h2>No menu found for this restaurant</h2>;
  }

  return (
    <div className="menu">
      <h1>{restaurantName}</h1>
      <h2>Menu</h2>

      <ul>
        {restaurant.menu.map((item) => (
          <li key={item.id}>
            {item.name} — ₹{item.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RestaurantMenu;

import React, { useState, useEffect } from "react";
import ResCard from "./ResCard";
import ShimmerCard from "./ShimmerCard";
import "./Body.css";
import { IMAGE_BASE_URL } from "../../utils/constants";
import { useOutletContext } from "react-router-dom";
import { Link } from "react-router-dom";

const Body = () => {
  const { searchText } = useOutletContext();
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filteredRestaurants, setfilteredRestaurants] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await fetch(
        "https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.4894154&lng=77.01186960000001&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING",
      );
      const json = await data.json();
      const restaurants =
        json.data.cards[4].card.card.gridElements.infoWithStyle.restaurants;

      setListOfRestaurants(restaurants);
      setfilteredRestaurants(restaurants);

      console.log("Swiggy Data :", json);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!searchText) {
      setfilteredRestaurants(listOfRestaurants);
      return;
    }
    const filtered = listOfRestaurants.filter((res) =>
      res.info.name.toLowerCase().includes(searchText.toLowerCase()),
    );

    setfilteredRestaurants(filtered);
  }, [searchText, listOfRestaurants]);

  const handleTopRated = () => {
    const topRated = listOfRestaurants.filter(
      (res) => res.info.avgRating >= 4.3,
    );
    setfilteredRestaurants(topRated);
  };

  return listOfRestaurants.length === 0 ? (
    <ShimmerCard />
  ) : (
    <>
      <div className="body-wrapper">
        <div className="content_container">
          <div className="filter_bar">
            <button className="filter_btn" onClick={handleTopRated}>
              Top Rated
            </button>
          </div>

          <div className="body">
            {filteredRestaurants.map((res) => (
              <Link
                key={res.info.id}
                to={`/restaurant/${res.info.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
                state={{ restaurantName: res.info.name }}
              >
                <ResCard
                  key={res.info.id}
                  name={res.info.name}
                  cuisine={res.info.cuisines.join(", ")}
                  rating={res.info.avgRating}
                  time={`${res.info.sla.deliveryTime} mins`}
                  image={IMAGE_BASE_URL + res.info.cloudinaryImageId}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Body;

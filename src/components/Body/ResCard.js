import React from "react";
import "./ResCard.css";

const ResCard = ({ name, cuisine, rating, time, image }) => {
  return (
    <div className="res-card">
      {/* Restaurant Image */}
      <img
        className="res-image"
        src={image}
        alt={name}
        onError={(e) => {
          e.target.src =
            "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=60";
        }}
      />

      {/* Restaurant Details */}
      <div className="res-details">
        <h3 className="res-name">{name}</h3>
        <p className="res-cuisine">{cuisine}</p>

        <div className="res-info">
          <span className="rating">⭐{rating}</span>
          <span className="time">{time}</span>
        </div>
      </div>
    </div>
  );
};
export default ResCard;

import React from "react";
import "./Shimmer.css";

const ShimmerCard = () => {
  return (
    <div className="shimmer-container">
    {Array(8)
    .fill("")
    .map((_ , index) => (

    <div className="shimmer-card" key = {index}>
    <div className="shimmer-img"></div>
    <div className="shimmer-line"></div>
    <div className="shimmer-line short"></div>
    </div>

    ))}
    </div>
  );
}

export default ShimmerCard ;
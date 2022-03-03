import React, { useState, useEffect } from "react";
import "./rating.css";

const RatingSystem = ({ NumOfStars, rating, setRating }) => {
  const [stars, setStars] = useState([]);
  const [hovered, setHovered] = useState(0);

  useEffect(() => {
    let starCount = NumOfStars || 5;

    // Create stars array from NumOfStars given or 5 by default
    const starsArray = [];
    for (let i = 1; i <= starCount; i++) {
      starsArray.push(i);
    }
    setStars(starsArray);
  }, [NumOfStars]);

  const updateRating = (star) => {
    rating === star ? setRating(0) : setRating(star);
  };

  const starsView = (star) => {
    /* 
     - If rating or hovered val is greater than selected star, 
       display the star filled 
    */
    return rating < star ? (
      hovered < star ? (
        <i className="far fa-star "></i>
      ) : (
        <i className="fas fa-star "></i>
      )
    ) : hovered < star && hovered != 0 ? (
      <i className="far fa-star"></i>
    ) : (
      <i className="fas fa-star "></i>
    );
  };

  return (
    <div className="rating">
      {/* Loop through all stars and give them function properties */}
      {stars.map((star) => (
        <span
          key={star}
          className="star"
          onClick={() => updateRating(star)}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
        >
          {starsView(star)}
        </span>
      ))}
    </div>
  );
};

export default RatingSystem;

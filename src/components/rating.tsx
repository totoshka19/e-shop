import React from 'react';

type RatingProps = {
  rating: number;
};

function Rating({ rating }: RatingProps) {
  const maxStars = 5;

  return (
    <div className="rating">
      {[...Array(maxStars)].map((_, index) => (
        <span
          key={index}
          className={`rating__star ${index < rating ? 'rating__star--active' : ''}`}
        >
          &#9733;
        </span>
      ))}
    </div>
  );
}

export default Rating;

type RatingProps = {
  rating: number;
};

function Rating({ rating }: RatingProps) {
  const maxStars = 5;
  const stars = Array.from({ length: maxStars }, (_, index) => index);

  return (
    <div className="rating">
      {stars.map((starIndex) => (
        <span
          key={starIndex}
          className={`rating__star ${starIndex < rating ? 'rating__star--active' : ''}`}
        >
          &#9733;
        </span>
      ))}
    </div>
  );
}

export default Rating;

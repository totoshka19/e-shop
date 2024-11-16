import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
// import Rating from './Rating'; // Компонент для отображения рейтинга
import { RootState, AppDispatch } from '../store';
import { fetchReviews } from '../store/reviews-slice';

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

function Reviews() {
  const dispatch = useDispatch<AppDispatch>();
  const reviews = useSelector((state: RootState) => state.reviews.reviews);
  const loading = useSelector((state: RootState) => state.reviews.loading);
  const error = useSelector((state: RootState) => state.reviews.error);

  useEffect(() => {
    dispatch(fetchReviews());
  }, [dispatch]);

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="review-carousel">
      <h2>Отзывы покупателей</h2>
      <Slider {...settings}>
        {reviews.map((review) => (
          <div key={review.id} className="review-card">
            <h3>{review.username}</h3>
            {/*<Rating rating={review.rating} />*/}
            <p className="review-date">{review.date}</p>
            <p className="review-text">{review.review}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default Reviews;

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
// import Rating from './Rating'; // Компонент для отображения рейтинга
import { RootState, AppDispatch } from '../store';
import { fetchReviews } from '../store/reviews-slice';

const baseSettings = {
  infinite: false,
  slidesToShow: 3,
  slidesToScroll: 3,
};

function Reviews() {
  const dispatch = useDispatch<AppDispatch>();
  const reviews = useSelector((state: RootState) => state.reviews.reviews);
  const loading = useSelector((state: RootState) => state.reviews.loading);
  const error = useSelector((state: RootState) => state.reviews.error);
  const [sliderSettings, setSliderSettings] = useState(baseSettings);
  const [carouselPadding, setCarouselPadding] = useState('0 30px');

  useEffect(() => {
    dispatch(fetchReviews());
  }, [dispatch]);

  useEffect(() => {
    if (reviews.length <= 3) {
      setSliderSettings({
        ...baseSettings,
        arrows: false,
        slidesToShow: reviews.length,
        slidesToScroll: reviews.length,
        draggable: false,
      });
      setCarouselPadding('0');
    } else {
      setSliderSettings(baseSettings);
      setCarouselPadding('0 30px');
    }
  }, [reviews]);

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="reviews__carousel" style={{ padding: carouselPadding }}>
      <Slider {...sliderSettings}>
        {reviews.map((review) => (
          <div key={review.id} className="review__card">
            <h3 className="review__username">{review.username}</h3>
            {/*<Rating rating={review.rating} />*/}
            <p className="review__date">{review.date}</p>
            <p className="review__text"><span>Достоинства: </span>{review.review}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default Reviews;

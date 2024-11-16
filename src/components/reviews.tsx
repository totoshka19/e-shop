import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
// import Rating from './Rating'; // Компонент для отображения рейтинга
import { RootState, AppDispatch } from '../store';
import { fetchReviews } from '../store/reviews-slice';

/*!TODO доделать Rating*/

const baseSettings = {
  infinite: false,
  slidesToShow: 3,
  slidesToScroll: 3,
};

function Reviews() {
  const dispatch = useDispatch<AppDispatch>();
  const reviews: Review[] = useSelector((state: RootState) => state.reviews.reviews);
  const loading: boolean = useSelector((state: RootState) => state.reviews.loading);
  const error: string | null = useSelector((state: RootState) => state.reviews.error);
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

  if (reviews.length === 0) {
    return null;
  }

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <section className="reviews">
      <div className="container">
        <h2 className="reviews__title">Отзывы наших покупателей</h2>
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
      </div>
    </section>
  );
}

export default Reviews;

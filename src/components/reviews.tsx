import { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Rating from './rating';
import { AppDispatch, RootState } from '../store/store';
import { fetchReviews } from '../store/reviews-slice';
import { Review } from '../types/review';

type SliderSettings = {
  infinite: boolean;
  slidesToShow: number;
  slidesToScroll: number;
  arrows?: boolean;
  draggable?: boolean;
}

const baseSettings: SliderSettings = {
  infinite: false,
  slidesToShow: 3,
  slidesToScroll: 3,
  arrows: true,
};

function Reviews() {
  const dispatch = useDispatch<AppDispatch>();
  const reviews: Review[] = useSelector((state: RootState) => state.reviews.reviews);
  const loading: boolean = useSelector((state: RootState) => state.reviews.loading);
  const error: string | null = useSelector((state: RootState) => state.reviews.error);
  const [sliderSettings, setSliderSettings] = useState<SliderSettings>(baseSettings);

  useEffect(() => {
    dispatch(fetchReviews());
  }, [dispatch]);

  const updateSliderSettings = useCallback((width: number, reviewsCount: number) => {
    let newSettings: SliderSettings;

    if (reviewsCount <= 3) {
      newSettings = {
        ...baseSettings,
        arrows: false,
        slidesToShow: reviewsCount,
        slidesToScroll: reviewsCount,
        draggable: false,
      };
    } else if (width < 720) {
      newSettings = {
        ...baseSettings,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
      };
    } else if (width < 960) {
      newSettings = {
        ...baseSettings,
        slidesToShow: 2,
        slidesToScroll: 2,
        arrows: true,
      };
    } else {
      newSettings = baseSettings;
    }

    setSliderSettings(newSettings);
  }, []);

  const handleResize = useCallback(() => {
    updateSliderSettings(window.innerWidth, reviews.length);
  }, [reviews.length, updateSliderSettings]);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  useEffect(() => {
    updateSliderSettings(window.innerWidth, reviews.length);
  }, [reviews.length, updateSliderSettings]);

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
        <div className="reviews__carousel">
          <Slider {...sliderSettings}>
            {reviews.map((review) => (
              <div key={review.id} className="review__card">
                <div className="review__wrapper">
                  <h3 className="review__username">{review.username}</h3>
                  <Rating rating={review.rating} />
                </div>
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

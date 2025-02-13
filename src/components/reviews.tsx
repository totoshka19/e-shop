import { useEffect, useState } from 'react';
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

  const handleResize = () => {
    if (window.innerWidth < 720) {
      setSliderSettings({
        ...baseSettings,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
      });
    } else if (window.innerWidth < 960) {
      setSliderSettings({
        ...baseSettings,
        slidesToShow: 2,
        slidesToScroll: 2,
        arrows: true,
      });
    } else {
      setSliderSettings(baseSettings);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (reviews.length <= 3) {
      setSliderSettings({
        ...baseSettings,
        arrows: false,
        slidesToShow: reviews.length,
        slidesToScroll: reviews.length,
        draggable: false,
      });
    } else {
      handleResize();
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

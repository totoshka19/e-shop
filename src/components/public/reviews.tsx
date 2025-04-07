import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Slider, { Settings } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Rating from './rating';
import { AppDispatch, RootState } from '../../store/store';
import { fetchReviews } from '../../store/public/reviews-slice';
import { Review } from '../../types/public/review';

type ResponsiveSetting = {
  breakpoint: number;
  settings: Partial<Settings>;
};

type SliderSettings = Settings & {
  responsive?: ResponsiveSetting[];
};

const baseSliderSettings: SliderSettings = {
  infinite: false,
  slidesToShow: 3,
  slidesToScroll: 3,
  arrows: true,
  responsive: [
    {
      breakpoint: 960,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        arrows: true,
      },
    },
    {
      breakpoint: 720,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
      },
    },
  ],
};

function Reviews() {
  const dispatch = useDispatch<AppDispatch>();
  const reviews: Review[] = useSelector((state: RootState) => state.reviews.reviews);
  const loading: boolean = useSelector((state: RootState) => state.reviews.loading);
  const error: string | null = useSelector((state: RootState) => state.reviews.error);
  const sliderRef = useRef<Slider | null>(null);

  useEffect(() => {
    dispatch(fetchReviews());
  }, [dispatch]);

  useEffect(() => {
    const slider = sliderRef.current;
    if (slider) {
      slider.slickGoTo(0);
    }
  }, [reviews]);

  if (reviews.length === 0) {
    return null;
  }

  // !TODO сделать Spinner

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
          <Slider ref={sliderRef} {...baseSliderSettings}>
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

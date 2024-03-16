import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

const ModelsCarousel = ({ models }) => {
  return (
    <Swiper
      slidesPerView={3}
      spaceBetween={30}
      pagination={{
        clickable: true,
      }}
      modules={[Pagination]}
      className="mySwiper"
    >
      {models.map((model, index) => (
        <SwiperSlide key={index}>
          <div className="card">
            <img src={model.coverImage.url} alt={model.username} className="card-img-top" />
            <div className="card-body">
              <h5 className="card-title">{model.username}</h5>
              <p className="card-text">Likes: {model.likes}</p>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ModelsCarousel;

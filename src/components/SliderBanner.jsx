
import React, { useEffect, useState } from "react";
import axios from "axios";
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';

import SwiperCore from 'swiper';

import {EffectCoverflow,  Autoplay, Navigation, Pagination} from 'swiper/modules';


const SliderBanner = () => {

  SwiperCore.use([Autoplay, Navigation, Pagination]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await axios.get('http://localhost:8000/slider-promo');
      setImages(response.data);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  // console.log(images);

  return (
    <div id='banner-cover'>
      <div id='slider-banner'>
      <Swiper
        effect={'coverflow'}
        spaceBetween={30}
        slidesPerView={'auto'}
        loop={true}
        initialSlide={0}
        centeredSlides={true}
        speed={300}
        autoplay={{
            delay: 2000,
        }}
        coverflowEffect={{
          rotate: 0,
          stretch: 80,
          depth: 250,
          modifier: 1,
          slideShadows: true,
        }}
        modules={[EffectCoverflow]}
        className="swiper-container"
      >
          <div className='swiper-wrapper'>
          {images && images.map((image, index) => (
            <SwiperSlide key={image.id} className='swiper-slide'>
              <img src={image.imageUrl} alt={image.alt} className='img'/>
            </SwiperSlide>
          ))}
          </div>
        </Swiper>
    </div>
  </div>
  );
};

export default SliderBanner;

import React, { useRef } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { sliderData } from "../data/sliderData";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

const Slider = () => {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);

  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty("--progress", 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };
  return (
    <>
      <div className=" h-screen">
        <Swiper
          spaceBetween={0}
          centeredSlides={true}
          speed={900}
          effect={"fade"} // gunakan fade effect
          fadeEffect={{ crossFade: true }} // crossFade untuk transisi lebih halus
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={false}
          modules={[Autoplay, Pagination, Navigation]}
          onAutoplayTimeLeft={onAutoplayTimeLeft}
          className="mySwiper h-full w-full transition-all duration-700 hover:scale-105 ease-in-out"
        >
          {sliderData.map((slide) => (
            <SwiperSlide key={slide.id}>
              <img
                src={slide.image}
                alt=""
                className="w-full h-full object-cover transition-opacity duration-900 ease-in-out"
              />
            </SwiperSlide>
          ))}

          <div className="autoplay-progress" slot="container-end">
            <svg viewBox="0 0 48 48" ref={progressCircle}>
              <circle cx="24" cy="24" r="20"></circle>
            </svg>
            <span ref={progressContent}></span>
          </div>
        </Swiper>
      </div>
    </>
  );
};

export default Slider;

import React from 'react'
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CustomSlider: React.FC = (props) => {

  const { items } = props;
  const settings = {
    arrows: false,
    autoplay: true,
    autoplaySpeed: 0,
    speed: 7000,
    cssEase: "linear",
    pauseOnHover: true,
    slidesToShow: 5,
    responsive: [
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  return (
      <Slider {...settings} style={{ width: '100%' }} >
        {items}
      </Slider>
  )
}

export default CustomSlider;
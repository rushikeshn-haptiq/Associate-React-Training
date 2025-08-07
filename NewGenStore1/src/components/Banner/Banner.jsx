import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const Banner = () => {

  const responsive = {
    all: {
      breakpoint: { max: 4000, min: 0 },
      items: 1,
    },
  };

  const images = [
    'https://byshree.com/cdn/shop/articles/Banner-1.jpg?v=1667985708&width=2048',
    'https://www.chuwi.com/public/upload/image/20220415/c16c2ea0cc141680d7ca75ea66bc84e1.jpg',
    'Images/bags.png',
    'https://cdn.shopify.com/s/files/1/1902/9663/files/boss_collection-new-2021_2048x2048.jpg?v=1614921124',
  ];

  return (
  <Carousel
  responsive={responsive}
  infinite
  autoPlay
  autoPlaySpeed={3000}
  swipeable
  draggable

>
  {images.map((src, index) => (
    <div key={index} className="w-full">
      <img
        src={src}
        alt={`Slide ${index + 1}`}
        className="w-full lg:h-[600px] h-full md:h-[500px] object-cover "
      />
    </div>
  ))}
</Carousel>


  );
};

export default Banner;

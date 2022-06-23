import React from "react";
import "antd/dist/antd.css";
import styles from "../styles/ProductImagesCarousel.module.css";
import { Carousel } from "antd";
import Image from "next/image";
//src
import laptopPic from "../public/laptop.png";
import { baseUrl } from "../constants/baseUrl";

const ProductImagesCarousel = ({ productImages }: any) => {
  return (
    <div className={styles.carouselContainer}>
      {!productImages && (
        <div>
          <Image alt="example" src={laptopPic} width={1000} height={400} />
        </div>
      )}
      <Carousel autoplay>
        {productImages?.map((imageUrl: string, index: number) => (
          <div key={index}>
            <Image
              alt="example"
              src={imageUrl ? `${baseUrl}${imageUrl}` : laptopPic}
              width={1000}
              height={400}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default ProductImagesCarousel;

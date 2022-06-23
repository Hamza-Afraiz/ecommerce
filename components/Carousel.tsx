import React from "react";
import "antd/dist/antd.css";
import styles from "../styles/ProductImagesCarousel.module.css";
import { Carousel } from "antd";
import Image from "next/image";
import laptopPic from "../public/laptop.png";

const ProductImagesCarousel = ({ productImages }: any) => {
  console.log("product images are ", productImages);

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
              src={imageUrl ? `http://localhost:1337${imageUrl}` : laptopPic}
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

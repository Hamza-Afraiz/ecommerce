import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, notification } from "antd";
import "antd/dist/antd.css";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import laptopPic from "../public/laptop.png";
import styles from "../styles/Checkout.module.css";
const { Meta } = Card;
type ProductType = {
  title: string;
  description: string;
  imageUrl: string | string[];
  id: number;
};
const CheckoutProduct = ({ title, description, imageUrl, id }: ProductType) => {
  const [cartCount, setCartCount] = React.useState<number>(0);
  const [isAdded, setIsAdded] = React.useState<boolean>(false);
  const [productCount, setProductCount] = React.useState<number>(0);
  const router = useRouter();

  const AddProductToCart = async () => {
    const isPosted = await axios.post("http://localhost:1337/api/carts", {
      data: {
        quantity: productCount,
        product: {
          id,
        },
      },
    });
    isPosted &&
      notification.open({
        message: "Added to Cart Successfullt",
      });
  };
  return (
    <Link
      href={
        !Object.keys(router?.query).includes("productName")
          ? `${router.asPath}/productName/${title}`
          : router?.asPath
      }
    >
      <Card
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: 400,

          padding: 10,
          boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
          maxHeight: 400,
        }}
        cover={
          <Image
            alt="example"
            src={imageUrl ? `http://localhost:1337${imageUrl}` : laptopPic}
            width={400}
            height={200}
          />
        }
      >
        <Meta
          avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
          title={title}
          description={description}
        />
        <div className={styles.cartCount}>
          <MinusOutlined
            className={styles.iconStyle}
            onClick={() => {
              setProductCount(productCount - 1);
            }}
          />
          {productCount}
          <PlusOutlined
            onClick={() => {
              setProductCount(productCount + 1);
            }}
            className={styles.iconStyle}
          />
        </div>
        <Button
          block
          onClick={() => {
            setIsAdded(true);
            AddProductToCart();
          }}
          type="primary"
          disabled={isAdded}
        >
          {!isAdded ? "Add to Cart" : "Added to Cart"}
        </Button>
      </Card>
    </Link>
  );
};

export default CheckoutProduct;

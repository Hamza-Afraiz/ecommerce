import React from "react";
import "antd/dist/antd.css";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Avatar, Card } from "antd";
const { Meta } = Card;
import Image from "next/image";
import laptopPic from "../public/laptop.png";
import Link from "next/link";
import { useRouter } from "next/router";
type ProductType = {
  title: string;
  description: string;
};
const ProductDetails = ({ title, description }: ProductType) => {
  const router = useRouter();
  console.log("title is ", title, "from", router.asPath);
  return (
    <Card
      style={{
        width: 300,
        margin: 10,
        padding: 10,
      }}
      cover={<Image alt="example" src={laptopPic} />}
    >
      <Meta
        avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
        title={title}
        description={description}
      />
      <Link href={`${router.asPath}/productName/${title}`}>
        <a>Go</a>
      </Link>
    </Card>
  );
};

export default ProductDetails;

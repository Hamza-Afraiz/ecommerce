import { Avatar, Card } from "antd";
import "antd/dist/antd.css";
import Image from "next/image";
import Link from "next/link";
//src
import { baseUrl } from "../constants/baseUrl";
import laptopPic from "../public/laptop.png";
const { Meta } = Card;

type categoryType = {
  title: string;
  description: string;
  imageUrl?: string | string[];
};
const Category = ({ title, description, imageUrl }: categoryType) => {
  return (
    <Card
      style={{
        width: 300,
        margin: 10,
        padding: 10,
        boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
        borderRadius: "12px",
      }}
      cover={
        <Image
          alt="example"
          src={imageUrl ? `${baseUrl}${imageUrl}` : laptopPic}
          width={300}
          height={200}
        />
      }
    >
      <Meta
        avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
        title={title}
        description={description}
      />
      <Link href={`/categories/${title}`}>
        <a>See Products</a>
      </Link>
    </Card>
  );
};

export default Category;

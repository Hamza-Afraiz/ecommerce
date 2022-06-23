import { Avatar, Card } from "antd";
import "antd/dist/antd.css";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/router';
//src
import { baseUrl } from "../constants/baseUrl";
import laptopPic from "../public/laptop.png";
const { Meta } = Card;

type ProductType = {
  title: string;
  description: string;
  imageUrl:string|string[]
};
const Product = ({ title, description,imageUrl }: ProductType) => {
    const router = useRouter()
   
  return (
        <Link href={!Object.keys(router?.query).includes("productName")?`${router.asPath}/productName/${title}`:router?.asPath}>
    <Card
      style={{
        width: 400,
        margin: 10,
        padding: 10,
        boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
      }}
      cover={<Image alt="example" src={ imageUrl?`${baseUrl}${imageUrl}`:laptopPic }  width={400} height={200}/>}
    >
      <Meta
        avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
        title={title}
        description={description}
      />
  
        
      
    </Card>
    </Link>
  );
};

export default Product;

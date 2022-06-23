import axios from "axios";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
//src
import Category from "../components/Category";
import Product from "../components/Product";
import { baseUrl } from "../constants/baseUrl";
import styles from "../styles/Home.module.css";
import logo from "../public/logo.png";
import logo2 from "../public/logo2.png";
import logo3 from "../public/logo3.png";
import { Carousel } from "antd";

const Home: NextPage = ({ categoriesData, productsData }: any) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Accessories at one place</title>
        <meta name="description" content="Accessories at one place" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.logo}>
          <Carousel>
            <Image src={logo} width={1200} height={300} />
            <Image src={logo2} width={1200} height={300} />
            <Image src={logo3} width={1200} height={300} />
          </Carousel>
          <h1 className={styles.logoText}>Best Accessories Store</h1>
        </div>
        <h1>Categories</h1>
        <div className={styles.categories}>
          {categoriesData["data"]?.map((category: any, index: number) => (
            <Category
              key={index}
              title={category?.attributes?.name}
              description={category?.attributes?.description}
              imageUrl={category?.attributes?.image?.data?.attributes?.url}
            />
          ))}
        </div>
        <h1>Top Products</h1>
        <div className={styles.categories}>
          {productsData["data"]?.map((category: any, index: number) => (
            <Product
              key={index}
              title={category?.attributes?.name}
              description={category?.attributes?.description}
              imageUrl={category?.attributes?.image?.data?.attributes?.url}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;
export async function getStaticProps() {
  // Get external data from the file system, API, DB, etc.
  const categoriesData = await axios.get(
    `${baseUrl}/api/categories?populate=*`
  );
  const productsData = await axios.get(`${baseUrl}/api/products?populate=*`);

  // The value of the `categoriesData` key will be
  //  passed to the `Home` componentl
  return {
    props: {
      categoriesData: categoriesData["data"] || [],
      productsData: productsData["data"] || [],
    },
  };
}

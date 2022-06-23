import axios from "axios";
import type { NextPage } from "next";
import Head from "next/head";
//src
import Category from "../components/Category";
import Product from "../components/Product";
import { baseUrl } from "../constants/baseUrl";
import styles from "../styles/Home.module.css";

const Home: NextPage = ({ categoriesData, productsData }: any) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Accessories in Islamabad</title>
        <meta name="description" content="Accessories in Islamabad" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
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
  //  passed to the `Home` component
  return {
    props: {
      categoriesData: categoriesData["data"] || [],
      productsData: productsData["data"] || [],
    },
  };
}

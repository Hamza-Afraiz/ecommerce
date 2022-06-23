import React from "react";
import axios from "axios";
const qs = require("qs");
import Head from "next/head";
import Category from "../../../components/Category";
import Product from "../../../components/Product";
import { useRouter } from "next/router";
import { baseUrl } from "../../../constants/baseUrl";

const Index = ({ categoryViseProducts }: any) => {
  console.log("categories data s", categoryViseProducts);

  const router = useRouter();
  console.log("query is ", router["query"]["categoryName"]);
  return (
    <div className="main">
      <Head>
        <title>{router.query.categoryName}</title>
        <meta name="description" content="Cart" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Products </h1>
      <div className="categories">
        {categoryViseProducts?.map((ProductData: any, index: number) => {
          return (
            <Product
              key={index}
              title={ProductData["attributes"]["name"]}
              description={ProductData?.attributes?.price}
              imageUrl={ProductData?.attributes?.image?.data?.attributes?.url}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Index;
export async function getStaticPaths() {
  const paths = await getCategoriesNames();
  console.log("pahs in categries are ", paths);
  return {
    paths,
    fallback: false,
  };
}
export const getCategoriesNames = async () => {
  const data = await axios.get(`${baseUrl}/api/categories`);

  const staticPaths = data["data"]["data"]?.map((product: any) => {
    return { params: { categoryName: product["attributes"]["name"] } };
  });

  return staticPaths;
};
export async function getStaticProps({ params }: any) {
  console.log("parmas in categorrs are ", params["categoryName"]);
  const query = qs.stringify(
    {
      populate: "*",
      filters: {
        category: {
          name: {
            $eq: params["categoryName"],
          },
        },
      },
    },

    {
      encodeValuesOnly: true,
    }
  );
  const categoryViseProducts = await axios.get(
    `${baseUrl}/api/products?${query}`
  );

  return {
    props: {
      categoryViseProducts: categoryViseProducts["data"]["data"],
    },
  };
}

import { Avatar, Comment, Rate } from "antd";
import "antd/dist/antd.css";
import axios from "axios";
import Head from "next/head";
import React from "react";
//src
import ProductImagesCarousel from "../../../../components/Carousel";
import CheckoutProduct from "../../../../components/CheckoutProduct";
import { baseUrl } from "../../../../constants/baseUrl";
import styles from "../../../../styles/[productName].module.css";
const qs = require("qs");

export const ProductDetails = ({ ProductData, ReviewData }: any) => {
  const [imagesUrl, setImagesUrl] = React.useState<string[]>([]);

  const getProductImagesUrl = () => {
    setImagesUrl(
      ProductData?.attributes?.images?.data?.map(
        (ProductData: any) => ProductData?.attributes?.url
      )
    );
  };
  React.useEffect(() => {
    getProductImagesUrl();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.productDetailsContainer}>
      <Head>
        <title>{ProductData?.attributes?.name}</title>
        <meta name="description" content={ProductData?.attributes?.name} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <ProductImagesCarousel productImages={imagesUrl} />
        <h1>Reviews</h1>

        {ReviewData &&
          ReviewData?.map((review: any, index: number) => (
            <Comment
              key={index}
              author={<a>Han Solo</a>}
              avatar={
                <Avatar
                  src="https://joeschmoe.io/api/v1/random"
                  alt="Han Solo"
                />
              }
              content={
                <div>
                  <Rate value={review.attributes.rating} />{" "}
                  <p>{review.attributes.comment}</p>
                </div>
              }
            />
          ))}
      </div>
      <CheckoutProduct
        id={ProductData?.id}
        title={ProductData?.attributes?.name}
        description={ProductData?.attributes?.price}
        imageUrl={ProductData?.attributes?.image?.data?.attributes?.url}
      />
    </div>
  );
};

export default ProductDetails;
export async function getStaticPaths() {
  const paths = await getCategoriesNames();

  return {
    paths,
    fallback: false,
  };
}
// export const getProductNames = async () => {
//   const data = await axios.get("http://localhost:1337/api/products");
//   const categoriesdata = await axios.get(
//     "http://localhost:1337/api/categories"
//   );
//   console.log("data is ", data);
//   const staticPaths = data["data"]["data"]?.map(
//     (product: any, index: number) => {
//       return { params: { productName: product["attributes"]["name"] } };
//     }
//   );
//   console.log("Static paths are ", staticPaths);
//   return staticPaths;
// };
export const getCategoriesNames = async () => {
  const data = await axios.get(`${baseUrl}/api/categories`);
  const categoriesData = data["data"]["data"];
  let paramsArray: any = [];
  for (let i = 0; i < categoriesData?.length; i++) {
    const categoryName = categoriesData[i]["attributes"]["name"];
    const query = qs.stringify(
      {
        populate: "*",
        filters: {
          category: {
            name: {
              $eq: categoryName,
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
    const params = categoryViseProducts["data"]["data"]?.map((product: any) => {
      paramsArray.push({
        params: { categoryName, productName: product["attributes"]["name"] },
      });
    });
  }
  // console.log("PARMA RETURND ARE ", paramsArray);
  // const staticPaths = data["data"]["data"]?.map((product: any) => {
  //   return { params: { categoryName: product["attributes"]["name"] } };
  // });
  // console.log("Static paths are ", staticPaths);
  // return staticPaths;
  return paramsArray;
};
export async function getStaticProps({ params }: any) {
  const query = qs.stringify(
    {
      populate: "*",
      filters: {
        name: {
          $eq: params["productName"],
        },
      },
    },
    {
      encodeValuesOnly: true,
    }
  );
  const reviewQuery = qs.stringify(
    {
      populate: "*",

      filters: {
        product: {
          name: {
            $eq: params["productName"],
          },
        },
      },
    },
    {
      encodeValuesOnly: true,
    }
  );
  const ProductData = await axios.get(`${baseUrl}/api/products?${query}`);
  const ReviewData = await axios.get(`${baseUrl}/api/reviews?${reviewQuery}`);
  // console.log("product data is ,", ProductData["data"]["data"][0]);
  // console.log("Review data is ,", ReviewData["data"]["data"]);
  return {
    props: {
      ProductData: ProductData["data"]["data"][0],
      ReviewData: ReviewData["data"]["data"],
    },
  };
}

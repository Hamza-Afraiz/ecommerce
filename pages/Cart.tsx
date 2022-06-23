import { DeleteOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, List } from "antd";
import "antd/dist/antd.css";
import axios from "axios";
import React from "react";
import styles from "../styles/Cart.module.css";
const qs = require("qs");
import Head from "next/head";
const Cart = ({ CartData }: any) => {
  console.log("CARTT ATA ", CartData);
  const [cartData, setCartData] = React.useState(CartData);

  const [isCheckout, setIsCheckout] = React.useState<boolean>(false);
  React.useEffect(() => {
    debugger;
  }, [cartData]);
  const removeProduct = async (productId: string | number) => {
    const CartData2 = await axios.delete(
      `http://localhost:1337/api/carts/${productId}`
    );
    setCartData(cartData.filter((product: any) => product.id !== productId));

    debugger;
  };
  return (
    <div className={styles.cartContainer}>
      <Head>
        <title>Accessories Cart</title>
        <meta name="description" content="Accessories Cart" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          pageSize: 3,
        }}
        dataSource={cartData}
        renderItem={(item: any, index: number) => (
          <List.Item
            className={styles.listItem}
            key={index}
            extra={
              // eslint-disable-next-line @next/next/no-img-element
              <img
                width={100}
                height={100}
                alt="logo"
                src={`http://localhost:1337${item?.attributes?.product?.data?.attributes?.image?.data?.attributes?.url}`}
              />
            }
          >
            <List.Item.Meta
              title={
                <a
                  href={`/productName/${item?.attributes?.product?.data?.attributes?.name}`}
                >
                  {item?.attributes.product.data.attributes.name}
                </a>
              }
            />
            <div className={styles.cartActions}>
              <div>
                <MinusOutlined
                  className={styles.iconStyle}
                  onClick={() => {
                    cartData[index]["attributes"]["quantity"] -= 1;

                    const copiedCartData = JSON.parse(JSON.stringify(cartData));
                    setCartData(copiedCartData);
                  }}
                />
                {item?.attributes.quantity}
                <PlusOutlined
                  onClick={() => {
                    cartData[index]["attributes"]["quantity"] += 1;

                    const copiedCartData = JSON.parse(JSON.stringify(cartData));
                    setCartData(copiedCartData);
                  }}
                  className={styles.iconStyle}
                />
              </div>
              <div>
                <DeleteOutlined
                  className={styles.iconStyle}
                  onClick={() => {
                    removeProduct(item?.id);
                  }}
                />
              </div>
            </div>
          </List.Item>
        )}
      />
      <Button
        style={{ marginTop: "2%" }}
        block
        onClick={() => {
          setIsCheckout(true);
        }}
        type="primary"
        disabled={isCheckout}
      >
        {!isCheckout ? "CheckOut" : "Already Checked Out"}
      </Button>
    </div>
  );
};

export default Cart;
export async function getStaticProps() {
  // Get external data from the file system, API, DB, etc.
  const query = qs.stringify(
    {
      populate: {
        product: {
          populate: ["image"],
        },
      },
    },
    {
      encodeValuesOnly: true,
    }
  );
  const CartData = await axios.get(`http://localhost:1337/api/carts?${query}`);
  console.log("isProductCount Data i s");
  // The value of the `categoriesData` key will be
  //  passed to the `Home` component
  return {
    props: {
      CartData: CartData["data"]["data"] || [],
    },
  };
}

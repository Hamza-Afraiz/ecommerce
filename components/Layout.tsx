import { HomeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Breadcrumb, Layout } from "antd";
import "antd/dist/antd.css";
import Link from "next/link";
import { useRouter } from "next/router";
const { Header, Footer } = Layout;

const AppLayout = ({ children }: any) => {
  const router = useRouter();

  return (
    <Layout>
      <Header
        style={{
          position: "fixed",
          zIndex: 1,
          width: "100%",
        }}
      >
        <div>
          <Link href={`/`}>
            <a>
              <HomeOutlined
                style={{
                  color: "white",
                  fontSize: "32px",
                  marginRight: "20px",
                }}
              />
            </a>
          </Link>
          <Link href={`/Cart`}>
            <a>
              <ShoppingCartOutlined
                style={{ color: "white", fontSize: "32px" }}
              />
            </a>
          </Link>
        </div>

        <div className="logo" />

        <Breadcrumb>
          <Breadcrumb.Item>
            <a href="/">Home</a>
          </Breadcrumb.Item>
          {Object.keys(router["query"]).includes("categoryName") && (
            <Breadcrumb.Item>
              <a href={`/categories/${router["query"]["categoryName"]}`}>
                {router["query"]["categoryName"]}
              </a>
            </Breadcrumb.Item>
          )}
          {Object.keys(router["query"]).includes("productName") && (
            <Breadcrumb.Item>
              <a href={`/productName/${router["query"]["productName"]}`}>
                {router["query"]["productName"]}
              </a>
            </Breadcrumb.Item>
          )}
        </Breadcrumb>
      </Header>

      {children}
      <Footer
        style={{
          textAlign: "center",
        }}
      >
        Created With Love by Hamza Abbasi
      </Footer>
    </Layout>
  );
};

export default AppLayout;

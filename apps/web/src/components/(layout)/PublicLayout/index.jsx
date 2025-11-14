import { Centralização, Layout } from "./style";
import Header from "../../Header";
import Footer from "../../Footer";

const PublicLayout = ({ children }) => {
  return (
    <>
      <Header />
      <Centralização>
        <Layout>
          <main>{children}</main>
        </Layout>
      </Centralização>
      <Footer />
    </>
  );
};

export default PublicLayout;

import { Centralização, Layout, EspacamentoTopo } from "./style";
import Header from "../../Header/(private)";
import Footer from "../../Footer";

const PrivateLayout = ({ children }) => {
  return (
    <>
      <Header />
      <EspacamentoTopo />
      <Centralização>
        <Layout>
          <main>{children}</main>
        </Layout>
      </Centralização>
      <Footer />
    </>
  );
};

export default PrivateLayout;

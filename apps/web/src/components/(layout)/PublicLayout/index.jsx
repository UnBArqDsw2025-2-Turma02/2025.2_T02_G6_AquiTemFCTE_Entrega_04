import { Centralização, Layout, EspacamentoTopo } from "./style";
import Header from "../../Header/(public)";
import Footer from "../../Footer";

const PublicLayout = ({ children }) => {
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

export default PublicLayout;

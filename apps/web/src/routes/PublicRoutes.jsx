import { Route, Routes } from "react-router-dom";
import { ROUTES } from "../utils/constants";
import PublicLayout from "../components/(layout)/PublicLayout";
import LoginPage from "../pages/(private)/Login";


const PublicRoutes = () => {
  return (
    <PublicLayout>
      <Routes>
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      </Routes>
    </PublicLayout>
  );
};

export default PublicRoutes;
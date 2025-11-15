import { Route, Routes } from "react-router-dom";
import { ROUTES } from "../utils/constants";
import PublicLayout from "../components/(layout)/PublicLayout";
import LoginPage from "../pages/(public)/Login";
import SignInPage from "../pages/(public)/SignIn";


const PublicRoutes = () => {
  return (
    <PublicLayout>
      <Routes>
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.SIGNIN} element={<SignInPage />} />
      </Routes>
    </PublicLayout>
  );
};

export default PublicRoutes;
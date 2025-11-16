import { Route, Routes } from "react-router-dom";
import { ROUTES } from "../utils/constants";
import PublicLayout from "../components/(layout)/PublicLayout";
import LoginPage from "../pages/(public)/Login";
import SignUpPage from "../pages/(public)/SignUp";


const PublicRoutes = () => {
  return (
    <PublicLayout>
      <Routes>
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.SIGNUP} element={<SignUpPage />} />
      </Routes>
    </PublicLayout>
  );
};

export default PublicRoutes;
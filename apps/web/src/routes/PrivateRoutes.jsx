import { Route, Routes } from "react-router-dom";
import { ROUTES } from "../utils/constants";
import PrivateLayout from "../components/(layout)/PrivateLayout";
import AuthGuard from "../components/(auth)/AuthGuard";

import HomePage from "../pages/(private)/HomePage";

const PrivateRoutes = () => {
  return (
    <AuthGuard>
      <PrivateLayout>
        <Routes>
          <Route path={ROUTES.AUTHENTICATED.HOME} element={<HomePage />} />
        </Routes>
      </PrivateLayout>
    </AuthGuard>
  );
};

export default PrivateRoutes;

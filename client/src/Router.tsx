import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/Login";
import NotFound from "./pages/NotFound";
import DafaultLayout from "./components/DefaultLayout/Layout/Layout";
import Home from "./components/Home/Home";
import PricingPage from "./pages/pricing";
import FAQ from "./components/FAQ/FAQ";
import Contact from "./components/Contact/Contact";
import RegisterPage from "./pages/Register";
import DashboardLayout from "./components/DashboardLayout/Layout";
import CodeSandBox from "./pages/CodeSandBox";
import { ProtectedRoute } from "./components/Auth/protectedMiddleware";

const Router: React.FC = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <DafaultLayout>
            <Home />
          </DafaultLayout>
        }
      />
      <Route
        path="/contact"
        element={
          <DafaultLayout>
            <Contact />
          </DafaultLayout>
        }
      />
      <Route
        path="/pricing"
        element={
          <DafaultLayout>
            <PricingPage />
          </DafaultLayout>
        }
      />
      <Route
        path="/faq"
        element={
          <DafaultLayout>
            <FAQ />
          </DafaultLayout>
        }
      />
      <Route
        path="/login"
        element={
          <DafaultLayout>
            <LoginPage />
          </DafaultLayout>
        }
      />
      <Route
        path="/register"
        element={
          <DafaultLayout>
            <RegisterPage />
          </DafaultLayout>
        }
      />

      {/* nested route - dashboard */}

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<CodeSandBox />} />
        {/* <Route path="users" element={<Users />} /> */}
        {/* param dymaic path */}
        {/* <Route path="users/:id" element={<User />} />
        <Route path="notifications" element={<Notifications />} /> */}
      </Route>

      {/* end of nested routes */}

      <Route
        path="/not-found"
        element={
          <DafaultLayout>
            <NotFound />
          </DafaultLayout>
        }
      />

      <Route path="*" element={<Navigate to="/not-found" />} />
    </Routes>
  );
};

export default Router;

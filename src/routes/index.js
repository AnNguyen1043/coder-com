import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../app/pages/HomePage";
import AccountPage from "../app/pages/AccountPage";
import BLankLayout from "../layouts/BLankLayout";
import LoginPage from "../app/pages/LoginPage";
import RegisterPage from "../app/pages/RegisterPage";
import NotFoundPage from "../app/pages/NotFoundPage";
import UserProfilePage from "../app/pages/UserProfilePage";
import AuthRequire from "./AuthRequire";

function Router() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AuthRequire>
            <MainLayout />
          </AuthRequire>
        }
      >
        <Route index element={<HomePage />} />
        <Route path="account" element={<AccountPage />} />
        <Route path="user/:userId" element={<UserProfilePage />} />
      </Route>

      <Route element={<BLankLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default Router;

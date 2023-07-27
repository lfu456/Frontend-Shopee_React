import { Navigate, Outlet, useRoutes } from "react-router";
import { MainLayout, RegisterLayout } from "../layouts";
import { path } from "../constant/path";
import { Login, Search, Profile, Register } from "../pages";
import React, { ReactNode, useContext } from "react";
import { AppContext } from "../contexts/app.context";
import { SearchLayout } from "../layouts/SearchLayout";

const ProtectedRoute = () => {
  const {isAuthenticated} = useContext(AppContext)
  return isAuthenticated ? <Outlet /> : <Navigate to={path.login} />;
};

const RejectedRoute = () => {
  const {isAuthenticated} = useContext(AppContext)
  return !isAuthenticated ? <Outlet /> : <Navigate to={path.login} />;
};

export const useRouteElement = () => {
  const routeElement = useRoutes([
    {
      path: "",
      element: <ProtectedRoute />,
      children: [
        {
          path: path.profile,
          element: (
            <MainLayout>
              <Profile />
            </MainLayout>
          ),
        },
      ],
    },
    {
      path: "",
      element: <RejectedRoute />,
      children: [
        {
          path: path.login,
          element: (
            <RegisterLayout>
              <Login />
            </RegisterLayout>
          ),
        },
        {
          path: path.register,
          element: (
            <RegisterLayout>
              <Register />
            </RegisterLayout>
          ),
        },
      ],
    },
    {
      path: "",
      element: <ProtectedRoute />,
      children: [
        {
          path: path.profile,
          element: (
            <MainLayout>
              <Profile />
            </MainLayout>
          ),
        },
      ],
    },
    {
      path: "",
      element: (
        <MainLayout>
          <Search />
        </MainLayout>
      ),
      index: true,
    },
    {
      path: path.search,
      element: (
        <MainLayout>
          <SearchLayout />
        </MainLayout>
      ),
      index: true,
    },
  ]);

  return routeElement
};

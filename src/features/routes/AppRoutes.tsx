import React, { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'

// Layouts
import MainLayout from '../../shared/layouts/MainLayout';
// Lazy Routes
const Home = lazy(() => import("../pages/home/Home"));
const ErrorPage = lazy(() => import("../pages/error/ErrorPage"));

const AppRoutes:React.FC = () => {
  return (
    <Routes>
      {/* general pages */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
      </Route>

      {/* 404 Not Found */}
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  )
}

export default AppRoutes

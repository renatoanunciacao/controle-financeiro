import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Login from '../pages/login'
import Home from '../pages/home'
import PrivateRoute from '../components/private-route'
import PublicRoute from '../components/public-route'

const AppRoutes: React.FC = () => {

  const renderRoutes = () => {
    return (
      <BrowserRouter basename='/finances'>
        <Routes>
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />

          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />

          <Route path="*" element={<Navigate replace to="/login" />} />
        </Routes>
      </BrowserRouter>
    )
  }

  return <>{renderRoutes()}</>
}

export default AppRoutes;
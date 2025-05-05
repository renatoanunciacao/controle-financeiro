import React from 'react'
import { Navigate, Route, Routes } from "react-router-dom"
import Login from '../pages/login'
import Home from '../pages/home'
import PrivateRoute from '../components/private-route'
import PublicRoute from '../components/public-route'

const AppRoutes: React.FC = () => {

    const renderRoutes = () => {
        return (
            <Routes>
            <Route
              path="/finances/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
      
            <Route
              path="/finances/home"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
      
            <Route path="*" element={<Navigate replace to="/finances/login" />} />
          </Routes>
        )
    }

    return <>{renderRoutes()}</>
}

export default AppRoutes;
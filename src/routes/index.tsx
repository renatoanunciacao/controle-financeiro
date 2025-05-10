import React, { Component, ErrorInfo, ReactNode } from 'react'
import { Navigate, Route, Routes } from "react-router-dom"
import Login from '../pages/login'
import Home from '../pages/home'
import PrivateRoute from '../components/private-route'
import PublicRoute from '../components/public-route'
interface ErrorBoundaryProps {
  children: ReactNode;  // 'children' pode ser qualquer coisa que possa ser renderizada no React
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught in boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {

      return <h1>Algo deu errado!</h1>;
    }

    return this.props.children; // Exibe o conteúdo normal se não houver erro
  }
}

const AppRoutes: React.FC = () => {

  const renderRoutes = () => {
    return (
      <ErrorBoundary>
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
      </ErrorBoundary>
    )
  }

  return <>{renderRoutes()}</>
}

export default AppRoutes;
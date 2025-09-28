import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'
import Startups from './pages/Startups'
import CreateStartup from './pages/CreateStartup'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route 
                path="/startups" 
                element={
                  <ProtectedRoute>
                    <Startups />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/create-startup" 
                element={
                  <ProtectedRoute requiredRole="founder">
                    <CreateStartup />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </Layout>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
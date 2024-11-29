import React from "react"
import { Navigate } from "react-router-dom"
import { useAuth } from "./AuthProvider"
const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth()

  if (!currentUser) {
    return <Navigate to="/login" replace />
  }
  return children
}

export default ProtectedRoute

// App.jsx
import React, { useState } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import MainContent from "./components/MainContent"
import NasiGoreng from "./pages/NasiGoreng"
import Rawon from "./pages/Rawon"
import AyamGeprek from "./pages/AyamGeprek"
import Rendang from "./pages/Rendang"
import { AuthProvider } from "./pages/AuthProvider"
import AuthForm from "./pages/AuthForm"
import CreateRecipe from "./pages/CreateRecipe"
import RecipeList from "./pages/RecipeList"
import RecipeDetail from "./pages/RecipeDetail"
import FavoriteRecipes from "./pages/FavoriteRecipes"
import ProtectedRoute from "./pages/ProtectedRoute"

function App() {
  const [isCollapsed, setIsCollapsed] = useState(true)

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
  }

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/nasigoreng" element={<NasiGoreng />} />
          <Route path="/rawon" element={<Rawon />} />
          <Route path="/ayamgeprek" element={<AyamGeprek />} />
          <Route path="/rendang" element={<Rendang />} />
          <Route path="/login" element={<AuthForm />} />
          <Route
            path="/recipelist"
            element={
              <ProtectedRoute>
                <RecipeList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/createrecipe"
            element={
              <ProtectedRoute>
                <CreateRecipe />
              </ProtectedRoute>
            }
          />
          <Route
            path="/recipe/:id"
            element={
              <ProtectedRoute>
                <RecipeDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/favoritrecipe"
            element={
              <ProtectedRoute>
                <FavoriteRecipes />{" "}
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App

import React, { useState, useEffect } from "react"
import { ref as dbRef, onValue } from "firebase/database"
import { db } from "../firebase"
import { useNavigate } from "react-router-dom"
import { IoIosArrowBack } from "react-icons/io"
import NavBar from "../components/NavBar"
import Sidebar from "../components/Sidebar"
import Footer from "../components/Footer"

const FavoriteRecipes = () => {
  const [favorites, setFavorites] = useState([])
  const [isSidebarOpen, setIsSidebarOpen] = useState(false) // State for sidebar
  const navigate = useNavigate()

  useEffect(() => {
    const favoritesRef = dbRef(db, "favorites")
    onValue(favoritesRef, (snapshot) => {
      const data = snapshot.val()
      if (data) {
        const loadedFavorites = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }))
        setFavorites(loadedFavorites)
      }
    })
  }, [])

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <NavBar toggleSidebar={toggleSidebar} isCollapsed={!isSidebarOpen} />

      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar toggleSidebar={toggleSidebar} isCollapsed={!isSidebarOpen} />

        {/* Main content */}
        <div className="flex-1 bg-green-100 py-8 px-4 sm:px-6 lg:px-8 relative">
          <button
            onClick={() => navigate("/")}
            className="absolute top-4 left-4 text-2xl text-gray-700"
          >
            <IoIosArrowBack />
          </button>

          <div className="w-full max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Resep Favorit
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {favorites.map((recipe) => (
                <div
                  key={recipe.id}
                  onClick={() => navigate(`/recipe/${recipe.id}`)}
                  className="cursor-pointer bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 relative transform hover:scale-105"
                >
                  <div className="w-full h-48 bg-gray-100">
                    <img
                      src={recipe.imageUrl}
                      alt={recipe.title}
                      className="w-full h-full object-cover transition-transform duration-300 transform hover:scale-110"
                    />
                  </div>
                  <div className="absolute bottom-2 left-4 bg-transparent text-white p-3 font-semibold text-lg drop-shadow-md shadow-black">
                    {recipe.title}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default FavoriteRecipes

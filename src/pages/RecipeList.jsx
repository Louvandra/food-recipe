import React, { useState, useEffect } from "react"
import { ref as dbRef, onValue } from "firebase/database"
import { db } from "../firebase"
import { useNavigate, useLocation } from "react-router-dom"
import { IoIosArrowBack } from "react-icons/io"
import NavBar from "../components/NavBar"
import Sidebar from "../components/Sidebar"
import Footer from "../components/Footer"

const RecipeList = () => {
  const [recipes, setRecipes] = useState([])
  const [search, setSearch] = useState("")
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const searchQuery = params.get("search") || ""
    setSearch(searchQuery)
  }, [location.search])

  useEffect(() => {
    const recipesRef = dbRef(db, "recipes")
    onValue(recipesRef, (snapshot) => {
      const data = snapshot.val()
      if (data) {
        const loadedRecipes = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }))
        setRecipes(loadedRecipes)
      }
    })
  }, [])

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(search.toLowerCase())
  )

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#D5E8D4] relative">
      {/* Navbar */}
      <NavBar toggleSidebar={toggleSidebar} isCollapsed={!isSidebarOpen} />

      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar
          toggleSidebar={toggleSidebar}
          isCollapsed={!isSidebarOpen}
          className="fixed top-0 left-0 bottom-0 w-64 bg-white shadow-lg z-10 overflow-y-auto"
        />

        {/* Main Content */}
        <div className="flex-1 p-6 md:pl-8 relative">
          <button
            onClick={() => navigate("/")}
            className="absolute top-4 left-4 text-2xl text-gray-700"
          >
            <IoIosArrowBack />
          </button>

          <div className="w-full max-w-5xl mx-auto">
            {/* Search Bar */}
            <div className="flex items-center justify-end mb-6">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari resep"
                className="w-2/5 p-2 border border-gray-300 rounded-full text-center"
              />
            </div>

            {/* Recipe List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredRecipes.map((recipe) => (
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
      <Footer className="relative z-0" />
    </div>
  )
}

export default RecipeList

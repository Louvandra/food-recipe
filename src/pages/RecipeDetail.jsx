import React, { useEffect, useState } from "react"
import { useParams, useNavigate, useLocation } from "react-router-dom"
import { ref as dbRef, get, set, remove } from "firebase/database"
import { db } from "../firebase"
import { IoIosArrowBack } from "react-icons/io"
import NavBar from "../components/NavBar"
import Sidebar from "../components/Sidebar"
import Footer from "../components/Footer"

const RecipeDetail = () => {
  const { id } = useParams()
  const [recipe, setRecipe] = useState(null)
  const [isFavorite, setIsFavorite] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false) // State for sidebar
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const recipeRef = dbRef(db, `recipes/${id}`)
    get(recipeRef).then((snapshot) => {
      if (snapshot.exists()) {
        setRecipe(snapshot.val())
      } else {
        console.log("Data tidak ditemukan")
      }
    })

    const favoriteRef = dbRef(db, `favorites/${id}`)
    get(favoriteRef).then((snapshot) => {
      if (snapshot.exists()) {
        setIsFavorite(true)
      }
    })
  }, [id])

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const addToFavorites = () => {
    const favoriteRef = dbRef(db, `favorites/${id}`)
    set(favoriteRef, recipe).then(() => {
      setIsFavorite(true)
      console.log("Resep ditambahkan ke favorit")
    })
  }

  const deleteRecipe = () => {
    const recipeRef = dbRef(db, `recipes/${id}`)
    remove(recipeRef)
      .then(() => {
        console.log("Resep dihapus dari koleksi")
        navigate("/recipelist")
      })
      .catch((error) => {
        console.error("Gagal menghapus resep:", error)
      })
  }

  const deleteFromFavorites = () => {
    const favoriteRef = dbRef(db, `favorites/${id}`)
    remove(favoriteRef).then(() => {
      setIsFavorite(false)
      console.log("Resep dihapus dari favorit")
    })
  }

  if (!recipe) return <p>Memuat...</p>

  return (
    <div className="flex flex-col min-h-screen bg-[#D5E8D4] relative">
      {/* Navbar */}
      <NavBar toggleSidebar={toggleSidebar} isCollapsed={!isSidebarOpen} />

      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar
          toggleSidebar={toggleSidebar}
          isCollapsed={!isSidebarOpen}
          className="fixed top-0 left-0 bottom-0 h-full w-64 bg-white shadow-lg z-10 overflow-y-auto"
        />

        {/* Main Content */}
        <div className="flex-1 p-6 md:pl-8 relative">
          <div className="absolute top-6 left-2">
            <button
              onClick={() => navigate("/recipelist")}
              className="p-1 text-black"
            >
              <IoIosArrowBack size={24} />
            </button>
          </div>

          <main className="mt-12">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="w-full md:w-1/2 lg:w-2/5 h-64 md:h-auto bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={recipe.imageUrl}
                  alt={recipe.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 space-y-4 md:ml-6">
                <h1 className="text-3xl font-bold mb-2">{recipe.title}</h1>
                <p className="text-base text-gray-800 mb-4">
                  {recipe.description}
                </p>
              </div>
            </div>

            <div className="mt-4 flex justify-center gap-4">
              {location.pathname !== "/favoritrecipe" && !isFavorite && (
                <button
                  onClick={addToFavorites}
                  className="bg-red-500 text-white py-2 px-6 rounded-full shadow-lg transition-transform hover:scale-105"
                >
                  Resep Favorit
                </button>
              )}

              <button
                onClick={
                  location.pathname === "/favoritrecipe"
                    ? deleteFromFavorites
                    : deleteRecipe
                }
                className="bg-gray-500 text-white py-2 px-6 rounded-full shadow-lg transition-transform hover:scale-105"
              >
                Delete Resep
              </button>
            </div>

            {/* Ingredients Section */}
            <div className="mt-8">
              <h2 className="text-lg font-semibold mb-4">Bahan-bahan</h2>
              {recipe.ingredients.map((group, index) => (
                <div key={index} className="mb-6">
                  <h3 className="text-lg font-bold">{group.groupName}</h3>
                  <ul className="list-disc list-inside text-gray-800">
                    {group.items.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default RecipeDetail

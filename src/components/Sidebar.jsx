import React, { useState } from "react"
import { AiOutlineBook, AiOutlineHeart } from "react-icons/ai"
import { IoArrowBack } from "react-icons/io5" // Icon for back button
import { useNavigate } from "react-router-dom"

const Sidebar = ({ toggleSidebar, isCollapsed }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const navigate = useNavigate()

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  const goToFavorites = () => {
    navigate("/favoritrecipe")
  }

  return (
    <div
      className={`fixed inset-0 lg:relative z-20 transition-all duration-300 ease-in-out ${isCollapsed ? "hidden" : "block bg-opacity-60 bg-black lg:bg-transparent"}`}
      onClick={toggleSidebar} // Close sidebar when clicking outside
    >
      <div
        className={`h-full bg-[#ECECEC] shadow-md transition-all duration-300 ease-in-out p-4 overflow-y-auto`}
        onClick={(e) => e.stopPropagation()} // Prevent closing sidebar when clicking inside
      >
        {/* Sidebar content toggle when collapsed on desktop */}
        {!isCollapsed ? (
          <div>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">Menu</h2>
              <button onClick={toggleSidebar} className="text-gray-700">
                <IoArrowBack size={24} />
              </button>
            </div>

            <nav className="mt-4">
              <ul className="space-y-2">
                <li className="flex flex-col">
                  <button
                    onClick={toggleDropdown}
                    className="flex items-center space-x-2 text-black"
                  >
                    <AiOutlineBook size={24} />
                    <span>Koleksi Resep</span>
                  </button>
                  {isDropdownOpen && (
                    <ul className="ml-8 mt-2 space-y-1">
                      <li
                        onClick={goToFavorites}
                        className="flex items-center space-x-2 text-black cursor-pointer"
                      >
                        <AiOutlineHeart size={20} />
                        <span>Resep Favorit</span>
                      </li>
                    </ul>
                  )}
                </li>
              </ul>
            </nav>
          </div>
        ) : (
          // When collapsed on desktop, show only back button and Koleksi Resep icon
          <div>
            <button
              onClick={toggleSidebar}
              className="flex items-center space-x-2 text-black"
            >
              <IoArrowBack size={24} />
              <span>Back</span>
            </button>
            <div className="mt-6">
              <button
                onClick={() => navigate("/koleksiresep")}
                className="flex items-center space-x-2 text-black"
              >
                <AiOutlineBook size={24} />
                <span>Koleksi Resep</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Sidebar

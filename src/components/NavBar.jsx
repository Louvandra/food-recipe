import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { FiMenu } from "react-icons/fi"
import { TbLogin2 } from "react-icons/tb"
import { auth, signOut } from "../firebase"

const NavBar = ({ toggleSidebar }) => {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)

  const handleLog = () => {
    navigate("/login")
  }

  const handleLogout = async () => {
    try {
      await signOut(auth)
      setUser(null)
      navigate("/")
    } catch (error) {
      console.error("Error during logout:", error)
    }
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser)
    })
    return () => unsubscribe()
  }, [])

  const handleCreate = () => {
    if (user) {
      navigate("/createrecipe")
    } else {
      navigate("/login")
    }
  }

  return (
    <div className="bg-[#3EB489] h-12 flex items-center w-full justify-between px-4">
      <div className="flex items-center gap-4">
        {/* Hamburger menu button */}
        <button onClick={toggleSidebar} className="text-white lg:hidden">
          <FiMenu size={24} />
        </button>

        <h1 className="font-bold text-white text-lg sm:text-xl md:text-2xl">
          FOOD RECIPE
        </h1>
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={handleCreate}
          className="text-center text-white text-base sm:text-lg md:text-xl"
        >
          Create
        </button>
        <span className="text-white">|</span>
        {user ? (
          <button
            onClick={handleLogout}
            className="text-center flex items-center text-white text-base sm:text-lg md:text-xl"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={handleLog}
            className="text-center flex items-center gap-1 text-white text-base sm:text-lg md:text-xl"
          >
            <TbLogin2 className="text-2xl md:text-3xl text-black" />
            Log in
          </button>
        )}
      </div>
    </div>
  )
}

export default NavBar

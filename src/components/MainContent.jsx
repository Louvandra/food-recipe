import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import Anime from "../assets/image/anime.png";
import AyamGeprek from "../assets/image/ayamgeprek.jpg";
import NasiGoreng from "../assets/image/nasigoreng.jpg";
import Rawon from "../assets/image/rawon.png";
import Rendang from "../assets/image/rendang.jpg";

import NavBar from "../components/NavBar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

const MainContent = () => {
  const [search, setSearch] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for sidebar
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/recipelist?search=${search}`);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <NavBar isCollapsed={!isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar isCollapsed={!isSidebarOpen} toggleSidebar={toggleSidebar} />

        {/* Main Content */}
        <div className="flex-1 overflow-auto bg-[#D5E8D4] pb-20">
          <div className="p-4 sm:p-6 md:p-8 lg:p-10 flex-1 h-full lg:min-h-screen overflow-auto mt-5">
            {/* Top Content */}
            <div className="relative bg-lime-300 rounded-lg mb-6 p-5 flex flex-col md:flex-row gap-4 items-start">
              {/* Text Section */}
              <div className="flex-1 flex flex-col items-center md:items-start">
                <div className="flex items-center w-full md:w-auto z-10">
                  <div className="relative w-full">
                    <IoIosSearch className="absolute left-3 top-3 text-gray-400 text-xl" />
                    <input
                      type="text"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Cari resep..."
                      className="w-full p-3 pl-10 pr-4 text-base rounded-full border border-gray-300 focus:outline-none"
                    />
                  </div>
                  <button
                    onClick={handleSearch}
                    className="px-5 py-3 bg-green-500 text-white rounded-full ml-2"
                  >
                    Cari
                  </button>
                </div>

                <div className="mt-4 w-full">
                <h2 className="text-2xl font-bold mb-5 text-center md:text-left text-green-700">
                  Bingung Mau Masak Apa Hari Ini?
                </h2>
                <p className="text-base text-gray-800 text-center md:text-left leading-relaxed">
                  Temukan inspirasi masakan terbaik untuk keluarga Anda.Mulai dari resep tradisional hingga hidangan modern, temukan ide yang bisa membuat masakan di rumah lebih spesial..
               </p>

                 {/* Button to Recipelist */}
               <div className="mt-4 text-center md:text-left">
                <button
                  onClick={() => navigate("/recipelist")}
                 className="px-6 py-3 mt-7 bg-green-500 text-white rounded-full font-semibold hover:bg-blue-600 transition duration-300"
                  >
                    Klik Disini
                </button>
                 </div>
              </div>
                 </div>

              {/* Image Section */}
              <div className="flex-shrink-0 w-full md:w-1/2 lg:w-1/2">
              <div className="relative overflow-hidden rounded-lg">
              <img
               src={Anime}
               alt="anime"
               className="w-full h-auto max-h-[400px] object-cover md:max-h-[350px] lg:max-h-[300px]"
              />
              </div>
            </div>

            </div>

            {/* Popular Foods Section */}
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Makanan Populer
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
              {[{ name: "Nasi Goreng", image: NasiGoreng, link: "/nasigoreng" },
                { name: "Rawon", image: Rawon, link: "/rawon" },
                { name: "Ayam Geprek", image: AyamGeprek, link: "/ayamgeprek" },
                { name: "Rendang", image: Rendang, link: "/rendang" },
              ].map(({ name, image, link }) => (
                <div
                  key={name}
                  onClick={() => navigate(link)}
                  className="cursor-pointer bg-white rounded-lg overflow-hidden relative transform hover:scale-105 transition-transform duration-300"
                >
                  <div className="w-full h-48 bg-gray-100">
                    <img
                      src={image}
                      alt={name}
                      className="w-full h-full object-cover transition-transform duration-300 transform hover:scale-110"
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 w-full  bg-opacity-70 text-white p-3 text-left font-semibold text-lg">
                    {name}
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
  );
};

export default MainContent;

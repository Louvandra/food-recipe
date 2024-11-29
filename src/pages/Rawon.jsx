import React from "react"
import { useNavigate } from "react-router-dom"
import { IoIosArrowBack } from "react-icons/io"
import RawonImage from "../assets/image/Rawon.png"

const Rawon = () => {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col md:flex-row h-full bg-green-100 min-h-screen relative">
      <div className="absolute top-2 left-2">
        <button onClick={() => navigate("/")} className="p-1 text-black">
          <IoIosArrowBack size={24} />
        </button>
      </div>

      <main className="flex-1 p-2 md:pl-8 mt-12">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          {/* Gambar, Judul, dan Deskripsi dalam satu div */}
          <div className="w-full md:w-1/2 lg:w-2/5 h-64 md:h-auto bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={RawonImage}
              alt="Rawon"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1 space-y-4 md:ml-6">
            <h1 className="text-3xl font-bold mb-2">Rawon Khas Jawa</h1>
            <p className="text-base text-gray-800 mb-4">
              Rawon adalah salah satu makanan khas Indonesia yang terkenal,
              terutama di daerah Jawa Timur. Rawon merupakan semacam sup atau
              hidangan berkuah gurih yang memiliki warna hitam pekat.
            </p>
            <p className="text-base text-gray-800">
              Hidangan ini biasanya terdiri dari daging sapi yang dimasak dalam
              bumbu khas, seperti kluwek (buah keluak), rempah-rempah, dan
              berbagai bahan lainnya.
            </p>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-2">Bahan-bahan</h2>
          <ul className="list-disc list-inside text-gray-800">
            <li>2 potong daging sapi</li>
            <li>secukupnya minyak goreng</li>
            <li>2 butir kluwek</li>
            <li>2 kuku jari jahe</li>
            <li>2 kuku jari kunyit</li>
            <li>4 butir kemiri</li>
            <li>5 siung bawang putih</li>
            <li>8 siung bawang merah</li>
            <li>1 sdt ketumbar</li>
            <li>1 sdt lada putih</li>
            <li>3 lembar daun salam</li>
            <li>3 lembar daun jeruk</li>
            <li>1 batang sereh</li>
            <li>secukupnya daun bawang</li>
            <li>secukupnya garam</li>
            <li>secukupnya penyedap rasa</li>
          </ul>
        </div>
      </main>
    </div>
  )
}

export default Rawon

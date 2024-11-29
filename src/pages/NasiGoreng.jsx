// src/pages/NasiGoreng.js
import React from "react"
import { useNavigate } from "react-router-dom"
import { IoIosArrowBack } from "react-icons/io"
import NasiGorengImage from "../assets/image/nasigoreng.jpg"

const NasiGoreng = () => {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col md:flex-row bg-[#D5E8D4] min-h-screen relative">
      <div className="absolute top-2 left-2">
        <button onClick={() => navigate("/")} className="p-1 text-black">
          <IoIosArrowBack size={24} />
        </button>
      </div>

      <main className="flex-1 p-2 md:pl-8 mt-12">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="w-full md:w-1/2 lg:w-2/5 h-64 md:h-auto bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={NasiGorengImage}
              alt="NasiGoreng"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1 space-y-4 md:ml-6">
            <h1 className="text-3xl font-bold mb-2">Nasi Goreng Spesial</h1>
            <p className="text-base text-gray-800 mb-4">
              Nasi goreng adalah makanan yang terbuat dari nasi yang digoreng
              dan dicampur dengan bumbu-bumbu tertentu. Nasi goreng merupakan
              makanan populer di Indonesia dan di berbagai negara di dunia.
            </p>
            <p className="text-base text-gray-800">
              Nasi goreng adalah makanan jalanan populer di Asia. Di beberapa
              negara Asia, restoran-restoran kecil, gerai-gerai pinggir jalan,
              dan pedagang keliling mengkhususkan diri dalam menyajikan nasi
              goreng.
            </p>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-2">Bahan-bahan</h2>
          <ul className="list-disc list-inside text-gray-800">
            <li>1 piring Nasi Dingin</li>
            <li>5 buah Pete, potong sesuai selera</li>
            <li>2 buah cabe merah</li>
            <li>3 siung bawang merah</li>
            <li>2 siung bawang putih</li>
            <li>2 buah kemiri</li>
            <li>1 buah terasi (sesuaikan selera)</li>
            <li>1 sdm saus tiram</li>
            <li>1 sdm kecap manis</li>
            <li>2 butir telur</li>
            <li>1 buah sosis</li>
            <li>minyak secukupnya</li>
          </ul>
        </div>
      </main>
    </div>
  )
}

export default NasiGoreng

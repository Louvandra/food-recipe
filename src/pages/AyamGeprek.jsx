import React from "react"
import { useNavigate } from "react-router-dom"
import { IoIosArrowBack } from "react-icons/io"
import AyamGeprekImage from "../assets/image/ayamgeprek.jpg"

const AyamGeprek = () => {
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
          {/* Gambar, Judul, dan Deskripsi dalam satu div */}
          <div className="w-full md:w-1/2 lg:w-2/5 h-64 md:h-auto bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={AyamGeprekImage}
              alt="AyamGeprek"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1 space-y-4 md:ml-6">
            <h1 className="text-3xl font-bold mb-2">
              Ayam Geprek Samba Mantah
            </h1>
            <p className="text-base text-gray-800 mb-4">
              Ayam geprek adalah makanan khas Indonesia yang terbuat dari ayam
              goreng tepung yang diulek atau dilumatkan bersama sambal ulek.
            </p>
            <p className="text-base text-gray-800">
              Ayam geprek pertama kali dibuat oleh Ibu Ruminah, seorang penjual
              ayam goreng tepung di kawasan Papringan, Yogyakarta, pada tahun
              2003.
            </p>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-2">Bahan-bahan</h2>
          <ul className="list-disc list-inside text-gray-800">
            <li> 1 buah dada ayam fillet, iris lebih tipis</li>
            <li> Secukupnya lada bubuk</li>
            <li> Secukupnya garam </li>
            <li> Secukupnya gula pasir</li>
            <li> Secukupnya tepung bumbu</li>
            <li> Secukupnya air</li>
            <li> 2 siung bawang putih</li>
            <li> 5 buah cabe rawit/sesuai selera</li>
            <li> Segenggamkemangi, cuci bersih</li>
            <li> Minyak untuk menggoreng</li>
          </ul>
        </div>
      </main>
    </div>
  )
}

export default AyamGeprek

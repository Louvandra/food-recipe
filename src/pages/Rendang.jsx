import React from "react"
import { useNavigate } from "react-router-dom"
import { IoIosArrowBack } from "react-icons/io"
import RendangImage from "../assets/image/rendang.jpg"

const NasiGoreng = () => {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col md:flex-row bg-green-100 min-h-screen relative">
      <div className="absolute top-2 left-2">
        <button onClick={() => navigate("/")} className="p-1 text-black">
          <IoIosArrowBack size={24} />
        </button>
      </div>

      <main className="flex-1 p-2 md:pl-8 mt-12">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="w-full md:w-1/2 lg:w-2/5 h-64 md:h-auto bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={RendangImage}
              alt="Rendang"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1 space-y-4 md:ml-6">
            <h1 className="text-3xl font-bold mb-2">Rendang Khas Padang</h1>
            <p className="text-base text-gray-800 mb-4">
              Rendang adalah makanan tradisional khas Minangkabau, Sumatera
              Barat yang terbuat dari daging dimasak dengan rempah-rempah dan
              santan.
            </p>
            <p className="text-base text-gray-800">
              Asal usul rendang diperkirakan sudah ada sejak abad ke-16.
              Awalnya, rendang merupakan hidangan yang sering disajikan dalam
              acara-acara adat dan upacara keagamaan. Dulu, rendang dibuat untuk
              menemani perjalanan jauh atau perantauan karena tahan lama, berkat
              teknik memasaknya yang panjang hingga benar-benar kering.
            </p>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-2">Bahan-bahan</h2>
          <ul className="list-disc list-inside text-gray-800">
            <li>1,5 kg daging sapi</li>
            <li>3 butir kelapa</li>
            <li>secukupnya merica, pala, cengkeh dihaluskan </li>
            <li>2 ruas lengkuas</li>
            <li>2 batang sereh digeprek</li>
            <li>secukupnya daun jeruk, daun salam, dan daun kunyit</li>
            <li>20 biji bawang merah</li>
            <li>1 sdm saus tiram</li>
            <li>secukupnya jahe</li>
            <li>secukupnya cabe rawit</li>
            <li>1,4 kg cabe merah</li>
          </ul>
        </div>
      </main>
    </div>
  )
}

export default NasiGoreng

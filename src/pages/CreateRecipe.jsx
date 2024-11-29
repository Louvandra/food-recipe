import React, { useState } from "react"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { storage, db } from "../firebase"
import { ref as dbRef, push, set } from "firebase/database"
import { useNavigate } from "react-router-dom"
import { FaPlus } from "react-icons/fa"
import { IoIosArrowBack } from "react-icons/io"

const CreateRecipe = () => {
  const [image, setImage] = useState(null)
  const [imageUrl, setImageUrl] = useState("")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [ingredients, setIngredients] = useState([
    { groupName: "", items: [""] },
  ]) // Nama grup + bahan
  const navigate = useNavigate()

  const handleImageChange = (e) => {
    setImage(e.target.files[0])
  }

  const handleUpload = async () => {
    if (image) {
      const imageRef = ref(storage, `images/${image.name}`)
      await uploadBytes(imageRef, image)
      const url = await getDownloadURL(imageRef)
      setImageUrl(url)
    }
  }

  const handlePublish = async () => {
    if (title && description && imageUrl && ingredients.length > 0) {
      const newRecipeRef = dbRef(db, "recipes")
      const formattedIngredients = ingredients.map((group) => ({
        groupName: group.groupName,
        items: group.items.filter((item) => item.trim() !== ""),
      }))
      const recipeData = {
        title,
        description,
        imageUrl,
        ingredients: formattedIngredients,
      }
      await push(newRecipeRef, recipeData)
      navigate("/recipelist")
    } else {
      alert("Please fill in all fields.")
    }
  }

  const handleAddToFavorites = async () => {
    if (title && description && imageUrl) {
      const favoriteRef = dbRef(db, "favorites")
      const favoriteData = {
        title,
        description,
        imageUrl,
        ingredients,
      }
      await set(push(favoriteRef), favoriteData)
      alert("Resep ditambahkan ke favorit!")
    } else {
      alert("Isi data resep terlebih dahulu sebelum menambah ke favorit.")
    }
  }

  const addIngredient = (groupIndex) => {
    setIngredients((prev) => {
      const updated = [...prev]
      updated[groupIndex].items.push("")
      return updated
    })
  }

  const addGroup = () => {
    setIngredients((prev) => [...prev, { groupName: "", items: [""] }])
  }

  const handleGroupNameChange = (value, groupIndex) => {
    setIngredients((prev) => {
      const updated = [...prev]
      updated[groupIndex].groupName = value
      return updated
    })
  }

  const handleIngredientChange = (value, groupIndex, ingredientIndex) => {
    setIngredients((prev) => {
      const updated = [...prev]
      updated[groupIndex].items[ingredientIndex] = value
      return updated
    })
  }

  return (
    <div className="min-h-screen bg-[#D5E8D4] p-6">
      {/* Back Icon */}
      <div className="absolute top-4 left-4">
        <button
          onClick={() => navigate("/recipelist")}
          className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
        >
          <IoIosArrowBack size={24} />
        </button>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upload Section */}
        <div className="col-span-2 bg-white rounded-lg shadow-lg p-6 flex flex-col">
          <h2 className="text-xl font-bold mb-4">Upload Gambar</h2>
          <input type="file" onChange={handleImageChange} className="mb-4" />
          <button
            onClick={handleUpload}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            Upload
          </button>
          {imageUrl && (
            <img
              src={imageUrl}
              alt="Uploaded"
              className="mt-4 rounded-lg max-h-72 object-cover"
            />
          )}
        </div>

        {/* Publish and Favorite Buttons */}
        <div className="flex flex-col items-center justify-center gap-4">
          <button
            onClick={handlePublish}
            className="px-6 py-3 bg-green-500 text-white text-lg rounded-lg shadow-lg w-3/4"
          >
            Terbitkan Resep
          </button>
          <button
            onClick={handleAddToFavorites}
            className="px-6 py-3 bg-yellow-500 text-white text-lg rounded-lg shadow-lg w-3/4"
          >
            Tambah ke Favorit
          </button>
        </div>
      </div>

      {/* Form Section */}
      <div className="max-w-6xl mx-auto mt-8 bg-white rounded-lg shadow-lg p-6">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Judul Resep"
          className="w-full mb-4 p-3 border border-gray-300 rounded-lg text-lg"
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Deskripsi"
          className="w-full mb-4 p-3 border border-gray-300 rounded-lg text-lg"
          rows="4"
        ></textarea>

        <h2 className="text-xl font-bold mb-4">Bahan-bahan</h2>
        {ingredients.map((group, groupIndex) => (
          <div key={groupIndex} className="mb-6">
            <input
              type="text"
              value={group.groupName}
              onChange={(e) =>
                handleGroupNameChange(e.target.value, groupIndex)
              }
              placeholder={`Nama Grup Bahan ${groupIndex + 1}`}
              className="w-full mb-2 p-2 border border-gray-300 rounded-lg"
            />
            {group.items.map((ingredient, ingredientIndex) => (
              <input
                key={ingredientIndex}
                type="text"
                value={ingredient}
                onChange={(e) =>
                  handleIngredientChange(
                    e.target.value,
                    groupIndex,
                    ingredientIndex
                  )
                }
                placeholder={`Bahan ${ingredientIndex + 1}`}
                className="w-full mb-2 p-2 border border-gray-300 rounded-lg"
              />
            ))}
            <button
              onClick={() => addIngredient(groupIndex)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              <FaPlus /> Tambah Bahan
            </button>
          </div>
        ))}
        <button
          onClick={addGroup}
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg"
        >
          <FaPlus /> Tambah Grup Bahan
        </button>
      </div>
    </div>
  )
}

export default CreateRecipe

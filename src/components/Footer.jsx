// src/components/Footer.jsx
import React from "react"
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa"

const Footer = () => {
  return (
    <div className="bg-[#3EB489] z-50 h-12 flex items-center justify-between px-4 w-full fixed bottom-0">
      <div className="text-white text-sm">
        © 2024 Food Recipe. All rights reserved.
      </div>

      <div className="flex items-center gap-4">
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white"
        >
          <FaFacebookF size={20} />
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white"
        >
          <FaInstagram size={20} />
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white"
        >
          <FaTwitter size={20} />
        </a>
      </div>
    </div>
  )
}

export default Footer

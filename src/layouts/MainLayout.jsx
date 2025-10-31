import { Outlet, Link } from "react-router-dom";
import { useState } from "react";

export default function MainLayout() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="flex flex-col min-h-screen bg-[#FFF8F0]">
      {/* Navbar */}
      <header className="bg-[#E63946] text-white p-4 flex justify-between items-center shadow-md">
        {/* Logo */}
        <h1 className="font-bold text-2xl tracking-wide">🍴 RestoKuy</h1>

        {/* Menu Navigasi */}
        <nav className="flex gap-6 text-lg">
          <Link to="/" className="hover:text-[#FFD166] transition">Dashboard</Link>
          <Link to="/cart" className="hover:text-[#FFD166] transition">Keranjang</Link>
          <Link to="/checkout" className="hover:text-[#FFD166] transition">Checkout</Link>
        </nav>

        {/* Search + Dropdown */}
        <div className="flex gap-3 items-center">
          {/* Search Bar */}
          <input
            type="text"
            placeholder="Cari menu..."
            className="px-3 py-1 rounded border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-[#FFD166]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {/* Dropdown Kategori */}
          <select
            className="px-3 py-1 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-[#FFD166]"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="All">Semua Kategori</option>
            <option value="Makanan">Makanan</option>
            <option value="Minuman">Minuman</option>
          </select>
        </div>
      </header>

      {/* Isi Halaman */}
      <main className="flex-grow p-6">
        <Outlet context={{ selectedCategory, searchTerm }} />
      </main>

      {/* Footer */}
      <footer className="bg-[#E63946] text-white text-center py-3 mt-auto rounded-t-lg">
        © 2025 RestoKuy. All rights reserved.
      </footer>
    </div>
  );
}

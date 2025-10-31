// src/pages/frontpages/Dashboard.jsx
import React from "react";
import { useOutletContext, Link } from "react-router-dom";
import { products } from "../../data/product"; // masih pakai data lokal
import { useCart } from "../../utils/CartContext";

export default function Dashboard() {
  const { selectedCategory, searchTerm } = useOutletContext();
  const { addToCart } = useCart();

  // Filter produk berdasarkan kategori & pencarian
  const filteredProducts = products.filter((p) => {
    const matchCategory =
      selectedCategory === "All" || p.category === selectedCategory;
    const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="p-6 bg-[#FFF8F0] min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">
        🍽️ Menu RestoKuy
      </h1>

      {filteredProducts.length === 0 ? (
        <p className="text-gray-500 text-center">
          Produk tidak ditemukan. Coba ubah kategori atau kata kunci pencarian.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="border rounded-2xl p-4 shadow-md hover:shadow-xl transition bg-white flex flex-col"
            >
              {/* Klik gambar/nama langsung ke halaman detail */}
              <Link to={`/product/${product.id}`} className="block">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover mb-4 rounded-xl"
                />
                <h2 className="font-semibold text-lg text-gray-800 mb-1 hover:text-[#E63946] transition">
                  {product.name}
                </h2>
              </Link>

              <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                {product.desc}
              </p>
              <p className="font-semibold text-[#E63946] text-base mb-3">
                Rp {product.price.toLocaleString("id-ID")}
              </p>

              <button
                onClick={() => addToCart(product)}
                className="mt-auto bg-[#FFD166] text-gray-800 px-3 py-2 rounded-lg hover:bg-[#E63946] hover:text-white transition"
              >
                Tambah ke Keranjang
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

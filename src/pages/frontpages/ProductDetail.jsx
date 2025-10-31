// src/pages/ProductDetail.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCart } from "../../utils/CartContext";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);

  // Ambil data produk dari API Laravel
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data.data))
      .catch((err) => console.error("Gagal ambil produk:", err));
  }, [id]);

  if (!product) {
    return <p className="text-center mt-10 text-gray-600">Memuat produk...</p>;
  }

  const handleAddToCart = () => {
    addToCart(product, qty);
    alert(`${product.name} berhasil ditambahkan ke keranjang!`);
  };

  const handleBuyNow = () => {
    addToCart(product, qty);
    navigate("/checkout");
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
      <img
        src={product.img_url}
        alt={product.name}
        className="w-full h-64 object-contain mb-4 rounded"
      />

      <h2 className="text-2xl font-bold mb-1">{product.name}</h2>
      <p className="text-yellow-500 mb-2">⭐⭐⭐⭐⭐</p>

      <p className="text-gray-700 mb-2">{product.description}</p>
      <p className="text-sm text-gray-500 italic mb-2">
        Kategori: {product.category?.name || "Tanpa Kategori"}
      </p>

      <p className="text-xl font-bold text-green-700 mb-4">
        Rp {product.price.toLocaleString("id-ID")}
      </p>

      <div className="flex items-center gap-2 mb-4">
        <label className="font-medium">Jumlah:</label>
        <input
          type="number"
          min="1"
          value={qty}
          onChange={(e) => setQty(Number(e.target.value))}
          className="border rounded p-1 w-20 text-center"
        />
      </div>

      <p className="font-semibold mb-4">
        Total: Rp {(product.price * qty).toLocaleString("id-ID")}
      </p>

      <div className="flex gap-3">
        <button
          onClick={handleAddToCart}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full"
        >
          Tambah ke Keranjang
        </button>
        <button
          onClick={handleBuyNow}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded w-full"
        >
          Beli Sekarang
        </button>
      </div>
    </div>
  );
}

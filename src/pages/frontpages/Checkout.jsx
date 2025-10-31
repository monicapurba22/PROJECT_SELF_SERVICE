// src/pages/Checkout.jsx
import { useState } from "react";
import { useCart } from "../../utils/CartContext";

export default function Checkout() {
  const { cart, clearCart } = useCart();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("QRIS");

  // Hitung total harga
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  // Fungsi konfirmasi pembelian
  const handleCheckout = (e) => {
    e.preventDefault();

    if (!name || !address) {
      alert("Harap isi semua data pembeli!");
      return;
    }

    alert(
      `✅ Pembelian berhasil!\n\nNama: ${name}\nAlamat: ${address}\nMetode: ${paymentMethod}\nTotal: Rp ${total.toLocaleString(
        "id-ID"
      )}`
    );

    clearCart();
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Checkout
      </h2>

      {/* RINGKASAN BELANJA */}
      <div className="border rounded-lg p-4 mb-6 shadow-sm bg-white">
        <h3 className="font-semibold text-lg mb-2 border-b pb-2">
          Ringkasan Belanja
        </h3>

        {cart.length === 0 ? (
          <p className="text-gray-600">Keranjang kosong.</p>
        ) : (
          cart.map((item) => (
            <div key={item.id} className="py-2 border-b last:border-0">
              <p className="font-medium">
                {item.name} (x{item.qty})
              </p>
              <p className="text-sm text-gray-600">
                Harga: Rp {item.price.toLocaleString("id-ID")} | Subtotal: Rp{" "}
                {(item.price * item.qty).toLocaleString("id-ID")}
              </p>
            </div>
          ))
        )}

        <p className="font-bold mt-4 text-right">
          Total: Rp {total.toLocaleString("id-ID")}
        </p>
      </div>

      {/* FORM DATA PEMBELI */}
      <form
        onSubmit={handleCheckout}
        className="border rounded-lg p-4 bg-white shadow-sm space-y-4"
      >
        <h3 className="font-semibold text-lg border-b pb-2">Data Pembeli</h3>

        {/* Nama */}
        <div>
          <label className="block font-medium mb-1">Nama Lengkap</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border rounded w-full p-2 focus:ring-2 focus:ring-blue-500"
            placeholder="Masukkan nama lengkap kamu"
            required
          />
        </div>

        {/* Alamat */}
        <div>
          <label className="block font-medium mb-1">Alamat</label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="border rounded w-full p-2 focus:ring-2 focus:ring-blue-500"
            placeholder="Masukkan alamat pengiriman"
            required
          />
        </div>

        {/* Metode Pembayaran */}
        <div>
          <label className="block font-medium mb-1">Metode Pembayaran</label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="border rounded w-full p-2 focus:ring-2 focus:ring-blue-500"
          >
            <option value="QRIS">QRIS (Bayar Sekarang)</option>
            <option value="PayLater">PayLater (Bayar Nanti)</option>
          </select>
        </div>

        {/* TAMBAHAN BERDASARKAN PILIHAN */}
        {paymentMethod === "QRIS" && (
          <div className="border p-3 rounded bg-gray-50 text-center mt-4">
            <p className="font-medium mb-2">
              Scan kode QR berikut untuk pembayaran:
            </p>
            <img
              src="/assets/qr-code.png" // pastikan file ini ada di public/assets/
              alt="QRIS Code"
              className="mx-auto w-48 h-48 object-contain"
            />
            <p className="text-sm text-gray-600 mt-2">
              Pastikan nominal sesuai dengan total belanja.
            </p>
          </div>
        )}

        {paymentMethod === "PayLater" && (
          <div className="border p-3 rounded bg-yellow-50 text-center mt-4">
            <p className="font-medium mb-1">Kode Tagihan PayLater Kamu:</p>
            <p className="font-bold text-xl text-gray-800">
              PL-{Math.floor(Math.random() * 1000000)}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              Bayar sebelum 7 hari setelah transaksi.
            </p>
          </div>
        )}

        {/* Tombol Konfirmasi */}
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white w-full py-2 rounded font-semibold mt-4 transition"
        >
          Konfirmasi Pembelian
        </button>
      </form>
    </div>
  );
}

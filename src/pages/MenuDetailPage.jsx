import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { menuData } from "../data/menuData";

const MenuDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const item = menuData.find((m) => m.id === Number(id));
  const [qty, setQty] = useState(1);
  const [note, setNote] = useState("");

  if (!item) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FEF9E1] px-4 pt-32">
        <p className="text-2xl font-['Poppins'] mb-6">Menu item not found.</p>
        <button
          onClick={() => navigate(-1)}
          className="bg-[#FF9D23] hover:bg-[#C14600] text-white px-6 py-3 rounded-full font-semibold font-['Poppins']"
        >
          Go Back
        </button>
      </div>
    );
  }

  const priceNumber = Number(item.price.replace(/[^0-9]/g, ""));
  const total = priceNumber * qty;

  return (
    <div className="min-h-screen bg-[#FEF9E1] pt-32 pb-16 px-4">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-start">
        {/* Image */}
        <div className="relative group rounded-3xl overflow-hidden shadow-xl">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-[420px] object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {item.popular && (
            <div className="absolute top-4 right-4 bg-[#FF9D23] text-white px-4 py-1 rounded-full text-sm font-bold shadow">
              Popular
            </div>
          )}
          <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/70 to-transparent p-4 text-white font-['Poppins'] tracking-wide">
            <span className="text-sm font-semibold">{item.category}</span>
          </div>
        </div>

        {/* Details */}
        <div>
          <button
            onClick={() => navigate(-1)}
            className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-[#FF9D23] hover:text-[#C14600]"
          >
            <span className="text-xl">←</span> Back to Menu
          </button>
          <h1 className="text-4xl md:text-5xl font-extrabold font-['Bungee'] text-gray-800 mb-4 leading-tight">
            {item.name}
          </h1>
          <p className="text-gray-600 font-['Poppins'] mb-6 leading-relaxed">
            {item.description} Disajikan dengan bahan berkualitas tinggi dan
            teknik autentik Jepang untuk rasa terbaik.
          </p>

          {/* Rating */}
          <div className="flex items-center mb-6">
            <div className="flex text-yellow-500 mr-2">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-6 h-6 ${
                    i < Math.floor(item.rating)
                      ? "fill-current"
                      : "fill-none stroke-current"
                  }`}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </svg>
              ))}
            </div>
            <span className="text-sm font-['Poppins'] text-gray-600">
              {item.rating} / 5
            </span>
          </div>

          {/* Order Controls */}
          <div className="bg-white rounded-2xl p-6 shadow-lg mb-8 space-y-6">
            <div>
              <span className="block text-sm font-semibold text-gray-500 mb-1 font-['Poppins']">
                Price
              </span>
              <p className="text-3xl font-extrabold text-[#FF9D23]">
                {item.price}
              </p>
            </div>
            <div>
              <span className="block text-sm font-semibold text-gray-500 mb-2 font-['Poppins']">
                Quantity
              </span>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="w-10 h-10 rounded-full bg-orange-100 hover:bg-orange-200 text-[#C14600] text-xl font-bold flex items-center justify-center"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="text-2xl font-bold w-10 text-center">
                  {qty}
                </span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="w-10 h-10 rounded-full bg-[#FF9D23] hover:bg-[#C14600] text-white text-xl font-bold flex items-center justify-center"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>
            <div>
              <span className="block text-sm font-semibold text-gray-500 mb-2 font-['Poppins']">
                Notes (optional)
              </span>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Tanpa bawang, level pedas sedang, dll..."
                className="w-full h-28 resize-none rounded-2xl border-2 border-orange-200 focus:border-[#FF9D23] focus:outline-none p-4 font-['Poppins'] text-sm"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <span className="block text-xs uppercase tracking-wide text-gray-500 font-['Poppins']">
                  Total
                </span>
                <p className="text-3xl font-extrabold text-[#FF9D23]">
                  Rp {total.toLocaleString("id-ID")}
                </p>
              </div>
              <button className="bg-[#FF9D23] hover:bg-[#C14600] text-white px-8 py-4 rounded-full font-bold font-['Poppins'] text-lg shadow-lg">
                Add to Cart
              </button>
            </div>
          </div>
          <div className="text-sm text-gray-500 font-['Poppins'] leading-relaxed">
            * Semua harga sudah termasuk pajak restoran. Waktu persiapan
            rata-rata 10–15 menit. Terima kasih telah memilih kami!
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuDetailPage;

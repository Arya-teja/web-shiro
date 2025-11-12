import { useEffect, useMemo, useState } from "react";
import { menuData, categories } from "../data/menuData";
// eslint-disable-next-line no-unused-vars -- motion is used via motion.div / motion.button but rule mis-detects
import { motion, AnimatePresence } from "framer-motion"; // motion used for animated elements
import { Link, useNavigate, useParams } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

const MenuPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, setCartOpen } = useCart();
  const selectedItem = useMemo(
    () => (id ? menuData.find((m) => m.id === Number(id)) : null),
    [id]
  );
  const [qty, setQty] = useState(1);
  const [note, setNote] = useState("");
  useEffect(() => {
    // reset controls when opening different item
    setQty(1);
    setNote("");
    // disable body scroll when modal open
    if (id) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [id]);

  const filteredMenu = menuData.filter((item) => {
    const matchCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    const matchSearch = item.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchCategory && matchSearch;
  });

  const containerVariants = {
    show: {
      transition: { staggerChildren: 0.08 },
    },
  };
  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 120, damping: 14 },
    },
    exit: { opacity: 0, y: -10, scale: 0.9, transition: { duration: 0.2 } },
  };
  const modalBackdrop = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
    exit: { opacity: 0 },
  };
  const modalPanel = {
    hidden: { opacity: 0, y: 20, scale: 0.98 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 140, damping: 16 },
    },
    exit: { opacity: 0, y: 10, scale: 0.98, transition: { duration: 0.2 } },
  };

  return (
    <div className="min-h-screen bg-[#FEF9E1] pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-extrabold font-['Bungee'] bg-linear-to-r from-red-600 via-orange-500 to-amber-500 bg-clip-text text-transparent mb-4">
            Our Menu
          </h1>
          <p className="text-lg text-gray-600 font-['Poppins'] max-w-2xl mx-auto">
            Discover authentic Japanese flavors crafted with passion and
            tradition
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8 max-w-md mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search menu..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-6 py-3 rounded-full border-2 border-orange-200 focus:border-[#FF9D23] focus:outline-none font-['Poppins']"
            />
            <svg
              className="w-5 h-5 absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <motion.button
              whileTap={{ scale: 0.9 }}
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-semibold font-['Poppins'] transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-[#FF9D23] text-white shadow-lg scale-105 ring-2 ring-[#FF9D23]"
                  : "bg-white text-gray-700 hover:bg-orange-100"
              }`}
              layout
            >
              {category}
            </motion.button>
          ))}
        </div>

        {/* Menu Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <AnimatePresence initial={false}>
            {filteredMenu.map((item) => (
              <motion.div
                key={item.id}
                variants={cardVariants}
                initial="hidden"
                animate="show"
                exit="exit"
                layout
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 group"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {item.popular && (
                    <div className="absolute top-4 right-4 bg-[#FF9D23] text-white px-3 py-1 rounded-full text-sm font-bold">
                      Popular
                    </div>
                  )}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-sm font-semibold text-gray-700">
                      {item.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold font-['Bungee'] mb-2 text-gray-800">
                    {item.name}
                  </h3>
                  <p className="text-gray-600 font-['Poppins'] mb-4 text-sm">
                    {item.description}
                  </p>

                  {/* Rating */}
                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-500">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-5 h-5 ${
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
                    <span className="ml-2 text-sm text-gray-600 font-['Poppins']">
                      {item.rating}
                    </span>
                  </div>

                  {/* Price & Button */}
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-[#FF9D23]">
                      {item.price}
                    </span>
                    <Link
                      to={`/menu/${item.id}`}
                      className="bg-[#FF9D23] hover:bg-[#C14600] text-white px-6 py-2 rounded-full font-bold font-['Poppins'] transition-colors duration-300"
                    >
                      Order
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* No Results */}
        {filteredMenu.length === 0 && (
          <div className="text-center py-16">
            <p className="text-2xl text-gray-600 font-['Poppins']">
              No menu items found. Try a different search or category.
            </p>
          </div>
        )}
        {/* Detail Modal */}
        <AnimatePresence>
          {id && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center"
              variants={modalBackdrop}
              initial="hidden"
              animate="show"
              exit="exit"
            >
              <div
                className="absolute inset-0 bg-black/50"
                onClick={() => navigate("/menu")}
              />
              <motion.div
                variants={modalPanel}
                className="relative z-10 max-w-5xl w-[92%] md:w-[90%] bg-[#FEF9E1] rounded-3xl shadow-2xl overflow-hidden"
                role="dialog"
                aria-modal="true"
              >
                {/* Close Button */}
                <button
                  onClick={() => navigate("/menu")}
                  className="absolute top-4 right-4 bg-white/90 hover:bg-white text-gray-700 rounded-full w-10 h-10 flex items-center justify-center shadow"
                  aria-label="Close"
                >
                  ✕
                </button>

                {selectedItem ? (
                  <div className="grid md:grid-cols-2 gap-0 items-stretch">
                    {/* Image */}
                    <div className="relative group">
                      <img
                        src={selectedItem.image}
                        alt={selectedItem.name}
                        className="w-full h-80 md:h-full object-cover md:min-h-[520px] group-hover:scale-105 transition-transform duration-500"
                      />
                      {selectedItem.popular && (
                        <div className="absolute top-4 right-4 bg-[#FF9D23] text-white px-4 py-1 rounded-full text-sm font-bold shadow">
                          Popular
                        </div>
                      )}
                      <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/70 to-transparent p-4 text-white font-['Poppins'] tracking-wide">
                        <span className="text-sm font-semibold">
                          {selectedItem.category}
                        </span>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="p-6 md:p-8">
                      <button
                        onClick={() => navigate(-1)}
                        className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-[#FF9D23] hover:text-[#C14600]"
                      >
                        <span className="text-xl">←</span> Back
                      </button>
                      <h2 className="text-3xl md:text-4xl font-extrabold font-['Bungee'] text-gray-800 mb-3 leading-tight">
                        {selectedItem.name}
                      </h2>
                      <p className="text-gray-600 font-['Poppins'] mb-4 leading-relaxed">
                        {selectedItem.description} Disajikan dengan bahan
                        berkualitas tinggi.
                      </p>

                      {/* Rating */}
                      <div className="flex items-center mb-6">
                        <div className="flex text-yellow-500 mr-2">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-6 h-6 ${
                                i < Math.floor(selectedItem.rating)
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
                          {selectedItem.rating} / 5
                        </span>
                      </div>

                      {/* Order Controls */}
                      <div className="bg-white rounded-2xl p-5 shadow-lg mb-6 space-y-5">
                        <div>
                          <span className="block text-sm font-semibold text-gray-500 mb-1 font-['Poppins']">
                            Price
                          </span>
                          <p className="text-2xl font-extrabold text-[#FF9D23]">
                            {selectedItem.price}
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
                            className="w-full h-24 resize-none rounded-2xl border-2 border-orange-200 focus:border-[#FF9D23] focus:outline-none p-3 font-['Poppins'] text-sm"
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="block text-xs uppercase tracking-wide text-gray-500 font-['Poppins']">
                              Total
                            </span>
                            <p className="text-2xl font-extrabold text-[#FF9D23]">
                              {(() => {
                                const priceNumber = Number(
                                  selectedItem.price.replace(/[^0-9]/g, "")
                                );
                                const total = priceNumber * qty;
                                return `Rp ${total.toLocaleString("id-ID")}`;
                              })()}
                            </p>
                          </div>
                          <button
                            onClick={() => {
                              if (selectedItem) {
                                addToCart(selectedItem, qty, note);
                                navigate("/menu");
                                setCartOpen(true);
                              }
                            }}
                            className="bg-[#FF9D23] hover:bg-[#C14600] text-white px-6 py-3 rounded-full font-bold font-['Poppins'] text-base shadow-lg"
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                      <div className="text-xs text-gray-500 font-['Poppins'] leading-relaxed">
                        * Harga termasuk pajak. Waktu persiapan 10–15 menit.
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-10 text-center">
                    <p className="text-2xl font-['Poppins'] mb-6">
                      Menu item not found.
                    </p>
                    <button
                      onClick={() => navigate("/menu")}
                      className="bg-[#FF9D23] hover:bg-[#C14600] text-white px-6 py-3 rounded-full font-semibold font-['Poppins']"
                    >
                      Back to Menu
                    </button>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MenuPage;

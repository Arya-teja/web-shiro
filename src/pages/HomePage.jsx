import React from "react";
import Slider from "../components/Slider";
import { motion } from "framer-motion";

const HomePage = () => {
  const categories = [
    { name: "Sushi", image: "/assets/Menu-sushi.jpg" },
    { name: "Ramen", image: "/assets/Menu-ramen.jpg" },
    { name: "Tempura", image: "/assets/Menu-tempura.jpg" },
    { name: "Teriyaki", image: "/assets/Menu-teriyaki.jpg" },
  ];

  return (
    <>
      <Slider />
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between mt-18 gap-y-10"
      >
        {/* Text Block */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="flex flex-col gap-y-8 items-center text-center md:items-start md:text-left"
        >
          <div className="flex flex-col">
            <motion.h1
              layout
              className="text-5xl md:text-6xl font-extrabold font-['Bungee'] leading-tight bg-linear-to-r from-red-600 via-orange-500 to-amber-500 bg-clip-text text-transparent"
            >
              The Art of <br /> Japanese Taste.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="font-['Poppins'] text-gray-700 max-w-md"
            >
              Taste the beauty of Japan — deliciously unforgettable. From sushi
              to ramen, savor the real Japanese experience crafted with heart.
            </motion.p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.93 }}
            className="bg-[#FF9D23] text-white rounded-full py-3 px-10 font-bold hover:bg-[#C14600] font-['Poppins'] shadow-lg shadow-orange-300/40"
          >
            Order Now
          </motion.button>
          {/* Stats Row */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.12 } },
            }}
            className="grid grid-cols-3 gap-6 mt-6"
          >
            {[
              { label: "Menu Items", value: 120 },
              { label: "Happy Customers", value: "5K+" },
              { label: "Years", value: 8 },
            ].map((s) => (
              <motion.div
                key={s.label}
                variants={{
                  hidden: { opacity: 0, y: 15 },
                  show: { opacity: 1, y: 0 },
                }}
                className="bg-white/70 backdrop-blur rounded-2xl px-5 py-4 shadow border border-orange-200/60"
              >
                <p className="text-2xl font-extrabold font-['Bungee'] bg-linear-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
                  {s.value}
                </p>
                <p className="text-xs tracking-wide font-semibold text-gray-600 font-['Poppins']">
                  {s.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
        {/* Image Block */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.25, duration: 0.7 }}
          className="relative flex items-center"
        >
          <motion.div whileHover={{ scale: 1.03 }} className="relative group">
            <motion.img
              whileHover={{ rotate: 1 }}
              src="/assets/sushi-home.png"
              alt="Sushi hero"
              className="h-[430px] md:h-[470px] rounded-[60px] shadow-xl shadow-orange-200/40 object-cover"
            />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileHover={{ opacity: 1, y: 0 }}
              className="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur px-6 py-3 rounded-3xl shadow-lg flex items-center gap-3 border border-orange-200/60"
            >
              <span className="text-xl font-bold font-['Bungee'] bg-linear-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                Fresh & Authentic
              </span>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Featured Categories */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="font-['Bungee'] font-semibold text-5xl text-center mb-12 bg-linear-to-r from-orange-500 to-red-600 bg-clip-text text-transparent"
        >
          Featured Categories
        </motion.h2>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.12 } },
          }}
          className="grid grid-cols-1 gap-y-10 md:grid-cols-4 gap-x-8"
        >
          {categories.map((c) => (
            <motion.div
              key={c.name}
              variants={{
                hidden: { opacity: 0, y: 40 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { type: "spring", stiffness: 120, damping: 18 },
                },
              }}
              whileHover={{ scale: 1.06 }}
              className="group relative flex flex-col items-center gap-y-4 bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition"
            >
              <div className="relative w-full overflow-hidden rounded-2xl">
                <img
                  src={c.image}
                  alt={c.name}
                  className="rounded-2xl w-full h-52 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity" />
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  className="absolute bottom-4 left-1/2 -translate-x-1/2"
                >
                  <button className="bg-[#FF9D23] hover:bg-[#C14600] text-white px-5 py-2 rounded-full text-sm font-bold font-['Poppins'] shadow">
                    View Details
                  </button>
                </motion.div>
              </div>
              <p className="font-['Bungee'] text-xl">{c.name}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </>
  );
};

export default HomePage;

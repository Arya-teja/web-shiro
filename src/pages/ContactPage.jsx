import React, { useState } from "react";
import {
  FaInstagram,
  FaTiktok,
  FaWhatsapp,
  FaFacebook,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa6";

const ContactPage = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    // Simulate submit
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-[#FEF9E1] pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-extrabold font-['Bungee'] bg-linear-to-r from-red-600 via-orange-500 to-amber-500 bg-clip-text text-transparent mb-4">
            Contact Us
          </h1>
          <p className="text-lg text-gray-600 font-['Poppins'] max-w-2xl mx-auto">
            Ada pertanyaan, saran, atau keluh kesah? Hubungi kami melalui media
            di bawah ini.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Left: Social + Map */}
          <div className="space-y-6">
            {/* Social cards */}
            <div className="grid sm:grid-cols-2 gap-4">
              <a
                href="https://instagram.com/"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-4 bg-white rounded-2xl p-5 shadow hover:shadow-lg transition"
              >
                <span className="p-3 rounded-xl bg-pink-100 text-pink-600">
                  <FaInstagram className="text-2xl" />
                </span>
                <div>
                  <p className="font-bold text-gray-800">Instagram</p>
                  <p className="text-sm text-gray-500">@sushi.shiro</p>
                </div>
              </a>
              <a
                href="https://tiktok.com/"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-4 bg-white rounded-2xl p-5 shadow hover:shadow-lg transition"
              >
                <span className="p-3 rounded-xl bg-black/5 text-black">
                  <FaTiktok className="text-2xl" />
                </span>
                <div>
                  <p className="font-bold text-gray-800">TikTok</p>
                  <p className="text-sm text-gray-500">@sushi.shiro</p>
                </div>
              </a>
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-4 bg-white rounded-2xl p-5 shadow hover:shadow-lg transition"
              >
                <span className="p-3 rounded-xl bg-green-100 text-green-600">
                  <FaWhatsapp className="text-2xl" />
                </span>
                <div>
                  <p className="font-bold text-gray-800">WhatsApp</p>
                  <p className="text-sm text-gray-500">+62 812-3456-7890</p>
                </div>
              </a>
              <a
                href="mailto:hello@sushishiro.com"
                className="group flex items-center gap-4 bg-white rounded-2xl p-5 shadow hover:shadow-lg transition"
              >
                <span className="p-3 rounded-xl bg-blue-100 text-blue-600">
                  <FaEnvelope className="text-2xl" />
                </span>
                <div>
                  <p className="font-bold text-gray-800">Email</p>
                  <p className="text-sm text-gray-500">hello@sushishiro.com</p>
                </div>
              </a>
            </div>

            {/* Address card */}
            <div className="bg-white rounded-2xl p-6 shadow">
              <div className="flex items-center gap-3 mb-3">
                <FaPhone className="text-[#FF9D23]" />
                <span className="font-bold">(021) 555-1234</span>
              </div>
              <p className="text-gray-600 text-sm font-['Poppins']">
                Jl. Sakura No. 12, Jakarta, Indonesia
              </p>
            </div>

            {/* Map */}
            <div className="overflow-hidden rounded-2xl shadow-lg h-80">
              <iframe
                title="Sushi Shiro Map"
                src="https://www.google.com/maps?q=Jakarta%20Indonesia&output=embed"
                width="100%"
                height="100%"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Right: Feedback form */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h2 className="text-2xl font-['Bungee'] mb-4 text-gray-800">
              Keluh Kesah Anda
            </h2>
            <p className="text-sm text-gray-600 font-['Poppins'] mb-6">
              Sampaikan pengalaman Anda agar kami bisa lebih baik lagi.
            </p>
            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1">Nama</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={onChange}
                  required
                  className="w-full rounded-xl border-2 border-orange-200 focus:border-[#FF9D23] focus:outline-none p-3"
                  placeholder="Nama Anda"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={onChange}
                  required
                  className="w-full rounded-xl border-2 border-orange-200 focus:border-[#FF9D23] focus:outline-none p-3"
                  placeholder="email@contoh.com"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Pesan
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={onChange}
                  required
                  rows={6}
                  className="w-full rounded-2xl border-2 border-orange-200 focus:border-[#FF9D23] focus:outline-none p-3 resize-y"
                  placeholder="Tulis keluh kesah atau saran Anda di sini..."
                />
              </div>
              <button
                type="submit"
                className="bg-[#FF9D23] hover:bg-[#C14600] text-white px-6 py-3 rounded-full font-bold"
              >
                Kirim
              </button>
              {sent && (
                <p className="text-green-600 text-sm mt-2">
                  Terima kasih! Pesan Anda telah dikirim.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;

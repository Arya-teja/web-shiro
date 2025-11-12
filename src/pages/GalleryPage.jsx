import { useState } from "react";

const GalleryPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const galleryImages = [
    {
      id: 1,
      src: "/assets/sushi-home.png",
      title: "Fresh Sushi Platter",
      category: "Sushi",
    },
    {
      id: 2,
      src: "/assets/Menu-sushi.jpg",
      title: "Premium Sashimi",
      category: "Sushi",
    },
    {
      id: 3,
      src: "/assets/Menu-ramen.jpg",
      title: "Tonkotsu Ramen Bowl",
      category: "Ramen",
    },
    {
      id: 4,
      src: "/assets/Menu-tempura.jpg",
      title: "Crispy Tempura",
      category: "Tempura",
    },
    {
      id: 5,
      src: "/assets/Menu-teriyaki.jpg",
      title: "Teriyaki Chicken",
      category: "Teriyaki",
    },
    {
      id: 6,
      src: "/assets/sushi-home.png",
      title: "Sushi Roll Selection",
      category: "Sushi",
    },
    {
      id: 7,
      src: "/assets/Menu-ramen.jpg",
      title: "Special Ramen",
      category: "Ramen",
    },
    {
      id: 8,
      src: "/assets/Menu-tempura.jpg",
      title: "Shrimp Tempura",
      category: "Tempura",
    },
    {
      id: 9,
      src: "/assets/Menu-sushi.jpg",
      title: "Nigiri Selection",
      category: "Sushi",
    },
    {
      id: 10,
      src: "/assets/sushi-home.png",
      title: "Chef's Special",
      category: "Sushi",
    },
    {
      id: 11,
      src: "/assets/Menu-ramen.jpg",
      title: "Miso Ramen",
      category: "Ramen",
    },
    {
      id: 12,
      src: "/assets/Menu-teriyaki.jpg",
      title: "Salmon Teriyaki",
      category: "Teriyaki",
    },
  ];

  const categories = ["All", "Sushi", "Ramen", "Tempura", "Teriyaki"];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredImages =
    selectedCategory === "All"
      ? galleryImages
      : galleryImages.filter((img) => img.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#FEF9E1] pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-extrabold font-['Bungee'] bg-gradient-to-r from-red-600 via-orange-500 to-amber-500 bg-clip-text text-transparent mb-4">
            Our Gallery
          </h1>
          <p className="text-lg text-gray-600 font-['Poppins'] max-w-2xl mx-auto">
            Feast your eyes on our beautiful Japanese dishes
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-semibold font-['Poppins'] transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-[#FF9D23] text-white shadow-lg scale-105"
                  : "bg-white text-gray-700 hover:bg-orange-100"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery Grid - Masonry Style */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((image, index) => (
            <div
              key={image.id}
              className={`group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer ${
                index % 5 === 0 ? "sm:col-span-2 sm:row-span-2" : ""
              }`}
              onClick={() => setSelectedImage(image)}
            >
              <img
                src={image.src}
                alt={image.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex items-center justify-center">
                <div className="text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:scale-100 scale-75">
                  <h3 className="text-white text-2xl font-bold font-['Bungee'] mb-2">
                    {image.title}
                  </h3>
                  <p className="text-white font-['Poppins'] bg-[#FF9D23] px-4 py-1 rounded-full inline-block">
                    {image.category}
                  </p>
                </div>
              </div>

              {/* Plus Icon */}
              <div className="absolute top-4 right-4 bg-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg
                  className="w-6 h-6 text-[#FF9D23]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* Image Count */}
        <div className="text-center mt-12">
          <p className="text-gray-600 font-['Poppins']">
            Showing {filteredImages.length} of {galleryImages.length} images
          </p>
        </div>

        {/* Lightbox Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-5xl w-full">
              {/* Close Button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 text-white hover:text-[#FF9D23] transition-colors"
              >
                <svg
                  className="w-10 h-10"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {/* Image */}
              <img
                src={selectedImage.src}
                alt={selectedImage.title}
                className="w-full h-auto rounded-2xl shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />

              {/* Image Info */}
              <div
                className="mt-6 text-center"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-white text-3xl font-bold font-['Bungee'] mb-2">
                  {selectedImage.title}
                </h3>
                <p className="text-white font-['Poppins'] text-lg">
                  Category: {selectedImage.category}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GalleryPage;

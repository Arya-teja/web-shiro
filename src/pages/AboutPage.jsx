import React from "react";

const AboutPage = () => {
  const teamMembers = [
    {
      name: "Takeshi Nakamura",
      role: "Head Chef",
      image: "/assets/chef/takeshi.jpg",
      description: "20+ years experience in Japanese cuisine",
    },
    {
      name: "Yuki Tanaka",
      role: "Sushi Master",
      image: "/assets/chef/yuki-tanaka.jpg",
      description: "Expert in traditional Edomae sushi",
    },
    {
      name: "Hiro Yamamoto",
      role: "Ramen Chef",
      image: "/assets/chef/hiro-yamamato.jpg",
      description: "Specialist in authentic tonkotsu broth",
    },
  ];

  const values = [
    {
      icon: "🍱",
      title: "Authentic Taste",
      description:
        "We bring traditional Japanese flavors using time-honored recipes",
    },
    {
      icon: "🌟",
      title: "Premium Quality",
      description: "Only the finest ingredients sourced from trusted suppliers",
    },
    {
      icon: "❤️",
      title: "Made with Love",
      description: "Every dish is crafted with passion and attention to detail",
    },
    {
      icon: "🌿",
      title: "Fresh Daily",
      description: "We prepare everything fresh every single day",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FEF9E1] pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-extrabold font-['Bungee'] bg-gradient-to-r from-red-600 via-orange-500 to-amber-500 bg-clip-text text-transparent mb-6">
            About Sushi Shiro
          </h1>
          <p className="text-xl text-gray-700 font-['Poppins'] max-w-3xl mx-auto leading-relaxed">
            Bringing the authentic taste of Japan to your table since 2020. We
            are passionate about creating unforgettable Japanese dining
            experiences.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <img
              src="/assets/sushi-home.png"
              alt="Our Story"
              className="rounded-3xl shadow-2xl w-full h-[400px] object-cover"
            />
          </div>
          <div>
            <h2 className="text-4xl font-bold font-['Bungee'] text-gray-800 mb-6">
              Our Story
            </h2>
            <div className="space-y-4 text-gray-700 font-['Poppins'] leading-relaxed">
              <p>
                Sushi Shiro was born from a dream to share the beauty of
                Japanese cuisine with food lovers everywhere. Our founder, Chef
                Takeshi, trained for over 20 years in Tokyo before bringing his
                expertise here.
              </p>
              <p>
                We believe that great food brings people together. Every dish we
                serve is prepared with the same care and precision as it would
                be in the finest restaurants of Tokyo.
              </p>
              <p>
                From our signature sushi rolls to our rich, flavorful ramen
                bowls, each recipe has been perfected over years of dedication
                to the craft.
              </p>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold font-['Bungee'] text-center text-gray-800 mb-12">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <div className="text-6xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold font-['Bungee'] text-gray-800 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 font-['Poppins']">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div>
          <h2 className="text-4xl font-bold font-['Bungee'] text-center text-gray-800 mb-12">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <div className="h-64 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-2xl font-bold font-['Bungee'] text-gray-800 mb-2">
                    {member.name}
                  </h3>
                  <p className="text-[#FF9D23] font-semibold font-['Poppins'] mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-600 font-['Poppins']">
                    {member.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20 bg-gradient-to-r from-[#FF9D23] to-[#C14600] rounded-3xl p-12 text-white">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold font-['Bungee'] mb-2">
                500+
              </div>
              <div className="text-lg font-['Poppins']">Happy Customers</div>
            </div>
            <div>
              <div className="text-5xl font-bold font-['Bungee'] mb-2">50+</div>
              <div className="text-lg font-['Poppins']">Menu Items</div>
            </div>
            <div>
              <div className="text-5xl font-bold font-['Bungee'] mb-2">
                4.8★
              </div>
              <div className="text-lg font-['Poppins']">Average Rating</div>
            </div>
            <div>
              <div className="text-5xl font-bold font-['Bungee'] mb-2">5+</div>
              <div className="text-lg font-['Poppins']">Years Experience</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;

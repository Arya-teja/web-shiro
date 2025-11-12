const Footer = () => {
  return (
    <div className="bg-gray-800 text-white py-4">
      <div className="max-w-7xl mx-auto px-4">
        <p className="text-center">
          &copy; {new Date().getFullYear()} Sushi Shiro. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;

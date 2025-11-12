import { useEffect, useState } from "react";
import { MdMenu, MdClose } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import { MdShoppingCart } from "react-icons/md";
import { useCart } from "../context/CartContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";

const Navbar = () => {
  // Navbar states
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();
  const {
    items,
    total,
    isCartOpen,
    setCartOpen,
    updateQty,
    removeFromCart,
    clearCart,
  } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 120);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Lock body scroll when mobile drawer open
  useEffect(() => {
    document.body.style.overflow = open || isCartOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open, isCartOpen]);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userMenuOpen && !e.target.closest(".user-menu-container")) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [userMenuOpen]);

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <div
        className={`fixed top-0 left-0 w-full z-50 border-b transition-all duration-500 ${
          scrolled
            ? "bg-white/90 backdrop-blur-md shadow-md border-black/5"
            : "bg-transparent border-transparent"
        }`}
      >
        <nav
          className={`flex justify-between items-center max-w-7xl mx-auto px-4 ${
            scrolled ? "py-3" : "py-5"
          }`}
        >
          <Link to="/">
            <h1
              className={`font-extrabold font-['Bungee'] transition-all duration-500 hover:scale-105 cursor-pointer ${
                scrolled
                  ? "text-3xl text-[#FF9D23]"
                  : "text-5xl bg-linear-to-r from-red-600 via-orange-500 to-amber-500 bg-clip-text text-transparent"
              }`}
            >
              SUSHI SHIRO
            </h1>
          </Link>
          <ul className="hidden md:flex items-center gap-x-8 font-['Poppins']">
            {[
              { to: "/", label: "Home" },
              { to: "/menu", label: "Menu" },
              { to: "/about", label: "About Us" },
              { to: "/contact", label: "Contact" },
            ].map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className={`relative group text-xl md:text-2xl font-semibold transition-colors duration-300 ${
                    scrolled ? "text-gray-800" : "text-white"
                  } ${isActive(item.to) ? "text-[#FF9D23]" : ""}`}
                >
                  {item.label}
                  <span
                    className={`pointer-events-none absolute left-0 -bottom-1 h-0.5 w-0 transition-all duration-300 ${
                      scrolled
                        ? "bg-linear-to-r from-[#FF9D23] to-[#C14600]"
                        : "bg-[#FF9D23]"
                    } group-hover:w-full ${isActive(item.to) ? "w-full" : ""}`}
                  />
                </Link>
              </li>
            ))}
          </ul>
          {!scrolled && (
            <>
              {user ? (
                <div className="hidden md:block relative user-menu-container">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white rounded-full py-2 px-5 font-semibold transition-all duration-300 hover:bg-white/30 hover:shadow-lg"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#FF9D23] flex items-center justify-center font-bold text-white">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <span>{user.name}</span>
                  </button>
                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl py-2 border border-orange-100">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm text-gray-500">Signed in as</p>
                        <p className="font-semibold text-gray-800 truncate">
                          {user.email}
                        </p>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-gray-700 hover:bg-orange-50 hover:text-[#FF9D23] font-semibold transition-colors"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link to="/login" className="hidden md:inline-block">
                  <button className="bg-[#FF9D23] text-white rounded-full py-2 px-6 font-bold transition-all duration-300 hover:bg-[#C14600] hover:shadow-lg hover:shadow-orange-500/30">
                    Sign In
                  </button>
                </Link>
              )}
            </>
          )}
          {/* Cart Icon */}
          <button
            className={`hidden md:inline-flex items-center justify-center relative ml-4 p-2 rounded-full transition-colors ${
              scrolled ? "text-gray-800" : "text-white"
            } hover:bg-black/10`}
            onClick={() => setCartOpen(true)}
            aria-label="Open cart"
          >
            <MdShoppingCart className="text-3xl" />
            {items.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#FF9D23] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {items.reduce((sum, i) => sum + i.qty, 0)}
              </span>
            )}
          </button>
          {/* Mobile Menu */}
          <button
            className={`md:hidden p-2 rounded-full transition-colors ${
              scrolled ? "text-gray-800" : "text-white"
            } hover:bg-black/10`}
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <MdMenu className="text-3xl" />
          </button>
        </nav>
      </div>

      {/* Mobile Drawer Overlay */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/50"
          onClick={() => setOpen(false)}
        />
        <div
          className={`absolute right-0 top-0 h-full w-[80%] max-w-xs bg-white shadow-xl transition-transform duration-500 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between p-4 border-b">
            <span className="font-['Bungee'] text-[#FF9D23] text-2xl">
              Menu
            </span>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="p-2 rounded-full hover:bg-black/5"
            >
              <MdClose className="text-2xl" />
            </button>
          </div>
          <nav className="p-4">
            <ul className="space-y-4">
              {[
                { to: "/", label: "Home" },
                { to: "/menu", label: "Menu" },
                { to: "/about", label: "About Us" },
                { to: "/contact", label: "Contact" },
              ].map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className={`block text-lg font-semibold transition-colors ${
                      isActive(item.to)
                        ? "text-[#FF9D23]"
                        : "text-gray-800 hover:text-[#FF9D23]"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 pt-6 border-t border-gray-200">
              {user ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-3 px-3 py-2 bg-orange-50 rounded-xl">
                    <div className="w-10 h-10 rounded-full bg-[#FF9D23] flex items-center justify-center font-bold text-white">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-800 truncate">
                        {user.name}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      handleLogout();
                      setOpen(false);
                    }}
                    className="w-full bg-red-500 text-white rounded-xl py-2 font-semibold hover:bg-red-600 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link to="/login" onClick={() => setOpen(false)}>
                  <button className="w-full bg-[#FF9D23] text-white rounded-xl py-2 font-semibold hover:bg-[#C14600] transition-colors">
                    Sign In
                  </button>
                </Link>
              )}
            </div>
          </nav>
        </div>
      </div>

      {/* Cart Drawer Overlay */}
      <div
        className={`fixed inset-0 z-40 transition-opacity duration-300 ${
          isCartOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/50"
          onClick={() => setCartOpen(false)}
        />
        <div
          className={`absolute right-0 top-0 h-full w-full sm:w-[420px] bg-white shadow-2xl transition-transform duration-500 ${
            isCartOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between p-4 border-b">
            <span className="font-['Bungee'] text-[#FF9D23] text-2xl">
              Keranjang
            </span>
            <button
              onClick={() => setCartOpen(false)}
              aria-label="Close cart"
              className="p-2 rounded-full hover:bg-black/5"
            >
              <MdClose className="text-2xl" />
            </button>
          </div>
          <div className="h-[calc(100%-160px)] overflow-y-auto p-4 space-y-4">
            {items.length === 0 ? (
              <p className="text-gray-500 font-['Poppins']">
                Keranjang kosong.
              </p>
            ) : (
              items.map((it) => (
                <div
                  key={`${it.id}-${it.note}`}
                  className="flex gap-3 items-start border-b pb-4"
                >
                  <img
                    src={it.image}
                    alt={it.name}
                    className="w-20 h-20 object-cover rounded-xl"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-bold text-gray-800">{it.name}</p>
                        {it.note && (
                          <p className="text-xs text-gray-500">
                            Catatan: {it.note}
                          </p>
                        )}
                      </div>
                      <button
                        className="text-gray-400 hover:text-red-500"
                        onClick={() => removeFromCart(it.id, it.note)}
                        aria-label="Remove item"
                      >
                        ✕
                      </button>
                    </div>
                    <div className="mt-2 flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updateQty(it.id, it.note, it.qty - 1)}
                          className="w-8 h-8 rounded-full bg-orange-100 hover:bg-orange-200 text-[#C14600] text-lg font-bold flex items-center justify-center"
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="w-8 text-center font-semibold">
                          {it.qty}
                        </span>
                        <button
                          onClick={() => updateQty(it.id, it.note, it.qty + 1)}
                          className="w-8 h-8 rounded-full bg-[#FF9D23] hover:bg-[#C14600] text-white text-lg font-bold flex items-center justify-center"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                      <span className="font-bold text-[#FF9D23]">
                        Rp {(it.priceNumber * it.qty).toLocaleString("id-ID")}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="p-4 border-t bg-white">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm text-gray-500">Total</span>
              <span className="text-2xl font-extrabold text-[#FF9D23]">
                Rp {total.toLocaleString("id-ID")}
              </span>
            </div>
            <div className="flex gap-3">
              <button
                onClick={clearCart}
                className="flex-1 border-2 border-red-300 text-red-600 rounded-full py-2 font-semibold hover:bg-red-50"
              >
                Kosongkan
              </button>
              <button
                onClick={() => setCartOpen(false)}
                className="flex-1 bg-[#FF9D23] text-white rounded-full py-2 font-bold hover:bg-[#C14600]"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;

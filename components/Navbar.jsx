// components/Navbar.js
import Link from "next/link";

export default function Navbar() {
  return (
    <nav
      className="fixed z-50"
      style={{
        top: '24px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '90%',
        maxWidth: '1024px',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(12px)',
        borderRadius: '9999px',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        padding: '12px 24px'
      }}
    >
      <div className="flex items-center justify-between w-full">
        {/* Logo */}
        <div className="flex items-center flex-shrink-0">
          <Link href="/">
            <img
              src="/logo.png"
              alt="CodeNex Logo"
              className="h-6 w-auto max-w-[120px]"
            />
          </Link>
        </div>

        {/* Menu Items */}
        <div className="flex items-center flex-shrink-0">
          <Link
            href="#"
            style={{ color: 'white', textDecoration: 'none', marginLeft: "20px", marginRight: "20px" }}
          >
            About
          </Link>
          <Link
            href="#"
            style={{ color: 'white', textDecoration: 'none', marginLeft: "20px", marginRight: "20px" }}
          >
            Domains
          </Link>
          <Link
            href="#"
            style={{ color: 'white', textDecoration: 'none', marginLeft: "20px", marginRight: "20px" }}
          >
            Timeline
          </Link>
          <Link
            href="#"
            style={{ color: 'white', textDecoration: 'none', marginLeft: "20px", marginRight: "20px" }}
          >
            Contact
          </Link>
          <Link
            href="#"
            style={{ color: 'white', textDecoration: 'none', marginLeft: "20px", marginRight: "20px" }}
          >
            Register Now
          </Link>
        </div>
      </div>
    </nav>
  );
}
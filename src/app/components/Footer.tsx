import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 px-6 md:px-20 w-full">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand Info */}
        <div>
          <h2 className="text-2xl font-bold">EliteX Watches</h2>
          <p className="mt-2 text-gray-400">
            Elevate your style with premium watches. Time, redefined.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link href="/" className="hover:text-blue-500">Home</Link></li>
            <li><Link href="/about" className="hover:text-blue-500">About</Link></li>
            <li><Link href="/shop" className="hover:text-blue-500">Shop</Link></li>
            <li><Link href="/contact" className="hover:text-blue-500">Contact</Link></li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Categories</h3>
          <ul className="space-y-2">
            <li><Link href="/shop/smart-watches" className="hover:text-blue-500">Smart Watches</Link></li>
            <li><Link href="/shop/sport-watches" className="hover:text-blue-500">Sport Watches</Link></li>
            <li><Link href="/shop/mens-watches" className="hover:text-blue-500">Men&apos;s Watches</Link></li>
            <li><Link href="/shop/ladies-watches" className="hover:text-blue-500">Ladies Watches</Link></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Subscribe</h3>
          <p className="text-gray-400 mb-3">Get updates on new arrivals and exclusive deals.</p>
          <form className="flex">
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-2 text-black dark:text-white rounded-l-lg focus:outline-none"
            />
            <button type="submit" className="bg-blue-500 px-4 py-2 rounded-r-lg">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Social Media */}
      <div className="flex justify-center space-x-6 mt-8">
        <Link href="#" className="hover:text-blue-500"><i className="fab fa-facebook text-xl"></i></Link>
        <Link href="#" className="hover:text-blue-500"><i className="fab fa-instagram text-xl"></i></Link>
        <Link href="#" className="hover:text-blue-500"><i className="fab fa-twitter text-xl"></i></Link>
        <Link href="#" className="hover:text-blue-500"><i className="fab fa-linkedin text-xl"></i></Link>
      </div>

      {/* Copyright */}
      <p className="text-center text-gray-500 mt-6">
        © {new Date().getFullYear()} EliteX Watches. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;

import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

const sections = [
  {
    title: "Products",
    links: [
      { name: "Overview", href: "#" },
      { name: "Pricing", href: "#" },
      { name: "Marketplace", href: "#" },
      { name: "Features", href: "#" },
    ],
  },
  {
    title: "About Us",
    links: [
      { name: "Our Story", href: "#" },
      { name: "Meet the Team", href: "#" },
      { name: "Blog", href: "#" },
      { name: "Careers", href: "#" },
    ],
  },
  {
    title: "Support",
    links: [
      { name: "Help Center", href: "#" },
      { name: "Sales Inquiries", href: "#" },
      { name: "Advertising", href: "#" },
      { name: "Privacy Policy", href: "#" },
    ],
  },
];

const Footer = () => {
  return (
    <section className="py-16 border-t mt-16 bg-gray-900">
      <div className="container mx-auto px-4">
        <footer>
          <div className="flex flex-col items-center text-center lg:flex-row">
            <div className="flex flex-col w-full max-w-lg items-center lg:items-start lg:max-w-2xl gap-8">
              <div>
                <Link
                  to={"/"}
                  className="text-3xl font-extrabold text-white flex items-center gap-3"
                >
                  <h1>
                    Bike<span className="text-blue-500">Nexus</span>
                  </h1>
                </Link>
                <p className="mt-6 text-sm text-gray-400 text-center lg:text-left">
                  BikeNexus – Your premier destination for high-quality
                  bicycles, accessories, and expert repair services.
                  <br />
                  📍 Premium Quality | 🔧 Expert Service | 🚴‍♂️ Designed for Every
                  Rider.
                </p>
              </div>
              <ul className="flex items-center space-x-6 text-gray-400">
                <li>
                  <a href="#" className="hover:text-blue-500">
                    <FaInstagram className="text-xl" />
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-500">
                    <FaFacebook className="text-xl" />
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-500">
                    <FaTwitter className="text-xl" />
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-500">
                    <FaLinkedin className="text-xl" />
                  </a>
                </li>
              </ul>
            </div>
            <div className="grid grid-cols-1 gap-8 w-full md:grid-cols-3 lg:w-2/3">
              {sections.map((section, sectionIdx) => (
                <div key={sectionIdx}>
                  <h3 className="mb-4 text-lg font-semibold text-white">
                    {section.title}
                  </h3>
                  <ul className="space-y-4 text-sm text-gray-400">
                    {section.links.map((link, linkIdx) => (
                      <li key={linkIdx}>
                        <a
                          href={link.href}
                          className="font-medium hover:text-blue-500"
                        >
                          {link.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-16 pt-8 border-t flex flex-col gap-4 text-center text-sm text-gray-400 lg:flex-row lg:justify-between lg:items-center">
            <p>© 2024 BikeNexus. All rights reserved.</p>
            <ul className="flex justify-center gap-8 lg:justify-start">
              <li>
                <a href="#" className="hover:text-blue-500">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-500">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </footer>
      </div>
    </section>
  );
};

export default Footer;

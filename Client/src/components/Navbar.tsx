import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Link, useLocation } from "react-router-dom";
import { LuShoppingCart, LuSearch } from "react-icons/lu";
import { useCurrentToken } from "@/Redux/Features/Auth/AuthSlice";
import { useAppSelector } from "@/Redux/hooks";
import { jwtDecode } from "jwt-decode";
import ProfileDropDown from "@/pages/ProfileDropDown";

const navItems = [
  { title: "Home", link: "/" },
  { title: "All Products", link: "/products" },
  { title: "About Us", link: "/about" },
  { title: "Contact Us", link: "/contact" },
];

const Navbar = () => {
  const location = useLocation();
  const token = useAppSelector(useCurrentToken);
  const user = token ? jwtDecode(token) : null;
  const { selectedItems } = useAppSelector((state) => state.product);

  return (
    <header className="p-4 border-b bg-white sticky top-0 z-20 shadow-sm">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold">
          <h1>
            Bike<span className="text-blue-600">Nexus</span>
          </h1>
        </Link>

        {/* Navigation for Large Screens */}
        <nav className="hidden lg:flex items-center gap-6">
          {navItems.map((item, index) => (
            <Link
              key={index}
              className={cn(
                "text-gray-600 hover:text-blue-600 transition-all duration-200 font-medium relative",
                location.pathname === item.link &&
                  "text-blue-600 font-semibold after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:bg-blue-600"
              )}
              to={item.link}
            >
              {item.title}
            </Link>
          ))}
        </nav>

        {/* Right Side Icons */}
        <div className="flex items-center gap-4">
          <Link to="/products">
            <LuSearch className="text-2xl text-gray-600 hover:text-blue-600 transition" />
          </Link>
          <Link to="/cart" className="relative">
            <LuShoppingCart className="text-2xl text-gray-600 hover:text-blue-600 transition" />
            {selectedItems > 0 && (
              <span className="absolute -top-2 -right-3 bg-blue-600 text-white text-xs font-semibold rounded-full px-2 py-0.5">
                {selectedItems}
              </span>
            )}
          </Link>
          {user ? (
            <ProfileDropDown />
          ) : (
            <Link to="/login">
              <Button
                variant="outline"
                className="text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white"
              >
                Log in
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <Menu className="size-5 text-gray-600" />
            </Button>
          </SheetTrigger>
          <SheetContent className="overflow-y-auto p-6">
            <SheetHeader>
              <SheetTitle>
                <Link
                  to="/"
                  className="flex items-center gap-2 text-2xl font-bold"
                >
                  <h1>
                    Bike<span className="text-blue-600">Nexus</span>
                  </h1>
                </Link>
              </SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-4 mt-6">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  className={cn(
                    "text-gray-600 text-lg hover:text-blue-600 transition-all duration-200 relative",
                    location.pathname === item.link &&
                      "text-blue-600 font-semibold after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:bg-blue-600"
                  )}
                  to={item.link}
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Navbar;

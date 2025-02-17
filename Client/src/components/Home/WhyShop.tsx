import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import since from "@/assets/whyIcons/since.png";
import Assembly from "@/assets/whyIcons/Assembly.png";
import Advice from "@/assets/whyIcons/Advice.png";
import Shipping from "@/assets/whyIcons/Shipping.png";
import cycle from "@/assets/cycle/bike.jpg";

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const WhyShop = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="text-center">
        <h1 className="text-2xl font-bold pb-5">Why BikeNexus?</h1>
      </div>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-6">
        {[
          {
            img: since,
            title: "Since 1992",
            text: "Your trusted bike shop for over 32 years.",
            link: "/about",
            btn: "About Us →",
          },
          {
            img: Assembly,
            title: "Platinum Assembly",
            text: "Your new bike is professionally assembled, tuned and packaged.",
            link: "/products",
            btn: "Shop Now →",
          },
          {
            img: Advice,
            title: "Expert Advice",
            text: "Shopping for bikes online can be tough. Call us anytime or chat with a bike expert.",
            link: "/contact",
            btn: "Contact Us →",
          },
          {
            img: Shipping,
            title: "Free Shipping",
            text: "Shop with confidence, fast and free shipping on most orders",
            link: "/contact",
            btn: "More Info →",
          },
        ].map((item, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="p-6 flex flex-col items-center justify-between text-center bg-blue-50 rounded-md shadow-lg space-y-4 hover:shadow-xl transition-shadow duration-300"
          >
            <img src={item.img} className="w-16 mb-4" alt="whyIcons" />
            <h2 className="text-xl font-semibold">{item.title}</h2>
            <p className="text-gray-700">{item.text}</p>
            <Link to={item.link} className="w-full">
              <Button
                variant="outline"
                className="w-full mt-4 rounded-none hover:bg-blue-700 hover:text-white"
              >
                {item.btn}
              </Button>
            </Link>
          </motion.div>
        ))}
      </div>
      <section className="bg-white rounded-xl shadow-md mt-8 flex flex-col md:flex-row items-center overflow-hidden">
        <motion.img
          src={cycle}
          alt="Bicycle Workshop"
          className="w-full md:w-1/2 rounded-lg"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0, transition: { duration: 0.5 } }}
        />
        <motion.div
          className="md:ml-6 mt-4 md:mt-0"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0, transition: { duration: 0.5 } }}
        >
          <h3 className="text-2xl font-semibold text-gray-800">Our Journey</h3>
          <p className="text-gray-700 text-lg mt-2">
            Founded by a group of passionate cyclists, BikeNexus began as a
            humble shop with a big dream: to make cycling accessible to
            everyone, no matter their background or experience. Over the years,
            we've grown, but our core belief remains unchanged – providing
            top-quality bicycles, expert repairs, and unbeatable customer
            service. Today, we proudly serve a community of happy riders who
            trust us for all their cycling needs. Whether you're a first-time
            rider or a seasoned pro, BikeNexus is here to keep you riding
            smoothly, mile after mile.
          </p>
        </motion.div>
      </section>
    </div>
  );
};

export default WhyShop;

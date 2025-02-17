import LatestProducts from "@/components/Home/LatestProducts";
import Hero from "../components/Home/Hero";
import Promise from "../components/Home/Promise";
import WhyShop from "../components/Home/WhyShop";

const Home = () => {
  return (
    <div className="space-y-10">
      <Hero />
      <LatestProducts />
      <WhyShop />
      <Promise />
    </div>
  );
};

export default Home;

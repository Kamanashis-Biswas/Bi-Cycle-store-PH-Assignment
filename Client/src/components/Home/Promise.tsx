import icon1 from "@/assets/icons/1.png";
import icon2 from "@/assets/icons/2.png";
import icon3 from "@/assets/icons/3.png";
import icon4 from "@/assets/icons/4.png";
import icon5 from "@/assets/icons/5.png";
import icon6 from "@/assets/icons/6.png";

const Promise = () => {
  return (
    <div className="flex flex-wrap items-center md:justify-evenly gap-8 bg-blue-50 p-6 rounded-lg shadow-md">
      <div className="flex items-center gap-3 text-gray-800">
        <img src={icon1} alt="Price Match Guarantee" width={35} />
        <p className="font-semibold text-lg">Best Price Guarantee</p>
      </div>
      <div className="flex items-center gap-3 text-gray-800">
        <img src={icon2} alt="30 Day Satisfaction" width={35} />
        <p className="font-semibold text-lg">30-Day Satisfaction Promise</p>
      </div>
      <div className="flex items-center gap-3 text-gray-800">
        <img src={icon3} alt="Widest Product Range" width={35} />
        <p className="font-semibold text-lg">Unmatched Product Selection</p>
      </div>
      <div className="flex items-center gap-3 text-gray-800">
        <img src={icon4} alt="World Class Bike Fitting" width={35} />
        <p className="font-semibold text-lg">Precision Bike Fitting</p>
      </div>
      <div className="flex items-center gap-3 text-gray-800">
        <img src={icon5} alt="Unbeatable Bike Finance" width={35} />
        <p className="font-semibold text-lg">Flexible Bike Financing</p>
      </div>
      <div className="flex items-center gap-3 text-gray-800">
        <img src={icon6} alt="Best Trade-In Prices" width={35} />
        <p className="font-semibold text-lg">Top Trade-In Offers</p>
      </div>
    </div>
  );
};

export default Promise;

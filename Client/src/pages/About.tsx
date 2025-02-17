import cycle from "@/assets/cycle/bike.jpg";
import cycle1 from "@/assets/cycle/bike2.png";
import cycle2 from "@/assets/cycle/cycle1.png";
import cycle3 from "@/assets/cycle/cycle2.png";
import cycle4 from "@/assets/cycle/cycle3.png";
import about from "@/assets/cycle/new.png";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      {/* Hero Section */}
      <div className="relative bg-blue-600 text-white py-20">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold">About BikeNexus</h2>
          <p className="mt-4 text-lg">
            Your trusted destination for top-quality bicycles and services.
          </p>
        </div>
      </div>

      <div className="container mx-auto p-6">
        {/* About Section */}
        <section className="bg-white rounded-xl shadow-md p-8 mt-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:ml-6 text-center md:text-left">
              <h3 className="text-2xl font-semibold text-gray-800">
                Who We Are
              </h3>
              <p className="text-gray-700 text-lg mt-2">
                At BikeNexus, we're passionate about providing top-tier bicycles
                and expert services for every type of rider. Whether you're
                commuting through the city, exploring mountain trails, or simply
                enjoying a weekend ride, we offer the perfect bike and gear to
                suit your needs.
              </p>
              <p className="text-gray-700 text-lg mt-2">
                Our commitment is to ensure you ride with confidence and
                comfort. With our expert staff and a wide range of products, we
                cater to cyclists of all skill levels, helping you find exactly
                what you're looking for.
              </p>
            </div>
            <img
              src={about}
              alt="Bicycle Workshop"
              className="w-full md:w-1/2 rounded-lg mt-6 md:mt-0"
            />
          </div>
        </section>

        {/* Our Story Section */}
        <section className="bg-white rounded-xl shadow-md p-8 mt-8">
          <div className="flex flex-col md:flex-row items-center">
            <img
              src={cycle}
              alt="Bicycle Workshop"
              className="w-full md:w-1/2 rounded-lg"
            />
            <div className="md:ml-6 text-center md:text-left mt-6 md:mt-0">
              <h3 className="text-2xl font-semibold text-gray-800">
                Our Journey
              </h3>
              <p className="text-gray-700 text-lg mt-2">
                Founded by a group of passionate cyclists, BikeNexus began as a
                humble shop with a big dream: to make cycling accessible to
                everyone, no matter their background or experience. Over the
                years, we've grown, but our core belief remains unchanged –
                providing top-quality bicycles, expert repairs, and unbeatable
                customer service. Today, we proudly serve a community of happy
                riders who trust us for all their cycling needs. Whether you're
                a first-time rider or a seasoned pro, BikeNexus is here to keep
                you riding smoothly, mile after mile.
              </p>
            </div>
          </div>
        </section>

        {/* Our Services Section */}
        <section className="bg-white rounded-xl p-8 mt-8">
          <h3 className="text-2xl font-semibold text-gray-800">Our Services</h3>
          <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6 mt-6">
            {/* Service 1 */}
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <img
                src={cycle1}
                alt="Bicycle Sales"
                className="w-full h-40 object-cover rounded-md"
              />
              <h4 className="text-xl font-semibold mt-4">Bicycle Sales</h4>
              <p className="text-gray-700 mt-2">
                Find the perfect bicycle for any purpose—city riding, mountain
                trails, and beyond.
              </p>
            </div>

            {/* Service 2 */}
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <img
                src={cycle3}
                alt="Bicycle Repair"
                className="w-full h-40 object-cover rounded-md"
              />
              <h4 className="text-xl font-semibold mt-4">Bicycle Repairs</h4>
              <p className="text-gray-700 mt-2">
                Professional repair and maintenance to keep your ride smooth and
                safe.
              </p>
            </div>

            {/* Service 3 */}
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <img
                src={cycle4}
                alt="Accessories"
                className="w-full h-40 object-cover rounded-md"
              />
              <h4 className="text-xl font-semibold mt-4">Accessories</h4>
              <p className="text-gray-700 mt-2">
                Helmets, locks, lights, and more—everything you need for a great
                ride.
              </p>
            </div>

            {/* Service 4 */}
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <img
                src={cycle2}
                alt="Accessories"
                className="w-full h-40 object-cover rounded-md"
              />
              <h4 className="text-xl font-semibold mt-4">Accessories</h4>
              <p className="text-gray-700 mt-2">
                Helmets, locks, lights, and more—everything you need for a great
                ride.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;

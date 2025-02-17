import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useAdminAllOrdersQuery } from "@/Redux/Features/Order/OrderApi";
import { PirChart } from "./PirChart";
import { useAllUsersQuery } from "@/Redux/Features/User/UserApi";
import { useAllProductsQuery } from "@/Redux/Features/Product/ProductApi";
import { ShoppingCart, DollarSign, Bike, Users, Box } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import { motion } from "framer-motion"; // Importing motion from framer-motion

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Overview = () => {
  const { data: allProducts, isLoading: productLoading } =
    useAllProductsQuery(undefined);
  const { data: allUsers, isLoading: userLoading } =
    useAllUsersQuery(undefined);
  const { data: allOrders, isLoading: orderLoading } =
    useAdminAllOrdersQuery(undefined);
  const orders = allOrders?.data?.totalRevenue;
  const allOrder = allOrders?.data?.allOrders;
  const allUser = allUsers?.data;
  const allProduct = allProducts?.data;

  const stats = [
    {
      icon: <DollarSign size={28} className="text-blue-600" />,
      title: "Total Sales Revenue",
      value: `$${orders?.totalRevenue}`,
    },
    {
      icon: <Bike size={28} className="text-green-600" />,
      title: "Total Cycle Sold",
      value: `${orders?.totalSell} Bikes`,
    },
    {
      icon: <ShoppingCart size={28} className="text-purple-600" />,
      title: "Total Orders",
      value: `${allOrder?.length} Orders`,
    },
    {
      icon: <Users size={28} className="text-yellow-600" />,
      title: "All Users",
      value: `${allUser?.length} Users`,
    },
    {
      icon: <Box size={28} className="text-red-600" />,
      title: "All Products",
      value: `${allProduct?.length} Products`,
    },
  ];

  const salesData = {
    totalSalesRevenue: 125000,
    unitsSold: 350,
    topSellingBicycles: [
      { model: "Speedster 300", unitsSold: 85, revenue: 25500 },
      { model: "MountainX Pro", unitsSold: 70, revenue: 28000 },
      { model: "Urban Ride S1", unitsSold: 65, revenue: 19500 },
      { model: "Trail Blazer 500", unitsSold: 60, revenue: 24000 },
      { model: "Commuter Plus", unitsSold: 50, revenue: 10000 },
    ],
  };

  const chartData = {
    labels: salesData.topSellingBicycles.map((bike) => bike.model),
    datasets: [
      {
        label: "Revenue ($)",
        data: salesData.topSellingBicycles.map((bike) => bike.revenue),
        backgroundColor: "rgba(59, 130, 246, 0.7)", // Tailwind blue-500
        borderRadius: 10,
        borderWidth: 1.5,
      },
    ],
  };

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <h2 className="text-4xl font-bold text-center text-blue-800 mb-10">
        Sales Dashboard
      </h2>

      {/* Key Metrics */}
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-7 px-5 mb-10">
        {productLoading || userLoading || orderLoading
          ? Array.from({ length: 4 }).map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 * index }}
                className="h-24 w-full rounded-lg"
              >
                <Skeleton />
              </motion.div>
            ))
          : stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 * index }}
                className="bg-gradient-to-r from-blue-50 to-indigo-100 p-6 rounded-xl shadow-xl flex flex-col items-center gap-4 hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                <div className="p-3 bg-gray-200 rounded-full">{stat.icon}</div>
                <h3 className="text-lg font-semibold text-gray-700 hover:text-blue-600">
                  {stat.title}
                </h3>
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              </motion.div>
            ))}
      </div>

      {/* Bar Chart and Pi Chart Section */}
      <div className="grid md:grid-cols-2 grid-cols-1 gap-10 px-5">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white p-6 rounded-lg shadow-2xl"
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-6">
            Top-Selling Bicycles
          </h3>
          <div className="overflow-hidden rounded-lg shadow-md bg-gradient-to-r from-indigo-50 via-purple-50 to-indigo-100 hover:shadow-2xl transition-all duration-300">
            <Bar
              data={chartData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    display: false,
                  },
                  tooltip: {
                    backgroundColor: "rgba(0, 0, 0, 0.8)",
                    titleFont: { size: 14 },
                    bodyFont: { size: 12 },
                  },
                },
                scales: {
                  x: {
                    ticks: {
                      font: { size: 12, weight: "bold" },
                      color: "gray",
                    },
                    grid: { display: false },
                  },
                  y: {
                    ticks: {
                      font: { size: 12, weight: "bold" },
                      color: "gray",
                    },
                    grid: { color: "rgba(0,0,0,0.1)" },
                  },
                },
              }}
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <PirChart />
        </motion.div>
      </div>
    </div>
  );
};

export default Overview;

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useCurrentToken } from "@/Redux/Features/Auth/AuthSlice";
import { useAppSelector } from "@/Redux/hooks";
import { jwtDecode } from "jwt-decode";
import { Tuser } from "./ProfileSetting";
import { useUserQuery } from "@/Redux/Features/Auth/AuthApi";
import userprofile from "@/assets/dummy.png";
import { Link } from "react-router-dom";
import { IoMdBicycle } from "react-icons/io";
import { Skeleton } from "../ui/skeleton";
import { motion } from "framer-motion";

const MyProfile = () => {
  const token = useAppSelector(useCurrentToken);
  let user;
  if (token) {
    user = jwtDecode(token) as Tuser;
  }

  const { data: userData, isLoading, isError } = useUserQuery(user?.id);
  const profile = userData?.data;

  let content;
  if (isLoading && !isError) {
    content = (
      <div className="flex items-center space-x-4 p-5">
        <Skeleton className="h-16 w-16 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    );
  }
  if (!isLoading && isError) {
    content = (
      <div>
        <p className="text-xl font-semibold text-center text-red-500">
          No Profile Found
        </p>
      </div>
    );
  }
  if (!isLoading && !isError && profile) {
    content = (
      <motion.div
        className="flex items-center gap-4 md:gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Avatar className="w-16 h-16 md:w-24 md:h-24">
          <AvatarImage src={profile?.image || userprofile} />
          <AvatarFallback>Customer Name</AvatarFallback>
        </Avatar>
        <div className="text-left">
          <p className="text-lg text-gray-600 font-medium">Customer Name</p>
          <p className="text-2xl font-semibold text-gray-800 transition duration-200 hover:text-blue-600">
            {profile?.name}
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <section className="bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300 py-32 h-full">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center">
          <motion.p
            className="flex items-center gap-2 max-w-4xl px-8 text-xl font-medium text-gray-800 transition duration-300 ease-in-out"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            &ldquo;Welcome to{" "}
            <Link
              to={"/"}
              className="font-bold flex items-center gap-2 text-blue-600 transition duration-200 hover:text-blue-700"
            >
              <IoMdBicycle className="text-3xl" />
              <h1>
                Bike<span className="text-blue-700">Nexus</span>
              </h1>
            </Link>
            &rdquo;
          </motion.p>

          <motion.p
            className="mb-16 max-w-4xl px-8 text-lg font-medium text-gray-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
          >
            &ldquo;Welcome to the BikeNexus family! 🚴‍♂️ We're thrilled to have
            you with us. Your journey towards a smarter, more seamless cycling
            experience starts here. Manage your profile effortlessly, track your
            rides, and stay connected with the latest updates and features.
            Together, let's ride towards a better, more sustainable
            future!&rdquo;
          </motion.p>

          {content}
        </div>
      </div>
    </section>
  );
};

export default MyProfile;

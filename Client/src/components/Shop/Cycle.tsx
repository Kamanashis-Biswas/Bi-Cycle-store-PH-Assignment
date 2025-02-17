import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import cycle1 from "@/assets/cycle/bike.jpg";
import { Link } from "react-router-dom";
import { Tproduct } from "./RightSide";
import { FaHeart } from "react-icons/fa";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAppDispatch } from "@/Redux/hooks";
import { addCard } from "@/Redux/Features/Product/ProductSlice";
import { toast } from "sonner";
import { motion } from "framer-motion";

const Cycle = ({ item }: { item: Tproduct }) => {
  const { _id, brand, name, price, quantity, image } = item;
  const dispatch = useAppDispatch();

  const handleAddtoCart = () => {
    if (quantity > 0) {
      dispatch(addCard({ ...item, totalQuantity: quantity }));
    } else {
      toast.error("Out Of Stock");
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }} // Adds a zoom effect on hover
      whileTap={{ scale: 0.98 }} // Adds a slight shrink effect when clicked
      className="bg-gradient-to-r from-blue-200 to-blue-300 p-4 rounded-xl shadow-lg"
    >
      <Card className="hover:border-blue-500 transition duration-300 ease-in-out">
        <CardHeader className="relative">
          <Link to={`/viewDetails/${_id}`} className="border rounded-lg">
            <img
              src={image || cycle1}
              alt="cycle image"
              className="h-52 w-full object-cover rounded-lg"
            />
          </Link>
          <div className="absolute top-2 left-0 right-0 flex items-center justify-evenly gap-4 w-full">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={handleAddtoCart}
                    variant="outline"
                    className="text-blue-600 hover:text-blue-700 transition duration-200"
                  >
                    <FaHeart />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Add To Cart</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <div>
              {quantity > 0 ? (
                <Button
                  className="bg-green-200 text-green-600 hover:bg-green-300 transition duration-200"
                  variant={"outline"}
                >
                  In Stock
                </Button>
              ) : (
                <Button
                  className="bg-red-200 text-red-600 hover:bg-red-300 transition duration-200"
                  variant={"outline"}
                >
                  Out Of Stock
                </Button>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-2">
          <CardTitle className="text-xl font-semibold text-gray-800 transition duration-200 hover:text-blue-600">
            {name}
          </CardTitle>
          <CardTitle className="text-sm text-gray-600">
            Brand: {brand}
          </CardTitle>
          <CardDescription className="text-lg font-semibold text-gray-700">
            Price: ${price}
          </CardDescription>
        </CardContent>

        <CardFooter>
          <Link to={`/viewDetails/${_id}`} className="w-full">
            <Button
              variant={"outline"}
              className="w-full rounded-lg bg-blue-500 text-white hover:bg-blue-600 hover:text-gray-100 transition duration-200"
            >
              View Details
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default Cycle;

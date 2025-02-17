import cycle1 from "@/assets/cycle/bike.jpg";
import { Tproduct } from "@/components/Shop/RightSide";
import { Button } from "@/components/ui/button";
import ViewDetailsSkeletion from "@/components/ViewDetailsSkeletion";
import { useSingleProductQuery } from "@/Redux/Features/Product/ProductApi";
import { addCard } from "@/Redux/Features/Product/ProductSlice";
import { useAppDispatch } from "@/Redux/hooks";
import { Link, useParams } from "react-router-dom";
import { toast } from "sonner";
const ViewDetails = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { data: singleProduct, isLoading, isError } = useSingleProductQuery(id);
  const cycle: Tproduct = singleProduct?.data;

  if (isLoading) {
    return <ViewDetailsSkeletion />;
  }
  if (isError) {
    return (
      <div>
        <p className="text-xl font-semibold text-center"></p>
      </div>
    );
  }

  const handleAddtoCart = () => {
    if (cycle?.quantity > 0) {
      dispatch(addCard({ ...cycle, totalQuantity: cycle?.quantity }));
    } else {
      toast.error("Out Of Stock");
    }
  };

  return (
    <div className="container mx-auto p-4 m-4 grid md:grid-cols-5 gap-10 border bg-white">
      <div className="md:col-span-2 border">
        <img
          src={cycle?.image || cycle1}
          className="w-full mx-auto"
          alt="cycle"
        />
      </div>
      <div className="md:col-span-3 space-y-5">
        <div className="flex items-center justify-between">
          <p className="text-base">
            Created At:{" "}
            {new Date(cycle?.createdAt as Date).toLocaleDateString()}
          </p>
          <Button variant={"outline"} className="text-base">
            Stock: {cycle?.quantity}
          </Button>
        </div>
        <h1 className="text-3xl font-bold">{cycle?.name}</h1>
        <h1 className="text-lg font-semibold">Brand: {cycle?.brand}</h1>
        <div className="border"></div>
        <div className="flex items-center gap-10">
          <h1 className="text-lg font-semibold">Type: {cycle?.type}</h1>
          {cycle?.quantity > 0 ? (
            <Button
              className="bg-blue-200 pointer-events-none"
              variant={"outline"}
            >
              In Stock
            </Button>
          ) : (
            <Button
              className="bg-red-200 pointer-events-none"
              variant={"outline"}
            >
              Out Of Stock
            </Button>
          )}
        </div>
        <div className="border"></div>
        <p className="text-base text-gray-700">{cycle?.description}</p>
        <div className="border"></div>
        <p className="text-2xl font-semibold">Price: ${cycle?.price}</p>
        <div className="border"></div>

        {cycle?.quantity > 0 && (
          <div className="flex items-center gap-5">
            <Link to={"/checkOut"}>
              <Button
                onClick={handleAddtoCart}
                variant={"outline"}
                className=" rounded"
              >
                Order Now
              </Button>
            </Link>
            <Button
              onClick={handleAddtoCart}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded"
            >
              Add To Cart
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewDetails;

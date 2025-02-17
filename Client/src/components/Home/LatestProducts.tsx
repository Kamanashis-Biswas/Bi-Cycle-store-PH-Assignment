import { Link } from "react-router-dom";
import Cycle from "../Shop/Cycle";
import { Button } from "../ui/button";
import { useAllProductsQuery } from "@/Redux/Features/Product/ProductApi";
import { Skeleton } from "../ui/skeleton";
import { Tproduct } from "../Shop/RightSide";

const LatestProducts = () => {
  const limit = 8;
  const {
    data: allProducts,
    isLoading,
    isError,
  } = useAllProductsQuery({ limit });

  let content;

  if (isLoading && !isError) {
    content = (
      <div className="flex flex-col space-y-3">
        <Skeleton className="h-[125px] w-[250px] rounded-xl" />
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
        <h1 className="text-red-600 font-semibold">Something went wrong...</h1>
      </div>
    );
  }
  if (!isLoading && !isError && allProducts?.data?.length === 0) {
    content = (
      <div>
        <h1 className="text-red-600 font-semibold">No product found...</h1>
      </div>
    );
  }
  if (!isLoading && !isError && allProducts?.data) {
    content = allProducts?.data
      ?.slice(0, 8)
      .map((item: Tproduct, index: number) => (
        <Cycle key={index} item={item} />
      ));
  }
  return (
    <div className="container mx-auto p-4">
      <div className="text-center underline">
        <h1 className="text-2xl font-bold pb-5">
          LATEST <span className="text-blue-600">PRODUCTS</span>
        </h1>
      </div>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5">
        {content}
      </div>
      <div className="mt-5 mx-auto text-center">
        <Link to={"/products"}>
          <Button variant={"outline"}>View All</Button>
        </Link>
      </div>
    </div>
  );
};

export default LatestProducts;

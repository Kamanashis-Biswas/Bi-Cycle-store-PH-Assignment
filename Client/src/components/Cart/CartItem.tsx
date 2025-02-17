import { Trash } from "lucide-react";
import cycle1 from "@/assets/cycle/bike.jpg";
import { Button } from "../ui/button";
import { useAppDispatch } from "@/Redux/hooks";
import { removeCart, updateCart } from "@/Redux/Features/Product/ProductSlice";
import { Tproduct } from "../Shop/RightSide";

const CartItem = ({ cart }: { cart: Tproduct }) => {
  const dispatch = useAppDispatch();

  const handleRemove = () => {
    dispatch(removeCart(cart?._id));
  };

  const handleCartQuantity = (type: string, id: string) => {
    dispatch(updateCart({ type, id }));
  };
  return (
    <div className="p-4 border rounded">
      <div className="flex md:flex-row flex-col items-center justify-between gap-4">
        <img
          src={cycle1}
          alt="Product"
          className="w-32 object-cover border rounded"
        />
        <div>
          <h3 className="text-lg font-semibold">{cart?.name}</h3>
          <p className="text-sm text-gray-500">{cart?.brand}</p>
        </div>
        <div className="flex items-center border rounded-md">
          <button
            className="px-3 py-1 border-r text-gray-600"
            onClick={() => handleCartQuantity("decrement", cart?._id)}
          >
            -
          </button>
          <span className="px-4">{cart?.quantity}</span>
          <button
            className="px-3 py-1 border-l text-gray-600"
            onClick={() => handleCartQuantity("increment", cart?._id)}
          >
            +
          </button>
        </div>
        <div>
          <span className="font-semibold text-lg">
            R {(cart?.price * cart?.quantity).toFixed(2)}
          </span>
        </div>
        <div>
          <Button
            onClick={handleRemove}
            variant={"link"}
            className="text-blue-500 flex items-center gap-2"
          >
            <Trash className="w-5 h-5 mr-1" /> Remove
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;

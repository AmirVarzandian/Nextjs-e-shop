"use client"

import { CartProductType } from "@/app/product/[productId]/ProductDetail";

interface SetQtyTypes{
    cartCounter?: boolean;
    cartProduct: CartProductType;
    handleQtyInc: ()=>void;
    handleQtyDec: ()=>void;
}
const btnStyles = `border-[1.2px] border-slate-300 px-2 rounded`
const SetQunatity: React.FC<SetQtyTypes> = ({
    cartCounter,cartProduct,handleQtyInc,handleQtyDec
}) => {
    return (
        <div className="flex gap-8 items-center">
            {cartCounter ? null :<div className="font-semibold">QUANTITY</div>}
            <div className="flex gap-4 items-center text-base">
                <button className={btnStyles} onClick={handleQtyDec}>-</button>
                <div>{cartProduct.quantity}</div>
                <button className={btnStyles} onClick={handleQtyInc}>+</button>
            </div>
        </div>
    );
}
 
export default SetQunatity;
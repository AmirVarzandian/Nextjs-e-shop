"use client"
import { useCart } from "@/hooks/useCart";
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";
import Heading from "../components/Heading";
import CustomeBtn from "../components/Button";
import ItemContent from "./ItemContent";
import { FormatPrice } from "../utils/formatPrice";

const CartClient:React.FC<any>  = ({hasCookie}) => {
    const {cartProducts , handleClearCart , cartTotalAmount} = useCart()
    if(hasCookie){
        
        if(!cartProducts || cartProducts.length === 0){
            return (
                <div className="flex flex-col items-center">
        <div className="text-2xl">
            Youre cart is empty
        </div>
            <div>
                <Link href={"/"} className="text-slate-500 flex items-center gap-1 mt-2">
                <MdArrowBack/>
                <span>Start Shopping</span>
                </Link>
            </div>
       </div>
    );
}
return(
    <div>
        <Heading title="Shopping Cart" center/>
        <div className="grid grid-cols-5 text-xs gap-4 pb-2 items-center mt-8">
            <div className="col-span-2 justify-self-start">PRODUCT</div>
            <div className="justify-self-center">PRICE</div>
            <div className="justify-self-center">QUANTITY</div>
            <div className="justify-self-end">TOTAL</div>
        </div>
        {cartProducts && cartProducts.map((item)=>{
            return <ItemContent key={item.id} item={item} />
        })}
        <div className="border-t-[1.5px] border-slate-200 py-4 flex justify-between gap-4">
            <div className="w-[100px]">
                <CustomeBtn label="Clear Cart" outline onClick={()=>{handleClearCart()}} small/>
            </div>
            <div className="text-sm flex flex-col gap-1 ">
               
                    <div className="flex justify-between w-full text-base font-semibold">
                <span>Subtotal</span>
                <span>{FormatPrice(cartTotalAmount)}</span>
                    </div>         
                <p className="text-slate-500">Taxes and shipping calculated at checkout</p>
                <CustomeBtn label="Checkout" onClick={()=>{}} />
                <Link href={"/"} className="text-slate-500 flex items-center gap-1 mt-2">
                <MdArrowBack/>
                <span>Continue Shopping</span>
                </Link>
            </div>
        </div>
    </div>
)
}
else{
    return(
        <div className="flex flex-col items-center">
        <div className="text-4xl font-extrabold text-blue-400">
            Login Or Register
        </div>
            <div className="pt-7 flex flex-col gap-2 ">
                <Link href={"/login"} className="text-slate-500 flex items-center gap-1 mt-2 hover:text-teal-600">
                <MdArrowBack/>
                <span>Login</span>
                </Link>
                <Link href={"/register"} className="text-slate-500 flex items-center gap-1 mt-2 hover:text-teal-600 duration-200">
                <MdArrowBack/>
                <span>Register</span>
                </Link>
            </div>
       </div>
        )
}
}

export default CartClient;
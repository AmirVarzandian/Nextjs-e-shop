import { CartProductType } from "@/app/product/[productId]/ProductDetail";
import { json } from "node:stream/consumers";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import {toast} from "react-hot-toast"
type CartContextType = {
    cartTotalQty: number;
    cartTotalAmount:number;
    cartProducts: CartProductType[] | null;
    handleAddProductToCart: (product: CartProductType) =>void;
    handleRemoveProductFromCart:(product: CartProductType) =>void;
    handleCartQtyIncrease:(product: CartProductType) =>void;
    handleCartQtyDecrease:(product: CartProductType) =>void;
    handleClearCart:() => void;
}
export const CartContext =  createContext<CartContextType | null>(null)
interface Props {
    [propName: string]:any;
}
export const CartContextProvider = (props:Props) =>{
    const [cartTotalQty , setCartTotalQty] = useState(0);
    const [cartTotalAmount , setCartTotalAmount] = useState(0)
    const [cartProducts, setCartProducts] = useState<CartProductType[] | null>(null);
    console.log("cart amount",cartTotalAmount);
    console.log("cart qty",cartTotalQty);
    useEffect(()=>{
        const cartItems:any = localStorage.getItem('eShopCartItem')
        const cProducts: CartProductType[] | null  = JSON.parse(cartItems)
        setCartProducts(cProducts)
    },[])
    useEffect(()=>{
        const getTotals= () =>{
            if(cartProducts){
              const {total , qty}=cartProducts?.reduce((acc,item)=>{
                    const itemTotal = item.price * item.quantity
                    acc.total +=itemTotal;
                    acc.qty +=item.quantity
                    return acc
                },{
                    total:0,
                    qty:0,
                })
                setCartTotalQty(qty)
                setCartTotalAmount(total)
            }
            }
        getTotals()
    } , [cartProducts])
    const handleAddProductToCart = useCallback((product:CartProductType)=>{
        setCartProducts((prev)=>{
            let updateCart;
            if(prev){
                updateCart = [...prev , product]
            }else{
                updateCart = [product]
            }
            toast.success("Product added to cart")
            localStorage.setItem("eShopCartItem",JSON.stringify(updateCart))
            return updateCart
        })
    },[])
    const handleRemoveProductFromCart = useCallback((product : CartProductType)=>{
        if(cartProducts){
            const filterProducts = cartProducts.filter((item)=>{
                return item.id !== product.id 
            })
            setCartProducts(filterProducts)
            toast.success("Product Removed")
            localStorage.setItem("eShopCartItem",JSON.stringify(filterProducts))
        }
    },[cartProducts]);
    const handleCartQtyIncrease = useCallback((product : CartProductType) => {
        let updateCart;
        if(product.quantity === 99){
            return toast.error("Ooops maxiums reached")
        }
        if (cartProducts) {
            updateCart = [...cartProducts]
            const existingIndex = cartProducts.findIndex((item)=>item.id === product.id)
            if(existingIndex > -1){
                updateCart[existingIndex].quantity = ++updateCart[existingIndex].quantity
            }
            setCartProducts(updateCart)
            localStorage.setItem('eShopCartitems',JSON.stringify(updateCart))
        }
    },[cartProducts])
    const handleCartQtyDecrease = useCallback((product : CartProductType) => {
        let updateCart;
        if(product.quantity === 1){
            return toast.error("Ooops minimum reached")
        }
        if (cartProducts) {
            updateCart = [...cartProducts]
            const existingIndex = cartProducts.findIndex((item)=>item.id === product.id)
            if(existingIndex > -1){
                updateCart[existingIndex].quantity = --updateCart[existingIndex].quantity
            }
            setCartProducts(updateCart)
            localStorage.setItem('eShopCartitems',JSON.stringify(updateCart))
        }
    },[cartProducts])
    const handleClearCart = useCallback(()=>{
        setCartProducts(null)
        setCartTotalQty(0)
        localStorage.setItem('eShopCartitems',JSON.stringify(null))
    } , [cartProducts])
    const value = {
        cartTotalQty,
        cartTotalAmount,
        cartProducts,
        handleAddProductToCart,
        handleRemoveProductFromCart,
        handleCartQtyIncrease,
        handleCartQtyDecrease,
        handleClearCart,
    }
    return <CartContext.Provider value={value} {...props} />
}
export const useCart = () =>{
    const context = useContext(CartContext)
    if(context === null) {
        throw new Error("useCrat must be used within a CartContextProvider")
    }
    return context
}
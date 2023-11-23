"use client";

import CustomeBtn from "@/app/components/Button";
import ProductImage from "@/app/components/products/ProductImage";
import SetColor from "@/app/components/products/setColor";
import SetQunatity from "@/app/components/products/setQuantity";
import { useCart } from "@/hooks/useCart";
import { Button, Rating, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { MdCheckCircle } from "react-icons/md";

interface ProductDetailProps {
  product: any;
}
export type CartProductType = {
    id:string,
    name:string,
    description:string,
    category:string,
    brand:string,
    selectedImg:SelectedImgType,
    quantity:number,
    price:number
}
export type SelectedImgType = {
  color:string,
  colorCode:string,
  image:string
}
const Horizontal = () => {
  return <hr className="w-[30%] my-2" />;
};
const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  const [isProductInCart , setIsProductInCart] = useState(false)
  const {cartProducts,handleAddProductToCart} = useCart();
  const [cartProduct,setCardProduct] = useState<CartProductType>({
    id: product.id,
    name: product.name,
    description: product.description,
    category: product.catefory,
    brand: product.brand,
    selectedImg: {...product.images[0] },
    quantity: 1,
    price: product.price
  })
  const router = useRouter()
  console.log(cartProducts)
  useEffect(()=>{
    setIsProductInCart(false)
    if(cartProducts){
      const existingIndex = cartProducts.findIndex((item)=>item.id === product.id)
      if(existingIndex > -1){
        setIsProductInCart(true)
      }
    };
    
  },[cartProducts])
  const productRating =
    product.reviews.reduce((acc: number, items: any) => items.rating + acc, 0) /
    product.reviews.length;
    const handleColorSelect = useCallback((value:SelectedImgType)=>{
      setCardProduct((prev)=>{
        return {...prev , selectedImg: value}
      })
    },[cartProduct.selectedImg])
    const handleQtyInc = useCallback(()=>{
      if(cartProduct.quantity ===99){
        return;
      }
      setCardProduct((prev) =>{
        return {...prev , quantity: ++prev.quantity}
      })
    } , [])
    const handleQtyDec = useCallback(()=>{
      if(cartProduct.quantity ===1){
        return;
      }
      setCardProduct((prev) =>{
        return {...prev , quantity: --prev.quantity}
      })
    } , [])
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <ProductImage product={product} cartProduct={cartProduct} handleColorSelect={handleColorSelect}/>
      <div className="flex flex-col gap-1 text-slate-500 text-sm">
        <h2 className="text-3xl font-medium text-slate-700">{product.name}</h2>
        <div className="flex items-center gap-2">
          <Rating value={productRating} readOnly />
          <div>{product.reviews.length} reviews</div>
        </div>
        <Horizontal />
        <div className="text-justify">{product.description}</div>
        <Horizontal />
        <div>
          <span className="font-semibold">CATEGORY: </span> {product.category}
        </div>
        <div>
          <span className="font-semibold">BRAND: </span> {product.brand}
        </div>
        <div className={product.inStock ? "text-teal-600" : "text-rose-500"}>
          {product.inStock ? "In Stock" : "Out Of Stock"}
        </div>
        <Horizontal />
        {isProductInCart? (<>
        <p className="mb-2 text-slate-500 flex items-center gap-1">
          <MdCheckCircle size={20} className="text-teal-400"/>
          <span>Product add to cart</span>
        </p>
        <div className="max-w-[300px]">
          <CustomeBtn label="View Cart" outline onClick={()=>{
            router.push('/cart')
          }}/>
        </div>
        </>) :(<>
          <SetColor cartProduct={cartProduct} images={product.images} handleColorSelect={handleColorSelect}/>
        <Horizontal />
        <SetQunatity cartProduct={cartProduct} handleQtyDec={handleQtyDec} handleQtyInc={handleQtyInc}/>
        <Horizontal />
        <div className="max-w-[300px]">
          <CustomeBtn label="add to cart" onClick={() =>{handleAddProductToCart(cartProduct)}} />
        </div>
        </>)}
      </div>
    </div>
  );
};

export default ProductDetail;

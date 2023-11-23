"use client"
import CustomeBtn from "@/app/components/Button";
import Heading from "@/app/components/Heading";
import Input from "@/app/components/inputs/input";
import { SafeUser } from "@/types";
import { Rating } from "@mui/material";
import { Product, Review, User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface AddRatingProps{
    product: Product & {reviews: Review[]}
    hasCookie: any
}
const AddRating:React.FC<AddRatingProps> = ({product , hasCookie}) => {

    const [isLoading , setIsLoading] = useState(false)
    const router = useRouter()
    const {register , handleSubmit , setValue , reset , formState: {errors}} = useForm<FieldValues>({
        defaultValues:{
            comment:'',
            rating:0
        }
    })
    const setCustomValue = (id:string , value: any) => {
        setValue(id , value , {
            shouldTouch: true ,
            shouldDirty: true , 
            shouldValidate: true
        })
    }
    const onSubmit:SubmitHandler<FieldValues>  =  (data) => {
         
        console.log("data is::",data)
        setIsLoading(true)
        if(data.rating === 0) {
            setIsLoading(false)
            return toast.error("No Rating selected")}
        const ratingData = {...data , product: product ,userId : hasCookie}
        console.log(ratingData)
        axios.post('/api/rating' , ratingData).then(()=> {
            toast.success("Rating submitted")
            router.refresh()
            reset();
        }).catch((error)=> {
            toast.error("somthing went wrong")
            console.log(error)
        }).finally(()=>{
            setIsLoading(false)
        })
    }
    const userReview = product?.reviews.find(((review: Review) => {
        return review.userId === hasCookie
    }))
    if(!hasCookie || !product) return null
    if(userReview) return null
    return (  
        <div className="flex flex-col gap-2 max-w-[500px]">
            <Heading title="Rate this product"/>
            <Rating onChange={(event , newValue) => {
                setCustomValue('rating' , newValue)
            }}/>
            <Input id="comment" label={"Comment"} disabled={isLoading} register={register} errors={errors} required />
            <CustomeBtn label={isLoading ? "Loading" : "Rate Product"} onClick={handleSubmit(onSubmit)}/>
        </div>
    );
}
 
export default AddRating;
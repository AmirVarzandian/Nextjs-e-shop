"use client"

import CustomeBtn from "@/app/components/Button";
import Heading from "@/app/components/Heading";
import CategoryInput from "@/app/components/inputs/CategoryInput";
import CustomeCheckBox from "@/app/components/inputs/CustomeCheckBox";
import SelectedColor from "@/app/components/inputs/SelectColor";
import TextArea from "@/app/components/inputs/TextArea";
import Input from "@/app/components/inputs/input";
import { categories } from "@/app/utils/Categories";
import { colors } from "@/app/utils/Color";
import firebaseApp from "@/libs/firebase";
import { data } from "autoprefixer";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import axios from "axios";
import { useRouter } from "next/navigation";
export type ImageType = {
    color:string;
    colorCode:string;
    image: File | null
}
export type UploadImageType = {
    color:string;
    colorCode:string;
    image: string
}


const AddProductFrom = () => {
    const [isLoading , setIsLoading] = useState(false);
    const [images , setImages] = useState<ImageType[] | null >();
    const[isProductCreated , setIsProductCreated] = useState(false)
    const router = useRouter()
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        formState: {errors}
    } = useForm<FieldValues>({
        defaultValues:{
            name:'' ,
             description:'' ,
              price: '' ,
               brand:'' ,
                category:'' ,
                 inStock:false ,
                  images:[]
        },
    })
    useEffect(()=>{
        setCustomValue("images" , images)
    } , [images]);
    useEffect(()=>{
        if(isProductCreated){
            reset();
            setImages(null);
            setIsProductCreated(false);
        }
    },[setIsProductCreated]);
    const onSubmit:SubmitHandler<FieldValues> = async (data) => {
        console.log("product data" , data)
        setIsLoading(true)
        let uploadedImages:UploadImageType[] = []
        if(!data.category){
            setIsLoading(false)
            return toast.error('No Category Selected!')
        }
        if(!data.images || data.images.length === 0) {
            setIsLoading(false)
            return toast.error('No Selected image!')
        }

        const handleImageUpload = async () => {
            toast('Creating Product... Please Wait')
            try{
                for(const item of data.images) {
                    if(item.image){
                        
                        const fireName = new Date().getTime() + "-" + item.image.name;
                        const storage = getStorage(firebaseApp)
                        const storageRef = ref(storage , `product/${fireName}`)
                        const uploadTask = uploadBytesResumable(storageRef , item.image)
                        await new Promise<void>((resolve , reject) => {
                            uploadTask.on(
                                'state_changed' , 
                                (snapshot) => {
                                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                                    console.log('Upload is ' + progress + '% done');
                                    switch (snapshot.state) {
                                      case 'paused':
                                        console.log('Upload is paused');
                                        break;
                                      case 'running':
                                        console.log('Upload is running');
                                        break;
                                    }
                                },
                                (error) => {
                                    console.log('Error uploading image' , error)
                                    reject(error)
                                  },
                                   
                                    () => {                                       
                                        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                                            uploadedImages.push({
                                                ...item,
                                                image: downloadURL
                                            })
                                        console.log('File available at', downloadURL);
                                        resolve()
                                        }
                                        ).catch((error)=>{
                                            console.log("Error getting the download url");
                                            reject(error)
                                        });
                                    }
                            )
                        } )

                    }
                }
            } catch(error) {
                setIsLoading(false);
                console.log("Error handling image uploads" , error)
                return toast.error("Error handling image uploads")
            }
        }
        await handleImageUpload()
        const productData = {...data , images: uploadedImages}
        axios.post("/api/product" , productData).then(()=> {
            toast.success("product created");
            setIsProductCreated(true);
            router.refresh();
        }).catch((error)=> {
            console.log("the error is :" ,error)
            toast.error("somethhing went wrong when saving product to db")

        })
        .finally(()=> {
            setIsLoading(false)
        })
        console.log("productData" , productData);
    } 

    const category = watch("category")
    const setCustomValue = (id:string , value: any ) => {
        setValue(id , value , {
            shouldValidate: true,
            shouldDirty:true ,
            shouldTouch:true ,
        })
    }
    const addImageToState = useCallback((value:ImageType)=>{
        setImages((prev)=> {
            if(!prev) {
                return [value];
            }
            return [...prev , value]
        })
    },[])
    const removeImageFromState = useCallback((value: ImageType) => {
        setImages((prev)=> {
            if (prev) {
                const filteredImages = prev.filter(
                    (item) => item.color !== value.color
                );
                return filteredImages
            }
            return prev
        })
    },[])
    return (
        <>
        <Heading title="Add a Product" center/>
        <Input
        id="name"
        label='name'
        disabled = {isLoading}
        register={register}
        errors={errors}
        required
        />
        <Input
        id="price"
        label='Price'
        disabled = {isLoading}
        register={register}
        type="number"
        errors={errors}
        required
        />
        <Input
        id="brand"
        label='Brand'
        disabled = {isLoading}
        register={register}
        errors={errors}
        required
        />
        <TextArea
        id="description"
        label='Description'
        disabled = {isLoading}
        register={register}
        errors={errors}
        required
        />
        <CustomeCheckBox id="inStock" register={register} label="this Product is in Stock"/>
        <div className="w-full font font-medium">
            <div className="mb-2 font-semibold">Selected Category</div>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 max-h-[50vh] overflow-y-auto">
                {categories.map((item) => {
                    if(item.label === "All") {
                        return null
                    }
                    return <div key={item.label}>
                            <CategoryInput
                            onClick={(category) => setCustomValue("category" , category)}
                            selected={category === item.label}
                            label={item.label}
                            icon={item.icon}
                            />
                    </div>;
                })}
            </div>
        </div>
        <div className="w-full flex flex-col flex-wrap gap-4">
            <div>
                <div className=" font-bold">
                    Selected the availabe product colors and uploads their images.
                </div>
                <div className="text-sm">
                    You must upload an image for each of the color selected otherwise your color selection will be ignored
                </div>
            </div>
         <div className="grid grid-cols-2 gap-3">
                {colors.map((item , index)=> {
                    return <SelectedColor key={index} item={item} addImageToState={addImageToState} removeImageFromState={removeImageFromState} isProductCreated={isProductCreated} />
                })}
         </div>
        </div>
        <CustomeBtn label={isLoading? 'Loading...' : 'Add Product'} onClick={handleSubmit(onSubmit)} />
        </>
    );
}
 
export default AddProductFrom;
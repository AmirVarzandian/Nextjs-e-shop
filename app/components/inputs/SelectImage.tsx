"use client"

import { ImageType } from "@/app/admin/add-products/AddProductForm"
import { useCallback } from "react";
import {useDropzone} from 'react-dropzone'
interface SelectImageProps{
    item?:ImageType;
    handleFileChange: (value: File) => void
}
const SelectImage:React.FC<SelectImageProps> = ({item , handleFileChange}) => {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        if(acceptedFiles.length>0){
            handleFileChange(acceptedFiles[0])
        }
      }, [])
      const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop ,
        accept:{"image/*": [".jpeg" , ",png"]}
    })
    return (
        <div
        {...getRootProps()}
        className="border-2 border-slate-400 p-2 border-dashed cursor-pointer text-sm font-normal  text-slate-400 flex items-center justify-center"
        >
            <input {...getInputProps} />
            {isDragActive ? (
                <p className="translate-x-[-5.5rem]">Drop the Image here ...</p>
            ) : (
                <p className="translate-x-[-5.5rem]"> + {item?.color} image</p>
            )}
        </div>
    );
}
 
export default SelectImage;
"use client"
import { useState } from "react";
import Heading from "../components/Heading";
import Input from "../components/inputs/input";
import { FieldValues, useForm , SubmitHandler } from "react-hook-form";
import CustomeBtn from "../components/Button";
import Link from "next/link";
import { AiOutlineGoogle } from "react-icons/ai";
import {signIn} from "next-auth/react"
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { setClientCookie } from "../cookies";
const RegisterForm = () => {
    const[isLoading , setIsLoading] = useState(false)
    const {register , handleSubmit , formState: {errors},} = useForm<FieldValues>({
        defaultValues: {
            name:"",
            email:"",
            password:""
        }
    })
    const router = useRouter()
    const onSubmit:SubmitHandler<FieldValues> = (data) =>{
        setIsLoading(true)
        console.log(data)
        axios.post("/api/register" , data).then(()=>{
            toast.success("Account Created")
            console.log(data)
            signIn("credentials", {
                email: data.email,
                password: data.password,
                redirect:false,
            }).then((callback)=>{
                if(callback?.ok){
                    setClientCookie()
                    router.push("/cart")
                    router.refresh()
                    toast.success('Logged In')
                }
                if(callback?.error){
                    toast.error(callback.error)
                }
            })
        }).catch(()=> toast.error('somthing went wrong')).finally(()=>setIsLoading(false))
    }
    return (
        <>
        <Heading title="Sun up for E-Shop"/>
        <CustomeBtn outline icon={AiOutlineGoogle} label="Sign in with google" onClick={()=>{signIn("google")}} />
        <hr className="bg-slate-300 w-full h-px"/>
        <Input id="name" label="name" disabled={isLoading} register={register} errors={errors} required/>
        <Input id="email" label="Email" disabled={isLoading} register={register} errors={errors} required/>
        <Input id="password" type="password" label="Password" disabled={isLoading} register={register} errors={errors} required/>
        <CustomeBtn label={isLoading ? "loading.." : "SignIn"} onClick={handleSubmit(onSubmit)} />
        <p className="text-sm">Already have an account?{" "}<Link className="underline" href={"/login"}>Login</Link></p>
        </>
    );
}
 
export default RegisterForm;
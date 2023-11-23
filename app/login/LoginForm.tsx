"use client"

import { setCookie } from 'cookies-next';
import { useState } from "react";
import Heading from "../components/Heading";
import Input from "../components/inputs/input";
import { FieldValues, useForm , SubmitHandler } from "react-hook-form";
import CustomeBtn from "../components/Button";
import Link from "next/link";
import { AiOutlineGoogle } from "react-icons/ai";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { setClientCookie } from '../cookies';

const LoginForm = () => {
    const[isLoading , setIsLoading] = useState(false)
    const {register , handleSubmit , formState: {errors},} = useForm<FieldValues>({
        defaultValues: {
            email:"",
            password:""
        }
    })
    const router = useRouter()
    const onSubmit:SubmitHandler<FieldValues> = (data) =>{
        setIsLoading(true)
        signIn('credentials' , {
            ...data,
            redirect: false, 
        }).then((callback) => {
            setIsLoading(false)
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
    }
    return (
        <>
        <Heading title="Sun up for E-Shop"/>
        <CustomeBtn outline icon={AiOutlineGoogle} label="Continue with google" onClick={()=>{signIn("google")}} />
        <hr className="bg-slate-300 w-full h-px"/>
        <Input id="email" label="Email" disabled={isLoading} register={register} errors={errors} required/>
        <Input id="password" type="password" label="Password" disabled={isLoading} register={register} errors={errors} required/>
        <CustomeBtn label={isLoading ? "loading.." : "Login"} onClick={handleSubmit(onSubmit)} />
        <p className="text-sm">Dont have an account?{" "}<Link className="underline" href={"/register"}>Sing in</Link></p>
        
        </>
    );
}
 
export default LoginForm;
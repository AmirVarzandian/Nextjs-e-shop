"use client"

import { useCallback, useEffect, useState } from "react";
import Avatar from "../Avatar";
import { AiFillCaretDown } from "react-icons/ai";
import Link from "next/link";
import UserMneuItem from "./UserMenuItem";
import { signOut } from "next-auth/react";
import BackDrop from "./BackDrop";
import { SafeUser } from "@/types";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { deleteClientCookie } from "@/app/cookies";
import { useRouter } from "next/navigation";


interface UserMenuProps{
    currentUser: SafeUser | null
}
const UserMenu:React.FC<any> = ({hasCookie}) => {
    const [isOpen , setIsOpen] = useState(false)
    const [isOpen1 , setIsOpen1] = useState<any>(null)
    const toggleOpen = useCallback(()=>{
        setIsOpen((prev)=> !prev)
    } , [])
   const router = useRouter();
    return (
        <>
        <div className="z-30 relative">
            <div onClick={toggleOpen} className="p-2 border-[1px] border-slate-400 flex flex-row items-center gap-1 rounded-full cursor-pointer hover:shadow-md transition text-slate-700">
                <Avatar/>
                <AiFillCaretDown/>
            </div>
            {isOpen && (
                <div className="absolute rounded-md shadow-md w-[170px] bg-white overflow-hidden right-0 top-12 text-sm flex flex-col cursor-pointer">
                    {hasCookie? (
                             <div>
                             <Link href={"/orders"}>
                                 <UserMneuItem onClick={toggleOpen}>
                                     Your orders
                                 </UserMneuItem>
                             </Link>
                             <Link href={"/admin"}>
                                 <UserMneuItem onClick={toggleOpen}>
                                     Admin Dashboard
                                 </UserMneuItem>
                             </Link>
                              <UserMneuItem onClick={()=>{
                                 toggleOpen(); signOut(); deleteClientCookie(); router.push("/")             
                                 router.refresh()
                              }}>
                                     Logout
                                 </UserMneuItem>
                         </div> 
                    ) : (
                        <div>
                         <Link href={"/login"}>
                                 <UserMneuItem onClick={toggleOpen}>
                                     Login
                                 </UserMneuItem>
                             </Link>
                             <Link href={"/register"}>
                                 <UserMneuItem onClick={toggleOpen}>
                                     Register
                                 </UserMneuItem>
                             </Link>
                         </div>
                    )
                }
                </div>
            )}
        </div>
        {isOpen ? <BackDrop onClick={toggleOpen}/> : null}
        </>
    );
}
 
export default UserMenu;
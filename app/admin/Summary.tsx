"use client"
import { Product, User } from "@prisma/client";
import { useEffect, useState } from "react";
import Heading from "../components/Heading";

interface SummaryProps{
    products: Product[];
    users: User[];
}
type SummaryDataType = {
    [key : string]:{
        label: string;
        digit: number;
    }
}
const Summary:React.FC<SummaryProps> = ({products , users}) => {
    const [SummaryData , setSummaryData] = useState<SummaryDataType>({
        products:{
            label: 'Total Product',
            digit: 0
        },
        users:{
            label: 'Total Users',
            digit: 0
        },
    })
    useEffect(()=>{
        setSummaryData((prev)=>{
            let tempData = {...prev}
            tempData.products.digit = products.length;
            tempData.users.digit = users.length;
            return tempData
        })
    },[products , users])
    const summaryKeys = Object.keys(SummaryData)
    return (
        <div className="max-w-[1150px] m-auto">
            <div className="mb-4 mt-8">
                <Heading title="Stats" center/>
            </div>
            <div className="grid grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
                {
                    summaryKeys && summaryKeys.map((key)=>{
                        return <div className="rounded-xl border-2 p-4 flex flex-col items-center gap-2 transition" key={key}>
                            <div className="text-lg">{SummaryData[key].label}</div>
                                    <div className="text-xl md:text-4xl font-bold">
                                        {
                                            SummaryData[key].digit
                                            
                                        }
                                    </div>
                               </div>
                    })
                }
            </div>

        </div>
    );
}
 
export default Summary;

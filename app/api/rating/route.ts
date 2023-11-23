import prisma from "@/libs/prismadb"
import { getCurrentUser } from "@/actions/getCurrentUser";
import { Review } from "@prisma/client";
import { NextResponse } from "next/server";
export async function POST(request: Request) {
    const currentUser = await getCurrentUser();
    if(!currentUser){
        return NextResponse.error()
    }
    const body = await request.json()
    const {comment , rating , product , userId} = body;
    // const userReview = product?.reviews.find(((review: Review) => {
    //     return review.userId === currentUser.id
    // }))
    // if(userReview){
    //     return NextResponse.error()
    // }
    const review = await prisma?.review.create({
        data:{
            comment,
            rating,
            productId: product.id,
            userId
        }
    })
    return NextResponse.json(review)
} 
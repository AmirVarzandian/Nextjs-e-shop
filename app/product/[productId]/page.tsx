import { Container } from "@mui/material";
import ProductDetail from "./ProductDetail";

import ListRating from "./ListRating";
import { productss } from "@/app/utils/Allproducts";
import getProductById from "@/actions/getProductById";
import NullData from "@/app/components/NullData";
import AddRating from "./AddRating";
import { cookies } from "next/headers";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { setIdClientCookie } from "@/app/cookies";



interface IParams {
  productId?: string;
}
const Product = async ({ params }: { params: IParams }) => {
  const cookiesList = cookies()
  const hasCookie = cookiesList.has('token')
  const currentUser = await getCurrentUser();
  // const token = currentUser?.id || '';
  // cookies().set('token', token)
  const Cookie = cookiesList.get('token')
console.log("cookies",currentUser?.id)
  //console.log("the current user is",currentUser?.id)
const product = await getProductById(params)
if(!product) return <NullData title="Oops! Product with the given name id doesnt exist"/>
  return (
    <div className="p-8">
      <Container>
        <ProductDetail product={product} />
        <div className="flex flex-col mt-20 gap-4">
          <AddRating product={product} hasCookie={currentUser?.id}/>
          <ListRating product={product}/>
        </div>
      </Container>
    </div>
  );
};

export default Product;

import getProducts from "@/actions/getProduct";
import ManageProductClient from "./ManageProductClient";
import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "@/app/components/NullData";
import Container from "@/app/components/Container";

const ManageProduct = async() => {
    const products = await getProducts({category:null})
    const currentUser = await getCurrentUser()
    if(!currentUser || currentUser.role !== "ADMIN"){
        return <NullData title="Oops! Access denied"/>
    }
    return (
        <Container>
        <div className="text-sm tex">
           <ManageProductClient products = {products}/>
        </div>
        </Container>
    );
}
 
export default ManageProduct;